import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3002;

app.use(cors());
app.use(express.json());

const PRINTIFY_API_BASE = 'https://api.printify.com/v1';
const API_KEY = process.env.PRINTIFY_API_KEY;
const SHOP_ID = process.env.PRINTIFY_SHOP_ID;

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

// Initialize Stripe if key is present
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_SECRET_KEY && STRIPE_SECRET_KEY !== 'your_stripe_secret_key' 
  ? new Stripe(STRIPE_SECRET_KEY) 
  : null;

// Check if Printify credentials are valid/configured
const isCredentialsValid = 
  API_KEY && 
  SHOP_ID && 
  API_KEY.trim() !== "" && 
  SHOP_ID.trim() !== "" && 
  !API_KEY.includes('your_') && 
  !SHOP_ID.includes('your_');

// Fallback Mock Products
const MOCK_PRODUCTS = [
  {
    id: "PR-1001",
    title: "The Vision",
    description: "A curated immersion into the Afro-diasporic narrative. Original masterpieces and limited-edition directives by Akasi Osei.",
    image: "/images/artwork/thevision.jpg",
    price: 125.00,
    variants: [
      { id: 10011, title: "18x24 / Matte Canvas", price: 125.00 },
      { id: 10012, title: "24x36 / Matte Canvas", price: 185.00 },
      { id: 10013, title: "36x48 / Matte Canvas", price: 245.00 }
    ]
  },
  {
    id: "PR-1002",
    title: "Resilience II",
    description: "Quiet power. A study in restraint and release. Printed on premium archival cotton rag paper.",
    image: "/images/artwork/artwork-03.jpg",
    price: 82.00,
    variants: [
      { id: 10021, title: "18x24 / Fine Art Print", price: 82.00 },
      { id: 10022, title: "24x36 / Fine Art Print", price: 112.00 }
    ]
  },
  {
    id: "PR-1003",
    title: "Ancestral Echo",
    description: "Adinkra symbols dissolved into dreamscape. Limited series prints signed by the artist.",
    image: "/images/artwork/artwork-04.jpg",
    price: 98.00,
    variants: [
      { id: 10031, title: "18x24 / Gold Leaf Embellished", price: 98.00 },
      { id: 10032, title: "24x36 / Gold Leaf Embellished", price: 128.00 }
    ]
  },
  {
    id: "PR-1004",
    title: "Velvet Void I",
    description: "Amber light of a Zimbabwean afternoon. Rendered in high fidelity print.",
    image: "/images/artwork/artwork-05.jpg",
    price: 45.00,
    variants: [
      { id: 10041, title: "12x18 / Archival Print", price: 45.00 },
      { id: 10042, title: "18x24 / Archival Print", price: 65.00 }
    ]
  }
];

// Fetch and translate products from Printify
app.get('/api/products', async (req, res) => {
  if (!isCredentialsValid) {
    console.log("Printify credentials not configured. Serving mock gallery catalog.");
    return res.json(MOCK_PRODUCTS);
  }

  try {
    console.log(`Fetching catalog from Printify shop: ${SHOP_ID}`);
    const response = await fetch(`${PRINTIFY_API_BASE}/shops/${SHOP_ID}/products.json`, { headers });
    
    if (!response.ok) {
      console.error(`Printify returned status ${response.status}`);
      return res.json(MOCK_PRODUCTS);
    }
    
    const result = await response.json();
    
    // Check if result has the expected data structure
    if (!result || !result.data || !Array.isArray(result.data)) {
      console.warn("Unexpected Printify API response format, returning fallbacks.");
      return res.json(MOCK_PRODUCTS);
    }

    // Map Printify schema to simple gallery schema
    const translatedProducts = result.data.map(product => {
      // Find default or first available image
      const defaultImg = product.images.find(img => img.is_default) || product.images[0];
      const imageSrc = defaultImg ? defaultImg.src : '';

      // Map enabled variants
      const activeVariants = product.variants
        .filter(v => v.is_enabled !== false)
        .map(v => ({
          id: v.id,
          title: v.title,
          price: Number((v.price / 100).toFixed(2)) // Printify variant prices are in cents
        }));

      // Base price is the price of the first variant (or default variant)
      const baseVariant = product.variants.find(v => v.is_enabled) || product.variants[0];
      const basePrice = baseVariant ? Number((baseVariant.price / 100).toFixed(2)) : 0;

      return {
        id: product.id,
        title: product.title,
        description: product.description || '',
        image: imageSrc,
        price: basePrice,
        variants: activeVariants
      };
    });

    res.json(translatedProducts);
  } catch (error) {
    console.error('Failed to fetch from Printify API, using fallbacks:', error);
    res.json(MOCK_PRODUCTS);
  }
});

// Create a Stripe PaymentIntent
app.post('/api/create-payment-intent', async (req, res) => {
  const { cartItems } = req.body;

  // Calculate order total
  // Note: In production, verify these prices against your Printify catalog on the server!
  const total = cartItems.reduce((sum, item) => sum + (Number(item.variant?.price || item.product?.price || 0) * item.quantity), 0);
  
  // Stripe requires amount in cents
  const amount = Math.round(total * 100);

  if (!stripe) {
    console.log("Stripe is not configured. Returning simulated payment intent.");
    return res.json({
      clientSecret: 'simulated_secret_key_because_stripe_is_missing',
      amount
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating Stripe payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create a Printify Order
app.post('/api/orders', async (req, res) => {
  const orderData = req.body;

  // Validate order request payload
  if (!orderData.line_items || !orderData.address_to) {
    return res.status(400).json({ error: 'Missing required order fields (line_items or address_to)' });
  }

  if (!isCredentialsValid) {
    console.log("Printify credentials not configured. Simulating order processing:", JSON.stringify(orderData, null, 2));
    
    // Simulate successful order completion
    return res.json({
      id: "mock-order-" + Math.floor(100000 + Math.random() * 900000),
      status: "pending",
      external_id: orderData.external_id || ("ext-" + Date.now()),
      line_items: orderData.line_items,
      address_to: orderData.address_to,
      total_price: 150.00,
      created_at: new Date().toISOString()
    });
  }

  try {
    console.log(`Sending order submission to Printify for shop: ${SHOP_ID}`);
    const response = await fetch(`${PRINTIFY_API_BASE}/shops/${SHOP_ID}/orders.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Printify order submission failed:", data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Failed to register order in Printify API:', error);
    res.status(500).json({ error: 'Failed to create order in Printify' });
  }
});

app.listen(PORT, () => {
  console.log(`Printify Bridge Server running on port ${PORT}`);
});

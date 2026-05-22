import Stripe from 'stripe';

export async function onRequestPost(context) {
  const { request, env } = context;
  const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }

  const { cartItems } = body;
  if (!cartItems || !Array.isArray(cartItems)) {
    return new Response(JSON.stringify({ error: "cartItems array required" }), { status: 400 });
  }

  const total = cartItems.reduce((sum, item) => sum + (Number(item.variant?.price || item.product?.price || 0) * item.quantity), 0);
  const amount = Math.round(total * 100);

  const isStripeValid = STRIPE_SECRET_KEY && STRIPE_SECRET_KEY.trim() !== "" && STRIPE_SECRET_KEY !== 'your_stripe_secret_key';

  if (!isStripeValid) {
    return new Response(JSON.stringify({
      clientSecret: 'simulated_secret_key_because_stripe_is_missing',
      amount
    }), { headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(), // Required for Cloudflare Workers
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

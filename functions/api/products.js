export async function onRequest(context) {
  const { env } = context;
  const API_KEY = env.PRINTIFY_API_KEY;
  const SHOP_ID = env.PRINTIFY_SHOP_ID;

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

  const isCredentialsValid = API_KEY && SHOP_ID && API_KEY.trim() !== "" && SHOP_ID.trim() !== "" && !API_KEY.includes('your_') && !SHOP_ID.includes('your_');

  if (!isCredentialsValid) {
    return new Response(JSON.stringify(MOCK_PRODUCTS), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      return new Response(JSON.stringify(MOCK_PRODUCTS), { headers: { 'Content-Type': 'application/json' } });
    }
    
    const result = await response.json();
    
    if (!result || !result.data || !Array.isArray(result.data)) {
      return new Response(JSON.stringify(MOCK_PRODUCTS), { headers: { 'Content-Type': 'application/json' } });
    }

    const translatedProducts = result.data.map(product => {
      const defaultImg = product.images.find(img => img.is_default) || product.images[0];
      const imageSrc = defaultImg ? defaultImg.src : '';
      const allImages = product.images.map(img => img.src);

      const activeVariants = product.variants
        .filter(v => v.is_enabled !== false)
        .map(v => ({
          id: v.id,
          title: v.title,
          price: Number((v.price / 100).toFixed(2))
        }));

      const baseVariant = product.variants.find(v => v.is_enabled) || product.variants[0];
      const basePrice = baseVariant ? Number((baseVariant.price / 100).toFixed(2)) : 0;

      return {
        id: product.id,
        title: product.title,
        description: product.description || '',
        image: imageSrc,
        images: allImages,
        price: basePrice,
        variants: activeVariants
      };
    });

    return new Response(JSON.stringify(translatedProducts), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify(MOCK_PRODUCTS), { headers: { 'Content-Type': 'application/json' } });
  }
}

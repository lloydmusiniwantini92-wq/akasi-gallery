export async function onRequestPost(context) {
  const { request, env } = context;
  const API_KEY = env.PRINTIFY_API_KEY;
  const SHOP_ID = env.PRINTIFY_SHOP_ID;

  let orderData;
  try {
    orderData = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  if (!orderData.line_items || !orderData.address_to) {
    return new Response(JSON.stringify({ error: 'Missing required order fields (line_items or address_to)' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const isCredentialsValid = API_KEY && SHOP_ID && API_KEY.trim() !== "" && SHOP_ID.trim() !== "" && !API_KEY.includes('your_') && !SHOP_ID.includes('your_');

  if (!isCredentialsValid) {
    return new Response(JSON.stringify({
      id: "mock-order-" + Math.floor(100000 + Math.random() * 900000),
      status: "pending",
      external_id: orderData.external_id || ("ext-" + Date.now()),
      line_items: orderData.line_items,
      address_to: orderData.address_to,
      total_price: 150.00,
      created_at: new Date().toISOString()
    }), { headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const response = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/orders.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return new Response(JSON.stringify(data), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create order in Printify' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function onRequestPost(context) {
  try {
    const { email } = await context.request.json();
    
    if (!email) return new Response("Missing email", { status: 400 });

    // Sparar mailet i Cloudflare KV med en tidsstämpel som ID
    const id = new Date().toISOString();
    await context.env.EMAILS.put(id, email);

    return new Response("Success", { status: 200 });
  } catch (err) {
    return new Response("Error", { status: 500 });
  }
}

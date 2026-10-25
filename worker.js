export default {
  async fetch(request, env) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };

    const respond = (data, status = 200) =>
      new Response(JSON.stringify(data), { status, headers });

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    const url = new URL(request.url);

    // Backend connection test
    if (request.method === "GET" && url.pathname === "/api/status") {
      return respond({
        success: true,
        status: "online",
        service: "VIDOX AI Gemini Backend"
      });
    }

    if (request.method !== "POST") {
      return respond({ error: "Method not allowed" }, 405);
    }

    try {
      if (!env.GEMINI_KEY) {
        return respond({ error: "GEMINI_KEY secret missing" }, 500);
      }

      const body = await request.json();
      const prompt = String(body.prompt || "").trim();
      const tool = String(body.tool || url.pathname).trim();

      if (!prompt) {
        return respond({ error: "Prompt is required" }, 400);
      }

      if (prompt.length > 10000) {
        return respond({ error: "Prompt is too long" }, 413);
      }

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_KEY
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are VIDOX AI. Tool: ${tool}\nTask: ${prompt}\nGive a useful detailed result.`
              }]
            }]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return respond({
          error: data.error?.message || "Gemini request failed"
        }, response.status);
      }

      const result = data.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("");

      if (!result) {
        return respond({ error: "Gemini returned no text" }, 502);
      }

      return respond({ success: true, result, tool });

    } catch (error) {
      return respond({ error: error.message }, 500);
    }
  }
};

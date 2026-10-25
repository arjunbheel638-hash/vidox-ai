
export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    const jsonResponse = (data, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Only POST requests are allowed." }, 405);
    }

    try {
      if (!env.GEMINI_KEY) {
        return jsonResponse({ error: "GEMINI_KEY secret is missing." }, 500);
      }

      const body = await request.json();
      const prompt = String(body.prompt || "").trim();
      const tool = String(body.tool || "AI Assistant").trim();

      if (!prompt) {
        return jsonResponse({ error: "Please enter a prompt." }, 400);
      }

      if (prompt.length > 10000) {
        return jsonResponse({ error: "Prompt is too long." }, 413);
      }

      const gemRes = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_KEY,
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are the AI assistant inside VIDOX AI.
Tool: ${tool}
Task: ${prompt}
Give a useful, clear and detailed result.`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048
            }
          })
        }
      );

      const data = await gemRes.json();

      if (!gemRes.ok) {
        return jsonResponse({
          error: data.error?.message || "Gemini API request failed."
        }, gemRes.status);
      }

      const result = data.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();

      if (!result) {
        return jsonResponse({
          error: "Gemini returned no text. Please try again."
        }, 502);
      }

      return jsonResponse({
        success: true,
        result,
        tool
      });

    } catch (error) {
      return jsonResponse({
        error: "Server error: " + error.message
      }, 500);
    }
  }
};

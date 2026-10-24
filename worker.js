export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    const url = new URL(request.url);
    if (url.pathname === "/api/status") {
      return Response.json({ status: "VIDOX AI LIVE - OK" }, { headers: cors });
    }
    if (url.pathname === "/api/video" && request.method === "POST") {
      try {
        const input = await request.json();
        const result = await fetch("https://api.json2video.com/v2/movies", {
          method: "POST",
          headers: { "x-api-key": env.JSON2VIDEO_API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            resolution: "hd", quality: "high", draft: false,
            scenes: [{ elements: [{ type: "text", text: input.prompt || "A cinematic video", style: "001" }] }]
          })
        });
        const data = await result.json();
        return Response.json({ success: true, projectId: data.project || data.id, data }, { headers: cors });
      } catch (e) { return Response.json({ error: e.message }, { status: 500, headers: cors }); }
    }
    return Response.json({ ok: true }, { headers: cors });
  }
};

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "https://arjunbheel638-hash.github.io",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const url = new URL(request.url);

    if (url.pathname === "/api/status") {
      return Response.json({ status: "VIDOX AI Backend LIVE" }, { headers: cors });
    }

    if (url.pathname === "/api/video" && request.method === "POST") {
      if (!env.JSON2VIDEO_API_KEY) {
        return Response.json({ error: "API key missing" }, { status: 500, headers: cors });
      }
      try {
        const input = await request.json();
        const prompt = input.prompt || "A cinematic video";
        
        const moviePayload = {
          resolution: "hd",
          quality: "high",
          draft: false,
          scenes: [{ elements: [{ type: "voice", text: prompt, voice: "en-US-JennyNeural" }, { type: "text", text: prompt, style: "001" }] }]
        };

        const result = await fetch("https://api.json2video.com/v2/movies", {
          method: "POST",
          headers: { "x-api-key": env.JSON2VIDEO_API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify(moviePayload)
        });

        const data = await result.json();
        return Response.json({ success: true, projectId: data.project || data.id, raw: data }, { headers: cors });
      } catch (err) {
        return Response.json({ error: err.message }, { status: 500, headers: cors });
      }
    }

    if (url.pathname.startsWith("/api/movie/")) {
      const projectId = url.pathname.split("/").pop();
      const result = await fetch(`https://api.json2video.com/v2/movies/${projectId}`, {
        headers: { "x-api-key": env.JSON2VIDEO_API_KEY }
      });
      return new Response(await result.text(), { headers: { ...cors, "Content-Type": "application/json" } });
    }

    return Response.json({ error: "Not found" }, { status: 404, headers: cors });
  }
};

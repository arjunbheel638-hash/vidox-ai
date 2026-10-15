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
      return Response.json({ status: "connected" }, { headers: cors });
    }

    if (url.pathname === "/api/video" && request.method === "POST") {
      if (!env.JSON2VIDEO_API_KEY) {
        return Response.json({ error: "API key missing" }, { status: 500, headers: cors });
      }

      const input = await request.json();

      const result = await fetch("https://api.json2video.com/v2/movies", {
        method: "POST",
        headers: {
          "x-api-key": env.JSON2VIDEO_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });

      return new Response(await result.text(), {
        status: result.status,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }

    return Response.json({ error: "Not found" }, { status: 404, headers: cors });
  }
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbyv1K9vOiD0Gf_szvTEmOQpIH4tiTWVt4L-pOtBkIEwEVyAtXvhcJdQpAD9FLJhr9VzIw/exec";

  try {
    if (req.method === "POST") {
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const data = await response.text();
      return res.status(200).json({ success: true, data });
    }

    if (req.method === "GET") {
      const response = await fetch(googleScriptUrl);
      const data = await response.text();
      return res.status(200).send(data);
    }

    res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
}







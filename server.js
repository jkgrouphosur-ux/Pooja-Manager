const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "20kb" }));

app.use("/api/", rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false
}));

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "Pooja Panchang Proxy" });
});

app.post("/api/panchangam", async (req, res) => {
  const apiKey = process.env.NAVAMSHA_API_KEY;
  const apiUrl = process.env.NAVAMSHA_API_URL;

  if (!apiKey || !apiUrl) {
    return res.status(500).json({
      error: "Server configuration missing. Set NAVAMSHA_API_KEY and NAVAMSHA_API_URL."
    });
  }

  try {
    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey
      },
      body: JSON.stringify(req.body)
    });

    const responseText = await upstream.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { raw: responseText };
    }

    return res.status(upstream.status).json(data);
  } catch (error) {
    console.error("Upstream request failed:", error.message);
    return res.status(502).json({ error: "Could not reach the panchang API." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Pooja Panchang Proxy listening on port ${port}`);
});

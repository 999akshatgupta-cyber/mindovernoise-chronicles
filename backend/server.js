import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.post("/api/project-one", async (req, res) => {
  console.log("FORWARDING TO:", process.env.N8N_WEBHOOK_URL);
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Missing required fields",
      details: "name, email, and message are required.",
    });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("N8N_WEBHOOK_URL is not defined in the environment.");
    return res.status(500).json({
      error: "Server misconfiguration",
      details: "Webhook URL is not configured.",
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const debugText = await response.text();
    console.log("N8N STATUS:", response.status, "BODY (first 200 chars):", debugText.slice(0, 200));

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      try {
        const data = JSON.parse(debugText);
        return res.status(response.status).json(data);
      } catch (jsonError) {
        console.warn("Failed to parse JSON response from n8n:", jsonError);
        return res.status(response.status).send(debugText);
      }
    }

    return res.status(response.status).send(debugText);
  } catch (error) {
    console.error("Error forwarding request to n8n:", error);
    return res.status(500).json({
      error: "Failed to forward request",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
});

// Run inside backend folder:
// npm install
// node server.js

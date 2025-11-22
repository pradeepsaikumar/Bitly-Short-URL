import { query } from "../../lib/db";

// Base URL for short links
const BASE_URL = "http://localhost:3000";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { url, code } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // If custom code provided else generate
  const shortCode = code || Math.random().toString(36).substring(2, 8);

  // Insert into DB
  await query(
    "INSERT INTO links (code, target_url) VALUES ($1, $2)",
    [shortCode, url]
  );

  // FINAL SHORT URL
  const shortUrl = `${BASE_URL}/${shortCode}`;

  return res.status(200).json({
    message: "Short link created successfully",
    shortUrl,
    code: shortCode,
  });
}

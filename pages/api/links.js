import { query as db } from "../../lib/db";
import validUrl from "valid-url";

const RE = /^[A-Za-z0-9]{4,12}$/; // allow 4-12 for flexibility
function gen(l = 7) {
  const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < l; i++) s += c[Math.floor(Math.random() * c.length)];
  return s;
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const r = await db("SELECT * FROM links ORDER BY created_at DESC");
      return res.status(200).json(r.rows || []);
    }

    if (req.method === "POST") {
      const { target_url, code } = req.body;
      if (!target_url || !validUrl.isWebUri(target_url)) {
        return res.status(400).json({ error: "Invalid URL" });
      }
      let c = code || gen();
      if (code && !RE.test(code)) return res.status(400).json({ error: "Bad code" });

      const ex = await db("SELECT 1 FROM links WHERE code = $1 LIMIT 1", [c]);
      if (ex.rowCount && ex.rowCount > 0) return res.status(409).json({ error: "Exists" });

      await db("INSERT INTO links (code, target_url) VALUES ($1, $2)", [c, target_url]);
      return res.status(201).json({ code: c, short_url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/${c}` });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end();
  } catch (err) {
    console.error("API /links error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

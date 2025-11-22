// pages/api/stats.js
import { clicksPerDay } from "../../lib/metrics";

export default async function handler(req, res) {
  try {
    const rows = await clicksPerDay(14);
    return res.status(200).json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "internal" });
  }
}

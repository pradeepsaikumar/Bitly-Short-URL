// lib/metrics.js
const { query: db } = require("./db");

/**
 * returns array of { date: 'YYYY-MM-DD', clicks: n } for last N days
 */
async function clicksPerDay(days = 14) {
  const r = await db(
    `SELECT date_trunc('day', COALESCE(last_clicked, created_at))::date AS day, SUM(clicks) AS clicks
     FROM links
     WHERE COALESCE(last_clicked, created_at) >= now() - ($1 || ' days')::interval
     GROUP BY day
     ORDER BY day ASC`,
    [days]
  );
  // normalize: fill missing days
  const rows = r.rows || [];
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const found = rows.find(rw => (new Date(rw.day)).toISOString().slice(0,10) === key);
    out.push({ date: key, clicks: found ? Number(found.clicks) : 0 });
  }
  return out;
}

module.exports = { clicksPerDay };

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text, params) {
  const res = await pool.query(text, params);

  // Convert Date → string
  const fixedRows = res.rows.map(row => {
    Object.keys(row).forEach(key => {
      if (row[key] instanceof Date) {
        row[key] = row[key].toISOString();
      }
    });
    return row;
  });

  return {
    rows: fixedRows,
    rowCount: res.rowCount
  };
}

// pages/[code].js
import { query } from "../lib/db";

export async function getServerSideProps({ params }) {
  const rows = await query("SELECT * FROM links WHERE code = $1", [params.code]);

  if (!rows.rows || rows.rows.length === 0) {
    return { notFound: true };
  }

  const link = rows.rows[0];

  // Update clicks
  await query("UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1", [
    params.code,
  ]);

  return {
    redirect: {
      destination: link.target_url,
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}

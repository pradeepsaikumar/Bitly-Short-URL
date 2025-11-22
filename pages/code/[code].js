import Layout from "../../components/Layout";
import { query } from "../../lib/db";

export async function getServerSideProps({ params }) {
  const code = params.code;

  const result = await query("SELECT * FROM links WHERE code=$1", [code]);

  if (!result.rows || result.rows.length === 0) {
    return { notFound: true };
  }

  const link = result.rows[0];

  // Convert Date → ISO string BEFORE sending to client
  const safeLink = {
    ...link,
    created_at: link.created_at ? new Date(link.created_at).toISOString() : null,
    last_clicked: link.last_clicked ? new Date(link.last_clicked).toISOString() : null,
  };

  return {
    props: { link: safeLink },
  };
}

export default function Stats({ link }) {
  return (
    <Layout>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">
          Stats for <span className="text-orange-500">{link.code}</span>
        </h1>

        <p><strong>URL:</strong> {link.target_url}</p>
        <p><strong>Clicks:</strong> {link.clicks}</p>

        <p><strong>Created At:</strong> {link.created_at || "Unknown"}</p>
        <p><strong>Last Clicked:</strong> {link.last_clicked || "Never"}</p>

        <div className="mt-6 flex gap-4">
          <a
            href={link.target_url}
            target="_blank"
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Open
          </a>

          <a
            href="/"
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Back
          </a>
        </div>
      </div>
    </Layout>
  );
}

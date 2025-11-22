import Layout from "../components/Layout";

export async function getServerSideProps() {
  // Render only on server, not at build time
  return { props: {} };
}

export default function Stats() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Stats Page</h1>
        <p className="text-gray-600">
          Select a short URL from dashboard to view its analytics.
        </p>
      </div>
    </Layout>
  );
}

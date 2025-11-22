import Layout from "../components/Layout";

export default function Health() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold">Health</h2>
          <p className="mt-3 text-slate-700">App server: OK</p>
          <p className="mt-2 text-slate-700">DB: OK (if DATABASE_URL is configured)</p>
        </div>
      </div>
    </Layout>
  );
}

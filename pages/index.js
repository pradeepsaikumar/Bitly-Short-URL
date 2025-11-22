import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LinkTable from "../components/LinkTable";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [creating, setCreating] = useState(false);

  // Load All Links
  async function loadLinks() {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
    setLoading(false);
  }

  // Create Short Link
  async function createLink() {
    if (!url) {
      toast.error("URL is required!");
      return;
    }

    setCreating(true);

    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, code }),
    });

    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      setShortUrl(data.shortUrl);
      toast.success("Short link created!");
      loadLinks();
    }

    setUrl("");
    setCode("");
    setCreating(false);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <Layout>
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a short link</h2>

          <input
            className="w-full border px-4 py-2 rounded mb-3"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            className="w-full border px-4 py-2 rounded mb-3"
            placeholder="Custom code (optional)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={createLink}
            disabled={creating}
            className="px-4 py-2 bg-orange-500 text-white rounded mr-3"
          >
            {creating ? "Creating..." : "Create"}
          </button>

          <button
            onClick={() => {
              setUrl("");
              setCode("");
            }}
            className="px-4 py-2 border rounded"
          >
            Clear
          </button>

          {shortUrl && (
            <div className="mt-4 p-3 rounded bg-gray-100">
              <p className="font-medium">Your Short Link:</p>

              <div className="flex items-center gap-3 mt-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {shortUrl}
                </a>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    toast.success("Copied to clipboard!");
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Copy
                </button>

                {/* Open Button */}
                <a
                  href={shortUrl}
                  target="_blank"
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Open
                </a>
              </div>
            </div>
          )}
        </div>

        {loading ? <p>Loading...</p> : <LinkTable links={links} />}
      </div>
    </Layout>
  );
}

import { useState } from "react";
import validUrl from "valid-url";

export default function AddLinkForm({ onAdded }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validUrl.isWebUri(url)) {
      setError("Enter a valid URL including http(s)");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target_url: url, code })
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to create link");
      return;
    }

    setUrl("");
    setCode("");
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Create a short link</h2>

      <label className="text-sm text-gray-700">Long URL</label>
      <input
        className="w-full border border-gray-300 px-3 py-2 rounded-md mb-3"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <label className="text-sm text-gray-700">Custom Code (optional)</label>
      <input
        className="w-64 border border-gray-300 px-3 py-2 rounded-md mb-4"
        placeholder="6-8 characters"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          {loading ? "Creating..." : "Create Short Link"}
        </button>

        <button
          type="button"
          onClick={() => { setUrl(""); setCode(""); setError(""); }}
          className="px-3 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </form>
  );
}

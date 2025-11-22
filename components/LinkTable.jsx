import Link from "next/link";

export default function LinkTable({ links }) {
  const list = Array.isArray(links) ? links : [];
  if (list.length === 0) return <div className="bg-white p-6 rounded-xl shadow"><p className="text-slate-600">No links yet</p></div>;

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">URL</th>
            <th className="p-3">Clicks</th>
            <th className="p-3">Last Clicked</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(link => (
            <tr key={link.code} className="border-b">
              <td className="p-3 font-medium">{link.code}</td>
              <td className="p-3 text-blue-600 break-words">{link.target_url}</td>
              <td className="p-3 text-center">{link.clicks || 0}</td>
              <td className="p-3">{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : '-'}</td>
              <td className="p-3">
                <Link href={`/code/${link.code}`} className="text-blue-600 underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Stats({ link }) {
  const created = link.created_at
    ? new Date(link.created_at).toLocaleString()
    : "Unknown";

  const lastClicked = link.last_clicked
    ? new Date(link.last_clicked).toLocaleString()
    : "Never";

  return (
    <div>
      <h1>Stats for {link.code}</h1>

      <p>URL: {link.target_url}</p>
      <p>Clicks: {link.clicks}</p>

      <p>Created: {created}</p>
      <p>Last Clicked: {lastClicked}</p>
    </div>
  );
}

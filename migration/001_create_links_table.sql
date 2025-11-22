CREATE TABLE IF NOT EXISTS links (
  code TEXT PRIMARY KEY,
  target_url TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_clicked TIMESTAMP WITH TIME ZONE
);
CREATE INDEX IF NOT EXISTS idx_links_last_clicked ON links(last_clicked);
-- Create a table to track daily site visits
CREATE TABLE IF NOT EXISTS site_visits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  visit_date date DEFAULT CURRENT_DATE,
  count int DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(visit_date)
);

-- Enable RLS
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (anon) to increment the count (via function or direct insert if we handle conflict)
-- Actually, for simplicity and security, we'll use a function to increment.
-- But for direct table access:
-- Allow read only for authenticated users (admins/staff)
CREATE POLICY "Allow read for authenticated users" ON site_visits
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow insert/update for anon (this is a bit loose, better to use a secure function, but for this demo it's okay)
-- Or better: create a function `increment_visit` and call it via RPC.

CREATE OR REPLACE FUNCTION increment_visit()
RETURNS void AS $$
BEGIN
  INSERT INTO site_visits (visit_date, count)
  VALUES (CURRENT_DATE, 1)
  ON CONFLICT (visit_date)
  DO UPDATE SET count = site_visits.count + 1, updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to anon
GRANT EXECUTE ON FUNCTION increment_visit TO anon;
GRANT EXECUTE ON FUNCTION increment_visit TO authenticated;
GRANT EXECUTE ON FUNCTION increment_visit TO service_role;

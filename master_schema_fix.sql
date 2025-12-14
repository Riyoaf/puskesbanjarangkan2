-- MASTER FIX: Ensure ALL columns exist in registrations table
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS nik text;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS birth_date date;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS patient_name text;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS phone_number text;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS vaccination_time text;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS queue_number text;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS scheduled_date date;

-- Ensure RLS is enabled and policies are correct (from previous fix)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Reload schema cache to be safe
NOTIFY pgrst, 'reload schema';

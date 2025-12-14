-- Add new columns to registrations table
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS nik text,
ADD COLUMN IF NOT EXISTS birth_date date,
ADD COLUMN IF NOT EXISTS vaccination_time text;

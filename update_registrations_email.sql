-- Add email column to registrations table
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS email text;

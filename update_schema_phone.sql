-- Add phone_number column to registrations table
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS phone_number text;

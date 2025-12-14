-- Add queue_number column to registrations table
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS queue_number text;

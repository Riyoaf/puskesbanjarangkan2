-- Add patient_name column to registrations table
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS patient_name text;

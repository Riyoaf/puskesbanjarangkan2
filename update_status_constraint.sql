-- Drop the existing check constraint
ALTER TABLE public.registrations DROP CONSTRAINT IF EXISTS registrations_status_check;

-- Add the new check constraint including 'cancelled'
ALTER TABLE public.registrations 
ADD CONSTRAINT registrations_status_check 
CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled'));

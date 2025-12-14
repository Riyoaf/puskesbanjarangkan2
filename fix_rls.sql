-- Fix RLS policies for registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own registrations." ON public.registrations;
DROP POLICY IF EXISTS "Admins can view all registrations." ON public.registrations;
DROP POLICY IF EXISTS "Users can create registrations." ON public.registrations;
DROP POLICY IF EXISTS "Admins can update registrations." ON public.registrations;

-- Re-create policies
-- 1. Users can view their own
CREATE POLICY "Users can view their own registrations"
ON public.registrations FOR SELECT
USING ( auth.uid() = user_id );

-- 2. Admins can view ALL (Simplified check)
CREATE POLICY "Admins can view all registrations"
ON public.registrations FOR SELECT
USING ( 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- 3. Users can insert their own
CREATE POLICY "Users can create registrations"
ON public.registrations FOR INSERT
WITH CHECK ( auth.uid() = user_id );

-- 4. Admins can update any registration
CREATE POLICY "Admins can update registrations"
ON public.registrations FOR UPDATE
USING ( 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Ensure profiles are readable so the admin check works
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING ( true );

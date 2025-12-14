-- Allow users to update their own registrations (specifically for cancellation)
CREATE POLICY "Users can update their own registrations"
ON public.registrations
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Ensure the policy is applied
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

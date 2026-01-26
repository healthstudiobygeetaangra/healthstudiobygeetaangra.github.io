-- Add explicit deny policy for anonymous users on profiles table
-- This ensures unauthenticated users cannot access any data

-- First, let's add a restrictive policy that denies all access to anonymous/public role
CREATE POLICY "Block anonymous access to profiles"
ON public.profiles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);
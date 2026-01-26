-- Add restrictive UPDATE policy to prevent anyone from modifying auth logs
CREATE POLICY "No one can update auth logs" 
ON public.auth_logs 
FOR UPDATE 
USING (false);
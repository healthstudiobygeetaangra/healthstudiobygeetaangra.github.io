-- Explicitly block anonymous reads of leads (defense-in-depth)

-- Ensure authenticated role can SELECT when allowed by RLS (needed for admin policy)
GRANT SELECT ON TABLE public.leads TO authenticated;

-- Remove any accidental anon privileges (extra safeguard)
REVOKE ALL ON TABLE public.leads FROM anon;

-- Add a RESTRICTIVE policy that blocks anon SELECT entirely
DROP POLICY IF EXISTS "Block anonymous read access to leads" ON public.leads;
CREATE POLICY "Block anonymous read access to leads"
ON public.leads
AS RESTRICTIVE
FOR SELECT
TO anon
USING (false);
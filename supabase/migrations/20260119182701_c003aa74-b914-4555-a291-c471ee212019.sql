-- Harden leads table: remove public INSERT, keep admin-only read, add metadata for rate limiting

-- Add request metadata columns (nullable for existing rows)
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS client_ip TEXT,
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Remove overly permissive public INSERT policy (prevents direct client-side writes)
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Remove the old deny-all public SELECT policy (we'll rely on default-deny + explicit admin policy)
DROP POLICY IF EXISTS "No public read access" ON public.leads;

-- Ensure admin-only read policy exists and is scoped to authenticated users
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
CREATE POLICY "Admins can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Helpful index for per-IP rate limiting queries
CREATE INDEX IF NOT EXISTS idx_leads_client_ip_created_at
ON public.leads (client_ip, created_at DESC);
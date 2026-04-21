CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  utm_pagina TEXT,
  landing_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  ac_contact_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_leads_email ON public.leads (email);
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- No public access. Only service role (edge function) writes/reads.
CREATE POLICY "No public read"
ON public.leads
FOR SELECT
TO authenticated, anon
USING (false);

CREATE POLICY "No public insert"
ON public.leads
FOR INSERT
TO authenticated, anon
WITH CHECK (false);
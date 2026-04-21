# Vercel Deploy

Este projeto suporta dois builds em paralelo:

1. **Lovable / Cloudflare Workers (SSR)** — `vite build` (config padrão `vite.config.ts`).
2. **Vercel SPA estática** — `vite build --config vite.config.vercel.ts`.

## Deploy na Vercel

1. Importe o repo na Vercel.
2. Framework Preset: **Other** (o `vercel.json` cuida de tudo).
3. Build command e output já estão em `vercel.json`:
   - `buildCommand`: `vite build --config vite.config.vercel.ts`
   - `outputDirectory`: `dist`
4. Adicione as variáveis de ambiente em **Project Settings → Environment Variables**:

### Frontend (obrigatórias — prefixo `VITE_`)
```
VITE_SUPABASE_URL=https://zotpejsjkpixrqwfibaa.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<sua anon key>
VITE_SUPABASE_PROJECT_ID=zotpejsjkpixrqwfibaa
```

### Backend (apenas se você for portar as edge functions para a Vercel)
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ACTIVECAMPAIGN_API_URL=...
ACTIVECAMPAIGN_API_KEY=...
```

> **Atenção:** as Edge Functions (`supabase/functions/ac-subscribe`) continuam rodando no Supabase — não precisam ser migradas. A Vercel servirá apenas o frontend estático, que chama as functions do Supabase como hoje.

## SPA Routing

O `vercel.json` faz rewrite de todas as rotas para `index.html`, garantindo que deep links (ex: `/obrigado`) funcionem após refresh.

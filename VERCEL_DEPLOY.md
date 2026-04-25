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
4. Adicione as variáveis de ambiente em **Project Settings → Environment Variables** (use `.env.example` como referência):

### Frontend (obrigatórias — prefixo `VITE_`)
```
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>
VITE_SUPABASE_PROJECT_ID=<project-id>
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

O `vercel.json` faz rewrite de todas as rotas para `index.html`, garantindo que deep links (ex: `/obrigado`, `/v2`) funcionem após refresh.

## Headers de Segurança (já configurados no `vercel.json`)

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` — força HTTPS por 2 anos
- `X-Content-Type-Options: nosniff` — evita MIME sniffing
- `X-Frame-Options: SAMEORIGIN` — anti-clickjacking
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(self)`
- `X-DNS-Prefetch-Control: on`

## Cache

- `/assets/*` e imagens estáticas (jpg, png, webp, svg, woff2…) → `max-age=31536000, immutable` (1 ano)
- `/` e `*.html` → `no-cache, no-store, must-revalidate` (sempre revalida)

## Build local (sanity check antes de subir)

```bash
npm run build -- --config vite.config.vercel.ts
# ou
./node_modules/.bin/vite build --config vite.config.vercel.ts
```

Output em `dist/`. Pra testar a SPA estática localmente:

```bash
npx serve dist
```

## Pendências de performance (não-bloqueantes)

Imagens muito pesadas no `dist/assets/` — mais de 1MB cada. Otimizar antes de campanha pesada:

- `adrian-esposa.jpg` — 2.8 MB
- `profissional-diagnostico.png` — 2.6 MB
- `predio-alugueis.png` — 1.27 MB
- `banco-master-news.png` — 421 KB

Recomendação: converter pra `.webp` ou `.avif` em qualidade 75–80, reduzir resolução máxima para 1920px (suficiente pra retina). Pode-se usar `squoosh.app`, `sharp`, ou `vite-imagetools`.

## Checklist final antes do deploy

- [ ] `.env` está no `.gitignore` (não commitar)
- [ ] Variáveis configuradas no painel da Vercel
- [ ] `vite build --config vite.config.vercel.ts` roda sem erro localmente
- [ ] Domínio adicionado em **Project Settings → Domains** (com SSL automático)
- [ ] Edge Functions do Supabase ainda apontando pra projeto correto

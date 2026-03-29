---
name: deploy-check
description: "Cloudflare Pages deploy státusz és élő oldal ellenőrzése. Használat: /deploy-check"
disable-model-invocation: true
---

# Deploy Check — Cloudflare Pages státusz

## 1. lépés: Legutóbbi commit ellenőrzése

```bash
git log --oneline -3
```

Jelezd, melyik commit várható a deploy-ban.

## 2. lépés: Cloudflare deploy tájékoztatás

A Cloudflare Pages build automatikusan elindul a push után (általában 1–3 perc).

Build log ellenőrzéséhez nyisd meg:
- `https://dash.cloudflare.com` → Workers & Pages → **pw-refactor** (vagy a projekt neve) → Deployments

Vagy Cloudflare CLI-vel (ha telepítve van):
```bash
npx wrangler pages deployment list --project-name=pw-refactor
```

## 3. lépés: Élő oldal smoke test

Ellenőrizd az élő URL-eket:
- `https://simonprojects.eu` — Főoldal betöltődik?
- `https://simonprojects.eu/about` — About oldal?
- `https://simonprojects.eu/sitemap-index.xml` — Sitemap létezik?

## 4. lépés: Visszajelzés

```
✅ Deploy ellenőrzés kész!

Legutóbbi commit: [sha] [üzenet]
Cloudflare dashboard: https://dash.cloudflare.com
Élő URL: https://simonprojects.eu

Ha a build még fut, várj 2-3 percet és futtasd újra.
```

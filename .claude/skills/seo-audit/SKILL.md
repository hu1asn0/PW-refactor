---
name: seo-audit
description: "SEO és accessibility audit: meta tagek, sitemap, OpenGraph, alap WCAG ellenőrzés. Használat: /seo-audit"
disable-model-invocation: true
---

# SEO Audit — Meta, Sitemap, OpenGraph, WCAG

## 1. lépés: Meta tagek ellenőrzése

Olvasd be az összes `.astro` fájlt a `src/pages/` mappából és ellenőrizd:

| Elem | Kötelező | Ellenőrzés |
|------|----------|------------|
| `<title>` | ✅ | 50–60 karakter, egyedi oldalanként |
| `meta description` | ✅ | 120–160 karakter, minden oldalon |
| `og:title` | ✅ | OpenGraph cím |
| `og:description` | ✅ | OpenGraph leírás |
| `og:image` | Ajánlott | Legalább 1200×630px |
| `canonical` link | ✅ | Minden oldalon helyes URL |
| `lang="hu"` | ✅ | HTML tag nyelvbeállítás |

## 2. lépés: Sitemap ellenőrzés

Astro Sitemap integráció ellenőrzése az `astro.config.mjs`-ben:

```js
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://simonprojects.eu',
  integrations: [sitemap()],
});
```

Ha nincs telepítve:
```bash
npx astro add sitemap
```

## 3. lépés: Alap WCAG ellenőrzés

Ellenőrizd az összes oldalon:
- Képeknél `alt` attribútum megléte
- Heading hierarchia (h1 → h2 → h3, nem ugrik át szintet)
- Link szövegek értelmezhetők kontextus nélkül is (nem: "kattints ide")
- Kontrasztarány (ha megállapítható a CSS-ből)
- `<nav>` és `<main>` landmark elemek megléte

## 4. lépés: robots.txt ellenőrzés

A `public/robots.txt` fájl megléte és tartalma:
```
User-agent: *
Allow: /
Sitemap: https://simonprojects.eu/sitemap-index.xml
```

## 5. lépés: Audit összesítő

```
📊 SEO Audit Eredmény

✅ Helyes elemek: [lista]
⚠️  Javítandó: [lista]
❌ Hiányzó elemek: [lista]

Pontszám: [X/10]

Ajánlott következő lépések:
1. [legsúlyosabb hiányosság]
2. [második]
```

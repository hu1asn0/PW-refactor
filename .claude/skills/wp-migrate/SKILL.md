---
name: wp-migrate
description: "WordPress tartalom migrálása Astro statikus oldalakra. Használat: /wp-migrate"
disable-model-invocation: true
---

# WordPress → Astro Migráció

## 1. lépés: WordPress tartalom lekérése

A WordPress REST API-n keresztül le lehet kérni a tartalmat (ha a WordPress még él):

```bash
# Oldalak lekérése JSON-ban
curl https://simonprojects.eu/wp-json/wp/v2/pages?per_page=50 > wp_pages.json
# Bejegyzések (ha van blog)
curl https://simonprojects.eu/wp-json/wp/v2/posts?per_page=100 > wp_posts.json
```

Ha a WP már nem elérhető, kérd a felhasználót, hogy adjon egy `wp-export.xml` (WP export) fájlt.

## 2. lépés: Tartalom elemzése

Olvasd be a JSON/XML adatokat és listázd:
- Oldalak száma és neve
- Bejegyzések száma (ha van blog)
- Médiafájlok (képek URL-jei)

## 3. lépés: Astro oldalak generálása

Minden WordPress oldalhoz hozz létre egy `.astro` fájlt a `src/pages/` mappában:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="[WP oldal title]" description="[WP meta description]">
  <!-- WP tartalom HTML-ből konvertálva, tisztítva -->
</BaseLayout>
```

**Tartalom tisztítás szabályai:**
- WordPress shortcode-okat (`[gallery]`, `[contact-form-7]` stb.) távolítsd el vagy cseréld statikus alternatívára
- `http://` → `https://` hivatkozások
- Belső WP linkek (`/wp-content/uploads/`) → `/images/` mappa
- Képeket töltsd le a `public/images/` mappába és konvertáld WebP-re (ha lehetséges)

## 4. lépés: Navigáció frissítése

Frissítsd a `src/layouts/BaseLayout.astro` navigációját az új oldalak szerint.

## 5. lépés: Ellenőrzés

Futtasd: `/site-build`

## 6. lépés: Visszajelzés

```
✅ WordPress migráció kész!

Migrált oldalak: [szám]
Letöltött képek: [szám]
Figyelem: Ellenőrizd manuálisan a formokat és dinamikus elemeket!

Következő lépés: /seo-audit
```

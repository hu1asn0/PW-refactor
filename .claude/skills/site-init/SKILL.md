---
name: site-init
description: "Astro 5 projekt inicializálása a PW-refactor repóban nulláról. Csak akkor használd, ha még nincs src/ mappa."
disable-model-invocation: true
---

# Site Init — Astro 5 projekt létrehozása

## 1. lépés: Ellenőrzés

Először olvasd be a CLAUDE.md-et és ellenőrizd, hogy van-e már `src/` mappa:
- Ha `src/` már létezik → ne futtasd, jelezd a felhasználónak
- Ha nincs → folytasd

## 2. lépés: Astro scaffold létrehozása

Futtasd le a következőket a repo gyökerében:

```bash
npm create astro@latest . -- --template minimal --no-install --no-git
npm install
```

## 3. lépés: Alap oldalstruktúra

Hozd létre a következő fájlokat (ha nem léteznek):

**`src/layouts/BaseLayout.astro`:**
- HTML5 alap struktúra
- `<meta charset>`, `<meta viewport>`, `<title>` dinamikus prop-pal
- OpenGraph meta tagek (title, description, og:url, og:image)
- Globális CSS import: `../styles/global.css`
- Reszponzív navigáció: Home, Projects, About, Contact
- Footer: copyright + aktuális év

**`src/styles/global.css`:**
- CSS reset (box-sizing: border-box, margin: 0)
- Alap betűtípus: system-ui, sans-serif
- CSS változók: `--color-primary`, `--color-bg`, `--color-text`
- Mobile-first responsive breakpoints: 768px, 1024px

**Kötelező oldalak** (BaseLayout-ot használva):
- `src/pages/index.astro` — Hero szekció + rövid bemutatkozás
- `src/pages/about.astro` — IT PM portfólió, tapasztalat
- `src/pages/projects.astro` — Projektek kártya nézetben
- `src/pages/contact.astro` — Kapcsolatfelvétel (statikus form vagy mailto)
- `src/pages/404.astro` — Egyedi 404 oldal

## 4. lépés: astro.config.mjs beállítás

```js
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://simonprojects.eu',
  output: 'static',
});
```

## 5. lépés: .gitignore ellenőrzés

Bizonyosodj meg, hogy a `.gitignore` tartalmazza:
```
node_modules/
dist/
.env
.env.*
!.env.example
```

## 6. lépés: Teszt build

```bash
npm run build
```

Ha sikeres → futtasd a `/git-sync` skillben leírt lépéseket.

## 7. lépés: Visszajelzés

```
✅ Astro projekt inicializálva!

Struktura:
- src/layouts/BaseLayout.astro
- src/pages/index.astro
- src/pages/about.astro  
- src/pages/projects.astro
- src/pages/contact.astro
- src/pages/404.astro

Következő lépés: /git-sync "Initial Astro setup"
```

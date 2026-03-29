---
name: add-page
description: "Új Astro oldal létrehozása a konvencióknak megfelelően. Használat: /add-page [oldal neve vagy slug-ja]"
argument-hint: "oldal slug (pl. services, blog, contact-en)"
disable-model-invocation: true
---

# Add Page — Új Astro oldal hozzáadása

Paraméter: **$ARGUMENTS** (az oldal neve/slug-ja, pl. `services` vagy `rolam`)

## 1. lépés: Fájlnév meghatározása

- Konvertáld kebab-case formátumra (kisbetűk, kötőjel elválasztóval)
- Magyar karakterek → ASCII (pl. `rólam` → `rolam`)
- Fájl: `src/pages/$ARGUMENTS.astro`

## 2. lépés: Oldal létrehozása

Hozd létre a fájlt a következő alap sablonnal:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = "[Oldal title — simonprojects.eu]";
const description = "[120-160 karakter leírás]"
---

<BaseLayout title={title} description={description}>
  <main>
    <h1>[Oldal főcím]</h1>
    <!-- Tartalom ide -->
  </main>
</BaseLayout>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
</style>
```

## 3. lépés: Navigáció frissítése

Add hozzá az új oldalt a `src/layouts/BaseLayout.astro` navigációjához:
```html
<a href="/$ARGUMENTS">[Oldal neve]</a>
```

## 4. lépés: Ellenőrzés

Futtasd: `/site-build`

## 5. lépés: Visszajelzés

```
✅ Új oldal létrehozva!

Fájl: src/pages/$ARGUMENTS.astro
URL: https://simonprojects.eu/$ARGUMENTS

Töltsd ki a tartalmat, majd: /git-sync "feat: $ARGUMENTS oldal hozzáadva"
```

---
name: site-build
description: "Astro build futtatása és hibák értelmezése. Használat: /site-build"
disable-model-invocation: true
---

# Site Build — Build futtatás és hibaelemzés

## 1. lépés: Build futtatás

```bash
npm run build 2>&1
```

## 2. lépés: Eredmény értékelése

**Ha sikeres (exit code 0):**
```
✅ Build sikeres!
dist/ mappa mérete: [fájlszám] fájl
Következő lépés: /git-sync vagy /deploy-check
```

**Ha hibás:**
- Olvasd ki a hibaüzenetet
- Azonosítsd a problémás fájlt és sort
- Leggyakoribb Astro hibák:

| Hiba típus | Megoldás |
|-----------|----------|
| `Cannot find module` | Ellenőrizd az import útvonalat (case-sensitive!) |
| `frontmatter syntax error` | YAML frontmatter hibás (hiányzó `---`, rossz indent) |
| `Component not found` | A komponens fájlneve és az import nem egyezik |
| `Hydration mismatch` | `client:load` direktíva szükséges interaktív komponensnél |

- Javítsd a hibát, majd futtasd újra a buildet
- Ha 3 kísérlet után sem sikerül, jelezd részletesen a felhasználónak

## 3. lépés: Build output ellenőrzés

Sikeres build után:
```bash
ls -la dist/
```

Ellenőrizd, hogy a `dist/index.html` létezik és nem üres.

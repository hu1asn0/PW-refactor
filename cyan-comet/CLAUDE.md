# simonprojects.eu — Claude Code munkautasítások

## Projekt kontextus

- **Cél:** A simonprojects.eu WordPress oldal kiváltása statikus site-tal
- **Framework:** Astro 6.x (statikus site generator)
- **Deploy:** Cloudflare Pages (auto-build minden `main` branch push után)
- **Repo:** <https://github.com/hu1asn0/PW-refactor.git>
- **Dev szerver:** `nohup npm run dev -- --host > ~/dev.log 2>&1 &`
- **Élő preview:** <http://192.168.1.196:4321/>

## Tulajdonos

- **Név:** Simon András
- **Szerepkör:** IT Projekt Menedzser & AI Integrátor, Budapest
- **Email:** <info@simonprojects.eu>

---

## Fejlesztési szabályok

### Kódolási konvenciók

- Magyar nyelvű tartalom, angol nyelvű kód (változónevek, fájlnevek)
- Fájlnév: `kebab-case` (pl. `hero-section.astro`)
- CSS: scoped `<style>` Astro komponensekben; globális CSS → `src/styles/global.css`
- Képek: WebP formátum, `public/images/` mappában
- Nincs felesleges JS — Astro alapon csak statikus HTML/CSS, JS csak indokolt esetben
- Reszponzív design: mobile-first, 320px–1440px

### Commit konvenció

```text
feat: [mit adtál hozzá]
fix: [mit javítottál]
content: [tartalom változás]
style: [csak CSS/design]
chore: [config, dependency update]
```

### Git workflow

- Minden változtatás után: `git add . && git commit && git push`
- Paperclip agensek is commitolhatnak párhuzamosan → mindig `git pull` először!

---

## Projekt struktúra

```text
cyan-comet/
├── src/
│   ├── pages/          # .astro oldalak (route = fájlnév)
│   ├── components/     # Újrafelhasználható komponensek
│   ├── layouts/        # Alap Layout wrapper
│   └── styles/         # Globális CSS
├── public/             # Statikus assets (képek, favicon)
├── dist/               # Build output (Cloudflare ezt deployal)
├── astro.config.mjs
├── package.json
└── CLAUDE.md           # Ez a fájl
```

### Kötelező oldalak

| Oldal        | Fájl                       | Státusz     |
| ------------ | -------------------------- | ----------- |
| Főoldal      | `src/pages/index.astro`    | placeholder |
| Bemutatkozás | `src/pages/about.astro`    | hiányzik    |
| Projektek    | `src/pages/projects.astro` | hiányzik    |
| Kapcsolat    | `src/pages/contact.astro`  | hiányzik    |
| 404          | `src/pages/404.astro`      | hiányzik    |

---

## Cloudflare Pages deploy

| Beállítás     | Érték                                                |
| ------------- | ---------------------------------------------------- |
| Build command | `npm run build`                                      |
| Output dir    | `dist`                                               |
| Custom domain | `simonprojects.eu`                                   |
| Node.js       | 22+                                                  |
| Build log     | Cloudflare Dashboard → Workers & Pages → pw-refactor |

---

## Dizájn terv

- **Betűtípus:** Inter (body) + Instrument Serif (display)
- **Színpaletta:** meleg bézs háttér, teal akcentus (#01696f)
- **Reszponzív:** mobile-first, 375px-tól
- **Dark mode:** prefers-color-scheme + toggle

---

## Hibakezelés

| Hiba | Megoldás |
| --- | --- |
| `npm run build` sikertelen | Hiányzó import vagy rossz frontmatter |
| Cloudflare build failed | Build log a dashboardon; Node.js 22+ kell |
| Git push rejected | `git pull --rebase origin main` |
| 404 Cloudflare Pages-en | `dist/` mappa üres vagy rossz output dir |

---

## Kapcsolódó rendszerek

- **Paperclip orchestrátor:** <http://192.168.1.196:3000> (CEO, Frontend Dev, QA, Content agensek)
- **CEO Board:** `hu1asn0/ceo-board` — architektúra döntésekhez
- **Secrets:** `.env` fájl git-ignored, soha ne commitold!

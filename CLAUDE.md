# simonprojects.eu — Statikus Weboldal Projekt

## Projekt áttekintés

A `simonprojects.eu` WordPress oldal kiváltása AI-agensek által épített és karbantartott statikus weboldallal.

- **Framework:** Astro 5 (statikus site generator)
- **Deploy:** Cloudflare Pages (auto-build minden GitHub push után)
- **Agent orchestráció:** Paperclip (`http://192.168.1.196:3000`)
- **Fejlesztői gép → szerver:** VS Code + Claude Code (Max5) → 192.168.1.196
- **GitHub repo:** `hu1asn0/PW-refactor`

---

## Gyors indítás (Slash commandok)

Amikor a felhasználó az oldal fejlesztéséről kérdez, kövesd az adott skill instrukciót:

| Trigger | Skill | Mikor használd |
|---------|-------|----------------|
| `/site-init` | `.claude/skills/site-init/SKILL.md` | Astro projekt nulláról, ha a repo még üres |
| `/site-build` | `.claude/skills/site-build/SKILL.md` | Build futtatás + hibaellenőrzés |
| `/git-sync` | `.claude/skills/git-sync/SKILL.md` | Stage → commit → push egyetlen lépésben |
| `/deploy-check` | `.claude/skills/deploy-check/SKILL.md` | Cloudflare Pages build státusz + URL ellenőrzés |
| `/wp-migrate` | `.claude/skills/wp-migrate/SKILL.md` | WordPress tartalom → Astro oldal migráció |
| `/seo-audit` | `.claude/skills/seo-audit/SKILL.md` | Meta, sitemap, OpenGraph, Lighthouse ellenőrzés |
| `/add-page [névOrSlug]` | `.claude/skills/add-page/SKILL.md` | Új Astro oldal létrehozása konvenciók szerint |

Szabad szöveges triggerek is működnek:
- "Futtasd a buildet" → `/site-build`
- "Pushold a változásokat" → `/git-sync`
- "Ellenőrizd a deploymentet" → `/deploy-check`
- "Migrálj át a WordPressről" → `/wp-migrate`

---

## Technikai stack és konvenciók

### Astro projekt struktúra
```
PW-refactor/
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
- `src/pages/index.astro` — Főoldal (IT PM portfólió)
- `src/pages/about.astro` — Bemutatkozás
- `src/pages/projects.astro` — Projektek / referenciák
- `src/pages/contact.astro` — Kapcsolat
- `src/pages/404.astro` — Hibaoldal

### Kódolási szabályok
- Fájlnév: `kebab-case` (pl. `hero-section.astro`)
- CSS: scoped `<style>` Astro komponensekben; globális CSS a `src/styles/global.css`-ben
- Képek: mindig WebP formátum, `public/images/` mappában
- Nincs felesleges JS — Astro alapon csak statikus HTML/CSS, JS csak indokolt esetben
- Reszponzív design: mobile-first, 320px–1440px között

### Commit üzenetek konvenciója
```
feat: [mit adtál hozzá]
fix: [mit javítottál]
content: [tartalom változás]
style: [csak CSS/design]
chore: [config, dependency update]
```

---

## Paperclip agent kontextus

Ez a repo a Paperclip orchestrátor által kezelt fejlesztési folyamat kimenete.
A Paperclip szerveren (192.168.1.196:3000) a következő agensek dolgoznak ezen a repón:

| Agent neve | Felelőssége | Mikor aktív |
|-----------|-------------|-------------|
| CEO | Issue kiosztás, prioritizálás | Mindig |
| Frontend Dev | Astro komponensek, layout, CSS | Feladatonként |
| QA Engineer | Build-ellenőrzés, WCAG, Lighthouse | Minden push előtt |
| Content Agent | Szövegek, SEO meta, sitemap | Hetente |

**Fontos:** Ha Claude Code-ból dolgozol ezen a repón, a Paperclip agensek is commit-olhatnak párhuzamosan. Mindig `git pull` először!

---

## Cloudflare Pages deploy

- **Auto-deploy:** Igen — minden `main` branch push után
- **Build command:** `npm run build`
- **Output dir:** `dist`
- **Custom domain:** `simonprojects.eu`
- **Build log:** `https://dash.cloudflare.com` → Workers & Pages → pw-refactor

---

## Kapcsolódó repók és eszközök

| Repo | Leírás | Kapcsolat |
|------|--------|-----------|
| `hu1asn0/ceo-board` | CEO Board döntéstámogató rendszer | Ha architektúráról kell dönteni: `/board-session` |
| `hu1asn0/P4PMS` | PM newsletter pipeline | Tartalom inspiráció, newsletter stílus referencia |
| `hu1asn0/openclaw_projects` | HW monitor, mail digest | Fut a 192.168.1.196-on, ne zavard |

---

## Secrets és env változók

A `.env` fájl **git-ignored**, ne commitold soha!

```env
# .env (csak lokálisan és a szerveren)
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_PAGES_PROJECT_NAME=pw-refactor
```

---

## Hibakezelés

| Hiba | Megoldás |
|------|----------|
| `npm run build` sikertelen | Nézd meg az Astro hibaüzenetet; leggyakoribb: hiányzó import, rossz frontmatter |
| Cloudflare build failed | Ellenőrizd a build log-ot a dashboardon; Node.js verzió egyezzen (22+) |
| Git push rejected | `git pull --rebase origin main` — Paperclip agent commitolhatott közben |
| 404 Cloudflare Pages-en | Az `dist/` mappa üres vagy rossz output dir van beállítva |

# simonprojects.eu — Claude Code munkautasítások

## Projekt kontextus
- Astro 6.x statikus site, deploy: Cloudflare Pages
- Dev szerver: `nohup npm run dev -- --host > ~/dev.log 2>&1 &`
- Élő preview: http://192.168.1.196:4321/
- Repo: https://github.com/hu1asn0/PW-refactor.git
- Fő fájl: src/pages/index.astro

## Tulajdonos
- Név: Simon Attila
- Szerepkör: IT Projekt Menedzser & AI Integrátor, Budapest
- Email: attila@simonprojects.eu
- Korábbi platform: WordPress (simonprojects.eu)

## Fejlesztési szabályok
- Magyar nyelvű tartalom
- Minden változtatás után: git add . && git commit -m "..." && git push
- Nano-val szerkesztünk, nem sed/awk

---

## TODO lista

### 🏗️ INFRASTRUKTÚRA
- [x] Astro projekt inicializálva (cyan-comet/)
- [x] Dev szerver fut hálózaton (192.168.1.196:4321)
- [ ] astro.config.mjs: host:true beállítása (ne kelljen mindig --host)
- [ ] Cloudflare Pages összekötve a GitHub repóval
- [ ] Egyedi domain: simonprojects.eu → Cloudflare Pages

### 📄 TARTALOM (src/pages/index.astro)
- [ ] index.astro alaplap létrehozva (nano-val írjuk meg)
- [ ] Hero szekció: cím, alcím, CTA gomb
- [ ] Területek/projektek szekció (3 kártya)
- [ ] Kontakt szekció email linkkel
- [ ] Footer évszámmal és névvel

### 🎨 DIZÁJN
- [ ] Betűtípus: Inter (body) + Instrument Serif (display) betöltve
- [ ] Színpaletta: meleg bézs háttér, teal akcentus (#01696f)
- [ ] Reszponzív layout (mobile-first, 375px-tól)
- [ ] Dark mode (prefers-color-scheme + toggle)

### ⚙️ TECHNIKAI
- [ ] astro.config.mjs: site URL beállítva (https://simonprojects.eu)
- [ ] public/favicon.svg elkészítve
- [ ] Meta tags: og:title, og:description, og:image
- [ ] robots.txt és sitemap.xml (astro sitemap integráció)

### 🚀 DEPLOYMENT
- [ ] GitHub repo tartalmaz minden fájlt (git push ok)
- [ ] Cloudflare Pages projekt létrehozva
- [ ] Build parancs: `npm run build`, output: `dist/`
- 

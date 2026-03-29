---
name: git-sync
description: "Git stage → commit → push egyetlen lépésben, conflict-safe. Használat: /git-sync [commit üzenet]"
argument-hint: "commit üzenet (pl. feat: hero section kész)"
disable-model-invocation: true
---

# Git Sync — Biztonságos commit és push

Paraméter: **$ARGUMENTS** (commit üzenet; ha üres, generálj egyet a változások alapján)

## 1. lépés: Aktuális állapot ellenőrzése

```bash
git status
git log --oneline -5
```

Jelezd a felhasználónak, hogy milyen fájlok változtak.

## 2. lépés: Pull first (konfliktus megelőzés)

```bash
git pull --rebase origin main
```

Ha konfliktus van:
- Listázd a konfliktusban lévő fájlokat
- Kérd a felhasználó döntését (merge vagy skip)
- NE oldd fel automatikusan, ha éles kód érintett

## 3. lépés: Stage és commit

```bash
git add -A
git commit -m "$ARGUMENTS"
```

Ha `$ARGUMENTS` üres, generálj üzenetet a változott fájlok alapján:
- Csak `.astro`, `.css`, `.js` változott → `style: layout és komponens frissítések`
- Csak tartalom (`.md`, szöveg) → `content: tartalom frissítés`
- Vegyes → `chore: vegyes fejlesztések`

## 4. lépés: Push

```bash
git push origin main
```

## 5. lépés: Visszajelzés

```
✅ Git sync kész!

Commit: $ARGUMENTS
Ag: main → origin/main

Cloudflare Pages build automatikusan elindul.
Ellenőrzés: /deploy-check
```

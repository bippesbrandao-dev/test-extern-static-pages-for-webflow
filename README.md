# Static Test App für Webflow Cloud

Reine HTML/CSS/JS-App ohne Build-Schritt. Testet, ob unter dem Mount-Path
alles korrekt geladen wird: eigene CSS- und JS-Datei, Bilder (JPG, PNG, WebP, SVG)
und eine JSON-Datei per `fetch`. Die Seite zeigt oben eine Selbstprüfung mit ✅ / ❌.

## Aufbau

```
webflow.json   → "framework": "static" (wird nicht veröffentlicht)
index.html
style.css
app.js
daten.json
bilder/        → berge.jpg, sonne.png, wald.webp, logo.svg
```

Alle Verweise sind relativ (`./style.css`). Weil Webflow die App ohne Schrägstrich am
Ende ausliefert (`/static-test`), steht in `index.html` ein `<base href="/static-test/">`.
**Ändert sich der Mount-Path, muss diese Zeile angepasst werden.**

## Deploy

1. Inhalt in ein eigenes GitHub-Repository pushen.
2. Webflow → Site Settings → Webflow Cloud → **New app** → Repository wählen.
3. Umgebung: Branch `main`, Mount-Path z. B. `/static-test`.
4. Deployen, danach die Site veröffentlichen.

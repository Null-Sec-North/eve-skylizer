# eve-skylizer static website

A framework-free, single-page static website for the Null Sec North continuation of skŸlizer.

## Files

- `index.html` — semantic page structure and content
- `styles.css` — desktop-first Null Sec North visual system
- `app.js` — preview tabs, sample-record filtering, active navigation, reveal effects, and copy command
- `assets/hero/` — responsive WebP hero artwork variants
- `assets/screenshots/` — responsive WebP application screenshot variants
- `assets/icons/` — independent SVG interface icons
- `assets/*.svg` — small vector identity and decorative graphics

## Display support

The design is intentionally desktop-only. It supports fluid layouts from a minimum viewport width of 1024 px through ultrawide and 4K displays. It does not include a mobile navigation or mobile-specific layout.

## Local preview

Use regular, non-elevated PowerShell 7:

```powershell
Set-Location 'D:\Downloads\eve-skylizer-static-site'
python -m http.server 8080
```

Then open `http://127.0.0.1:8080`.

## Deployment

Upload the contents of this directory to any static web host. No build step, package manager, external font, CDN, or runtime API is required.

All project links point to `https://github.com/Null-Sec-North/eve-skylizer` and its wiki, issues, discussions, security advisories, and license.

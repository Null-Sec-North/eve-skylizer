# skŸlizer project website

Production-ready static landing page for
[Null Sec North / eve-skylizer](https://github.com/Null-Sec-North/eve-skylizer).
The page presents the project’s scan-intelligence capabilities, workflow,
modernization direction, maintainership, and EVE Online attribution in one
consistent Null Sec North visual system.

## Design and branding

- Dark Null Sec North interface throughout; there are no unrelated white-theme
  sections.
- The `skŸlizer` wordmark always uses the two supplied orange brand tones:
  `#FA9348` and `#F8742B`.
- Null Sec North marks appear in the header and footer.
- EVE Online and Fenris Creations marks are displayed at restrained sizes in
  the attribution area.
- Decorative imagery is separated into optimized assets rather than delivered
  as a single page-sized graphic.

## Supported desktop layouts

The site is intentionally desktop-only and supports viewport widths from
**1024 px through 4K (3840 px)**. Viewports below 1024 px are outside the
supported layout contract.

| Viewport range | Layout behaviour |
| --- | --- |
| 1024–1100 px | Compact desktop navigation, tighter hero grid, and reduced spacing while retaining all content. |
| 1101–1250 px | Fluid two-column layout with compact spacing. |
| 1251–1919 px | Standard desktop presentation with continuously scaling gutters, type, artwork, cards, and section spacing. |
| 1920–2559 px | Expanded ultrawide presentation with larger interface details and content capacity. |
| 2560–3840 px | Centered 4K presentation capped at a 2200 px content shell to preserve readable line lengths and visual hierarchy. |

The layout uses CSS `clamp()`, fractional grids, bounded content widths, and
intrinsic sizing. It does not rely on browser zoom or fixed 1440 px geometry.
Decorative elements are clipped without introducing horizontal page overflow.

## Performance implementation

- All raster artwork and logos use compressed WebP files.
- Asset filenames are content-fingerprinted for immutable browser caching.
- The hero artwork is preloaded as the likely Largest Contentful Paint asset.
- Below-the-fold images use native lazy loading and asynchronous decoding.
- Every image declares intrinsic width and height to reserve layout space.
- System font stacks avoid remote font requests and font-swap layout shifts.
- Production CSS and JavaScript are minified by the build.
- No third-party JavaScript, remote stylesheets, or remote font services run on
  the page.
- Below-the-fold sections use `content-visibility` and intrinsic-size hints.

Run the deterministic production performance budget after building:

```bash
npm run build
npm run audit:performance
```

The audit checks compressed JavaScript and CSS budgets, raster formats and
sizes, lazy loading, image dimensions, LCP preload configuration, remote script
usage, and font downloads. Its PageSpeed and Core Web Vitals values are
predictions; production field data remains authoritative.

## Development

### Requirements

- Node.js 22.13 or newer
- Linux with `flock`, `curl`, and GNU `timeout`

### Commands

```bash
npm run install:ci
npm run dev
npm test
npm run audit:performance
```

`npm test` creates and validates the production artifact, checks the rendered
HTML, and verifies the responsive CSS contract.

## Ubuntu 24.04 hosting

The generated site is static. In production, NGINX should serve its HTML, CSS,
JavaScript, and images directly. Apache and PHP-FPM should remain available only
for application routes that genuinely require PHP; proxying this static page
through PHP-FPM adds unnecessary work.

Ready-to-adapt server examples are included:

- `deploy/nginx/skylizer-performance.inc`
- `deploy/apache/skylizer-performance.conf`
- `docs/performance-and-hosting.md`

The examples configure text compression, ETags, short-lived HTML, long-lived
immutable caching for fingerprinted assets, and conservative caching for other
static files.

## Project structure

```text
app/
  globals.css                  Responsive visual system and page styling
  layout.tsx                   Metadata and resource hints
  page.tsx                     Static landing-page content
public/assets/                 Optimized, fingerprinted WebP assets
deploy/                        NGINX and Apache production examples
docs/                          Hosting and performance documentation
scripts/audit-performance.mjs  Deterministic production performance budget
tests/                         Rendered HTML and responsive-layout checks
```

## Attribution

EVE Online and its associated marks are owned by Fenris Creations. skŸlizer is
an independent third-party application and is not affiliated with or endorsed
by Fenris Creations.

The linked skŸlizer application repository is licensed under GPL-3.0. Refer to
that repository’s `LICENSE` file for the authoritative license terms.

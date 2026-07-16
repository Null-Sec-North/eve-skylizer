# skŸlizer performance and Ubuntu hosting

## Production topology

For Ubuntu 24.04, serve this static landing page directly from NGINX. Keep
Apache and PHP-FPM for dynamic application routes that actually require PHP.
Avoid sending static HTML, CSS, JavaScript, fonts, or images through PHP-FPM or
an NGINX-to-Apache proxy hop.

If Apache is the public static server instead, use the supplied Apache
configuration as an alternative. Do not enable response compression at both
NGINX and Apache for the same response.

## NGINX

1. Deploy the built static files beneath `/var/www/skylizer/current`.
2. Include `deploy/nginx/skylizer-performance.inc` inside the existing TLS
   `server` block for `skylizer.null-sec-north.net`.
3. Validate and reload:

   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

NGINX provides browser caching, ETags, gzip text compression, precompressed
gzip support, immutable caching for fingerprinted files, and short-lived HTML.

## Apache alternative

Enable the modules required by `deploy/apache/skylizer-performance.conf`, then
include that file from the Apache virtual host:

```bash
sudo a2enmod expires headers deflate brotli
sudo apache2ctl configtest
sudo systemctl reload apache2
```

If `mod_brotli` is not installed, the configuration safely falls back to gzip
through `mod_deflate`.

## Implemented browser optimizations

- all photographic and logo assets use WebP;
- content-fingerprinted asset names permit one-year immutable caching;
- the hero artwork is preloaded as the likely LCP resource;
- below-fold imagery uses native lazy loading and asynchronous decoding;
- every image has explicit intrinsic dimensions to reserve layout space;
- system fonts eliminate font downloads and font-swap layout shifts;
- below-fold sections use `content-visibility` with intrinsic-size estimates;
- no third-party JavaScript, stylesheet, font, analytics, or image hosts;
- generated CSS and JavaScript are minified by the production build;
- module scripts are deferred by browser semantics;
- GitHub receives only a low-cost DNS-prefetch hint; there is no unnecessary
  preconnect to a non-render-critical origin.

## Validation

Run these commands after a production build:

```bash
npm run build
npm run audit:performance
```

The local audit is a deterministic performance-budget and transfer-size check.
Its PageSpeed and Web Vitals values are conservative predictions, not field
data. After the public production hostname is available, run PageSpeed Insights
against that hostname and evaluate the 75th percentile CrUX values when enough
traffic exists. FID is retained only as a legacy prediction; INP is the current
responsiveness Core Web Vital.

# Include this file inside the TLS server block for skylizer.null-sec-north.net.
# NGINX should serve this static site directly. Do not proxy these requests
# through Apache or PHP-FPM.

root /var/www/skylizer/current;
index index.html;

etag on;
sendfile on;
tcp_nopush on;

gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_min_length 1024;
gzip_types
    application/javascript
    application/json
    application/manifest+json
    application/wasm
    application/xml
    image/svg+xml
    text/css
    text/javascript
    text/plain
    text/xml;

# Serve precompressed .gz files when the deployment process creates them.
gzip_static on;

location = /index.html {
    add_header Cache-Control "public, max-age=0, must-revalidate" always;
}

location = /favicon.svg {
    add_header Cache-Control "public, max-age=604800" always;
    access_log off;
}

# Content-fingerprinted assets are safe to cache for one year. This recognizes
# both the dot + hex image names and Vite's hyphen + base64url bundle names.
location ~* (?:\.[0-9a-f]{8,64}|-[a-z0-9_-]{8,64})\.(?:avif|css|gif|ico|jpe?g|js|mjs|png|svg|webp|woff2?)$ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    access_log off;
}

# Conservative fallback for any future non-fingerprinted static files.
location ~* \.(?:avif|css|gif|ico|jpe?g|js|mjs|png|svg|webp|woff2?)$ {
    add_header Cache-Control "public, max-age=2592000" always;
    access_log off;
}

location / {
    try_files $uri $uri/ /index.html;
}

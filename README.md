# skŸlizer — The EVE Online Scan Analyzer and Structures Manager

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://choosealicense.com/licenses/gpl-3.0/)

skŸlizer is a web application for importing, analyzing, organizing, and sharing EVE Online moon scans, probe-scanner results, directional-scanner results, corporation structure data, and mining ledgers.

## Project Status and Stewardship

The original skŸlizer project was created and maintained by **Rtg Quack** under the GitHub account **chrRtg**. The original maintainer stopped actively developing the project after leaving EVE Online in 2023, and the upstream repository was later archived.

This repository continues the project under new stewardship:

- **Canonical repository:** [Null-Sec-North/eve-skylize](https://github.com/KPC-Consulting-Contracting/eve-skylize)
- **Current maintainer:** Solomon Iskander
- **Original upstream repository:** [chrRtg/eve-skylizer](https://github.com/chrRtg/eve-skylizer)

The project is undergoing dependency, security, ESI, database, and deployment modernization. Compatibility claims should be validated against the current default branch and release notes before production deployment.

For current project information, see the [Changelog](https://github.com/Null-Sec-North/eve-skylize/wiki/Changelog).

## Features

### Scan Import and Sharing

- Import scan results by copying them directly from the EVE Online client and pasting them into skŸlizer.
- Store and share scan findings with authorized users.
- Search by solar-system name or constellation with autocomplete support.
- Navigate between neighboring systems, constellations, and previously scanned moons.
- Filter and sort scan results by type, composition, quantity, and estimated ISK value.

### Moon Scans

- Display moon-material composition, quantity, and estimated ISK value.
- Display the composition, quantity, and estimated ISK value of refined materials.
- Filter results by moon material or refined mineral.
- Sort moons by estimated value to identify high-value extraction targets.
- Retrieve current market-price data through EVE Swagger Interface (ESI) endpoints.
- Export moon-scan information as CSV when the user has the required application permission.

![skŸlizer moon-scan view](https://raw.githubusercontent.com/wiki/Null-Sec-North/eve-skylize/img/skylizer_moon.png)

### Structure Scans and Directional Scanner Results

- Import directional-scanner results by copying and pasting them from the EVE Online client.
- Identify Upwell structures, engineering complexes, refineries, control towers, and related objects.
- Associate refinery records with known moon-scan data.
- Record structure positions relative to planets, moons, stations, and stargates, including distance information when available.
- Detect and store player-assigned structure names.
- Maintain ownership, naming, notes, and other structure metadata.
- Reconcile refinery records when a structure type or name changes.

### Anomaly and Probe-Scanner Results

- Import probe-scanner results by copying and pasting them from the EVE Online client.
- Group results by anomaly or signature type.
- Update stored results as newer scans are submitted.
- Link to English- and German-language anomaly reference material.
- Record wormhole destinations by solar-system name or space classification, including high security, low security, null security, and wormhole space.
- Filter results by gas, ore, exploration, combat, faction, wormhole, and structure categories.

![skŸlizer probe-scan view](https://raw.githubusercontent.com/wiki/Null-Sec-North/eve-skylize/img/skylizer_scan.png)

### Mining Ledgers and Structure Management

- Import and visualize corporation mining-ledger data.
- Display extraction efficiency and related ledger metrics.
- Track structure timers, fuel deadlines, extraction events, and inactive drills.
- Associate structures, owning corporations, structure names, and operational notes with moons.

## Basic Use

1. Perform a moon scan, probe scan, or directional scan in EVE Online.
2. Use the EVE Online client option to copy the scan results to the clipboard.
3. Paste the copied data into the appropriate skŸlizer import form.
4. Submit the scan.
5. Review, filter, sort, annotate, and share the imported results according to your permissions.

## Public Demo

**TBD**

## Installation and Updates

Installation, application-update, data-update, and release information is maintained in the project wiki:

- [Changelog](https://github.com/Null-Sec-North/eve-skylize/wiki/Changelog)
- [Update the data](https://github.com/Null-Sec-North/eve-skylize/wiki/Update-Data)
- [Update the application](https://github.com/Null-Sec-North/eve-skylize/wiki/Update-Application)
- [How to install](https://github.com/Null-Sec-North/eve-skylize/wiki/Install)

The wiki content may require further revision as the modernization work proceeds.

## Current Modernization Baseline

The following versions represent the current modernization target as of July 2026. They do not, by themselves, guarantee that every legacy code path has already been migrated or tested.

- **PHP:** PHP 8.4 or PHP 8.5, using a currently supported patch release
- **Database:** MariaDB 12.3 LTS; MariaDB 11.4 LTS may be retained temporarily where compatibility testing requires it
- **Dependency management:** Current Composer 2.x stable release
- **Required PHP extensions:** `curl`, `gd`, `intl`, `json`, `mbstring`, `openssl`, `pdo`, `pdo_mysql`, and `xml`
- **Web server:** A currently supported Apache HTTP Server 2.4 release or a current NGINX stable release
- **EVE API:** Current ESI endpoints and OpenAPI 3.x specifications, including compatibility-date handling where required
- **Authentication:** Current EVE Single Sign-On using OAuth 2.0

Refer to the official [PHP supported-versions table](https://www.php.net/supported-versions.php), [MariaDB release notes](https://mariadb.com/docs/release-notes/community-server), and [EVE Developer Documentation](https://developers.eveonline.com/docs/services/esi/overview/) when selecting production versions.

## Framework and Developer Capabilities

skŸlizer provides a foundation for developing EVE Online administrative and intelligence tools, including:

- ESI integration based on the current OpenAPI specifications rather than the retired Swagger 2.0 specification.
- EVE Single Sign-On as the identity provider.
- Access rules based on EVE Online characters, corporations, application roles, and public-access settings.
- Character-specific allow and deny controls.
- Granular role, permission, and authorization management.
- Administrative interfaces for users, roles, and permissions.
- Support for assigning one or more application administrators.
- Laminas components as the maintained continuation of Zend Framework packages.

The historical implementation was built with [Zend Framework 3](https://github.com/zendframework/zendframework) and was based in part on the [Role Demo sample by Oleg Krivtsov](https://github.com/olegkrivtsov/using-zf3-book-samples/tree/master/roledemo). Zend Framework is no longer maintained. [Laminas MVC](https://docs.laminas.dev/laminas-mvc/) is currently in security-only maintenance, so future architectural work should evaluate maintained Laminas components and [Mezzio](https://docs.mezzio.dev/) where an application-level migration is justified.

## Contributing

Contributions are welcome. Before opening an issue or pull request:

1. Search the existing [issues](https://github.com/Null-Sec-North/eve-skylize/issues) and [discussions](https://github.com/Null-Sec-North/eve-skylize/discussions).
2. Use the appropriate issue form for reproducible defects, feature proposals, or documentation corrections.
3. Do not include access tokens, ESI refresh tokens, credentials, private corporation data, database dumps, or other sensitive information in public submissions.
4. Keep changes focused and document any database migration, configuration, dependency, or compatibility impact.
5. Include tests or repeatable validation steps when practical.

Project-maintenance inquiries may be directed to **Solomon Iskander** through the repository's Issues or Discussions sections.

## Security

Do not report security vulnerabilities through a public issue. Use the repository's [private security-advisory form](https://github.com/Null-Sec-North/eve-skylize/security/advisories/new) when available.

Before submitting logs or configuration excerpts, remove EVE SSO secrets, OAuth tokens, ESI tokens, database credentials, personally identifying information, corporation-sensitive information, hostnames, and internal network details that should not be public.

## License

This project is provided under the [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/). See the repository's `LICENSE` file for the full license text.

## Acknowledgments, Attribution, and Credits

The project retains the original author's acknowledgments and extends them for the maintained continuation:

- **Rtg Quack / chrRtg**, original creator and maintainer of skŸlizer.
- The contributors of [Laminas, the open-source continuation of Zend Framework](https://getlaminas.org).
- Oleg Krivtsov for [Using Zend Framework 3](https://github.com/olegkrivtsov/using-zend-framework-3-book). Thank you, Oleg, and respect for the substantial effort invested in that work.
- **OG**, for teaching the original maintainer Doctrine 2 and related development practices.
- [EVELabs](https://github.com/EvELabs/oauth2-eveonline) for the historical EVE Online OAuth library.
- [SeAT](https://github.com/eveseat/eseye) for the historical ESI interface.
- [xell network seven](http://evemaps.dotlan.net/corp/xell_network_seven) and [V.e.G.A.](http://evemaps.dotlan.net/alliance/V.e.G.A.), with whom the original maintainer proudly flew for many years.

Historical project resources retained for reference:

- [Original upstream repository](https://github.com/chrRtg/eve-skylizer)
- [Previous public demo location - no longer available](https://skylizer.eve-tools.info)

## Trademark Notice

EVE Online and all associated logos and designs are the intellectual property of CCP hf. This project is a third-party application and is not affiliated with or endorsed by CCP hf.

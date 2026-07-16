/* Logo files are served directly to preserve their supplied transparency. */
/* eslint-disable @next/next/no-img-element */

const repositoryUrl = "https://github.com/Null-Sec-North/eve-skylizer";

export const dynamic = "force-static";

function ProductName({ className = "" }: { className?: string }) {
  return (
    <span className={`product-name ${className}`.trim()}>
      sk<span>Ÿ</span>lizer
    </span>
  );
}

const capabilities = [
  {
    index: "01",
    label: "Moon intelligence",
    title: "See what every moon is worth.",
    description:
      "Turn pasted moon scans into sortable material profiles, refined outputs, and estimated ISK value backed by current ESI market data.",
    tags: ["Composition", "Valuation", "CSV export"],
    tone: "cyan",
  },
  {
    index: "02",
    label: "Signal coverage",
    title: "Make sense of crowded scan results.",
    description:
      "Organize probe and directional scans by signature, anomaly, structure, system, constellation, and wormhole destination.",
    tags: ["Probe scanner", "D-scan", "Wormholes"],
    tone: "violet",
  },
  {
    index: "03",
    label: "Structure operations",
    title: "Keep infrastructure in view.",
    description:
      "Connect structures to moons, ownership, timers, fuel deadlines, extraction events, drill status, and corporation mining-ledger data.",
    tags: ["Timers", "Fuel", "Ledgers"],
    tone: "magenta",
  },
];

const workflow = [
  { number: "01", title: "Copy", text: "Copy scan results directly from the EVE Online client." },
  { number: "02", title: "Paste", text: <>Submit the data through the matching <ProductName /> import form.</> },
  { number: "03", title: "Analyze", text: "Filter, sort, value, annotate, and compare the result." },
  { number: "04", title: "Coordinate", text: "Share operational intelligence with authorized users." },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.4a9.6 9.6 0 0 0-3.04 18.71c.48.09.66-.2.66-.46v-1.68c-2.69.58-3.25-1.14-3.25-1.14-.44-1.12-1.08-1.42-1.08-1.42-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .87 1.48 2.27 1.05 2.83.8.09-.63.34-1.05.61-1.3-2.14-.24-4.4-1.07-4.4-4.75 0-1.05.37-1.9 1-2.58-.1-.24-.43-1.22.09-2.55 0 0 .81-.26 2.64.98a9.2 9.2 0 0 1 4.8 0c1.83-1.24 2.64-.98 2.64-.98.52 1.33.19 2.31.09 2.55.62.68 1 1.53 1 2.58 0 3.69-2.26 4.5-4.41 4.74.35.3.65.88.65 1.78v2.64c0 .26.18.56.66.46A9.6 9.6 0 0 0 12 2.4Z" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-orbit brand-orbit-a" />
      <span className="brand-orbit brand-orbit-b" />
      <span className="brand-core" />
    </span>
  );
}

function ScanPanel() {
  return (
    <div className="scan-panel" aria-label="Illustrative moon scan interface">
      <div className="scan-panel-topline">
        <div>
          <span className="panel-kicker">Sample intelligence</span>
          <strong>Moon composition</strong>
        </div>
        <span className="live-pill"><i /> ESI connected</span>
      </div>

      <div className="system-line">
        <div>
          <span>System</span>
          <strong>NSN // SAMPLE GRID</strong>
        </div>
        <div className="scan-id">SCAN 04-118</div>
      </div>

      <div className="scan-metrics">
        <div><span>Targets</span><strong>24</strong></div>
        <div><span>Est. value</span><strong>18.7B <small>ISK</small></strong></div>
        <div><span>Confidence</span><strong>98.4%</strong></div>
      </div>

      <div className="material-list">
        <div className="material-row material-head">
          <span>Class</span><span>Yield</span><span>Value index</span><span>Status</span>
        </div>
        <div className="material-row">
          <span><i className="material-dot dot-cyan" /> R64 material</span>
          <span>37.8%</span>
          <span><b className="bar"><i style={{ width: "88%" }} /></b></span>
          <span className="status-priority">Priority</span>
        </div>
        <div className="material-row">
          <span><i className="material-dot dot-violet" /> R32 material</span>
          <span>29.4%</span>
          <span><b className="bar"><i style={{ width: "64%" }} /></b></span>
          <span>Mapped</span>
        </div>
        <div className="material-row">
          <span><i className="material-dot dot-magenta" /> R16 material</span>
          <span>20.1%</span>
          <span><b className="bar"><i style={{ width: "42%" }} /></b></span>
          <span>Mapped</span>
        </div>
      </div>

      <div className="panel-footnote">
        <span>Illustrative sample data</span>
        <span className="mini-wave" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <header className="site-header page-shell">
          <a className="brand" href="#top" aria-label="skŸlizer home">
            <BrandMark />
            <ProductName className="brand-name" />
            <span className="brand-divider" />
            <span className="steward-lockup">
              <span className="brand-steward">Null Sec North</span>
              <img
                className="nsn-logo nsn-logo-header"
                src="/assets/null-sec-north-logo.48bcea5cd571.webp"
                alt=""
                width={34}
                height={34}
                decoding="async"
              />
            </span>
          </a>

          <nav aria-label="Primary navigation">
            <a href="#capabilities">Capabilities</a>
            <a href="#workflow">Workflow</a>
            <a href="#baseline">Modernization</a>
            <a className="nav-source" href={repositoryUrl} target="_blank" rel="noreferrer">
              <GithubIcon /> Source
            </a>
          </nav>
        </header>

        <div className="hero-content page-shell">
          <div className="hero-copy">
            <div className="eyebrow"><span /> EVE Online scan intelligence</div>
            <h1>Turn raw scans into <em>operational intelligence.</em></h1>
            <p>
              Import, analyze, organize, and share moon scans, probe results,
              directional scans, structures, and mining ledgers—without losing
              the signal in the noise.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={repositoryUrl} target="_blank" rel="noreferrer">
                Explore the project <ArrowIcon />
              </a>
              <a className="text-link" href="#capabilities">View capabilities <span>↓</span></a>
            </div>
            <div className="hero-proof" aria-label="Project highlights">
              <div><strong>01</strong><span>Unified scan<br />workspace</span></div>
              <div><strong>ESI</strong><span>Market-aware<br />valuation</span></div>
              <div><strong>GPL</strong><span>Open-source<br />stewardship</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="planet-image" aria-hidden="true" />
            <div className="coordinate coordinate-a" aria-hidden="true">03° 41&apos; 18.6&quot;</div>
            <div className="coordinate coordinate-b" aria-hidden="true">RANGE // 18.4 AU</div>
            <ScanPanel />
          </div>
        </div>

        <div className="hero-rail" aria-hidden="true">
          <span>SKY // 04</span><i /><span>INTELLIGENCE LAYER</span><i />
          <span>NULL-SEC-NORTH.NET</span>
        </div>
      </section>

      <section className="capabilities section" id="capabilities">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <span className="section-index">01 / CAPABILITIES</span>
              <h2>One operational picture.<br /><em>Every scan that matters.</em></h2>
            </div>
            <p>
              <ProductName /> replaces scattered clipboard exports with a searchable,
              structured intelligence layer for corporations and alliances.
            </p>
          </div>

          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className={`capability-card tone-${item.tone}`} key={item.index}>
                <div className="card-topline"><span>{item.index}</span><i /></div>
                <div className="capability-symbol" aria-hidden="true"><i /><i /><i /></div>
                <span className="capability-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tag-list">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workflow section" id="workflow">
        <div className="workflow-image" aria-hidden="true">
          <img
            src="/assets/skylizer-scan-field.9c2c8ff141c8.webp"
            alt=""
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
        <div className="workflow-wash" aria-hidden="true" />
        <div className="page-shell workflow-layout">
          <div className="workflow-copy">
            <span className="section-index">02 / WORKFLOW</span>
            <h2>From client clipboard<br />to <em>shared context.</em></h2>
            <p>
              The fastest path from a fresh scan to a decision stays simple by
              design. <ProductName /> handles the structure after you paste the data.
            </p>
            <a className="text-link light" href={`${repositoryUrl}#basic-use`} target="_blank" rel="noreferrer">
              Read the basic-use guide <ArrowIcon />
            </a>
          </div>

          <div className="workflow-steps">
            {workflow.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="baseline section" id="baseline">
        <div className="page-shell baseline-grid">
          <div className="baseline-copy">
            <span className="section-index">03 / MODERNIZATION</span>
            <h2>A legacy tool,<br /><em>rebuilt for what comes next.</em></h2>
            <p>
              Continued under Null Sec North stewardship, <ProductName /> is being
              modernized across security, dependencies, ESI, database, and
              deployment—while preserving the operational workflows that made
              the original project useful.
            </p>
            <div className="stewardship">
              <BrandMark />
              <div><span>Current maintainer</span><strong>Solomon Iskander</strong></div>
            </div>
          </div>

          <div className="baseline-panel">
            <div className="baseline-head">
              <div><span>Modernization target</span><strong>July 2026 baseline</strong></div>
              <span className="progress-pill"><i /> In progress</span>
            </div>
            <div className="baseline-list">
              <div><span>Runtime</span><strong>PHP 8.4 / 8.5</strong><i>01</i></div>
              <div><span>Database</span><strong>MariaDB 12.3 LTS</strong><i>02</i></div>
              <div><span>Identity</span><strong>EVE SSO · OAuth 2.0</strong><i>03</i></div>
              <div><span>Data interface</span><strong>Current ESI · OpenAPI 3.x</strong><i>04</i></div>
            </div>
            <p className="baseline-note">
              Target versions are a modernization direction, not a blanket
              compatibility claim. Validate the current branch and release notes
              before production deployment.
            </p>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="closing-orbit" aria-hidden="true"><i /><i /></div>
        <div className="page-shell closing-inner">
          <span className="section-index">OPEN-SOURCE EVE INTELLIGENCE</span>
          <h2>Map more. Miss less.</h2>
          <p>Review the source, follow the modernization, or help shape the next release.</p>
          <a className="button button-branded" href={repositoryUrl} target="_blank" rel="noreferrer">
            View Null Sec North / <ProductName /> <ArrowIcon />
          </a>
        </div>
      </section>

      <footer>
        <div className="page-shell footer-brand-row">
          <div className="game-marks" aria-label="EVE Online by Fenris Creations">
            <img
              className="eve-logo"
              src="/assets/eve-online-logo-white.8197ba130988.webp"
              alt="EVE Online"
              width={135}
              height={52}
              loading="lazy"
              decoding="async"
            />
            <span className="marks-divider" aria-hidden="true" />
            <span className="fenris-logo-plate">
              <img
                className="fenris-logo"
                src="/assets/fenris-creations-logo-white.ce01379142f8.webp"
                alt="Fenris Creations"
                width={169}
                height={44}
                loading="lazy"
                decoding="async"
              />
            </span>
          </div>
          <p className="ownership-note">
            EVE Online and its associated marks are owned by Fenris Creations.
            <ProductName /> is an independent third-party application and is not
            affiliated with or endorsed by Fenris Creations.
          </p>
        </div>

        <div className="footer-rule" />

        <div className="page-shell footer-inner">
          <a className="brand" href="#top" aria-label="Back to top">
            <BrandMark /><ProductName className="brand-name" />
          </a>
          <span className="footer-steward-lockup">
            <span className="footer-steward">Maintained by Null Sec North</span>
            <img
              className="nsn-logo nsn-logo-footer"
              src="/assets/null-sec-north-logo.48bcea5cd571.webp"
              alt=""
              width={28}
              height={28}
              loading="lazy"
              decoding="async"
            />
          </span>
          <div className="footer-links">
            <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">Issues</a>
            <a href={`${repositoryUrl}/discussions`} target="_blank" rel="noreferrer">Discussions</a>
            <a href={`${repositoryUrl}/blob/master/LICENSE`} target="_blank" rel="noreferrer">GPL-3.0</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

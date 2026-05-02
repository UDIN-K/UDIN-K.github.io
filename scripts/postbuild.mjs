import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const baseHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(baseHtmlPath)) {
  console.error(`[postbuild] Missing ${baseHtmlPath}. Run \"vite build\" first.`);
  process.exit(1);
}

const siteOrigin = (process.env.SITE_ORIGIN || 'https://udink.me').replace(/\/$/, '');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const routes = [
  '/koma',
  '/koma/guide',
  '/koma/troubleshooting',
  '/koma/changelog',
  '/koma/explorer',
  '/koma/docs/contribute',
  '/koma/docs/guides/getting-started',
  '/projects',
  '/experience',
  '/play',
  '/scripting',
  '/labs',
  '/certificates',
  '/ide',
  '/contact',
];

const routeMeta = {
  '/koma': {
    title: 'Koma Manga Reader (Android) — UDINK',
    description:
      'Download Koma — a free, open-source manga reader for Android by UDINK. Tachiyomi/Mihon-compatible, with extensions and local reading.',
  },
  '/koma/guide': {
    title: 'Koma Installation Guide — UDINK',
    description: 'Step-by-step guide to set up Koma on Android and add the extension repository in Koma, Mihon, or Tachiyomi forks.',
  },
  '/koma/troubleshooting': {
    title: 'Koma Troubleshooting — UDINK',
    description: 'Fix common issues in Koma, Mihon, and Tachiyomi forks: WebView/Cloudflare, obsolete extensions, images not loading, and install errors.',
  },
  '/koma/changelog': {
    title: 'Koma Changelog — UDINK',
    description: 'Release notes and recent updates for Koma Manga Reader.',
  },
  '/koma/explorer': {
    title: 'Koma Extensions Explorer — UDINK',
    description: 'Browse and search Koma extensions. Download APKs or use the repository link.',
  },
  '/koma/docs/contribute': {
    title: 'Contribute — Koma Docs — UDINK',
    description: 'Learn how to contribute to Koma: code, translations, and the website.',
  },
  '/koma/docs/guides/getting-started': {
    title: 'Koma Getting Started Guide — UDINK',
    description: 'Essential information to help you get set up with Koma.',
  },
  '/projects': {
    title: 'Projects & Open-Source Portfolio — UDINK',
    description: 'Browse UDINK’s open-source projects, experiments, and repositories.',
  },
  '/experience': {
    title: 'Experience Timeline — UDINK',
    description: 'Interactive timeline of systems, backend, and infrastructure work by UDINK.',
  },
  '/play': {
    title: 'Neural Playground (Three.js) — UDINK',
    description: 'Real-time Three.js sandbox exploring rendering, physics movement, and AABB collisions.',
  },
  '/scripting': {
    title: 'Scripting & Luau Experiments — UDINK',
    description: 'Luau scripting patterns, Roblox architecture, and performance-focused modules by UDINK.',
  },
  '/labs': {
    title: 'Experimental Labs — UDINK',
    description: 'Experimental modules and interactive demos: UDIN IDE, Neural Vision, Kernel Stats, and more.',
  },
  '/certificates': {
    title: 'Certificates & Credentials — UDINK',
    description: 'Certification vault with issuers, dates, and verification links.',
  },
  '/ide': {
    title: 'UDIN IDE — Online Code Workspace — UDINK',
    description: 'Browser-based coding playground built around a Monaco editor experience.',
  },
  '/contact': {
    title: 'Contact — UDINK',
    description: 'Send a message to UDINK via the secure contact channel.',
  },
};

function withCanonical(html, canonicalUrl) {
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  const ogUrlTag = `<meta property="og:url" content="${canonicalUrl}" />`;

  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>(\s*)/i, `${canonicalTag}$1`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>(\s*)/i, `${ogUrlTag}$1`);

  return html;
}

function withTitleAndDescription(html, title, description) {
  if (title) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
    html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>(\s*)/i, `<meta property="og:title" content="${title}" />$1`);
    html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>(\s*)/i, `<meta name="twitter:title" content="${title}" />$1`);
  }

  if (description) {
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>(\s*)/i, `<meta name="description" content="${description}" />$1`);
    html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>(\s*)/i, `<meta property="og:description" content="${description}" />$1`);
    html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>(\s*)/i, `<meta name="twitter:description" content="${description}" />$1`);
  }

  return html;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function routeToOutPath(route) {
  const routePath = route.replace(/^\//, '');
  return path.join(distDir, routePath, 'index.html');
}

function writeRouteHtml(route) {
  const canonicalUrl = new URL(route, `${siteOrigin}/`).toString();
  const outPath = routeToOutPath(route);
  ensureDir(path.dirname(outPath));

  const meta = routeMeta[route];
  let html = baseHtml;

  html = withCanonical(html, canonicalUrl);
  if (meta) {
    html = withTitleAndDescription(html, meta.title, meta.description);
  }

  fs.writeFileSync(outPath, html, 'utf8');
}

// Keep the existing SPA fallback behavior
fs.copyFileSync(baseHtmlPath, path.join(distDir, '404.html'));

for (const route of routes) {
  writeRouteHtml(route);
}

console.log(`[postbuild] Wrote ${routes.length} route HTML files with canonical URLs.`);

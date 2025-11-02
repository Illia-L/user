import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// --- Color helpers ---
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const hexToRgb = (hex) => {
  const s = hex.replace('#', '');
  const v = parseInt(s.length === 3 ? s.split('').map(c => c + c).join('') : s, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
};
const rgbToHex = ({ r, g, b }) => `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`.toLowerCase();
const rgbToHsl = ({ r, g, b }) => {
  const R = r/255, G = g/255, B = b/255;
  const max = Math.max(R,G,B), min = Math.min(R,G,B);
  let h=0, s=0; const l = (max+min)/2;
  const d = max-min;
  if (d !== 0) {
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch (max) {
      case R: h = (G-B)/d + (G < B ? 6 : 0); break;
      case G: h = (B-R)/d + 2; break;
      default: h = (R-G)/d + 4;
    }
    h /= 6;
  }
  return { h: h*360, s: s*100, l: l*100 };
};
const hslToRgb = ({ h, s, l }) => {
  h/=360; s/=100; l/=100;
  if (s === 0) { const v = Math.round(l*255); return { r:v, g:v, b:v }; }
  const hue2rgb = (p,q,t) => { if(t<0) t+=1; if(t>1) t-=1; if(t<1/6) return p+(q-p)*6*t; if(t<1/2) return q; if(t<2/3) return p+(q-p)*(2/3 - t)*6; return p; };
  const q = l < 0.5 ? l*(1+s) : l + s - l*s; const p = 2*l - q;
  const r = hue2rgb(p,q,h+1/3), g = hue2rgb(p,q,h), b = hue2rgb(p,q,h-1/3);
  return { r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255) };
};
const adjustHsl = (hex, { h=0, s=0, l=0 }) => {
  const { h:hh, s:ss, l:ll } = rgbToHsl(hexToRgb(hex));
  const nh = ((hh + h) % 360 + 360) % 360;
  const ns = clamp(ss + s, 0, 100);
  const nl = clamp(ll + l, 0, 100);
  return rgbToHex(hslToRgb({ h: nh, s: ns, l: nl }));
};
const scaleLightness = (hex, factor) => {
  const hsl = rgbToHsl(hexToRgb(hex));
  return rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: clamp(hsl.l*factor, 0, 100) }));
};

// --- Contrast helpers ---
const srgbToLin = (c) => { c/=255; return c<=0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
const relLum = (hex) => { const {r,g,b}=hexToRgb(hex); return 0.2126*srgbToLin(r)+0.7152*srgbToLin(g)+0.0722*srgbToLin(b); };
const contrast = (a,b) => { const L1=relLum(a), L2=relLum(b); const [hi,lo]=L1>L2?[L1,L2]:[L2,L1]; return (hi+0.05)/(lo+0.05); };
const pickOnColor = (bg, light = '#ffffff', dark = '#111827', min = 4.5) => {
  const cLight = contrast(light, bg);
  const cDark = contrast(dark, bg);
  const best = cLight >= cDark ? light : dark;
  return contrast(best, bg) >= min ? best : (cLight >= min ? light : dark);
};

// --- IO ---
const readTokens = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

// --- Derivation ---
function compute(colors) {
  const entries = colors.entries;
  const cst = colors.constants;
  const brand = (entries.brand || '#3b82f6').toLowerCase();

  const secondary = adjustHsl(brand, { h: +150, s: -10, l: 0 });
  const accent = adjustHsl(brand, { h: -90, s: 0, l: 0 });

  const primaryHover = scaleLightness(brand, 0.88);
  const primaryActive = scaleLightness(brand, 0.80);
  const secondaryHover = scaleLightness(secondary, 0.90);
  const secondaryActive = scaleLightness(secondary, 0.80);
  const accentHover = scaleLightness(accent, 0.90);
  const accentActive = scaleLightness(accent, 0.80);

  const onPrimary = pickOnColor(brand, '#ffffff', cst.text, 4.5);
  const onSecondary = pickOnColor(secondary, '#ffffff', cst.text, 4.5);
  const onAccent = pickOnColor(accent, '#ffffff', cst.text, 4.5);

  const link = brand;
  const linkHover = primaryHover;
  const linkActive = primaryActive;
  const linkVisited = adjustHsl(brand, { h: -35, l: -8 });

  const outlineBorder = cst.border;
  const outlineBorderHover = scaleLightness(outlineBorder, 0.92);
  const outlineBorderActive = scaleLightness(outlineBorder, 0.85);
  const disabledBorder = scaleLightness(outlineBorder, 1.06);

  let focusRing = adjustHsl(brand, { l: +25 });
  if (contrast(focusRing, cst.bg) < 3) focusRing = adjustHsl(brand, { l: +35 });
  if (contrast(focusRing, cst.bg) < 3) focusRing = pickOnColor(cst.bg, brand, '#000000', 3);

  return {
    primary: brand, secondary, accent,
    primaryHover, primaryActive, secondaryHover, secondaryActive, accentHover, accentActive,
    onPrimary, onSecondary, onAccent,
    link, linkHover, linkActive, linkVisited,
    outlineBorder, outlineBorderHover, outlineBorderActive, disabledBorder,
    focusRing
  };
}

function buildCss(config) {
  const { entries, constants } = config.colors;
  const d = compute(config.colors);

  const lines = [];
  lines.push(':root {');
  lines.push(`  --color-brand: ${entries.brand};`);
  for (const [k, v] of Object.entries(constants)) {
    lines.push(`  --color-${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v};`);
  }
  lines.push(`  --color-primary: ${d.primary};`);
  lines.push(`  --color-secondary: ${d.secondary};`);
  lines.push(`  --color-accent: ${d.accent};`);
  lines.push(`  --color-primary-hover: ${d.primaryHover};`);
  lines.push(`  --color-primary-active: ${d.primaryActive};`);
  lines.push(`  --color-secondary-hover: ${d.secondaryHover};`);
  lines.push(`  --color-secondary-active: ${d.secondaryActive};`);
  lines.push(`  --color-accent-hover: ${d.accentHover};`);
  lines.push(`  --color-accent-active: ${d.accentActive};`);
  lines.push(`  --color-on-primary: ${d.onPrimary};`);
  lines.push(`  --color-on-secondary: ${d.onSecondary};`);
  lines.push(`  --color-on-accent: ${d.onAccent};`);
  lines.push(`  --color-link: ${d.link};`);
  lines.push(`  --color-link-hover: ${d.linkHover};`);
  lines.push(`  --color-link-active: ${d.linkActive};`);
  lines.push(`  --color-link-visited: ${d.linkVisited};`);
  lines.push(`  --color-outline-border: ${d.outlineBorder};`);
  lines.push(`  --color-outline-border-hover: ${d.outlineBorderHover};`);
  lines.push(`  --color-outline-border-active: ${d.outlineBorderActive};`);
  lines.push(`  --color-disabled-border: ${d.disabledBorder};`);
  lines.push(`  --color-focus-ring: ${d.focusRing};`);
  lines.push('}');

  return lines.join('\n');
}

function main() {
  const tokensPath = path.resolve(process.cwd(), './tokens.json');
  const outPath = path.resolve(process.cwd(), './src/css/colors.css');
  const tokens = readTokens(tokensPath);
  const css = buildCss(tokens.config);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, css + '\n', 'utf8');
  console.log(`✓ Wrote ${outPath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { main(); } catch (err) { console.error('✖ Error:', err.message); process.exit(1); }
}

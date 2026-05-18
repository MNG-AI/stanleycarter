/**
 * media.js — Portfolio media config
 *
 * HOW TO UPDATE
 * -------------
 * 1. Rename files to remove spaces (see the "rename from" notes below)
 * 2. Drop renamed files into your assets/ folder
 * 3. Redeploy: drag the whole site folder onto Netlify Drop, or push to Git
 *
 * TYPES
 *   video  → MP4 player         (requires: src)
 *   image  → single image       (requires: src, optional: alt)
 *   grid   → responsive grid    (requires: images: [{src, alt}])
 *              2 images = 2 columns, 3 images = 3 columns
 *   loom   → Loom embed iframe  (requires: src — Loom embed URL)
 */

const PORTFOLIO_MEDIA = {

  /* ── TILE 1: Amplience Photo Audit ──────────────────────────────────────
     rename: "Windows PowerShell - 11 May 2026.mp4" → amplience-audit-demo.mp4  */
  't1-demo': {
    type: 'video',
    src:  'assets/amplience-audit-demo.mp4',
  },

  /* ── TILE 1: Excel output ────────────────────────────────────────────────
     rename: "Excel - QA Brand Report - Excel - 11 May 2026.mp4" → amplience-excel-output.mp4  */
  't1-excel': {
    type: 'video',
    src:  'assets/amplience-excel-output.mp4',
  },

  /* ── TILE 2: Governance before/after ─────────────────────────────────────
     rename:
       "Chatgpt no govern.png"       → chatgpt-no-governance.png
       "chatgpt with govern.png"     → chatgpt-with-governance.png
       "claude with governance.png"  → claude-with-governance.png          */
  't2-comparison': {
    type: 'grid',
    images: [
      { src: 'assets/chatgpt-no-governance.png',   alt: 'ChatGPT output without governance' },
      { src: 'assets/chatgpt-with-governance.png', alt: 'ChatGPT output with governance applied' },
      { src: 'assets/claude-with-governance.png',  alt: 'Claude output with governance applied' },
    ],
  },

  /* ── TILE 3: Brand copy examples ─────────────────────────────────────────
     rename:
       "Brand copy .png"        → brand-copy-top.png
       "bottom Brand copy.png"  → brand-copy-bottom.png                    */
  't3-copy': {
    type: 'grid',
    images: [
      { src: 'assets/brand-copy-top.png',    alt: 'Brand SEO copy — top of page' },
      { src: 'assets/brand-copy-bottom.png', alt: 'Brand SEO copy — bottom of page' },
    ],
  },

  /* ── TILE 3: GA4 tracking spreadsheet ───────────────────────────────────
     rename: "GA4 data.png" → ga4-tracking.png                             */
  't3-tracking': {
    type: 'image',
    src:  'assets/ga4-tracking.png',
    alt:  'GA4 tracking spreadsheet for brand and PLP pages',
  },

  /* ── TILE 4: Brand Page QA Tool ─────────────────────────────────────────
     rename: your second PowerShell recording → brand-qa-demo.mp4          */
  't4-demo': {
    type: 'video',
    src:  'assets/brand-qa-demo.mp4',
  },

};


/* ── Injector — do not edit below unless adding a new media type ─────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.media-slot').forEach(slot => {
    const id    = slot.dataset.slot;
    const media = PORTFOLIO_MEDIA[id];
    if (!media) return;

    let html = '';

    if (media.type === 'video') {
      html = `
        <div class="media">
          <video controls playsinline style="width:100%;border-radius:var(--radius-sm);display:block">
            <source src="${media.src}" type="video/mp4">
            Your browser does not support the video element.
          </video>
        </div>`;

    } else if (media.type === 'loom') {
      html = `
        <div class="media">
          <div class="loom">
            <iframe src="${media.src}" allowfullscreen></iframe>
          </div>
        </div>`;

    } else if (media.type === 'image') {
      html = `
        <div class="media">
          <img src="${media.src}" alt="${media.alt || ''}">
        </div>`;

    } else if (media.type === 'grid') {
      const count = (media.images || []).length;
      const cols  = count >= 3 ? 'repeat(3,1fr)' : 'repeat(2,1fr)';
      const imgs  = (media.images || [])
        .map(i => `<img src="${i.src}" alt="${i.alt || ''}" style="width:100%;height:auto;border-radius:var(--radius-sm)">`)
        .join('\n');
      html = `<div style="display:grid;grid-template-columns:${cols};gap:.875rem;margin:1rem 0">${imgs}</div>`;
    }

    slot.outerHTML = html;
  });
});

// One-off: tag layout-critical inline styles with responsive utility classes (see app/responsive.css).
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.jsx') ? [p] : [];
  });
}

const COLS = {
  '248px 1fr': 'r-shell',
  '1fr 288px': 'r-exam',
  '1.05fr .95fr': 'r-hero',
  '1.6fr 1fr 1fr 1fr': 'r-footer',
  'repeat(4,1fr)': 'r-4col',
  'repeat(3,1fr)': 'r-3col',
  '1fr 1fr': 'r-2col',
  '1.4fr 1fr': 'r-2col',
  '1.5fr 1fr': 'r-2col',
};

let changed = 0;
for (const file of walk(path.join(root, 'components'))) {
  let src = fs.readFileSync(file, 'utf8');
  let out = '';
  let i = 0;
  while (true) {
    const at = src.indexOf('style={{', i);
    if (at < 0) {
      out += src.slice(i);
      break;
    }
    // balanced end of the object literal
    let depth = 0;
    let j = at + 'style={'.length;
    const start = j;
    for (; j < src.length; j++) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') {
        depth--;
        if (depth === 0) break;
      }
    }
    const obj = src.slice(start, j + 1);
    const classes = [];

    const cols = obj.match(/gridTemplateColumns:\s*'([^']+)'/);
    if (cols && COLS[cols[1]]) {
      const small = /gap:\s*'10px'/.test(obj) && cols[1] === '1fr 1fr';
      if (!small) classes.push(COLS[cols[1]]);
    }
    const pad = obj.match(/padding:\s*'([^']+)'/);
    if (pad) {
      const parts = pad[1].split(/\s+/);
      const horiz = parts.length === 1 ? parts[0] : parts[1];
      if (['36px', '40px', '48px'].includes(horiz)) classes.push('r-px');
      const vert = parseInt(parts[0], 10);
      if (vert >= 70) classes.push('r-py');
    }
    const tagStart = src.lastIndexOf('<', at);
    const tagName = src.slice(tagStart + 1, at).match(/^[a-z0-9]+/i)?.[0];
    const fs_ = obj.match(/fontSize:\s*'(\d+(?:\.\d+)?)px'/);
    if ((tagName === 'h1' || tagName === 'h2') && fs_ && parseFloat(fs_[1]) >= 30) classes.push('r-h');

    if (classes.length) {
      // merge with an existing className on the same opening tag, else insert one
      const head = src.slice(tagStart, at);
      const existing = head.match(/className="([^"]*)"/);
      if (existing) {
        const pos = tagStart + head.indexOf(existing[0]);
        out += src.slice(i, pos) + `className="${existing[1]} ${classes.join(' ')}"` + src.slice(pos + existing[0].length, at);
      } else {
        const after = src.slice(j + 1, j + 400).match(/^\s*className="([^"]*)"/);
        if (after) {
          out += src.slice(i, at) + src.slice(at, j + 1);
          const m = after[0];
          out += src.slice(j + 1, j + 1 + m.length).replace(after[1], `${after[1]} ${classes.join(' ')}`);
          i = j + 1 + m.length;
          changed++;
          continue;
        }
        out += src.slice(i, at) + `className="${classes.join(' ')}" `;
      }
      out += src.slice(at, j + 1);
      changed++;
    } else {
      out += src.slice(i, j + 1);
    }
    i = j + 1;
  }
  if (out !== src) fs.writeFileSync(file, out);
}
console.log('tagged elements:', changed);

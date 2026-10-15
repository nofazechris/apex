// Converts an inline CSS declaration string ("a:b;c:d") into a React style object.
function toCamel(prop) {
  if (prop.startsWith('--')) return prop;
  const p = prop.startsWith('-ms-') ? prop.slice(1) : prop;
  return p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function splitDeclarations(str) {
  const out = [];
  let depth = 0;
  let quote = null;
  let cur = '';
  for (const ch of str) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth === 0) {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

export function css(str) {
  if (!str) return undefined;
  if (typeof str !== 'string') return str;
  const style = {};
  for (const decl of splitDeclarations(str)) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop || !value) continue;
    style[toCamel(prop)] = value;
  }
  return style;
}

// One-off converter: Apex.dc.html template (sc-if / sc-for / {{ }} bindings) -> JSX view components.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'htmlparser2';
import prettier from 'prettier';
import { css } from '../lib/css.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const src = fs.readFileSync(path.join(here, 'Apex.dc.html'), 'utf8');

// template = everything inside <x-dc> after </helmet>
const tpl = src.slice(src.indexOf('</helmet>') + '</helmet>'.length, src.lastIndexOf('</x-dc>'));
const doc = parseDocument(tpl, { lowerCaseAttributeNames: false, lowerCaseTags: false, decodeEntities: true });

// sc-if values that become their own component
const EXTRACT = {
  isLanding: ['Landing', 'views/Landing'],
  isAuth: ['Auth', 'views/Auth'],
  isOnboarding: ['Onboarding', 'views/Onboarding'],
  isExam: ['ExamRoom', 'views/ExamRoom'],
  isApp: ['AppShell', 'views/AppShell'],
  showDashboard: ['DashboardScreen', 'views/screens/DashboardScreen'],
  showPractice: ['PracticeScreen', 'views/screens/PracticeScreen'],
  showMocks: ['MockExamsScreen', 'views/screens/MockExamsScreen'],
  showResults: ['ResultsScreen', 'views/screens/ResultsScreen'],
  showProgress: ['ProgressScreen', 'views/screens/ProgressScreen'],
  showUpdates: ['UpdatesScreen', 'views/screens/UpdatesScreen'],
  showProfile: ['ProfileScreen', 'views/screens/ProfileScreen'],
};

const BIND = /^\{\{\s*(.+?)\s*\}\}$/;
const BIND_G = /\{\{\s*(.+?)\s*\}\}/g;
const ATTR_RENAME = { class: 'className', for: 'htmlFor', onInput: 'onChange' };

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const rootId = (expr) => expr.match(/^[A-Za-z_$][\w$]*/)[0];

class Ctx {
  constructor() {
    this.free = new Set();
    this.scope = [];
    this.uses = { Fragment: false, Icon: false, css: false };
    this.pending = []; // extracted child components
    this.loopVars = new Set();
  }
  ref(expr) {
    const id = rootId(expr);
    if (!this.scope.includes(id)) this.free.add(id);
    return expr;
  }
}

const lit = (s) => (/^[^"&\\\n{}<>]*$/.test(s) ? `"${s}"` : `{${JSON.stringify(s)}}`);

function textToJsx(text, ctx, first, last) {
  const hasNl = /\n/.test(text);
  if (!text.trim()) return hasNl ? '' : '{" "}';
  let t = text.replace(/\s+/g, ' ');
  if (first) t = t.replace(/^ /, '');
  if (last) t = t.replace(/ $/, '');
  const parts = [];
  let idx = 0;
  let m;
  BIND_G.lastIndex = 0;
  while ((m = BIND_G.exec(t))) {
    if (m.index > idx) parts.push({ s: t.slice(idx, m.index) });
    parts.push({ e: ctx.ref(m[1]) });
    idx = m.index + m[0].length;
  }
  if (idx < t.length) parts.push({ s: t.slice(idx) });
  return parts
    .map((p) => {
      if (p.e !== undefined) return `{${p.e}}`;
      const raw = p.s;
      if (raw === '') return '';
      if (/^[^{}<>&\s][^{}<>&]*[^{}<>&\s]$|^[^{}<>&\s]$/.test(raw)) return raw;
      return `{${JSON.stringify(raw)}}`;
    })
    .join('');
}

function attrsToJsx(node, ctx) {
  const out = [];
  for (const [name, value] of Object.entries(node.attribs)) {
    if (name.startsWith('hint-')) continue;
    if (node.name === 'i' && name === 'data-lucide') continue;
    let key = ATTR_RENAME[name] || name;
    if (/^(data|aria)-/.test(key) === false && key.includes('-')) key = camel(key);
    const bind = value.match(BIND);
    if (key === 'style') {
      if (bind) {
        ctx.uses.css = true;
        out.push(`style={css(${ctx.ref(bind[1])})}`);
      } else {
        out.push(`style={${JSON.stringify(css(value))}}`);
      }
      continue;
    }
    if (bind) {
      out.push(`${key}={${ctx.ref(bind[1])}}`);
    } else if (/\{\{/.test(value)) {
      throw new Error(`partial binding in attr ${name}: ${value}`);
    } else {
      out.push(/^[^"&\\\n]*$/.test(value) ? `${key}="${value}"` : `${key}={${JSON.stringify(value)}}`);
    }
  }
  if (node.name === 'a' && node.attribs.target === '_blank') out.push('rel="noopener noreferrer"');
  return out.join(' ');
}

function childrenJsx(nodes, ctx) {
  // meaningful children (drop comments)
  const kids = nodes.filter((n) => n.type !== 'comment');
  return kids
    .map((n, i) => nodeToJsx(n, ctx, i === 0, i === kids.length - 1))
    .join('');
}

function wrap(jsx, nodes) {
  const meaningful = nodes.filter((n) => n.type === 'tag' || (n.type === 'text' && n.data.trim()));
  return meaningful.length === 1 && meaningful[0].type === 'tag' ? jsx : `<>${jsx}</>`;
}

function nodeToJsx(node, ctx, first = false, last = false) {
  if (node.type === 'comment') return '';
  if (node.type === 'text') return textToJsx(node.data, ctx, first, last);
  if (node.type !== 'tag' && node.type !== 'script' && node.type !== 'style') return '';

  if (node.name === 'sc-if') {
    const cond = node.attribs.value.match(BIND)[1];
    if (EXTRACT[cond]) {
      const [comp, file] = EXTRACT[cond];
      ctx.pending.push({ comp, file, node });
      return `{${ctx.ref(cond)} ? <${comp} vm={vm} /> : null}`;
    }
    const inner = childrenJsx(node.children, ctx);
    return `{${ctx.ref(cond)} ? (${wrap(inner, node.children)}) : null}`;
  }

  if (node.name === 'sc-for') {
    const list = node.attribs.list.match(BIND)[1];
    const as = node.attribs.as;
    ctx.ref(list);
    ctx.loopVars.add(as);
    ctx.scope.push(as);
    const kids = node.children.filter((n) => n.type === 'tag' || (n.type === 'text' && n.data.trim()));
    let body;
    if (kids.length === 1 && kids[0].type === 'tag' && !kids[0].name.startsWith('sc-')) {
      body = nodeToJsx(kids[0], ctx, true, true).replace(/^<([A-Za-z0-9]+)/, '<$1 key={_i}');
    } else {
      ctx.uses.Fragment = true;
      body = `<Fragment key={_i}>${childrenJsx(node.children, ctx)}</Fragment>`;
    }
    ctx.scope.pop();
    return `{${list}.map((${as}, _i) => (${body}))}`;
  }

  if (node.name === 'i' && 'data-lucide' in node.attribs) {
    ctx.uses.Icon = true;
    const bind = node.attribs['data-lucide'].match(BIND);
    return bind ? `<Icon name={${ctx.ref(bind[1])}} />` : `<Icon name="${node.attribs['data-lucide']}" />`;
  }

  const attrs = attrsToJsx(node, ctx);
  const tag = node.name;
  if (!node.children.length || (node.children.every((c) => c.type === 'text' && !c.data.trim()) && /^(input|textarea|path|circle|line|polyline)$/.test(tag))) {
    return `<${tag}${attrs ? ' ' + attrs : ''} />`;
  }
  return `<${tag}${attrs ? ' ' + attrs : ''}>${childrenJsx(node.children, ctx)}</${tag}>`;
}

async function emit(comp, file, nodes, isRoot) {
  const ctx = new Ctx();
  const body = nodes.length ? nodes : [];
  const kids = body.filter((n) => n.type === 'tag' || (n.type === 'text' && n.data.trim()));
  const jsx = childrenJsx(body, ctx);
  const wrapped = kids.length === 1 && kids[0].type === 'tag' ? jsx : `<>${jsx}</>`;

  const imports = [];
  if (ctx.uses.Fragment) imports.push(`import { Fragment } from 'react';`);
  if (ctx.uses.Icon) imports.push(`import Icon from '@/components/Icon';`);
  if (ctx.uses.css) imports.push(`import { css } from '@/lib/css';`);
  for (const p of ctx.pending) imports.push(`import ${p.comp} from '@/components/${p.file}';`);

  for (const v of ctx.loopVars) if (ctx.free.has(v)) throw new Error(`name clash in ${comp}: ${v}`);
  // vm itself is a free name only for children; sort destructured fields
  const free = [...ctx.free].filter((n) => !EXTRACT[n] || true).sort();
  const destructure = free.length ? `const { ${free.join(', ')} } = vm;` : '';

  const code = `${imports.join('\n')}\n\nexport default function ${comp}({ vm }) {\n  ${destructure}\n  return (${wrapped});\n}\n`;
  const pretty = await prettier.format(code, { parser: 'babel', singleQuote: true, printWidth: 140 });
  const outFile = path.join(root, 'components', file + '.jsx');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, pretty);
  console.log('wrote', path.relative(root, outFile), `(${free.length} vm fields)`);
  for (const p of ctx.pending) await emit(p.comp, p.file, p.node.children, false);
}

// the root element
const rootEl = doc.children.find((n) => n.type === 'tag');
await emit('ApexView', 'ApexView', [rootEl], true);

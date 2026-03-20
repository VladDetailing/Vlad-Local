import { serviceCatalog, vehicleTypeLabels } from './serviceCatalogData';
import type { Price, VehicleType } from './serviceCatalogData';
import { detailingInteriorPackages } from './detailingInteriorData';
import { detailingExteriorPackages } from './detailingExteriorData';
import type { SiteKnowledgeDoc } from './siteKnowledge.generated';

export type ChatbotAction = {
  label: string;
  href: string;
};

export type ChatbotReply = {
  text: string;
  actions?: ChatbotAction[];
  meta?: {
    categoryId?: string;
  };
};

const phoneDisplay = '0771 133 128';
const phoneHref = 'tel:0771133128';
const email = 'detailingvlad@gmail.com';
const addressShort = 'Galați, Strada Brăilei 253A';
const program = 'L-V 08:30 - 12:30, 13:30 - 17:30 • S 08:30 - 12:00';

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesAny(haystack: string, needles: string[]): boolean {
  return needles.some((n) => haystack.includes(n));
}

function tokenizeNormalized(normalized: string): string[] {
  return normalized
    .split(' ')
    .map((t) => t.trim())
    .filter(Boolean);
}

function getPriceAmount(price: Price, vehicleType: VehicleType): number | null {
  if (price.kind === 'quote') return null;
  if (price.amountByVehicle && price.amountByVehicle[vehicleType] != null) return price.amountByVehicle[vehicleType] as number;
  return price.amount;
}

function formatPrice(price: Price, vehicleType: VehicleType): string {
  if (price.kind === 'quote') return 'la cerere';
  const amount = getPriceAmount(price, vehicleType);
  if (amount == null) return 'la cerere';
  if (price.kind === 'from') return `de la ${amount} RON`;
  return `${amount} RON`;
}

const categoryHref: Record<string, string> = {
  'detailing-interior': '#detailing-interior',
  'detailing-exterior': '#detailing-exterior',
  'wrapping-ppf': '#servicii-wrapping-ppf',
  'folie-solara': '#servicii-folie-solara-geamuri',
  'polish-faruri': '#servicii-polish-faruri',
  'revopsire-piele': '#servicii-revopsire-piele',
  retapitari: '#servicii-retapitari'
};

const categorySynonyms: Record<string, string[]> = {
  'detailing-interior': ['interior', 'igienizare', 'curatare interior', 'ozon', 'ozonizare', 'tapi', 'tapiterie', 'piele', 'plafon'],
  'detailing-exterior': ['exterior', 'polish', 'corectie', 'ceram', 'ceramica', 'protectie ceramica', 'hidrofob', 'jante'],
  'wrapping-ppf': ['wrapping', 'colant', 'colantare', 'infoliere', 'ppf', 'folie protectie', 'schimbare culoare'],
  'folie-solara': ['folie', 'solara', 'geam', 'geamuri', 'luneta', 'parbriz', 'rar', 'omolog', 'global'],
  'polish-faruri': ['far', 'faruri', 'polish faruri', 'restaurare faruri', 'reconditionare faruri', 'ppf faruri'],
  'revopsire-piele': ['revopsire', 'piele', 'volan', 'scaun', 'bancheta', 'reconditionare piele', 'vopsire piele'],
  retapitari: ['retapitari', 'retapitare', 'plafon', 'stalp', 'stalpi', 'fete usi', 'usi', 'volan', 'camioane', 'alcantara', 'textil']
};

type Candidate =
  | {
      kind: 'category';
      categoryId: string;
      label: string;
      tokens: Set<string>;
    }
  | {
      kind: 'item';
      categoryId: string;
      label: string;
      description?: string;
      price: Price;
      tokens: Set<string>;
    };

const candidates: Candidate[] = (() => {
  const out: Candidate[] = [];
  for (const cat of serviceCatalog) {
    const base = normalizeText(`${cat.id} ${cat.label} ${(categorySynonyms[cat.id] ?? []).join(' ')}`);
    out.push({
      kind: 'category',
      categoryId: cat.id,
      label: cat.label,
      tokens: new Set(tokenizeNormalized(base))
    });
    for (const item of cat.items) {
      const itemText = normalizeText(`${cat.id} ${cat.label} ${item.id} ${item.label} ${item.description ?? ''}`);
      out.push({
        kind: 'item',
        categoryId: cat.id,
        label: item.label,
        description: item.description,
        price: item.price,
        tokens: new Set(tokenizeNormalized(itemText))
      });
    }
  }
  return out;
})();

const ignoredTokens = new Set([
  'cat',
  'costa',
  'cost',
  'pret',
  'preturi',
  'tarif',
  'tarife',
  'ron',
  'lei',
  'de',
  'la',
  'si',
  'sau',
  'pentru',
  'cu',
  'o',
  'un',
  'una',
  'in',
  'pe',
  'din',
  'care',
  'este',
  'sunt',
  'vreau',
  'as',
  'vrea',
  'ma',
  'mi',
  'se',
  'sa',
  'fac',
  'faci',
  'face',
  'aveti',
  'avem',
  'voi',
  'noi',
  'la',
  'si'
]);

function isUsefulToken(t: string): boolean {
  if (ignoredTokens.has(t)) return false;
  if (t.length >= 3) return true;
  return t === 'ppf' || t === 'rar' || t === 'uv';
}

function scoreCandidate(qTokens: string[], c: Candidate): number {
  let score = 0;
  for (const t of qTokens) {
    if (!isUsefulToken(t)) continue;
    if (c.tokens.has(t)) score += t.length >= 4 ? 3 : 2;
  }
  if (c.kind === 'item') {
    if (includesAny(qTokens.join(' '), ['volan', 'scaun', 'bancheta', 'plafon', 'stalp', 'luneta', 'parbriz'])) score += 1;
  }
  return score;
}

function pickBestCandidate(q: string): Candidate | null {
  const qTokens = tokenizeNormalized(q);
  let best: Candidate | null = null;
  let bestScore = 0;
  for (const c of candidates) {
    const s = scoreCandidate(qTokens, c);
    if (s > bestScore) {
      bestScore = s;
      best = c;
    }
  }
  if (bestScore < 3) return null;
  return best;
}

function detectVehicleType(q: string): VehicleType | null {
  if (includesAny(q, ['suv', 'crossover', '4x4', 'jeep'])) return 'suv';
  if (includesAny(q, ['sedan', 'berlina'])) return 'sedan';
  if (includesAny(q, ['hatchback', 'compacta'])) return 'hatchback';
  return null;
}

type PackageTier = 'essence' | 'deluxe' | 'divino';

function detectPackageTier(q: string): PackageTier | null {
  if (includesAny(q, ['divino'])) return 'divino';
  if (includesAny(q, ['deluxe', 'delux'])) return 'deluxe';
  if (includesAny(q, ['essence', 'esen', 'esence'])) return 'essence';
  return null;
}

function buildPackageContentsReply(categoryId: string, tier: PackageTier | null): ChatbotReply | null {
  const isInterior = categoryId === 'detailing-interior';
  const isExterior = categoryId === 'detailing-exterior';
  if (!isInterior && !isExterior) return null;

  const packages = isInterior ? detailingInteriorPackages : detailingExteriorPackages;
  const href = categoryHref[categoryId] ?? '#servicii';
  const label = isInterior ? 'Detailing Interior' : 'Detailing Exterior';

  const pickByTier = (t: PackageTier) => {
    const key = t === 'essence' ? 'Essence' : t === 'deluxe' ? 'Deluxe' : 'Divino';
    return packages.find((p) => normalizeText(p.title).includes(normalizeText(key))) ?? null;
  };

  if (tier) {
    const pkg = pickByTier(tier);
    if (!pkg) return null;
    const lines = [`${pkg.title} — conține:`];
    for (const f of pkg.features) lines.push(`- ${f}`);
    return {
      text: `${lines.join('\n')}\n\nDacă vrei, îți spun și prețul pe tip de mașină.`,
      actions: [
        { label: 'Vezi pachetele', href },
        { label: 'Cere evaluare', href: '#evaluare' },
        { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
      ]
    };
  }

  const lines: string[] = [];
  lines.push(`${label} are 3 pachete. Spune-mi „Essence”, „Deluxe” sau „Divino” și îți dau lista completă.`);
  lines.push('');
  for (const pkg of packages) {
    const preview = pkg.features.slice(0, 4).map((f) => `- ${f}`).join('\n');
    const more = pkg.features.length > 4 ? '\n- …' : '';
    lines.push(`${pkg.title}:`);
    lines.push(`${preview}${more}`);
    lines.push('');
  }
  return {
    text: lines.join('\n').trim(),
    actions: [
      { label: 'Vezi pachetele', href },
      { label: 'Cere evaluare', href: '#evaluare' },
      { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
    ]
  };
}

function formatCategoryPrices(categoryId: string): string | null {
  const category = serviceCatalog.find((c) => c.id === categoryId);
  if (!category) return null;

  const lines: string[] = [];
  lines.push(`${category.label} — prețuri:`);

  if (category.id === 'detailing-exterior' || category.id === 'detailing-interior' || category.id === 'wrapping-ppf') {
    const vehicleTypes: VehicleType[] = ['hatchback', 'sedan', 'suv'];
    for (const item of category.items) {
      const vehicleLine = vehicleTypes
        .map((vt) => `${vehicleTypeLabels[vt]}: ${formatPrice(item.price, vt)}`)
        .join(' • ');
      lines.push(`- ${item.label}${item.description ? ` (${item.description})` : ''}: ${vehicleLine}`);
    }
    return lines.join('\n');
  }

  for (const item of category.items) {
    lines.push(`- ${item.label}${item.description ? ` (${item.description})` : ''}: ${formatPrice(item.price, 'sedan')}`);
  }
  return lines.join('\n');
}

function fallback(): ChatbotReply {
  return {
    text: `Îți răspund cu plăcere, dar am nevoie de un pic mai mult context.\nSpune-mi serviciul (ex: folie solară, detailing interior, revopsire piele) sau sună-ne la ${phoneDisplay} și te ajutăm imediat.`,
    actions: [
      { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref },
      { label: 'Vezi servicii', href: '#servicii' },
      { label: 'Cere evaluare', href: '#evaluare' }
    ]
  };
}

let knowledgeCache: SiteKnowledgeDoc[] | null = null;
let knowledgeTokenCache: Array<{ doc: SiteKnowledgeDoc; tokens: Set<string> }> | null = null;

async function loadKnowledge(): Promise<Array<{ doc: SiteKnowledgeDoc; tokens: Set<string> }>> {
  if (knowledgeTokenCache) return knowledgeTokenCache;
  if (!knowledgeCache) {
    const mod = await import('./siteKnowledge.generated');
    knowledgeCache = (mod as unknown as { siteKnowledgeDocs: SiteKnowledgeDoc[] }).siteKnowledgeDocs ?? [];
  }
  knowledgeTokenCache = knowledgeCache.map((doc) => ({
    doc,
    tokens: new Set(tokenizeNormalized(normalizeText(`${doc.title}\n${doc.text}`)).filter(isUsefulToken))
  }));
  return knowledgeTokenCache;
}

function scoreKnowledge(qTokens: string[], docTokens: Set<string>): number {
  let score = 0;
  for (const t of qTokens) {
    if (!isUsefulToken(t)) continue;
    if (docTokens.has(t)) score += t.length >= 5 ? 3 : 2;
  }
  return score;
}

function extractRelevantLines(text: string, qTokens: string[], limit: number): string[] {
  const tokens = qTokens.filter(isUsefulToken);
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const picked: string[] = [];
  for (const line of lines) {
    const n = normalizeText(line);
    if (n.length < 6) continue;
    if (!/[a-zA-ZăâîșțĂÂÎȘȚ]/.test(n)) continue;
    const matchCount = tokens.reduce((acc, t) => (n.includes(t) ? acc + 1 : acc), 0);
    if (matchCount <= 0) continue;
    picked.push(line);
    if (picked.length >= limit) break;
  }
  return picked;
}

async function answerFromKnowledge(question: string): Promise<ChatbotReply | null> {
  const qTokens = tokenizeNormalized(question);
  const docs = await loadKnowledge();
  const scored = docs
    .map((d) => ({ ...d, score: scoreKnowledge(qTokens, d.tokens) }))
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (!scored.length) return null;
  const bestScore = scored[0]?.score ?? 0;
  if (bestScore < 4) return null;

  const lines: string[] = [];
  for (const s of scored) {
    const picked = extractRelevantLines(s.doc.text, qTokens, 5);
    for (const p of picked) {
      lines.push(`- ${p}`);
      if (lines.length >= 10) break;
    }
    if (lines.length >= 10) break;
  }

  if (!lines.length) return null;
  return {
    text: `Am găsit pe site informațiile de mai jos:\n${lines.join('\n')}\n\nDacă vrei, spune-mi și ce serviciu/mașină ai, ca să-ți răspund mai exact.`,
    actions: [
      { label: 'Vezi servicii', href: '#servicii' },
      { label: 'Contact', href: '#contact' },
      { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
    ]
  };
}

export async function getChatbotReply(
  userText: string,
  ctx?: {
    lastCategoryId?: string | null;
  }
): Promise<ChatbotReply> {
  const raw = userText.trim();
  const q = normalizeText(raw);

  if (!q) return { text: 'Scrie-mi o întrebare și te ajut.' };

  if (includesAny(q, ['salut', 'buna', 'buna ziua', 'hei', 'hello'])) {
    return {
      text:
        'Salut! Sunt asistentul Vlad Detailing.\nSpune-mi ce te interesează (prețuri, program, locație, un serviciu anume) și îți răspund din informațiile de pe site.',
      actions: [
        { label: 'Prețuri', href: '#evaluare' },
        { label: 'Program', href: '#contact' },
        { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
      ]
    };
  }

  if (includesAny(q, ['telefon', 'numar', 'suna', 'sun', 'contact', 'whatsapp'])) {
    return {
      text: `Ne poți suna la ${phoneDisplay}.\nEmail: ${email}`,
      actions: [
        { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref },
        { label: 'Contact', href: '#contact' }
      ]
    };
  }

  if (includesAny(q, ['program', 'orar', 'cand sunteti deschisi', 'cand sunteti deschis'])) {
    return { text: `Program: ${program}`, actions: [{ label: 'Vezi contact', href: '#contact' }] };
  }

  if (includesAny(q, ['locatie', 'adresa', 'unde', 'harta', 'maps', 'waze'])) {
    return {
      text: `Locație: ${addressShort}`,
      actions: [{ label: 'Deschide Contact', href: '#contact' }]
    };
  }

  if (includesAny(q, ['garantie', 'garantie', 'rar', 'omolog', 'certificat'])) {
    return {
      text:
        'Pentru folia solară oferim montaj autorizat RAR (certificat) și garanție extinsă (minim 10 ani) pentru decolorare/dezlipire/apariția bulelor.',
      actions: [{ label: 'Vezi Folie Solară', href: '#servicii-folie-solara-geamuri' }],
      meta: { categoryId: 'folie-solara' }
    };
  }

  const asksContents = includesAny(q, [
    'ce contine',
    'ce include',
    'ce primesti',
    'include',
    'contine',
    'ce se face',
    'ce faci',
    'operatiuni',
    'pachet'
  ]);

  const asksPrice = includesAny(q, ['pret', 'preturi', 'cat costa', 'cost', 'tarif', 'tarife', 'ron', 'lei', 'de la']);
  const asksDuration = includesAny(q, ['durata', 'cat dureaza', 'timp', 'cate zile', 'ore', 'cat tine', 'cat dureaza montajul']);

  if (asksContents) {
    const best = pickBestCandidate(q);
    const tier = detectPackageTier(q);
    const categoryId = best?.kind === 'item' ? best.categoryId : best?.kind === 'category' ? best.categoryId : null;
    if (categoryId) {
      const r = buildPackageContentsReply(categoryId, tier);
      if (r) return { ...r, meta: { categoryId } };
    }
    return {
      text: 'Spune-mi pentru ce serviciu vrei conținutul: detailing interior sau detailing exterior (și pachetul: Essence/Deluxe/Divino).',
      actions: [
        { label: 'Detailing interior', href: '#detailing-interior' },
        { label: 'Detailing exterior', href: '#detailing-exterior' },
        { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
      ]
    };
  }

  if (asksPrice || asksDuration) {
    const best = pickBestCandidate(q);
    const vehicleType = detectVehicleType(q);
    const contextCategoryId = ctx?.lastCategoryId ? String(ctx.lastCategoryId) : null;

    if (best?.kind === 'item') {
      const href = categoryHref[best.categoryId] ?? '#servicii';
      if (asksDuration) {
        const durationText = best.description ? `Durată: ${best.description}` : null;
        if (durationText) {
          return {
            text: `${best.label}\n${durationText}\n\nPentru programare: completează formularul sau sună-ne la ${phoneDisplay}.`,
            actions: [
              { label: 'Vezi serviciul', href },
              { label: 'Cere evaluare', href: '#evaluare' },
              { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
            ],
            meta: { categoryId: best.categoryId }
          };
        }
      }

      if (asksPrice) {
        if (best.price.kind !== 'quote' && best.price.amountByVehicle) {
          const vehicleTypes: VehicleType[] = vehicleType ? [vehicleType] : ['hatchback', 'sedan', 'suv'];
          const line = vehicleTypes.map((vt) => `${vehicleTypeLabels[vt]}: ${formatPrice(best.price, vt)}`).join(' • ');
          return {
            text: `${best.label}${best.description ? ` (${best.description})` : ''}\nPreț: ${line}\n\nPentru detalii și disponibilitate: completează formularul sau sună-ne la ${phoneDisplay}.`,
            actions: [
              { label: 'Vezi serviciul', href },
              { label: 'Cere evaluare', href: '#evaluare' },
              { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
            ],
            meta: { categoryId: best.categoryId }
          };
        }

        return {
          text: `${best.label}${best.description ? ` (${best.description})` : ''}\nPreț: ${formatPrice(best.price, 'sedan')}\n\nPentru detalii și disponibilitate: completează formularul sau sună-ne la ${phoneDisplay}.`,
          actions: [
            { label: 'Vezi serviciul', href },
            { label: 'Cere evaluare', href: '#evaluare' },
            { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
          ],
          meta: { categoryId: best.categoryId }
        };
      }
    }

    if (best?.kind === 'category') {
      const prices = asksPrice ? formatCategoryPrices(best.categoryId) : null;
      const href = categoryHref[best.categoryId] ?? '#servicii';
      if (asksPrice && prices) {
        return {
          text: `${prices}\n\nPentru detalii și disponibilitate: completează formularul sau sună-ne la ${phoneDisplay}.`,
          actions: [
            { label: 'Vezi serviciul', href },
            { label: 'Cere evaluare', href: '#evaluare' },
            { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
          ],
          meta: { categoryId: best.categoryId }
        };
      }

      if (asksDuration) {
        return {
          text: `Despre ce pachet anume te interesează durata la ${best.label}?\nSpune-mi „Essence / Deluxe / Divino” sau componenta (ex: parbriz, lunetă, volan).`,
          actions: [
            { label: 'Vezi serviciul', href },
            { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
          ],
          meta: { categoryId: best.categoryId }
        };
      }
    }

    if (contextCategoryId) {
      const prices = asksPrice ? formatCategoryPrices(contextCategoryId) : null;
      const href = categoryHref[contextCategoryId] ?? '#servicii';
      const label = serviceCatalog.find((c) => c.id === contextCategoryId)?.label ?? 'serviciul';
      if (asksPrice && prices) {
        return {
          text: `${prices}\n\nPentru detalii și disponibilitate: completează formularul sau sună-ne la ${phoneDisplay}.`,
          actions: [
            { label: 'Vezi serviciul', href },
            { label: 'Cere evaluare', href: '#evaluare' },
            { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
          ],
          meta: { categoryId: contextCategoryId }
        };
      }
      if (asksDuration) {
        return {
          text: `Despre ce pachet/componentă te interesează durata la ${label}?\nSpune-mi detaliul (ex: Essence/Deluxe/Divino sau „parbriz/lunetă”).`,
          actions: [
            { label: 'Vezi serviciul', href },
            { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
          ],
          meta: { categoryId: contextCategoryId }
        };
      }
    }

    return fallback();
  }

  if (includesAny(q, ['servicii', 'ce faceti', 'ce oferiti', 'ce servicii', 'lista servicii'])) {
    return {
      text:
        'Servicii disponibile:\n- Detailing interior\n- Detailing exterior\n- Wrapping / PPF\n- Folie solară geamuri (RAR)\n- Polish faruri\n- Revopsire piele\n- Retapițări',
      actions: [
        { label: 'Vezi servicii', href: '#servicii' },
        { label: 'Galerie lucrări', href: '#galerie' }
      ]
    };
  }

  const best = pickBestCandidate(q);
  if (best?.kind === 'item') {
    const href = categoryHref[best.categoryId] ?? '#servicii';
    const durationLine = best.description ? `Durată: ${best.description}` : null;
    const priceLine =
      best.price.kind === 'quote'
        ? 'Preț: la cerere'
        : best.price.amountByVehicle
          ? `Preț: ${['hatchback', 'sedan', 'suv']
              .map((vt) => `${vehicleTypeLabels[vt as VehicleType]}: ${formatPrice(best.price, vt as VehicleType)}`)
              .join(' • ')}`
          : `Preț: ${formatPrice(best.price, 'sedan')}`;

    return {
      text: `${best.label}\n${[priceLine, durationLine].filter(Boolean).join('\n')}\n\nSpune-mi dacă te interesează prețul exact (ex: SUV) sau o programare.`,
      actions: [
        { label: 'Vezi serviciul', href },
        { label: 'Cere evaluare', href: '#evaluare' },
        { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
      ],
      meta: { categoryId: best.categoryId }
    };
  }
  if (best?.kind === 'category') {
    const href = categoryHref[best.categoryId] ?? '#servicii';
    return {
      text: `Te pot ajuta cu ${best.label}.\nÎntreabă-mă „preț” sau „durată” și îți răspund rapid.`,
      actions: [
        { label: 'Vezi serviciul', href },
        { label: 'Cere evaluare', href: '#evaluare' },
        { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref }
      ],
      meta: { categoryId: best.categoryId }
    };
  }

  const knowledge = await answerFromKnowledge(q);
  return knowledge ?? fallback();
}

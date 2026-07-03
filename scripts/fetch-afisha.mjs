/**
 * VibeCity — Afisha.uz events fetcher
 *
 * Забирает RSS-ленты Afisha.uz по «событийным» категориям,
 * нормализует записи и пишет data/afisha.json.
 * Запускается GitHub Action'ом по расписанию (см. .github/workflows/update-afisha.yml)
 * или вручную: node scripts/fetch-afisha.mjs
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = join(ROOT, 'data', 'afisha.json');
const MAX_EVENTS = 40;
const UA = 'VibeCityBot/1.0 (+https://kamri3i5.github.io/Vibe_City/; events aggregator with attribution)';

// Категория фида → категория VibeCity. Фиды без собственной ленты
// отдают общий поток, поэтому каждый item дополнительно фильтруем по пути ссылки.
const FEEDS = [
    { url: 'https://www.afisha.uz/rss/concerts', path: '/ru/concerts/', category: 'concert' },
    { url: 'https://www.afisha.uz/rss/theatres', path: '/ru/theatres/', category: 'theatre' },
    { url: 'https://www.afisha.uz/rss/exhibitions', path: '/ru/exhibitions/', category: 'exhibition' },
    { url: 'https://www.afisha.uz/rss/gorod', path: '/ru/gorod/', category: 'city' }
];

// Известные площадки Ташкента: подстрока (lowercase) → название + координаты.
// Матчим только уверенные, однозначные упоминания.
const VENUES = [
    { match: ['humo arena', 'хумо арена'], name: 'Humo Arena', coords: [41.3080, 69.2519] },
    { match: ['magic city', 'мэджик сити'], name: 'Magic City', coords: [41.3036, 69.2450] },
    { match: ['театре навои', 'театр навои', 'театра навои', 'габт'], name: 'Театр Навои', coords: [41.3092, 69.2715] },
    { match: ['tashkent city', 'ташкент сити'], name: 'Tashkent City', coords: [41.3165, 69.2484] },
    { match: ['бродвей', 'сайилгох'], name: 'Бродвей (Сайилгох)', coords: [41.3126, 69.2746] },
    { match: ['чорсу'], name: 'Chorsu Bazaar', coords: [41.3262, 69.2369] },
    { match: ['парк навруз', 'парке навруз'], name: 'Парк Навруз', coords: [41.3260, 69.2661] },
    { match: ['дворец дружбы народов', 'дворце дружбы народов'], name: 'Дворец дружбы народов', coords: [41.3113, 69.2494] },
    { match: ['japanese garden', 'японский сад', 'японском саду'], name: 'Японский сад', coords: [41.3396, 69.2820] }
];

function decodeEntities(s = '') {
    return s
        .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&amp;/g, '&')
        .trim();
}

function tag(item, name) {
    const m = item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
    return m ? decodeEntities(m[1]) : '';
}

function attr(item, name, attrName) {
    const m = item.match(new RegExp(`<${name}[^>]*\\b${attrName}="([^"]*)"`, 'i'));
    return m ? decodeEntities(m[1]) : '';
}

function matchVenue(text) {
    const lower = text.toLowerCase();
    for (const v of VENUES) {
        if (v.match.some(needle => lower.includes(needle))) {
            return { name: v.name, coords: v.coords };
        }
    }
    return null;
}

async function fetchFeed({ url, path, category }) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
    const xml = await res.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => m[1]);
    return items
        .map(item => {
            const link = tag(item, 'link');
            const title = tag(item, 'title');
            const published = Date.parse(tag(item, 'pubDate')) || Date.now();
            return {
                id: link.replace(/^https?:\/\/(www\.)?afisha\.uz\/?/, '').replace(/[^\w-]+/g, ':'),
                title,
                description: tag(item, 'description'),
                url: link,
                image: attr(item, 'enclosure', 'url') || null,
                category,
                published,
                venue: matchVenue(`${title} ${tag(item, 'description')}`)
            };
        })
        // Фид без собственной ленты отдаёт общий поток — оставляем только свою категорию
        .filter(e => e.url.includes(path) && e.title)
        // Не даём одной категории задавить остальные
        .slice(0, 12);
}

async function main() {
    const results = await Promise.allSettled(FEEDS.map(fetchFeed));

    const failed = results.filter(r => r.status === 'rejected');
    failed.forEach(r => console.error('[afisha] feed failed:', r.reason?.message));
    if (failed.length === FEEDS.length) {
        throw new Error('All feeds failed — keeping previous data/afisha.json');
    }

    const seen = new Set();
    const events = results
        .flatMap(r => (r.status === 'fulfilled' ? r.value : []))
        .filter(e => (seen.has(e.id) ? false : seen.add(e.id)))
        .sort((a, b) => b.published - a.published)
        .slice(0, MAX_EVENTS);

    const payload = {
        updatedAt: new Date().toISOString(),
        source: 'https://www.afisha.uz',
        attribution: 'Данные о событиях: Afisha.uz',
        events
    };

    await mkdir(dirname(OUT_FILE), { recursive: true });
    await writeFile(OUT_FILE, JSON.stringify(payload, null, 2) + '\n', 'utf8');
    console.log(`[afisha] wrote ${events.length} events -> ${OUT_FILE}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

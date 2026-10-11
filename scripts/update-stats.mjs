// Refreshes data/stats.json with the YouTube subscriber count and latest upload.
// Run by .github/workflows/stats.yml every few hours; keeps the last good values if a lookup fails.
import { readFile, writeFile } from 'node:fs/promises';

const CHANNEL = 'https://www.youtube.com/@mewzah';
const UPLOADS = 'UULFEPXFafBx8AEAU7EnARmSnw'; // videos only (no shorts or streams)
const OUT = new URL('../data/stats.json', import.meta.url);
const HEADERS = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    'accept-language': 'en-US,en;q=0.9',
};

const old = await readFile(OUT, 'utf8').then(JSON.parse, () => ({}));
const youtube = { ...old.youtube };

const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

try {
    const html = await fetch(CHANNEL, { headers: HEADERS }).then((r) => r.text());
    const m = html.match(/"([\d.,]+)([KMB]?) subscribers"/);
    if (!m) throw new Error('subscriber count not found');
    const n = parseFloat(m[1].replace(/,/g, '')) * ({ K: 1e3, M: 1e6, B: 1e9 }[m[2]] || 1);
    youtube.subscribers = Math.round(n);
} catch (e) {
    console.warn('subscribers:', e.message);
}

try {
    const xml = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${UPLOADS}`, { headers: HEADERS }).then((r) => r.text());
    const entry = xml.split('<entry>')[1];
    if (!entry) throw new Error('no entries');
    const id = entry.match(/<yt:videoId>([^<]+)</)[1];
    const title = decode(entry.match(/<title>([^<]*)</)[1]);
    const published = entry.match(/<published>([^<]+)</)[1];
    const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    const hasMax = (await fetch(maxres, { method: 'HEAD' })).ok;
    youtube.latest = { id, title, published, thumb: hasMax ? maxres : `https://i.ytimg.com/vi/${id}/mqdefault.jpg` };
} catch (e) {
    console.warn('latest upload:', e.message);
}

if (JSON.stringify(youtube) !== JSON.stringify(old.youtube)) {
    await writeFile(OUT, `${JSON.stringify({ updated: new Date().toISOString(), youtube }, null, 2)}\n`);
    console.log('updated', youtube);
} else {
    console.log('no change');
}

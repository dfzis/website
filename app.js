(() => {
    'use strict';

    const PROFILE = {
        tag: 'mewzah',
        gamerscore: 999,
        location: 'グランド・エクスチェンジ',
        gamerpic: 'assets/gamerpic.png',
    };

    // count: a number shows "12.5K followers"; null shows the handle instead.
    const SOCIALS = {
        youtube: { name: 'YouTube', handle: '@mewzah', href: 'https://www.youtube.com/@mewzah', count: 32400, unit: 'subscribers', uploads: 'UULFEPXFafBx8AEAU7EnARmSnw' },
        twitch: { name: 'Twitch', handle: 'mewzah', href: 'https://www.twitch.tv/mewzah', count: 4400, unit: 'followers' },
        tiktok: { name: 'TikTok', handle: '@mewz6h', href: 'https://www.tiktok.com/@mewz6h', count: null, unit: 'followers' },
        x: { name: 'X', handle: '@mewzah1', href: 'https://x.com/mewzah1', count: 1600, unit: 'followers' },
        discord: { name: 'Discord', handle: 'mewzah', copy: 'mewzah' },
    };

    // Game Library. The first game starts in the disc tray; visitors can swap games (remembered per browser).
    // art is the dashboard tile banner; disc is an optional cut-out disc image (a printed disc is drawn otherwise).
    const GAMES = [
        { id: 'cod4', title: 'Call of Duty 4: Modern Warfare', short: 'Call of Duty 4', art: 'assets/cod4.jpg', disc: 'assets/disc-cod4.webp' },
        { id: 'mw2', title: 'Call of Duty: Modern Warfare 2', short: 'Modern Warfare® 2', art: 'assets/mw2.jpg', disc: 'assets/disc-mw2.webp' },
        { id: 'halo3', title: 'Halo 3', short: 'Halo 3', art: 'assets/halo3.jpg', disc: 'assets/disc-halo3.webp' },
    ];

    // Sponsor. code shows "Use code …" and a copy button on the Geobox screen (null hides them).
    const GEOBOX = {
        href: 'https://geobox.ai/',
        code: 'mewzah',
        regions: ['new-york', 'chicago', 'atlanta', 'texas', 'california', 'phoenix', 'seattle', 'mexico', 'london', 'stockholm', 'brazil', 'sydney'],
        modes: ['Resurgence Quads', 'Resurgence Duos', 'Battle Royale Quads', 'Resurgence Casuals', 'Black Ops Royale'],
    };

    // Business contact on a Messages tile in Friends (null hides the tile). Joined at runtime so the
    // address never appears whole in the page source for spam scrapers.
    const CONTACT = { email: ['business', 'mewzah.tv'].join('@') };

    // My Setup screen in My Xbox, e.g. { label: 'Controller', item: 'SCUF Reflex Pro', href: 'https://…' } (empty hides the tile).
    const SETUP = [];

    // Colour themes (System Settings / Guide). Each moves the site's greens to its hue; the controller's
    // A button keeps its green, and photos, the Geobox logo and the red LIVE badge are untouched.
    const THEMES = [
        { id: 'green', name: 'Green' },
        { id: 'blue', name: 'Blue', hue: 195, logo: 'assets/logo-blue.webp' },
        { id: 'purple', name: 'Purple', hue: 272, lift: 0.3, logo: 'assets/logo-purple.webp' },
        { id: 'orange', name: 'Orange', hue: 26, logo: 'assets/logo-orange.webp' },
        { id: 'halloween', name: 'Halloween', hue: 26, lift: 0.6, season: 'halloween', logo: 'assets/logo-orange.webp' },
    ];

    // YouTube subscribers and latest upload, refreshed every few hours by .github/workflows/stats.yml.
    const STATS_URL = 'data/stats.json';

    // Achievements are earned per visitor and saved in their browser. 250G in total (240G outside Halloween).
    const ACHIEVEMENTS = [
        { id: 'boot', name: 'Welcome Home', desc: "Boot up mewzah's dashboard.", g: 10, icon: 'home' },
        { id: 'profile', name: 'Gamer Card', desc: "View mewzah's gamer profile.", g: 10, icon: 'card' },
        { id: 'surfer', name: 'Channel Surfer', desc: 'Visit every channel.', g: 15, icon: 'channels' },
        { id: 'tuned', name: 'Tuned In', desc: "Watch mewzah's latest YouTube upload.", g: 15, icon: 'youtube' },
        { id: 'front', name: 'Front Row', desc: 'Open the Twitch screen while mewzah is live.', g: 20, icon: 'twitch' },
        { id: 'social', name: 'Social Butterfly', desc: "Visit three of mewzah's socials.", g: 15, icon: 'people' },
        { id: 'eject', name: 'Tray Open', desc: 'Eject the disc.', g: 5, icon: 'eject' },
        { id: 'library', name: 'Disc Jockey', desc: 'Play every game in the Game Library.', g: 20, icon: 'disc' },
        { id: 'lobby', name: 'Lobby Found', desc: 'Find a lobby with Geobox.', g: 15, icon: 'geobox' },
        { id: 'code', name: 'Supporter', desc: "Copy mewzah's Geobox creator code.", g: 20, icon: 'ticket' },
        { id: 'settings', name: 'Fine Tuning', desc: 'Change a system setting.', g: 5, icon: 'gear' },
        { id: 'konami', name: 'Old School', desc: 'Enter the Konami code.', g: 20, icon: 'controller', secret: true },
        { id: 'rrod', name: 'Three Red Lights', desc: 'Hold Eject until something breaks.', g: 20, icon: 'ring', secret: true },
        { id: 'night', name: 'Night Owl', desc: 'Visit between midnight and 5am.', g: 10, icon: 'moon', secret: true },
        { id: 'wave', name: 'Hi There', desc: 'Make your avatar do an emote.', g: 10, icon: 'people' },
        { id: 'style', name: 'Fashionista', desc: 'Try every theme.', g: 10, icon: 'monitor' },
        { id: 'still', name: 'Still There?', desc: 'Leave the dashboard alone until it dims.', g: 10, icon: 'moon', secret: true },
        { id: 'rumble', name: 'Good Vibrations', desc: 'Feel your controller rumble.', g: 10, icon: 'controller', secret: true },
        // seasonal: only listed while its theme is in THEMES
        ...(THEMES.some((t) => t.id === 'halloween') ? [{ id: 'trick', name: 'Trick or Treat', desc: 'Switch to the Halloween theme.', g: 10, icon: 'ring', secret: true }] : []),
    ];

    // Free Twitch status service (no API key). Uptime replies with a duration when live, '<name> is offline' otherwise.
    const TWITCH_STATUS = 'https://decapi.me/twitch';
    const LIVE_POLL_MS = 120000;

    // Optional real sound files, e.g. { select: 'assets/sfx/select.wav' }. Missing entries are synthesized.
    const SFX_FILES = {};

    const ICONS = {
        youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
        twitch: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z',
        tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
        discord: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
        x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
        controller: 'M6.6 5.5h10.8c2.6 0 4.3 1.9 4.8 4.5l1.1 5.9c.4 2.3-1.1 4.1-3.1 4.1-1.3 0-2.3-.7-3-1.9L16 15.7H8l-1.2 2.4c-.7 1.2-1.7 1.9-3 1.9-2 0-3.5-1.8-3.1-4.1L1.8 10c.5-2.6 2.2-4.5 4.8-4.5zM6 8.6v1.9H4.1v1.8H6v1.9h1.8v-1.9h1.9v-1.8H7.8V8.6zm11.1-.1a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1zm-2.2 2.2a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1zm4.4 0a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1zm-2.2 2.2a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1z',
        home: 'M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3z',
        card: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm5 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 17h7c0-2.2-1.6-3.3-3.5-3.3S4.5 14.8 4.5 17zM13 9v1.6h6.5V9zm0 3.2v1.6h5v-1.6z',
        channels: 'M3 4h18v12H3zm2 2v8h14V6zM8 18.4h8V20H8z',
        people: 'M8.8 4a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm7.6 1.6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM2 19c0-3.3 3-5.5 6.8-5.5s6.7 2.2 6.7 5.5v1H2zm14.6-5.2c3 .2 5.4 2 5.4 4.7V20h-4.6v-1c0-2-.3-3.6-.8-5.2z',
        eject: 'M12 4 4 13h16zM4 16h16v3H4z',
        disc: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
        ticket: 'M3 6h18v4.2a1.8 1.8 0 0 0 0 3.6V18H3v-4.2a1.8 1.8 0 0 0 0-3.6zm6.2 1.6v8.8h1.6V7.6z',
        moon: 'M14.5 2.5A9.5 9.5 0 1 0 21.5 17 7.6 7.6 0 0 1 14.5 2.5z',
        ring: 'M13.2 2.1A10 10 0 0 1 21.9 10.8h-3.2a6.9 6.9 0 0 0-5.5-5.5zM10.8 2.1v3.2a6.9 6.9 0 0 0-5.5 5.5H2.1a10 10 0 0 1 8.7-8.7zM2.1 13.2h3.2a6.9 6.9 0 0 0 5.5 5.5v3.2a10 10 0 0 1-8.7-8.7zm11.1 5.5a6.9 6.9 0 0 0 5.5-5.5h3.2a10 10 0 0 1-8.7 8.7z',
        lock: 'M7 10V7.5a5 5 0 0 1 10 0V10h1.5v11h-13V10zm2.2 0h5.6V7.5a2.8 2.8 0 0 0-5.6 0z',
        trophy: 'M7 3h10v2h3.5v2.5A4.5 4.5 0 0 1 16.4 12a5 5 0 0 1-3.4 2.8V17h3v3H8v-3h3v-2.2A5 5 0 0 1 7.6 12a4.5 4.5 0 0 1-4.1-4.5V5H7zM5.4 7v.5c0 1.2.8 2.2 1.9 2.5A9 9 0 0 1 7 7zm11.3 0a9 9 0 0 1-.3 3c1.1-.3 1.9-1.3 1.9-2.5V7z',
        mail: 'M2 5h20v14H2zm2.2 2.2v.4l7.8 5.3 7.8-5.3v-.4zm0 2.9v6.7h15.6v-6.7L12 15.4z',
        monitor: 'M2 4h20v13H2zm2 2v9h16V6zm6.5 11h3v2.2H16V21H8v-1.8h2.5z',
        gear: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
    };

    function social(key) {
        const s = SOCIALS[key];
        return { label: s.name, icon: key, href: s.href, copy: s.copy };
    }

    let game = GAMES[0];
    try {
        game = GAMES.find((g) => g.id === localStorage.getItem('mz.game')) || game;
    } catch { /* storage unavailable */ }

    const discTile = {
        kind: 'disc',
        label: `Play ${game.short}`,
        screen: 'game',
        extra: [['x', 'Eject', eject], ['y', 'Game Details', () => openScreen('game')]],
    };

    const CHANNELS = [
        ...(CONTACT.email ? [{
            name: 'Contact',
            tiles: [{ label: 'Business Email', icon: 'mail', screen: 'messages' }],
        }] : []),
        {
            name: 'Friends',
            tiles: [{ kind: 'geobox', label: 'Geobox', screen: 'geobox' }],
        },
        {
            name: 'Socials',
            tiles: [
                { label: 'YouTube', icon: 'youtube', screen: 'youtube' },
                { label: 'Twitch', icon: 'twitch', screen: 'twitch' },
                social('tiktok'),
                social('x'),
                social('discord'),
            ],
        },
        {
            name: 'My Xbox',
            tiles: [
                discTile,
                { kind: 'gamercard', label: 'Gamer Profile', screen: 'profile', extra: [['y', 'Emote', () => playEmote()]] },
                { label: 'Game Library', icon: 'controller', screen: 'library' },
                ...(SETUP.length ? [{ label: 'My Setup', icon: 'monitor', screen: 'setup' }] : []),
                { label: 'System Settings', icon: 'gear', screen: 'settings' },
            ],
        },
    ];
    const DISC_CH = CHANNELS.findIndex((c) => c.tiles.includes(discTile));

    // Idle loop recorded from the 360sona avatar: colour on the left half, alpha on the right.
    // The still is its first frame, so the hand-off from image to video is seamless.
    const AVATAR_STILL = 'assets/avatar.webp';
    const AVATAR_VIDEO = [['assets/avatar.mp4', 'video/mp4'], ['assets/avatar.webm', 'video/webm']];
    // One-off emotes from the 360sona photo booth (same colour|alpha layout), played on Y / tapping the avatar.
    const EMOTES = ['wave', 'celebrate', 'laugh', 'pickme'];

    const GCOIN = '<svg class="gcoin" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.4" fill="none" stroke="#fff" stroke-width="1.7"/><text x="10" y="14.3" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fff" font-family="Segoe UI, Arial, sans-serif">G</text></svg>';

    const $ = (sel) => document.querySelector(sel);
    const stage = $('#stage');
    const channelsEl = $('#channels');
    const rowsEl = $('#rows');
    const countEl = $('#count');
    const screenEl = $('#screen');
    const toastEl = $('#toast');
    const srEl = $('#sr');
    const song = $('#song');
    const legendEl = $('#legend');

    const n = CHANNELS.length;
    let booting = true; // until the boot screen is dismissed
    const live = { on: false, game: '', title: '', viewers: 0, announced: false };
    const liveBadge = () => (live.on && live.viewers ? `LIVE · ${compact.format(live.viewers)}` : 'LIVE');
    const presence = () => (live.on ? (live.game ? `Streaming ${live.game}` : 'Live on Twitch') : 'Online');
    const state = {
        ch: n - 1,
        focus: CHANNELS.map(() => 0),
        screen: null,
        items: [],
        sel: 0,
        moves: 0,
        chSteps: 0,
    };

    // ── settings ───────────────────────────────────────────
    const store = {
        get(key, fallback) {
            try {
                const v = localStorage.getItem(key);
                return v === null ? fallback : v === '1';
            } catch {
                return fallback;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value ? '1' : '0');
            } catch { /* storage unavailable */ }
        },
    };
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const settings = {
        sound: store.get('mz.sound', true),
        motion: store.get('mz.motion', !prefersReduced),
        music: store.get('mz.music', true),
        dim: store.get('mz.dim', true),
        rumble: store.get('mz.rumble', true),
    };
    const setSetting = (key, value) => {
        settings[key] = value;
        store.set(`mz.${key}`, value);
        needsDraw = true;
    };

    // ── sound ──────────────────────────────────────────────
    const sfx = (() => {
        let ctx = null;
        let bus = null;
        let noiseBuf = null;
        const samples = {};

        function ensure() {
            if (!ctx) {
                const AC = window.AudioContext || window.webkitAudioContext;
                if (!AC) return null;
                ctx = new AC();
                const master = ctx.createGain();
                master.gain.value = 0.55;
                master.connect(ctx.destination);

                bus = ctx.createGain();
                bus.connect(master);
                const delay = ctx.createDelay();
                delay.delayTime.value = 0.11;
                const fb = ctx.createGain();
                fb.gain.value = 0.22;
                const wet = ctx.createGain();
                wet.gain.value = 0.18;
                bus.connect(delay);
                delay.connect(fb).connect(delay);
                delay.connect(wet).connect(master);

                noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
                const data = noiseBuf.getChannelData(0);
                for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

                for (const [name, url] of Object.entries(SFX_FILES)) {
                    fetch(url)
                        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
                        .then((buf) => ctx.decodeAudioData(buf))
                        .then((decoded) => { samples[name] = decoded; })
                        .catch(() => {});
                }
            }
            if (ctx.state === 'suspended') ctx.resume();
            return ctx;
        }

        function tone(freq, t0, dur, { type = 'sine', gain = 0.08, to = null, attack = 0.004 } = {}) {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = type;
            o.frequency.setValueAtTime(freq, t0);
            if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
            g.gain.setValueAtTime(0, t0);
            g.gain.linearRampToValueAtTime(gain, t0 + attack);
            g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
            o.connect(g).connect(bus);
            o.start(t0);
            o.stop(t0 + dur + 0.02);
        }

        function noise(t0, dur, { gain = 0.05, f0 = 800, f1 = 2400, q = 1 } = {}) {
            const src = ctx.createBufferSource();
            src.buffer = noiseBuf;
            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.Q.value = q;
            bp.frequency.setValueAtTime(f0, t0);
            bp.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
            const g = ctx.createGain();
            g.gain.setValueAtTime(0, t0);
            g.gain.linearRampToValueAtTime(gain, t0 + dur * 0.3);
            g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
            src.connect(bp).connect(g).connect(bus);
            src.start(t0);
            src.stop(t0 + dur + 0.02);
        }

        const play = (name, synth) => {
            if (!settings.sound || !ensure()) return;
            if (samples[name]) {
                const src = ctx.createBufferSource();
                src.buffer = samples[name];
                src.connect(bus);
                src.start();
                return;
            }
            synth(ctx.currentTime + 0.005);
        };

        return {
            unlock: () => ensure(),
            move: () => play('move', (t) => {
                noise(t, 0.09, { gain: 0.05, f0: 1800, f1: 3800, q: 0.9 });
                tone(1320, t, 0.05, { gain: 0.022, type: 'triangle' });
            }),
            bump: () => play('bump', (t) => tone(190, t, 0.09, { gain: 0.05, type: 'triangle', to: 140 })),
            channel: (dir) => play('channel', (t) => {
                noise(t, 0.26, { gain: 0.07, f0: dir > 0 ? 500 : 2200, f1: dir > 0 ? 2200 : 500, q: 0.8 });
                tone(dir > 0 ? 660 : 880, t + 0.02, 0.12, { gain: 0.02, to: dir > 0 ? 880 : 660 });
            }),
            select: () => play('select', (t) => {
                tone(1046.5, t, 0.12, { gain: 0.07, type: 'triangle' });
                tone(1568, t + 0.055, 0.2, { gain: 0.06, type: 'triangle' });
                noise(t, 0.08, { gain: 0.025, f0: 3000, f1: 6000 });
            }),
            back: () => play('back', (t) => {
                tone(1174.7, t, 0.1, { gain: 0.06, type: 'triangle' });
                tone(784, t + 0.05, 0.16, { gain: 0.055, type: 'triangle' });
            }),
            notify: () => play('notify', (t) => {
                [1318.5, 1760, 2093].forEach((f, i) => tone(f, t + i * 0.07, 0.7, { gain: 0.045 }));
            }),
            boot: () => play('boot', (t) => {
                noise(t, 1.3, { gain: 0.08, f0: 250, f1: 3200, q: 0.7 });
                [220, 329.63, 440, 554.37, 659.25].forEach((f, i) => tone(f, t + 1.15 + i * 0.03, 2.6, { gain: 0.032, attack: 0.12 }));
                [1760, 2217.46, 2637.02, 3520].forEach((f, i) => tone(f, t + 1.25 + i * 0.09, 0.9, { gain: 0.016, type: 'triangle' }));
            }),
            crash: () => play('crash', (t) => {
                for (let i = 0; i < 7; i++) tone(110 + (i % 2) * 9, t + i * 0.085, 0.08, { gain: 0.06, type: 'square' });
                noise(t, 0.6, { gain: 0.08, f0: 1400, f1: 260, q: 0.6 });
            }),
            guide: () => play('guide', (t) => {
                noise(t, 0.22, { gain: 0.06, f0: 600, f1: 3200, q: 0.8 });
                tone(784, t + 0.05, 0.18, { gain: 0.04, type: 'triangle' });
                tone(1174.7, t + 0.11, 0.35, { gain: 0.035, type: 'triangle' });
            }),
            signin: () => play('signin', (t) => {
                tone(659.25, t, 0.3, { gain: 0.05 });
                tone(987.77, t + 0.09, 0.6, { gain: 0.045 });
                tone(1318.5, t + 0.18, 0.7, { gain: 0.025, type: 'triangle' });
            }),
            achievement: () => play('achievement', (t) => {
                tone(330, t, 0.17, { gain: 0.075, to: 495 });
                tone(660, t, 0.13, { gain: 0.03, type: 'triangle', to: 990 });
                [1567.98, 2093, 2637.02].forEach((f, i) => tone(f, t + 0.1 + i * 0.014, 1.15 - i * 0.28, { gain: 0.05 / (i + 1) }));
                noise(t + 0.08, 0.35, { gain: 0.02, f0: 4000, f1: 9000, q: 0.7 });
            }),
            eject: () => play('eject', (t) => {
                tone(2200, t, 0.03, { gain: 0.04, type: 'square' });
                noise(t + 0.03, 0.55, { gain: 0.09, f0: 260, f1: 900, q: 2.5 });
                tone(110, t + 0.04, 0.5, { gain: 0.035, type: 'triangle', to: 150 });
                tone(1800, t + 0.6, 0.03, { gain: 0.035, type: 'square' });
            }),
        };
    })();

    // ── helpers ────────────────────────────────────────────
    const make = (tag, cls, text) => {
        const el = document.createElement(tag);
        if (cls) el.className = cls;
        if (text !== undefined) el.textContent = text;
        return el;
    };
    const glyph = (name) =>
        `<svg class="glyph" viewBox="0 0 24 24" aria-hidden="true"><path fill="url(#glyph-fill)" fill-rule="evenodd" d="${ICONS[name]}"/></svg>`;
    const icon = (name, cls) => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`;
    const songReady = () => song.readyState >= 1 && Number.isFinite(song.duration);
    const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
    const statText = (s) => (s.count == null ? s.handle : `${compact.format(s.count)} ${s.unit}`);
    const currentTile = () => CHANNELS[state.ch].tiles[state.focus[state.ch]];

    function scoreLine(cls) {
        const p = make('p', cls);
        p.innerHTML = `<span>${PROFILE.gamerscore}</span>${GCOIN}`;
        return p;
    }

    // ── themes ─────────────────────────────────────────────
    const KEEP_GREEN = new Set(['d6f7a0', '5aa818', '2f6a08']); // controller A button
    const COLOR_RE = /#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3})\b|(rgba?)\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/gi;
    const luma = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
        if (max === min) return [0, 0, l];
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        return [h * 60, s, l];
    }

    function hslToRgb(h, s, l) {
        const k = (n) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
        return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
    }

    // Greens (hue 45-165) squeezed around the theme hue, brightened towards the same perceived lightness
    // (lift: how far; purple reads dark, so matching it fully turns it neon).
    function shiftColor(r, g, b, hue, lift = 0.7) {
        if (KEEP_GREEN.has([r, g, b].map((v) => v.toString(16).padStart(2, '0')).join(''))) return null;
        const [h, s, l] = rgbToHsl(r, g, b);
        if (h < 45 || h > 165 || s < 0.03) return null;
        const nh = (hue + (h - 90) * 0.5 + 360) % 360;
        const ns = Math.min(1, s < 0.3 ? s : s * 1.05);
        const target = luma(r, g, b);
        let lo = 0, hi = 1;
        for (let i = 0; i < 24; i++) {
            const mid = (lo + hi) / 2;
            if (luma(...hslToRgb(nh, ns, mid)) < target) lo = mid;
            else hi = mid;
        }
        return hslToRgb(nh, ns, l + (lo - l) * lift);
    }

    function recolor(text, hue, lift) {
        return text.replace(COLOR_RE, (m, hex, fn, r, g, b, a) => {
            if (hex) {
                const t = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex;
                const n = shiftColor(...[0, 2, 4].map((i) => parseInt(t.slice(i, i + 2), 16)), hue, lift);
                return n ? `#${n.map((v) => v.toString(16).padStart(2, '0')).join('')}${t.slice(6)}` : m;
            }
            const n = shiftColor(Math.round(+r), Math.round(+g), Math.round(+b), hue, lift);
            return n ? `${fn}(${n.join(', ')}${a !== undefined ? `, ${a}` : ''})` : m;
        });
    }

    let theme = THEMES[0];
    try {
        theme = THEMES.find((t) => t.id === localStorage.getItem('mz.theme')) || theme;
    } catch { /* storage unavailable */ }
    const tc = (c) => (theme.hue ? recolor(c, theme.hue, theme.lift) : c);
    const mainCss = document.querySelector('link[rel="stylesheet"]');
    let baseCss = null;

    function applyTheme(t) {
        theme = t;
        try {
            localStorage.setItem('mz.theme', t.id);
        } catch { /* storage unavailable */ }
        let el = document.getElementById('theme-css');
        if (!t.hue) {
            if (el) el.remove();
            mainCss.disabled = false;
        } else {
            (baseCss ? Promise.resolve(baseCss) : fetch(mainCss.href).then((r) => r.text()).then((css) => (baseCss = css)))
                .then((css) => {
                    if (theme !== t) return;
                    if (!el) {
                        el = make('style');
                        el.id = 'theme-css';
                        document.head.append(el);
                    }
                    el.textContent = recolor(css, t.hue, t.lift);
                    mainCss.disabled = true;
                }, () => {});
        }
        document.querySelectorAll('#glyph-fill stop').forEach((stop) => {
            stop.dataset.c = stop.dataset.c || stop.getAttribute('stop-color');
            stop.setAttribute('stop-color', tc(stop.dataset.c));
        });
        const meta = document.querySelector('meta[name="theme-color"]');
        meta.dataset.c = meta.dataset.c || meta.content;
        meta.content = tc(meta.dataset.c);
        const logo = document.querySelector('.boot-orb');
        if (logo) logo.src = t.logo || 'assets/logo.webp';
        if (W) {
            paintStatic();
            needsDraw = true;
        }
    }

    function cycleTheme(d) {
        const i = THEMES.indexOf(theme);
        applyTheme(THEMES[(i + d + THEMES.length) % THEMES.length]);
        unlock('settings');
        themesTried.add(theme.id);
        saveJSON('mz.themes', [...themesTried]);
        if (THEMES.every((t) => themesTried.has(t.id))) unlock('style');
        if (theme.id === 'halloween') unlock('trick');
        toast(`Theme: ${theme.name}`, true);
    }

    let toastTimer;
    let toastUntil = 0;
    const heldToasts = [];
    function toast(msg, quiet, opts = {}) {
        if (achBusy) {
            heldToasts.push([msg, quiet, opts]);
            return;
        }
        const ms = opts.ms || 2600;
        toastUntil = performance.now() + ms;
        const span = toastEl.querySelector('span');
        span.textContent = msg;
        if (opts.sub) span.append(make('small', '', opts.sub));
        toastEl.querySelector('i').innerHTML = opts.icon || '';
        toastEl.classList.toggle('tip', !!opts.icon);
        toastEl.classList.add('show');
        if (!quiet) {
            sfx.notify();
            rumble('notify');
        }
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
    }

    // A white 360 pad: the guide button follows the theme, the face buttons keep their real colours.
    const PAD_ICON = '<svg viewBox="0 0 64 44" aria-hidden="true"><defs>' +
        '<linearGradient id="pad-shell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#d9dcdf"/><stop offset="1" stop-color="#8e9398"/></linearGradient></defs>' +
        '<path fill="url(#pad-shell)" stroke="rgba(0,0,0,.35)" d="M15 5.5C21 3 27 4 32 5c5-1 11-2 17 .5 6 2.6 10 11.5 12.4 23.5 1.4 7.5-2.4 12.4-7.3 10.6-3.8-1.4-6.4-6-9.1-9.6H19c-2.7 3.6-5.3 8.2-9.1 9.6C5 41.4 1.2 36.5 2.6 29 5 17 9 8.1 15 5.5Z"/>' +
        '<circle cx="17.5" cy="15" r="5" fill="#3a3d40"/><circle cx="17.5" cy="15" r="3.2" fill="#55595d"/>' +
        '<path fill="#3a3d40" d="M23.6 20h3v3.2h3.2v3h-3.2v3.2h-3v-3.2h-3.2v-3h3.2Z"/>' +
        '<circle cx="39.5" cy="24.5" r="4.6" fill="#3a3d40"/><circle cx="39.5" cy="24.5" r="2.9" fill="#55595d"/>' +
        '<circle class="pad-guide" cx="32" cy="12" r="3.6"/>' +
        '<circle cx="47" cy="9.8" r="2.5" fill="#e8b10f"/><circle cx="42.6" cy="14.2" r="2.5" fill="#2a7fe0"/>' +
        '<circle cx="51.4" cy="14.2" r="2.5" fill="#d8352a"/><circle cx="47" cy="18.6" r="2.5" fill="#5aa818"/></svg>';

    // ── controller rumble ──────────────────────────────────
    // Pulses are [ms, strong motor, weak motor] with a null as a gap. A new effect cancels the running one,
    // so a pattern is chained with timers. Only gamepads that expose a vibrationActuator (Chromium) buzz.
    let padIndex = -1;
    let rumbleRun = 0;
    const RUMBLE = {
        connect: [[220, 0, 0.6]],
        guide: [[70, 0, 0.5]],
        notify: [[90, 0.25, 0.5]],
        achievement: [[130, 0.55, 0.7], 90, [130, 0.55, 0.7]],
        eject: [[180, 0.7, 0.2]],
        crash: [[3000, 1, 0.8]],
    };
    function rumble(kind) {
        if (!settings.rumble || padIndex < 0 || !navigator.getGamepads) return;
        const gp = navigator.getGamepads()[padIndex];
        const act = gp && gp.connected && gp.vibrationActuator;
        if (!act || !act.playEffect) return;
        const run = ++rumbleRun;
        if (!achStore.rumble) setTimeout(() => unlock('rumble'), 1200);
        const step = (i) => {
            const p = RUMBLE[kind][i];
            if (p === undefined || run !== rumbleRun) return;
            if (typeof p === 'number') {
                setTimeout(() => step(i + 1), p);
                return;
            }
            act.playEffect('dual-rumble', { duration: p[0], strongMagnitude: p[1], weakMagnitude: p[2] }).catch(() => {});
            setTimeout(() => step(i + 1), p[0]);
        };
        step(0);
    }

    function copyText(text, what = 'Discord username') {
        if (what === 'Discord username') sawSocial('discord');
        const done = () => toast(`${what} copied: ${text}`);
        const fail = () => toast(`${what}: ${text}`);
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, fail);
        } else {
            fail();
        }
    }

    function openLink(href, src) {
        const key = Object.keys(SOCIALS).find((k) => SOCIALS[k].href && href.startsWith(SOCIALS[k].href));
        if (key) sawSocial(key);
        if (href.startsWith('mailto:')) {
            location.href = href; // hands off to the mail app; the dashboard stays put
            return;
        }
        // Always a new tab so visitors never leave the dashboard. Controller presses don't count as a click
        // to pop-up blockers, so if the browser refuses, explain instead of navigating away.
        const w = window.open(href, '_blank');
        if (w) w.opener = null;
        else toast(src === 'pad' ? 'Pop-up blocked: allow pop-ups for mewzah.tv to open links with a controller' : 'Pop-up blocked: allow pop-ups for mewzah.tv');
    }

    // Browsers only allow audio after a user gesture, so the song starts on the first input.
    let interacted = false;
    let musicStarted = false;
    function startMusic(force) {
        interacted = true;
        if ((musicStarted && !force) || !settings.music || !songReady()) return;
        if (state.screen === 'twitch' || (state.screen === 'youtube' && ytPlaying)) {
            musicHeld = true; // starts when the video screen closes
            return;
        }
        musicStarted = true;
        song.play().catch(() => { musicStarted = false; });
    }

    // Low-power modes can refuse muted autoplay; a user gesture always allows it.
    function wakeAvatar() {
        if (avatarVideo && avatarVideo.paused) avatarVideo.play().catch(() => {});
    }

    // ── achievements ───────────────────────────────────────
    const ACH_TOTAL = ACHIEVEMENTS.reduce((t, a) => t + a.g, 0);
    const readJSON = (key, fallback) => {
        try {
            return JSON.parse(localStorage.getItem(key)) || fallback;
        } catch {
            return fallback;
        }
    };
    const saveJSON = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch { /* storage unavailable */ }
    };
    const achStore = readJSON('mz.ach', {});
    const earnedG = () => ACHIEVEMENTS.reduce((t, a) => t + (achStore[a.id] ? a.g : 0), 0);
    const achQueue = [];
    let achBusy = false;
    let achReadyAt = 0;
    // Not spammy: unlocks that pile up share one pop-up, and a few seconds pass between achievement pop-ups.
    const ACH_GAP = 3000;
    let signedIn = false;
    let tunedTimer = 0;
    const KONAMI = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
    const konami = [];
    const socialsSeen = new Set();
    const played = new Set(readJSON('mz.played', []));
    const themesTried = new Set([...readJSON('mz.themes', []), theme.id]);

    function unlock(id) {
        const a = ACHIEVEMENTS.find((x) => x.id === id);
        if (!a || achStore[id]) return;
        achStore[id] = Date.now();
        saveJSON('mz.ach', achStore);
        achQueue.push(a);
        showAchievement();
        if (state.screen === 'achievements' || state.screen === 'profile') refreshScreen();
    }

    function sawSocial(key) {
        socialsSeen.add(key);
        if (socialsSeen.size >= 3) unlock('social');
    }

    function markPlayed(g) {
        played.add(g.id);
        saveJSON('mz.played', [...played]);
        if (GAMES.every((x) => played.has(x.id))) unlock('library');
    }

    // The 360 toast: the orb pops in, the bar unrolls to the right, holds, then rolls back into the orb.
    const ringSeg = (a0, a1, lit) => {
        const pt = (r, a) => `${(50 + r * Math.cos(a * Math.PI / 180)).toFixed(2)} ${(50 + r * Math.sin(a * Math.PI / 180)).toFixed(2)}`;
        return `<path fill="url(#ach-${lit ? 'lit' : 'seg'})" d="M${pt(45.5, a0)}A45.5 45.5 0 0 1 ${pt(45.5, a1)}L${pt(37.5, a1)}A37.5 37.5 0 0 0 ${pt(37.5, a0)}Z"/>`;
    };
    const ACH_ORB = '<svg viewBox="0 0 100 100" aria-hidden="true"><defs>' +
        '<radialGradient id="ach-sphere" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#e4e4e4"/><stop offset=".62" stop-color="#9c9c9c"/><stop offset="1" stop-color="#3a3a3a"/></radialGradient>' +
        '<linearGradient id="ach-x" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9ff7c"/><stop offset=".5" stop-color="#83d325"/><stop offset="1" stop-color="#3d8c0b"/></linearGradient>' +
        '<linearGradient id="ach-seg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9a9a9"/><stop offset="1" stop-color="#6a6a6a"/></linearGradient>' +
        '<linearGradient id="ach-lit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d2ff70"/><stop offset="1" stop-color="#6cc21c"/></linearGradient>' +
        '<radialGradient id="ach-glow"><stop offset="0" stop-color="#f4ffa8" stop-opacity=".85"/><stop offset="1" stop-color="#d8ff70" stop-opacity="0"/></radialGradient>' +
        '<clipPath id="ach-clip"><circle cx="50" cy="50" r="33.5"/></clipPath></defs>' +
        '<circle cx="50" cy="50" r="49" fill="#141414"/>' +
        ringSeg(187, 263, true) + ringSeg(277, 353) + ringSeg(7, 83) + ringSeg(97, 173) +
        '<circle cx="50" cy="50" r="35.5" fill="#0e0e0e"/><circle cx="50" cy="50" r="33.5" fill="url(#ach-sphere)"/>' +
        // the X: two blades, wide where they meet the sphere's edge and pinched where they cross
        '<g clip-path="url(#ach-clip)" fill="url(#ach-x)">' +
        '<path d="M16 29Q35 35 47 50Q58 64 63 88L77 81Q67 60 53 50Q40 39 29 15Z"/>' +
        '<path d="M84 29Q65 35 53 50Q42 64 37 88L23 81Q33 60 47 50Q60 39 71 15Z"/>' +
        '<circle cx="50" cy="50" r="10" fill="url(#ach-glow)"/></g>' +
        '<ellipse cx="40" cy="32" rx="14" ry="8.5" fill="#fff" opacity=".3"/></svg>';

    const achEl = make('div', 'ach');
    achEl.setAttribute('role', 'status');
    achEl.innerHTML = `<div class="ach-bar"><div class="ach-text"><p></p><p></p></div></div><div class="ach-orb">${ACH_ORB}</div>`;
    stage.append(achEl);
    achEl.addEventListener('click', () => {
        if (!booting && !state.screen) openScreen('achievements');
    });

    function showAchievement() {
        if (achBusy || booting || !achQueue.length) return;
        const wait = Math.max(toastUntil, achReadyAt) - performance.now();
        if (wait > 0) {
            setTimeout(showAchievement, wait + 200);
            return;
        }
        achBusy = true;
        const a = achQueue.shift();
        const signin = !!a.signin;
        const batch = [a];
        if (!signin) while (achQueue.length && !achQueue[0].signin) batch.push(achQueue.shift());
        const batchG = batch.reduce((t, x) => t + x.g, 0);
        if (signin) signedIn = true;
        const bar = achEl.querySelector('.ach-bar');
        const orb = achEl.querySelector('.ach-orb');
        const text = achEl.querySelector('.ach-text');
        const [l1, l2] = text.querySelectorAll('p');
        l1.textContent = signin ? `${PROFILE.tag} signed in` : batch.length > 1 ? `${batch.length} achievements unlocked` : 'Achievement unlocked';
        // two short names fit side by side; otherwise "+N more" keeps the pop-up clear of the button legend
        const names = batch.length === 2 && a.name.length + batch[1].name.length <= 18 ? `${a.name}, ${batch[1].name}`
            : batch.length > 1 ? `${a.name} +${batch.length - 1} more` : a.name;
        l2.textContent = signin ? '' : `${batch.length > 1 ? batchG : a.g}G - ${names}`;
        const H = 70;
        const W = Math.ceil(text.offsetLeft + text.offsetWidth + 30);
        achEl.style.width = `${W}px`;
        achEl.classList.add('show');
        if (signin) {
            sfx.signin();
            rumble('notify');
        } else {
            sfx.achievement();
            rumble('achievement');
        }
        const out = 'cubic-bezier(.2,.8,.2,1)';
        const anims = [
            orb.animate([
                { transform: 'scale(.2)', opacity: 0 },
                { transform: 'scale(1.1)', opacity: 1, offset: 0.7 },
                { transform: 'scale(1)', opacity: 1 },
            ], { duration: 260, easing: 'ease-out', fill: 'forwards' }),
            bar.animate([
                { width: `${H}px`, transform: 'scale(.2)', opacity: 0, easing: 'ease-out' },
                { width: `${H}px`, transform: 'scale(1)', opacity: 1, offset: 0.3, easing: out },
                { width: `${W}px`, transform: 'scale(1)', opacity: 1 },
            ], { duration: 640, fill: 'forwards' }),
            text.animate([{ opacity: 0 }, { opacity: 0, offset: 0.4 }, { opacity: 1 }], { duration: 640, fill: 'forwards' }),
        ];
        setTimeout(() => {
            const ease = 'cubic-bezier(.6,0,.8,.4)';
            const close = [
                text.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' }),
                bar.animate([
                    { width: `${W}px`, transform: 'scale(1)', opacity: 1, easing: ease },
                    { width: `${H}px`, transform: 'scale(1)', opacity: 1, offset: 0.62, easing: 'ease-in' },
                    { width: `${H}px`, transform: 'scale(.2)', opacity: 0 },
                ], { duration: 520, fill: 'forwards' }),
                orb.animate([
                    { transform: 'scale(1)', opacity: 1 },
                    { transform: 'scale(1)', opacity: 1, offset: 0.62 },
                    { transform: 'scale(.2)', opacity: 0 },
                ], { duration: 520, easing: 'ease-in', fill: 'forwards' }),
            ];
            close[1].finished.then(() => {
                achEl.classList.remove('show');
                [...anims, ...close].forEach((an) => an.cancel());
                achBusy = false;
                const held = heldToasts.pop();
                heldToasts.length = 0;
                if (held) toast(...held);
                const gap = signin ? 350 : ACH_GAP;
                achReadyAt = performance.now() + gap;
                setTimeout(showAchievement, gap);
                if (hintWanted && !achQueue.length) setTimeout(mouseHint, 900);
            });
        }, signin ? 3000 : 4800);
    }

    markPlayed(game);

    // Mouse visitors get one nudge (ever) toward the keys or a controller, after sign-in and any achievements.
    let hintDone = readJSON('mz.hint', false);
    let hintWanted = false;
    function mouseHint() {
        if (hintDone || booting || !signedIn || achBusy || achQueue.length) return;
        const wait = toastUntil - performance.now();
        if (wait > 0) {
            setTimeout(mouseHint, wait + 400);
            return;
        }
        hintDone = true;
        saveJSON('mz.hint', true);
        toast('Best played with a controller or the arrow keys', false, {
            icon: PAD_ICON,
            sub: 'Arrows to move · Enter to select · Esc to go back',
            ms: 6500,
        });
    }
    addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || hintDone || hintWanted) return;
        hintWanted = true;
        setTimeout(mouseHint, 900);
    }, { passive: true });

    // ── guide ──────────────────────────────────────────────
    // The Xbox Guide: a panel over whatever is open, with Socials / Xbox Guide / Settings tabs.
    const guide = { open: false, tab: 1, sel: 0, items: [] };
    const guideEl = make('div', 'guide');
    guideEl.setAttribute('role', 'dialog');
    guideEl.setAttribute('aria-label', 'Xbox Guide');
    guideEl.setAttribute('aria-hidden', 'true');
    guideEl.innerHTML = '<div class="gd-panel"><div class="gd-head"><img class="gd-pic" alt=""><div class="gd-who"><p class="gd-tag"></p><p class="gd-score"></p></div></div>' +
        '<div class="gd-tabs"></div><p class="gd-tab-name"></p><div class="gd-list"></div>' +
        '<p class="gd-foot"><span><b class="pad pad-a">A</b>Select</span><span><b class="pad pad-b">B</b>Close</span></p></div>';
    guideEl.querySelector('.gd-pic').src = PROFILE.gamerpic;
    guideEl.querySelector('.gd-tag').textContent = PROFILE.tag;
    guideEl.querySelector('.gd-score').innerHTML = `<span>${PROFILE.gamerscore}</span>${GCOIN}`;
    stage.append(guideEl);
    guideEl.addEventListener('click', (e) => {
        if (e.target === guideEl) closeGuide();
    });

    // Opens a screen from the Guide, whether or not another screen is already up.
    function goScreen(key) {
        closeGuide(true);
        openScreen(key);
    }

    function goHome() {
        closeGuide(true);
        if (state.screen) closeScreen();
        const home = CHANNELS.length - 1;
        if (state.ch !== home) gotoChannel(home, 1);
        const f = state.focus[state.ch];
        if (f) moveTile(-f);
    }

    const GUIDE_TABS = [
        {
            name: 'Socials',
            icon: 'people',
            items: () => Object.entries(SOCIALS).map(([key, s]) => ({
                label: s.name,
                icon: key,
                value: () => statText(s),
                run: (src) => {
                    if (key === 'youtube' || key === 'twitch') goScreen(key);
                    else if (s.href) openLink(s.href, src);
                    else copyText(s.copy);
                },
            })),
        },
        {
            name: 'Xbox Guide',
            icon: 'home',
            items: () => [
                { label: 'Achievements', icon: 'trophy', value: () => `${earnedG()} / ${ACH_TOTAL}G`, run: () => goScreen('achievements') },
                { label: 'Gamer Profile', icon: 'card', run: () => goScreen('profile') },
                { label: 'Game Library', icon: 'disc', value: () => game.short, run: () => goScreen('library') },
                { label: 'Geobox', icon: 'ticket', value: () => (GEOBOX.code ? `code ${GEOBOX.code}` : ''), run: () => goScreen('geobox') },
                ...(CONTACT.email ? [{ label: 'Contact', icon: 'mail', value: () => 'Business email', run: () => goScreen('messages') }] : []),
                { label: 'Xbox Dashboard', icon: 'channels', run: goHome },
            ],
        },
        { name: 'Settings', icon: 'gear', items: () => SETTINGS.map((d) => ({ ...d })) },
    ];

    function renderGuide() {
        const tabs = guideEl.querySelector('.gd-tabs');
        tabs.replaceChildren(...GUIDE_TABS.map((t, i) => {
            const b = make('button', `gd-tab${i === guide.tab ? ' on' : ''}`);
            b.type = 'button';
            b.innerHTML = icon(t.icon, 'gd-ico');
            b.setAttribute('aria-label', t.name);
            b.addEventListener('click', () => guideTab(i - guide.tab));
            return b;
        }));
        guideEl.querySelector('.gd-tab-name').textContent = GUIDE_TABS[guide.tab].name;
        const list = guideEl.querySelector('.gd-list');
        guide.items = GUIDE_TABS[guide.tab].items();
        list.replaceChildren(...guide.items.map((it, i) => {
            const b = make('button', 'gd-item');
            b.type = 'button';
            const lbl = make('span', 'lbl');
            if (it.icon) lbl.innerHTML = icon(it.icon, 'ico');
            lbl.append(it.label);
            b.append(lbl, make('span', 'val', it.value ? it.value() : ''));
            b.addEventListener('click', () => {
                guide.sel = i;
                paintGuideSel();
                guideInput('a', 'pointer');
            });
            it.el = b;
            return b;
        }));
        guide.sel = Math.min(guide.sel, guide.items.length - 1);
        paintGuideSel();
    }

    function paintGuideSel() {
        guide.items.forEach((it, i) => {
            it.el.classList.toggle('sel', i === guide.sel);
            if (it.value) it.el.lastChild.textContent = it.value();
        });
        const cur = guide.items[guide.sel];
        srEl.textContent = cur ? `Guide, ${GUIDE_TABS[guide.tab].name}: ${cur.label}` : 'Guide';
    }

    function guideTab(d) {
        if (!d) return;
        guide.tab = (guide.tab + d + GUIDE_TABS.length) % GUIDE_TABS.length;
        guide.sel = 0;
        sfx.channel(d);
        renderGuide();
    }

    function openGuide() {
        if (guide.open) return;
        guide.open = true;
        guide.tab = 1;
        guide.sel = 0;
        renderGuide();
        stage.classList.add('guide-open');
        guideEl.setAttribute('aria-hidden', 'false');
        sfx.guide();
        rumble('guide');
    }

    function closeGuide(quiet) {
        if (!guide.open) return;
        guide.open = false;
        stage.classList.remove('guide-open');
        guideEl.setAttribute('aria-hidden', 'true');
        if (!quiet) sfx.back();
        announce();
    }

    function guideInput(action, src) {
        const cur = guide.items[guide.sel];
        switch (action) {
            case 'up':
            case 'down': {
                const next = guide.sel + (action === 'down' ? 1 : -1);
                if (next < 0 || next >= guide.items.length) {
                    sfx.bump();
                    return;
                }
                guide.sel = next;
                sfx.move();
                paintGuideSel();
                break;
            }
            case 'left':
            case 'right': {
                const d = action === 'right' ? 1 : -1;
                if (cur && cur.cycle) {
                    cur.cycle(d);
                    sfx.move();
                    paintGuideSel();
                } else {
                    guideTab(d);
                }
                break;
            }
            case 'a':
                if (!cur) return;
                sfx.select();
                cur.run(src);
                if (guide.open) paintGuideSel();
                break;
            case 'b':
            case 'guide':
                closeGuide();
                break;
        }
    }

    // ── red ring of death ──────────────────────────────────
    // Hold Eject on the disc tile for three seconds: the dashboard freezes, the console's ring shows three
    // red lights, then it "reboots" and a secret achievement pops.
    let rrodTimer = 0;
    let rebooting = false;
    let crashing = false;
    function holdEject(on) {
        clearTimeout(rrodTimer);
        if (on && !booting && !state.screen && !guide.open && currentTile() === discTile) rrodTimer = setTimeout(redRing, 3000);
    }

    const RING = (() => {
        const seg = (a0, a1, cls) => {
            const pt = (r, a) => `${(50 + r * Math.cos(a * Math.PI / 180)).toFixed(2)} ${(50 + r * Math.sin(a * Math.PI / 180)).toFixed(2)}`;
            return `<path class="${cls}"${cls === 'red' ? ' filter="url(#rr-glow)"' : ''} d="M${pt(46, a0)}A46 46 0 0 1 ${pt(46, a1)}L${pt(36, a1)}A36 36 0 0 0 ${pt(36, a0)}Z"/>`;
        };
        return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="rr-btn" cx="40%" cy="32%" r="75%"><stop offset="0" stop-color="#f4f4f4"/><stop offset=".55" stop-color="#b9b9b9"/><stop offset="1" stop-color="#6c6c6c"/></radialGradient>' +
            '<filter id="rr-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' +
            '<circle cx="50" cy="50" r="49" fill="#111"/>' + seg(187, 263, 'off') + seg(277, 353, 'red') + seg(7, 83, 'red') + seg(97, 173, 'red') +
            '<circle cx="50" cy="50" r="31" fill="#090909"/><circle cx="50" cy="50" r="28.5" fill="url(#rr-btn)"/>' +
            '<path d="M50 36v13M41.5 41.5a12 12 0 1 0 17 0" fill="none" stroke="#5a5a5a" stroke-width="3.6" stroke-linecap="round"/></svg>';
    })();

    function redRing() {
        if (booting || crashing || state.screen || guide.open || currentTile() !== discTile) return;
        crashing = true;
        closeGuide(true);
        song.pause();
        sfx.crash();
        rumble('crash');
        stage.classList.add('crash');
        setTimeout(() => {
            stage.classList.remove('crash');
            const el = make('div', 'rrod');
            el.setAttribute('role', 'alert');
            el.innerHTML = `<div class="rr-ring">${RING}</div><p class="rr-msg">General hardware failure</p><p class="rr-sub">Please contact Xbox Support.</p>`;
            document.body.append(el);
            setTimeout(() => { el.querySelector('.rr-sub').textContent = '...just kidding.'; }, 3600);
            setTimeout(() => {
                el.classList.add('out');
                setTimeout(() => el.remove(), 700);
                rebooting = true;
                crashing = false;
                document.body.dataset.crashed = '1';
                showBoot();
                bootPress();
            }, 5400);
        }, 900);
    }

    // ── live numbers from data/stats.json ──────────────────
    let latest = null;

    function applyStats(d) {
        const yt = d && d.youtube;
        if (!yt) return;
        if (Number.isFinite(yt.subscribers)) SOCIALS.youtube.count = yt.subscribers;
        if (yt.latest && yt.latest.id) latest = yt.latest;
        document.querySelectorAll('[data-count="youtube"]').forEach((el) => { el.textContent = compact.format(SOCIALS.youtube.count); });
    }
    fetch(STATS_URL, { cache: 'no-cache' }).then((r) => (r.ok ? r.json() : null)).then(applyStats, () => {});

    function eject() {
        rumble('eject'); // before unlock, so a first-time achievement's buzz wins
        unlock('eject');
        sfx.eject();
        toast('Disc tray open', true);
    }

    function renderLegend() {
        const entries = [];
        if (state.screen) {
            if (state.items.length) entries.push(['a', 'Select']);
            entries.push(['b', 'Back']);
        } else {
            entries.push(['a', 'Select']);
            (currentTile().extra || []).forEach(([btn, label]) => entries.push([btn, label]));
        }
        legendEl.replaceChildren(...entries.map(([btn, label]) => {
            const b = make('button');
            b.type = 'button';
            b.append(make('b', `pad pad-${btn}`, btn.toUpperCase()), document.createTextNode(label));
            b.addEventListener('click', () => input(btn, 'pointer'));
            if (btn === 'x') {
                b.addEventListener('pointerdown', () => holdEject(true));
                ['pointerup', 'pointerleave', 'pointercancel'].forEach((type) => b.addEventListener(type, () => holdEject(false)));
            }
            return b;
        }));
    }

    function announce() {
        if (state.screen) {
            srEl.textContent = screenEl.querySelector('.title').textContent;
            return;
        }
        const ch = CHANNELS[state.ch];
        const f = state.focus[state.ch];
        srEl.textContent = `${ch.name}: ${ch.tiles[f].label}, ${f + 1} of ${ch.tiles.length}`;
    }

    // ── channel labels ─────────────────────────────────────
    const SLOTS = [
        { y: 0, s: 1, o: 1 },
        { y: -49, s: 0.68, o: 0.78 },
        { y: -83, s: 0.55, o: 0.6 },
        { y: -111, s: 0.45, o: 0.45 },
        { y: -137, s: 0.41, o: 0.3 },
    ];
    const slotOf = (i, cur) => {
        const d = (i - cur + n) % n;
        return d === 0 ? 0 : -(n - d);
    };
    function slotStyle(slot) {
        if (slot > 0) return { transform: `translateY(${40 * slot}px) scale(1)`, opacity: 0 };
        const k = -slot;
        const v = SLOTS[Math.min(k, SLOTS.length - 1)];
        const extra = Math.max(0, k - (SLOTS.length - 1));
        return { transform: `translateY(${v.y - extra * 20}px) scale(${v.s})`, opacity: extra ? 0 : v.o };
    }
    const hidden = (style) => ({ ...style, opacity: 0 });

    const chEls = CHANNELS.map((c, i) => {
        const b = make('button', 'ch', c.name);
        b.type = 'button';
        b.tabIndex = -1;
        b.addEventListener('click', () => {
            const slot = slotOf(i, state.ch);
            if (slot < 0) gotoChannel(i, -1, -slot);
        });
        channelsEl.append(b);
        return b;
    });
    const chSlots = [];

    function layoutChannels(animate) {
        chEls.forEach((el, i) => {
            const slot = slotOf(i, state.ch);
            const from = chSlots[i];
            chSlots[i] = slot;
            const to = slotStyle(slot);
            if (animate && from !== undefined && from !== slot) {
                let frames;
                if (slot > from + 1) {
                    frames = [slotStyle(from), { ...hidden(slotStyle(from - 1)), offset: 0.45 }, { ...hidden(slotStyle(slot + 1)), offset: 0.46 }, to];
                } else if (slot < from - 1) {
                    frames = [slotStyle(from), { ...hidden(slotStyle(from + 1)), offset: 0.45 }, { ...hidden(slotStyle(slot - 1)), offset: 0.46 }, to];
                } else {
                    frames = [slotStyle(from), to];
                }
                el.animate(frames, { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
            }
            el.style.transform = to.transform;
            el.style.opacity = to.opacity;
            el.style.pointerEvents = slot < 0 && to.opacity > 0 ? 'auto' : 'none';
            el.classList.toggle('cur', slot === 0);
        });
    }

    // ── tile row ───────────────────────────────────────────
    const TILE_POS = [
        { x: 0, top: 0, s: 1, r: 0 },
        { x: 420, top: 35, s: 0.74, r: 4 },
        { x: 731, top: 54, s: 0.59, r: 26 },
        { x: 915, top: 68, s: 0.49, r: 40 },
        { x: 1037, top: 77, s: 0.42, r: 49 },
        { x: 1123, top: 84, s: 0.37, r: 54 },
    ];
    function tileStyle(k) {
        if (k < 0) return { t: `translate(${-470 + k * 40}px, 0px) scale(1) perspective(900px) rotateY(0deg)`, o: 0, z: 60 };
        const off = k >= TILE_POS.length;
        const v = TILE_POS[Math.min(k, TILE_POS.length - 1)];
        const y = v.top - (1 - v.s) * 160;
        return {
            t: `translate(${v.x + (off ? 80 : 0)}px, ${y}px) scale(${v.s}) perspective(900px) rotateY(${v.r}deg)`,
            o: off ? 0 : 1,
            z: 50 - k,
        };
    }

    function makeTile(t) {
        const el = make(t.href ? 'a' : 'button', 'tile');
        el.tabIndex = -1;
        el.setAttribute('aria-label', t.label);
        if (t.href) {
            el.href = t.href;
            el.target = '_blank';
            el.rel = 'noopener';
        } else {
            el.type = 'button';
        }
        if (t.kind === 'gamercard') {
            el.append(make('span', 't-title', PROFILE.tag), scoreLine('t-score'), make('span', 't-mini', 'Socials'));
            const socials = make('span', 't-socials');
            ['youtube', 'twitch', 'tiktok', 'x'].forEach((key) => {
                const s = make('span', 't-soc');
                s.innerHTML = icon(key, '');
                if (SOCIALS[key].count != null) {
                    const c = make('i', '', compact.format(SOCIALS[key].count));
                    c.dataset.count = key;
                    s.append(c);
                }
                socials.append(s);
            });
            const loc = make('span', 't-loc', PROFILE.location);
            loc.lang = 'ja';
            el.append(socials, make('span', 't-status', presence()), loc);
        } else if (t.kind === 'geobox') {
            el.classList.add('t-geobox');
            el.insertAdjacentHTML('beforeend', '<span class="gbx-glyph" aria-hidden="true"></span>');
            el.append(make('span', 'partner-badge', 'PARTNER'), make('span', 't-label', t.label));
            if (GEOBOX.code) {
                const code = make('span', 'gbx-code', 'code ');
                code.append(make('b', '', GEOBOX.code));
                el.append(code);
            }
        } else if (t.kind === 'disc') {
            el.classList.add('t-disc');
            el.style.setProperty('--art', `url("${game.art}")`);
            el.append(make('span', 't-label t-wrap', t.label), make('span', 'disc-badge'));
        } else {
            el.insertAdjacentHTML('beforeend', glyph(t.icon));
            el.append(make('span', 't-label', t.label));
            if (t.icon === 'twitch') el.append(make('span', 'live-badge', liveBadge()));
        }
        return el;
    }

    let row = null;
    function buildRow(ci) {
        const el = make('div', 'row');
        const tiles = CHANNELS[ci].tiles.map((t, i) => {
            const tile = makeTile(t);
            tile.addEventListener('click', (e) => onTileClick(e, ci, i));
            el.append(tile);
            return tile;
        });
        rowsEl.append(el);
        return { el, tiles, ci };
    }

    // One avatar for the whole session: re-parenting or rebuilding the iframe would reload it.
    const AV_CH = CHANNELS.findIndex((c) => c.tiles.some((t) => t.kind === 'gamercard'));
    const AV_TILE = AV_CH < 0 ? -1 : CHANNELS[AV_CH].tiles.findIndex((t) => t.kind === 'gamercard');
    const avatarLayer = make('div', 'avatar-layer');
    const avatarEl = make('div', 'avatar');
    const still = make('img', 'av-still');
    still.src = AVATAR_STILL;
    still.alt = '';
    still.draggable = false;
    avatarEl.append(still);
    avatarLayer.append(avatarEl);
    rowsEl.append(avatarLayer);
    let playEmote = () => {};
    const avatarVideo = startAvatarVideo();
    // Tapping the avatar plays an emote (only while its tile is focused; otherwise taps go to the tiles).
    avatarEl.addEventListener('click', () => {
        if (!state.screen && !guide.open && state.ch === AV_CH && state.focus[AV_CH] === AV_TILE) playEmote();
    });

    // Browsers can't play video with transparency everywhere (Safari), so the alpha travels as
    // a second picture beside the colour and a tiny WebGL shader recombines them.
    function startAvatarVideo() {
        const view = make('canvas', 'av-anim');
        const gl = view.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
        if (!gl) return null;

        const shader = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };
        const prog = gl.createProgram();
        gl.attachShader(prog, shader(gl.VERTEX_SHADER,
            'attribute vec2 p;varying vec2 uv;void main(){uv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}'));
        gl.attachShader(prog, shader(gl.FRAGMENT_SHADER,
            'precision mediump float;varying vec2 uv;uniform sampler2D t;void main(){' +
            'vec3 c=texture2D(t,vec2(uv.x*.5,uv.y)).rgb;float a=texture2D(t,vec2(.5+uv.x*.5,uv.y)).r;' +
            'a=clamp((a-.02)/.96,0.,1.);gl_FragColor=vec4(min(c,vec3(a)),a);}'));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
        gl.useProgram(prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'p');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR],
            [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]
            .forEach(([k, v]) => gl.texParameteri(gl.TEXTURE_2D, k, v));

        const video = make('video', 'av-src');
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        AVATAR_VIDEO.forEach(([src, type]) => {
            const s = make('source');
            s.src = src;
            s.type = type;
            video.append(s);
        });

        const draw = (v) => {
            if (v.readyState < 2) return false;
            if (view.width !== v.videoWidth / 2 || view.height !== v.videoHeight) {
                view.width = v.videoWidth / 2;
                view.height = v.videoHeight;
                gl.viewport(0, 0, view.width, view.height);
            }
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, v);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            avatarEl.classList.add('live');
            return true;
        };
        // The one canvas shows either the idle loop or an emote; switching never adds a second WebGL layer.
        let token = 0;
        const run = (v, first) => {
            const t = ++token;
            let fresh = true;
            const step = () => {
                if (t !== token) return;
                if (draw(v) && fresh) {
                    fresh = false;
                    if (first) first();
                }
                if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(step);
                else requestAnimationFrame(step);
            };
            step();
        };
        video.addEventListener('playing', () => run(video), { once: true });

        const emote = make('video', 'av-src');
        emote.muted = true;
        emote.playsInline = true;
        emote.preload = 'auto';
        emote.setAttribute('muted', '');
        emote.setAttribute('playsinline', '');
        let emoting = false;
        let last = -1;
        playEmote = () => {
            if (emoting || !avatarEl.classList.contains('live')) return;
            let i;
            do i = Math.floor(Math.random() * EMOTES.length); while (EMOTES.length > 1 && i === last);
            last = i;
            emoting = true;
            emote.replaceChildren(...[['mp4', 'video/mp4'], ['webm', 'video/webm']].map(([ext, type]) => {
                const src = make('source');
                src.src = `assets/emotes/${EMOTES[i]}.${ext}`;
                src.type = type;
                return src;
            }));
            emote.load();
            const back = () => {
                emoting = false;
                run(video, () => view.classList.remove('emote'));
            };
            emote.onended = back;
            emote.onerror = back;
            emote.addEventListener('playing', () => {
                run(emote, () => view.classList.add('emote'));
                unlock('wave');
            }, { once: true });
            emote.play().catch(back);
        };

        avatarEl.append(view, video, emote);
        video.play().catch(() => {});
        return video;
    }

    // Keeps the avatar standing at the right edge of its tile, upright (no tilt).
    // Hidden means 0.001, not 0: at zero opacity browsers drop the WebGL layer, and rebuilding it
    // when the avatar comes back stalls phones for long enough to swallow the slide animation.
    const AV_HIDDEN = 0.001;
    function avatarStyle(k) {
        if (k < 0) return { t: `translate(${-470 + k * 40}px, 0px) scale(1)`, o: AV_HIDDEN };
        const v = TILE_POS[Math.min(k, TILE_POS.length - 1)];
        return { t: `translate(${v.x + v.s * 214}px, ${v.top - v.s * 52}px) scale(${v.s})`, o: k >= TILE_POS.length ? AV_HIDDEN : 1 };
    }

    const enterAnim = (el, st, delay) => el.animate(
        [{ transform: st.t.replace(/^translate\(([-\d.]+)px/, (m, x) => `translate(${+x + 320}px`), opacity: 0 }, { transform: st.t, opacity: st.o }],
        { duration: 700, delay, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' },
    );

    function layoutRow(enterFromRight) {
        const f = state.focus[state.ch];
        row.tiles.forEach((el, i) => {
            const st = tileStyle(i - f);
            el.style.transform = st.t;
            el.style.opacity = st.o;
            el.style.zIndex = st.z;
            el.classList.toggle('focus', i === f);
            if (enterFromRight) enterAnim(el, st, 120 + i * 60);
        });
        if (state.ch === AV_CH) {
            const st = avatarStyle(AV_TILE - f);
            avatarEl.style.transform = st.t;
            avatarEl.style.opacity = st.o;
            avatarEl.classList.toggle('hit', f === AV_TILE);
            if (enterFromRight) enterAnim(avatarEl, st, 120 + AV_TILE * 60);
        }
        countEl.textContent = `${f + 1} of ${row.tiles.length}`;
        renderLegend();
        announce();
    }

    function onTileClick(e, ci, i) {
        if (state.screen || ci !== state.ch) {
            e.preventDefault();
            return;
        }
        const t = CHANNELS[ci].tiles[i];
        if (i !== state.focus[ci]) {
            e.preventDefault();
            moveTile(i - state.focus[ci]);
            return;
        }
        if (t.href) {
            sfx.select();
            if (SOCIALS[t.icon]) sawSocial(t.icon);
            return;
        }
        e.preventDefault();
        activate('pointer');
    }

    // ── navigation ─────────────────────────────────────────
    function moveTile(d) {
        const f = state.focus[state.ch] + d;
        if (f < 0 || f >= row.tiles.length) {
            sfx.bump();
            return;
        }
        state.focus[state.ch] = f;
        state.moves += d;
        cam.tx = state.moves * 46;
        sfx.move();
        layoutRow();
    }

    const visited = new Set([state.ch]);
    function gotoChannel(i, dir, steps = 1) {
        if (state.screen || i === state.ch) return;
        state.ch = i;
        visited.add(i);
        if (visited.size === n) unlock('surfer');
        state.chSteps += dir * steps;
        cam.ty = state.chSteps * 70;
        sfx.channel(dir);

        const old = row;
        row = buildRow(i);
        row.el.classList.add('no-anim');
        layoutRow();
        requestAnimationFrame(() => requestAnimationFrame(() => row.el.classList.remove('no-anim')));

        const ease = 'cubic-bezier(.2,.8,.2,1)';
        old.el.style.pointerEvents = 'none';
        old.el.animate([{ transform: 'none', opacity: 1 }, { transform: `translateY(${-dir * 90}px)`, opacity: 0 }], { duration: 360, easing: ease, fill: 'forwards' })
            .finished.then(() => old.el.remove(), () => old.el.remove());
        row.el.animate([{ transform: `translateY(${dir * 90}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 420, easing: ease });

        if (old.ci === AV_CH) {
            avatarEl.classList.remove('hit');
            avatarLayer.animate([{ transform: 'none', opacity: 1 }, { transform: `translateY(${-dir * 90}px)`, opacity: AV_HIDDEN }], { duration: 360, easing: ease, fill: 'forwards' });
        } else if (i === AV_CH) {
            avatarLayer.getAnimations().forEach((a) => a.cancel());
            avatarLayer.animate([{ transform: `translateY(${dir * 90}px)`, opacity: AV_HIDDEN }, { transform: 'none', opacity: 1 }], { duration: 420, easing: ease });
        }

        layoutChannels(true);
    }

    function activate(src) {
        if (state.screen) {
            const item = state.items[state.sel];
            if (!item) {
                sfx.bump();
                return;
            }
            sfx.select();
            item.run(src);
            return;
        }
        const f = state.focus[state.ch];
        const t = CHANNELS[state.ch].tiles[f];
        row.tiles[f].animate([{ filter: 'brightness(1.4)' }, { filter: 'brightness(1)' }], { duration: 320 });
        sfx.select();
        if (t.href) openLink(t.href, src);
        else if (t.copy) copyText(t.copy);
        else if (t.screen) openScreen(t.screen);
    }

    function back() {
        if (!state.screen) return;
        sfx.back();
        closeScreen();
    }

    function toggleSound() {
        setSetting('sound', !settings.sound);
        if (settings.sound) sfx.select();
        toast(settings.sound ? 'Sound effects on' : 'Sound effects off');
        if (state.screen === 'settings') refreshScreen();
    }

    // ── screens ────────────────────────────────────────────
    const SCREENS = {
        profile: { title: 'Gamer Profile', render: renderProfile },
        youtube: { title: 'YouTube', render: renderYouTube },
        twitch: { title: 'Twitch', render: renderTwitch },
        game: { title: 'Game Details', render: renderGame },
        library: { title: 'Game Library', render: renderLibrary },
        achievements: { title: 'Achievements', render: renderAchievements },
        messages: { title: 'Business Email', render: renderMessages },
        setup: { title: 'My Setup', render: renderSetup },
        geobox: { title: 'Geobox', render: renderGeobox },
        settings: { title: 'System Settings', render: renderSettings },
    };

    function item(parent, label, run, value, iconName) {
        const b = make('button', 'item');
        b.type = 'button';
        const lbl = make('span', 'lbl');
        if (iconName) lbl.innerHTML = icon(iconName, 'ico');
        lbl.append(label);
        b.append(lbl);
        if (value !== undefined) b.append(make('span', 'val', value));
        parent.append(b);
        const entry = { el: b, run };
        b.addEventListener('click', () => {
            state.sel = state.items.indexOf(entry);
            highlight();
            activate('pointer');
        });
        return entry;
    }

    function renderProfile(body) {
        const card = make('div', 'panel gamercard');
        const pic = make('img', 'gc-pic');
        pic.alt = '';
        pic.src = PROFILE.gamerpic;
        const info = make('div', 'gc-info');
        const status = make('p', 'gc-status');
        status.append(make('i', 'dot'), make('span', 'presence', presence()));
        const dl = make('dl');
        const loc = make('dd', '', PROFILE.location);
        loc.lang = 'ja';
        dl.append(make('dt', '', 'Location'), loc);
        info.append(make('p', 'gc-tag', PROFILE.tag), scoreLine('gc-score'), status, dl);
        card.append(pic, info);

        const list = make('div', 'list compact');
        const ach = item(list, 'Achievements', () => openScreen('achievements'), `${earnedG()} / ${ACH_TOTAL}G`, 'trophy');
        list.append(make('p', 'list-head', 'Social Stats'));
        body.append(card, list);
        return [ach, ...Object.entries(SOCIALS).map(([key, s]) =>
            item(list, s.name, (src) => (s.href ? openLink(s.href, src) : copyText(s.copy)), statText(s), key))];
    }

    function renderEmbed(body, src, label) {
        const panel = make('div', 'panel embed');
        const frame = make('iframe');
        frame.src = src;
        frame.title = label;
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        panel.append(frame);
        body.append(panel);
        return frame;
    }

    // The upload waits for a press of play. With enablejsapi the player reports its state over postMessage
    // once told someone is listening, so the music stops (and Tuned In counts) only while it really plays.
    const YT_ORIGIN = 'https://www.youtube-nocookie.com';
    let ytHeard = false;
    let ytPlaying = false;
    function renderYouTube(body) {
        const s = SOCIALS.youtube;
        const frame = renderEmbed(body, `${YT_ORIGIN}/embed/videoseries?list=${s.uploads}&rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`, `${s.name}: latest uploads`);
        ytHeard = false;
        ytPlaying = false;
        frame.addEventListener('load', () => {
            let tries = 0;
            const hello = () => {
                if (ytHeard || !frame.isConnected || ++tries > 20) return;
                frame.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 'mz-yt', channel: 'widget' }), YT_ORIGIN);
                setTimeout(hello, 500);
            };
            hello();
        });
        const list = make('div', 'list compact');
        list.append(make('p', 'list-head', statText(s)));
        if (latest) list.append(make('p', 'list-sub', `Latest: ${latest.title}`));
        body.append(list);
        return [
            item(list, 'Open Channel', (src) => openLink(s.href, src), undefined, 'youtube'),
            item(list, 'Subscribe', (src) => openLink(`${s.href}?sub_confirmation=1`, src)),
        ];
    }

    addEventListener('message', (e) => {
        if (e.origin !== YT_ORIGIN || state.screen !== 'youtube') return;
        let data;
        try {
            data = JSON.parse(e.data);
        } catch {
            return;
        }
        ytHeard = true;
        const ps = data.event === 'onStateChange' ? data.info : data.info && data.info.playerState;
        if (ps === 1 || ps === 0 || ps === 2) ytPlaying = ps === 1;
        if (ps === 1) {
            if (!song.paused) {
                song.pause();
                musicHeld = true;
            }
            if (!tunedTimer) tunedTimer = setTimeout(() => state.screen === 'youtube' && unlock('tuned'), 8000);
        } else if (ps === 0 || ps === 2) {
            clearTimeout(tunedTimer);
            tunedTimer = 0;
        }
    });

    // Clicking into the YouTube/Twitch player moves keyboard focus into it; take it back so Esc/B and the arrows work.
    addEventListener('blur', () => setTimeout(() => {
        const el = document.activeElement;
        if (el && el.tagName === 'IFRAME' && state.screen) el.blur();
    }, 300));

    function renderTwitch(body) {
        const s = SOCIALS.twitch;
        renderEmbed(body, `https://player.twitch.tv/?channel=${encodeURIComponent(s.handle)}&parent=${location.hostname}&autoplay=true&muted=false`, `${s.name}: ${s.handle}`);
        const list = make('div', 'list compact');
        list.append(make('p', 'list-head', twitchHead()), make('p', 'list-sub'));
        body.append(list);
        requestAnimationFrame(paintTwitchHead);
        return [item(list, 'Open on Twitch', (src) => openLink(s.href, src), undefined, 'twitch')];
    }

    // A playable mock of Geobox's Discord search panel, after the demo on geobox.ai.
    const gbx = { region: 0, mode: 0, timers: [], items: null };
    const regionName = () => GEOBOX.regions[gbx.region].split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

    function gbxStop() {
        gbx.timers.forEach(clearTimeout);
        gbx.timers = [];
    }

    function gbxStatus(msg, phase) {
        const card = screenEl.querySelector('.gbx-card');
        if (!card) return;
        card.querySelector('.gbx-msg').textContent = msg;
        card.dataset.phase = phase;
        const fill = card.querySelector('.gbx-bar i');
        if (phase === 'search') {
            fill.style.transition = 'none';
            fill.style.width = '0%';
            void fill.offsetWidth;
            fill.style.transition = 'width 2.6s linear';
            fill.style.width = '100%';
        } else if (phase === 'done') {
            fill.style.transition = 'width .2s ease-out';
            fill.style.width = '100%';
        } else if (phase === 'idle') {
            fill.style.transition = 'none';
            fill.style.width = '0%';
        }
    }

    function gbxPaint() {
        const panel = screenEl.querySelector('.gbx');
        if (!panel) return;
        const region = GEOBOX.regions[gbx.region];
        panel.querySelectorAll('.gbx-regions li').forEach((li, i) => li.classList.toggle('on', i === gbx.region));
        panel.querySelector('.gbx-chan b').textContent = `# ${region}`;
        panel.querySelector('.gbx-mode').textContent = GEOBOX.modes[gbx.mode];
        if (gbx.items) {
            gbx.items.region.el.querySelector('.val').textContent = regionName();
            gbx.items.mode.el.querySelector('.val').textContent = GEOBOX.modes[gbx.mode];
        }
        gbxStatus('Idle · pick a region and mode, then search', 'idle');
    }

    function gbxCycle(key, d) {
        const len = key === 'region' ? GEOBOX.regions.length : GEOBOX.modes.length;
        gbx[key] = (gbx[key] + d + len) % len;
        gbxStop();
        gbxPaint();
    }

    function gbxSearch() {
        gbxStop();
        const region = GEOBOX.regions[gbx.region];
        const mode = GEOBOX.modes[gbx.mode];
        const map = mode.startsWith('Resurgence') ? ' · Rebirth Island' : '';
        gbxStatus(`Searching #${region} · ${mode}`, 'search');
        gbx.timers.push(setTimeout(() => {
            gbxStatus('Bots joined your party · 3BOX active', 'search');
            sfx.move();
        }, 1700));
        gbx.timers.push(setTimeout(() => {
            gbxStatus(`Lobby found${map} · party code sent`, 'done');
            unlock('lobby');
            toast(`Geobox: lobby found in ${regionName()}`);
        }, 2800));
    }

    function renderGeobox(body) {
        const panel = make('div', 'panel gbx');
        panel.innerHTML =
            '<div class="gbx-side"><p class="gbx-server"><span class="gbx-mini"></span>Geobox</p>' +
            '<p class="gbx-cat">Warzone 3box regions</p><ul class="gbx-regions"></ul></div>' +
            '<div class="gbx-main"><p class="gbx-chan"><b></b><span>Lobbies, Resurgence, BR, Casuals &amp; LTMs</span></p>' +
            '<div class="gbx-card" data-phase="idle"><p class="gbx-card-title">Geobox Search Panel</p>' +
            '<dl><dt>User</dt><dd class="gbx-user"></dd><dt>Mode</dt><dd class="gbx-mode"></dd><dt>3BOX</dt><dd>Active <i class="gbx-ok"></i></dd></dl>' +
            '<div class="gbx-status"><p class="gbx-msg"></p><div class="gbx-bar"><i></i></div></div>' +
            '<p class="gbx-note"><b>Smart Search</b> avoids matching with other Geobox users. <b>Party Code</b> sends you the bot\'s party code to join.</p></div>' +
            '<div class="gbx-btns"><span class="gbx-go">▶ Search</span><span>⚡ Smart Search</span><span>♥ Favorite Search</span></div></div>';
        panel.querySelector('.gbx-user').textContent = PROFILE.tag;
        const ul = panel.querySelector('.gbx-regions');
        GEOBOX.regions.forEach((r) => ul.append(make('li', '', `# ${r}`)));
        const list = make('div', 'list compact');
        list.append(make('p', 'list-head', GEOBOX.code ? `Use code ${GEOBOX.code}` : 'Automated 2box & 3box for Warzone'));
        body.append(panel, list);

        const search = item(list, 'Search', () => gbxSearch());
        const region = item(list, 'Region', () => gbxCycle('region', 1), regionName());
        const mode = item(list, 'Mode', () => gbxCycle('mode', 1), GEOBOX.modes[gbx.mode]);
        region.cycle = (d) => gbxCycle('region', d);
        mode.cycle = (d) => gbxCycle('mode', d);
        gbx.items = { region, mode };
        const items = [search, region, mode];
        if (GEOBOX.code) {
            items.push(item(list, `Copy code ${GEOBOX.code}`, () => {
                unlock('code');
                copyText(GEOBOX.code, 'Geobox code');
            }));
        }
        items.push(item(list, 'Get Geobox', (src) => openLink(GEOBOX.href, src)));
        requestAnimationFrame(gbxPaint);
        return items;
    }

    function renderGame(body) {
        const panel = make('div', 'panel player');
        const art = make('div', 'art game-art');
        art.style.setProperty('--art', `url("${game.art}")`);
        const info = make('div', 'pl-info');
        info.append(make('p', 'pl-title wrap', game.title), make('p', 'pl-sub', 'Xbox 360'));
        panel.append(art, info);
        const list = make('div', 'list');
        body.append(panel, list);
        return [item(list, 'Eject Disc', eject), item(list, 'Game Library', () => openScreen('library'))];
    }

    function discFor(g) {
        const disc = make('div', 'disc');
        if (g.disc) {
            const img = make('img', 'disc-face');
            img.src = g.disc;
            img.alt = '';
            disc.append(img);
        } else {
            disc.classList.add('printed');
            disc.style.setProperty('--art', `url("${g.art}")`);
            disc.append(make('span', 'disc-band', 'XBOX 360'));
        }
        return disc;
    }

    // Spinning disc of the highlighted game; A puts it in the tray and swaps the dashboard's disc tile.
    function renderLibrary(body) {
        const panel = make('div', 'panel library');
        const spin = make('div', 'disc-spin');
        const info = make('div', 'pl-info');
        const title = make('p', 'pl-title wrap');
        const sub = make('p', 'pl-sub');
        info.append(title, make('p', 'pl-sub', 'Xbox 360'), sub);
        spin.append(make('div', 'disc-sheen'));
        panel.append(spin, info);
        const list = make('div', 'list compact');
        list.append(make('p', 'list-head', `${GAMES.length} ${GAMES.length === 1 ? 'game' : 'games'}`));
        body.append(panel, list);

        let shown = null;
        const show = (g) => {
            if (g === shown) return;
            shown = g;
            const old = spin.querySelector('.disc');
            if (old) old.remove();
            spin.prepend(discFor(g));
            title.textContent = g.title;
            sub.textContent = g === game ? 'In the disc tray' : 'Press A to play';
        };
        const entries = GAMES.map((g) => {
            const entry = item(list, g.short, () => insertGame(g, spin), g === game ? 'In tray' : undefined);
            entry.focus = () => show(g);
            return entry;
        });
        state.sel = Math.max(0, GAMES.indexOf(game));
        return entries;
    }

    function insertGame(g, spin) {
        if (g === game) {
            closeScreen();
            focusDiscTile();
            return;
        }
        sfx.eject();
        spin.classList.add('inserting');
        game = g;
        try {
            localStorage.setItem('mz.game', g.id);
        } catch { /* storage unavailable */ }
        markPlayed(g);
        discTile.label = `Play ${g.short}`;
        setTimeout(() => {
            closeScreen();
            const tile = row.ci === DISC_CH ? row.tiles[CHANNELS[DISC_CH].tiles.indexOf(discTile)] : null;
            if (tile) {
                tile.setAttribute('aria-label', discTile.label);
                tile.style.setProperty('--art', `url("${g.art}")`);
                tile.querySelector('.t-label').textContent = discTile.label;
            }
            focusDiscTile();
            sfx.notify();
            toast(`${g.short} inserted`);
        }, 650);
    }

    function focusDiscTile() {
        const d = CHANNELS[DISC_CH].tiles.indexOf(discTile) - state.focus[state.ch];
        if (row.ci === DISC_CH && d) moveTile(d);
    }

    function achIcon(a, got, cls) {
        const el = make('div', `ach-icon ${cls}`);
        if (!got) {
            el.classList.add('locked');
            el.innerHTML = glyph('lock');
        } else if (a.icon === 'geobox') {
            el.classList.add('ach-geobox');
        } else {
            el.innerHTML = glyph(a.icon);
        }
        return el;
    }

    // Scrolls a clipped list so the selected row is fully in view (by whole rows when the list is all rows).
    function keepVisible(box, el) {
        const rowsOnly = box.classList.contains('scroller');
        const stride = el.offsetHeight + 6;
        let top = box.scrollTop;
        if (el.offsetTop < top) top = rowsOnly ? el.offsetTop : Math.max(0, el.offsetTop - 8);
        else if (el.offsetTop + el.offsetHeight > top + box.clientHeight) {
            const need = el.offsetTop + el.offsetHeight - box.clientHeight;
            top = rowsOnly ? Math.ceil(need / stride) * stride : need + 8;
        }
        if (top !== box.scrollTop) box.scrollTo({ top, behavior: 'smooth' });
    }

    // Phones: stack each screen's panel over its list, fitted to the visible width, with the list scrolling above the legend.
    function fitScreen() {
        const body = screenEl.querySelector('.body');
        const parts = [...body.children];
        const scroller = body.querySelector('.scroller');
        body.style.width = '';
        parts.forEach((el) => {
            el.style.transform = '';
            el.style.left = '';
            el.style.top = '';
            el.style.width = '';
            el.style.maxHeight = '';
        });
        if (scroller) scroller.style.height = '';
        if (!view.portrait) return;
        const width = view.r - view.m - 24;
        const room = view.b - 104 - body.offsetTop;
        body.style.width = `${width}px`;
        let y = 0;
        parts.forEach((el) => {
            if (el.classList.contains('panel')) {
                const k = Math.min(1, width / el.offsetWidth, (room * 0.52) / el.offsetHeight);
                el.style.transform = `scale(${k})`;
                y += el.offsetHeight * k + 20;
            } else if (el.classList.contains('list')) {
                el.style.left = '0px';
                el.style.top = `${y}px`;
                el.style.width = `${width}px`;
                el.style.maxHeight = `${Math.max(120, room - y)}px`;
                if (scroller) scroller.style.height = `${Math.max(110, room - y - scroller.offsetTop)}px`;
            }
        });
        const cur = state.items[state.sel];
        if (cur) keepVisible(cur.el.parentElement, cur.el);
    }

    function renderAchievements(body) {
        const panel = make('div', 'panel player ach-detail');
        const info = make('div', 'pl-info');
        const wrap = make('div', 'list compact');
        const got = ACHIEVEMENTS.filter((a) => achStore[a.id]).length;
        const scroller = make('div', 'scroller');
        wrap.append(make('p', 'list-head', `${earnedG()} of ${ACH_TOTAL}G · ${got} of ${ACHIEVEMENTS.length} unlocked`), scroller);
        body.append(panel, wrap);
        const show = (a) => {
            const have = !!achStore[a.id];
            const hidden = a.secret && !have;
            const score = make('p', 'pl-sub ach-score');
            score.innerHTML = `<span>${a.g}</span>${GCOIN}`;
            info.replaceChildren(
                make('p', 'pl-title wrap', hidden ? 'Secret Achievement' : a.name),
                score,
                make('p', 'ach-desc', hidden ? 'Continue playing to unlock this secret achievement.' : a.desc),
                make('p', 'ach-when', have ? `Unlocked ${new Date(achStore[a.id]).toLocaleDateString()}` : 'Locked'),
            );
            panel.replaceChildren(achIcon(a, have, 'big'), info);
        };
        return ACHIEVEMENTS.map((a) => {
            const have = !!achStore[a.id];
            const entry = item(scroller, a.secret && !have ? 'Secret Achievement' : a.name, () => {}, `${a.g}G`, have ? 'trophy' : 'lock');
            if (!have) entry.el.classList.add('locked');
            entry.focus = () => show(a);
            return entry;
        });
    }

    function renderMessages(body) {
        const panel = make('div', 'panel player');
        const art = make('div', 'art');
        art.innerHTML = glyph('mail');
        const info = make('div', 'pl-info');
        info.append(make('p', 'pl-title', 'Business'), make('p', 'pl-sub', CONTACT.email), make('p', 'ach-desc', 'Sponsorships, collaborations and other enquiries.'));
        panel.append(art, info);
        const list = make('div', 'list');
        body.append(panel, list);
        return [
            item(list, 'Send Email', (src) => openLink(`mailto:${CONTACT.email}`, src), undefined, 'mail'),
            item(list, 'Copy Email', () => copyText(CONTACT.email, 'Email')),
        ];
    }

    function renderSetup(body) {
        const list = make('div', 'list wide');
        body.append(list);
        return SETUP.map((g) => {
            const entry = item(list, g.label, (src) => (g.href ? openLink(g.href, src) : sfx.bump()), g.item);
            if (g.href) entry.el.classList.add('has-link');
            return entry;
        });
    }

    // Shared by System Settings and the Guide: label, current value, and what A / left-right do.
    const onOff = (v) => (v ? 'On' : 'Off');
    function toggleSetting(key) {
        unlock('settings');
        if (key === 'sound') {
            toggleSound();
            return;
        }
        setSetting(key, !settings[key]);
        if (key === 'music') {
            if (settings.music) startMusic(true);
            else song.pause();
        }
        if (key === 'rumble' && settings.rumble) rumble('connect');
    }
    const SETTINGS = [
        { label: 'Sound Effects', value: () => onOff(settings.sound), run: () => toggleSetting('sound') },
        { label: 'Background Music', value: () => onOff(settings.music), run: () => toggleSetting('music') },
        { label: 'Background Motion', value: () => onOff(settings.motion), run: () => toggleSetting('motion') },
        { label: 'Screen Dimming', value: () => onOff(settings.dim), run: () => toggleSetting('dim') },
        { label: 'Controller Vibration', value: () => onOff(settings.rumble), run: () => toggleSetting('rumble') },
        { label: 'Theme', value: () => theme.name, run: () => cycleTheme(1), cycle: (d) => cycleTheme(d) },
    ];

    function renderSettings(body) {
        const list = make('div', 'list wide');
        body.append(list);
        return SETTINGS.map((def) => {
            const entry = item(list, def.label, () => {
                def.run();
                entry.el.lastChild.textContent = def.value();
            }, def.value());
            if (def.cycle) {
                entry.cycle = (d) => {
                    def.cycle(d);
                    entry.el.lastChild.textContent = def.value();
                };
            }
            return entry;
        });
    }

    function highlight() {
        state.items.forEach((it, i) => it.el.classList.toggle('sel', i === state.sel));
        const cur = state.items[state.sel];
        if (!cur) return;
        if (cur.focus) cur.focus();
        const box = cur.el.parentElement;
        if (box.scrollHeight > box.clientHeight + 1) keepVisible(box, cur.el);
    }

    function renderScreen() {
        const def = SCREENS[state.screen];
        screenEl.querySelector('.crumb').textContent = CHANNELS[state.ch].name;
        screenEl.querySelector('.title').textContent = def.title;
        const body = screenEl.querySelector('.body');
        body.replaceChildren();
        state.items = def.render(body);
        state.sel = Math.min(state.sel, Math.max(0, state.items.length - 1));
        fitScreen();
        highlight();
        renderLegend();
    }

    // The dashboard music would fight the video's audio, so it pauses while a video screen is open.
    const VIDEO_SCREENS = new Set(['youtube', 'twitch']);
    let musicHeld = false;

    function openScreen(key) {
        // a history entry per open screen, so a phone's back gesture closes it instead of leaving the site
        if (!state.screen) {
            try {
                history.pushState({ mzScreen: true }, '');
            } catch { /* history unavailable */ }
        }
        // Twitch starts on its own, so the music makes way at once; YouTube waits for its player to say so.
        if (key === 'twitch' && !song.paused) {
            song.pause();
            musicHeld = true;
        }
        if (state.screen) {
            gbxStop();
            gbx.items = null;
            clearTimeout(tunedTimer);
            tunedTimer = 0;
            screenEl.querySelectorAll('iframe').forEach((f) => f.remove());
            if (musicHeld && !VIDEO_SCREENS.has(key)) {
                musicHeld = false;
                if (settings.music) song.play().catch(() => {});
            }
        }
        state.screen = key;
        state.sel = 0;
        renderScreen();
        if (key === 'profile') unlock('profile');
        if (key === 'youtube' || key === 'twitch') sawSocial(key);
        if (key === 'twitch' && live.on) unlock('front');
        stage.classList.add('in-screen');
        screenEl.setAttribute('aria-hidden', 'false');
        announce();
    }

    function refreshScreen() {
        if (state.screen) renderScreen();
    }

    function closeScreen(fromHistory) {
        if (!fromHistory && history.state && history.state.mzScreen) history.back();
        clearTimeout(tunedTimer);
        tunedTimer = 0;
        gbxStop();
        gbx.items = null;
        // Hidden screens stay in the DOM for the fade-out; embedded players must go now or they keep playing.
        screenEl.querySelectorAll('iframe').forEach((f) => f.remove());
        if (musicHeld) {
            musicHeld = false;
            if (settings.music) song.play().catch(() => {});
        }
        state.screen = null;
        state.items = [];
        stage.classList.remove('in-screen');
        screenEl.setAttribute('aria-hidden', 'true');
        renderLegend();
        announce();
    }

    function moveSel(d) {
        if (!state.items.length) return;
        const next = state.sel + d;
        if (next < 0 || next >= state.items.length) {
            sfx.bump();
            return;
        }
        state.sel = next;
        sfx.move();
        highlight();
    }

    addEventListener('popstate', () => {
        if (!state.screen) return;
        sfx.back();
        closeScreen(true);
    });

    // ── input ──────────────────────────────────────────────
    function input(action, src) {
        if (crashing) return;
        if (src === 'key' || src === 'pad') hintDone = true;
        if (booting) {
            if (src !== 'wheel') bootPress();
            return;
        }
        if (guide.open) {
            guideInput(action, src);
            return;
        }
        if (action === 'guide') {
            openGuide();
            return;
        }
        konami.push(action);
        if (konami.length > KONAMI.length) konami.shift();
        if (konami.join() === KONAMI.join()) unlock('konami');
        switch (action) {
            case 'left':
            case 'right': {
                const d = action === 'right' ? 1 : -1;
                const focused = state.screen && state.items[state.sel];
                if (!state.screen) moveTile(d);
                else if (focused && focused.cycle) {
                    focused.cycle(d);
                    sfx.move();
                }
                break;
            }
            case 'up':
            case 'down': {
                const d = action === 'down' ? 1 : -1;
                if (state.screen) moveSel(d);
                else gotoChannel((state.ch + d + n) % n, d);
                break;
            }
            case 'a': activate(src); break;
            case 'b': back(); break;
            case 'x':
            case 'y': {
                if (state.screen) break;
                const extra = (currentTile().extra || []).find(([btn]) => btn === action);
                if (extra) extra[2]();
                break;
            }
        }
    }

    // ── screen dimming ─────────────────────────────────────
    // A few idle minutes dim the dashboard. The first press (key, tap, click, wheel or pad button) only wakes it.
    const DIM_AFTER = 3 * 60 * 1000;
    const veil = make('div', 'dim-veil');
    document.body.append(veil);
    let lastActive = performance.now();
    let dimmed = false;
    let wokeAt = -1e9;
    function wake(swallow) {
        lastActive = performance.now();
        if (!dimmed) return false;
        dimmed = false;
        document.body.classList.remove('dimmed');
        if (swallow) wokeAt = lastActive;
        setTimeout(() => unlock('still'), 600);
        return true;
    }
    const justWoke = () => performance.now() - wokeAt < 700;
    setInterval(() => {
        if (dimmed || !settings.dim || booting || document.hidden || document.querySelector('.rrod')) return;
        if (state.screen && VIDEO_SCREENS.has(state.screen)) return; // a video may be playing
        if (performance.now() - lastActive > DIM_AFTER) {
            dimmed = true;
            document.body.classList.add('dimmed');
        }
    }, 1000);
    addEventListener('pointerdown', () => wake(true), true);
    addEventListener('pointermove', () => wake(false), { passive: true });
    addEventListener('touchstart', () => wake(true), { passive: true, capture: true });
    addEventListener('click', (e) => {
        if (!justWoke()) return;
        e.stopPropagation();
        e.preventDefault();
    }, true);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) lastActive = performance.now();
    });

    const KEYS = {
        ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
        Enter: 'a', ' ': 'a', Escape: 'b', Backspace: 'b', a: 'a', A: 'a', b: 'b', B: 'b', x: 'x', X: 'x', y: 'y', Y: 'y',
        Home: 'guide', g: 'guide', G: 'guide',
    };
    let lastMove = 0;
    addEventListener('keydown', (e) => {
        const woke = wake(true);
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const action = KEYS[e.key];
        if (!action) return;
        e.preventDefault();
        if (woke) return;
        sfx.unlock();
        startMusic();
        wakeAvatar();
        const isDir = action === 'left' || action === 'right' || action === 'up' || action === 'down';
        if (e.repeat && (!isDir || booting)) return;
        if (action === 'x') holdEject(true);
        if (isDir) {
            const now = performance.now();
            const gap = action === 'up' || action === 'down' ? (e.repeat ? 280 : 60) : (e.repeat ? 120 : 40);
            if (now - lastMove < gap) return;
            lastMove = now;
        }
        input(action, 'key');
    });

    addEventListener('keyup', (e) => {
        if (KEYS[e.key] === 'x') holdEject(false);
    });

    ['pointerdown', 'pointerup', 'touchend'].forEach((type) => addEventListener(type, () => {
        sfx.unlock();
        startMusic();
        wakeAvatar();
    }, { passive: true }));

    let wheelAt = 0;
    addEventListener('wheel', (e) => {
        if (e.ctrlKey) return; // browser zoom / trackpad pinch
        e.preventDefault();
        if (wake(true)) return;
        const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
        const delta = horizontal ? e.deltaX || e.deltaY : e.deltaY;
        if (Math.abs(delta) < 4) return;
        const now = performance.now();
        if (now - wheelAt < (horizontal ? 160 : 380)) return;
        wheelAt = now;
        if (horizontal) input(delta > 0 ? 'right' : 'left', 'wheel');
        else input(delta > 0 ? 'down' : 'up', 'wheel');
    }, { passive: false });

    let touch = null;
    addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        touch = { x: t.clientX, y: t.clientY };
    }, { passive: true });
    addEventListener('touchend', (e) => {
        if (!touch) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touch.x;
        const dy = t.clientY - touch.y;
        touch = null;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 36 || justWoke()) return;
        if (Math.abs(dx) > Math.abs(dy)) input(dx < 0 ? 'right' : 'left', 'touch');
        else input(dy < 0 ? 'down' : 'up', 'touch');
    });

    const pad = { prev: {}, next: {} };
    function pollPad(now) {
        if (!navigator.getGamepads) return;
        let gp = null;
        for (const g of navigator.getGamepads()) {
            if (g && g.connected) {
                gp = g;
                break;
            }
        }
        if (!gp) {
            padIndex = -1;
            return;
        }
        padIndex = gp.index;
        const btn = (i) => !!(gp.buttons[i] && gp.buttons[i].pressed);
        const ax = gp.axes;
        const held = {
            left: btn(14) || ax[0] < -0.55,
            right: btn(15) || ax[0] > 0.55,
            up: btn(12) || ax[1] < -0.55,
            down: btn(13) || ax[1] > 0.55,
            a: btn(0),
            b: btn(1),
            x: btn(2),
            y: btn(3),
            guide: btn(16) || btn(8),
        };
        if (gp.buttons.some((b) => b.pressed) || Object.values(held).some(Boolean)) {
            if (wake(true)) {
                Object.assign(pad.prev, held); // the waking press must not also act
                return;
            }
            lastActive = performance.now();
        }
        for (const key of Object.keys(held)) {
            const on = held[key];
            const vertical = key === 'up' || key === 'down';
            const isDir = vertical || key === 'left' || key === 'right';
            if (on && !pad.prev[key]) {
                input(key, 'pad');
                pad.next[key] = now + (vertical ? 420 : 340);
            } else if (on && isDir && !booting && now >= pad.next[key]) {
                input(key, 'pad');
                pad.next[key] = now + (vertical ? 300 : 140);
            }
            if (key === 'x' && on !== !!pad.prev.x) holdEject(on);
            pad.prev[key] = on;
        }
    }
    addEventListener('gamepadconnected', (e) => {
        padIndex = e.gamepad.index;
        toast('Controller connected');
        rumble('connect');
    });
    const orbEl = $('#orb');
    orbEl.setAttribute('role', 'button');
    orbEl.setAttribute('aria-label', 'Open the Guide');
    orbEl.removeAttribute('aria-hidden');
    orbEl.addEventListener('click', () => input('guide', 'pointer'));

    // ── background ─────────────────────────────────────────
    const canvas = $('#bg');
    const g = canvas.getContext('2d');
    let W = 0, H = 0, DPR = 1, S = 1, OX = 0, OY = 0;
    let needsDraw = true;
    const cam = { x: 0, y: 0, tx: 0, ty: 0 };

    // The visible part of the 1280x720 stage. Phones show its left side at full height and stack screens.
    const view = { portrait: false, r: 1280, b: 720, m: 96 };

    function resize() {
        W = document.documentElement.clientWidth || innerWidth;
        H = innerHeight;
        DPR = Math.min(devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(W * DPR);
        canvas.height = Math.round(H * DPR);
        const portrait = W < H;
        S = portrait ? Math.min(H / 720, W / 530) : Math.min(W / 1280, H / 720);
        OX = portrait ? 0 : (W - 1280 * S) / 2;
        OY = (H - 720 * S) / 2;
        stage.style.transform = `translate(${OX}px, ${OY}px) scale(${S})`;
        Object.assign(view, { portrait, r: Math.min(1280, (W - OX) / S), b: portrait ? (H - OY) / S : 720, m: portrait ? 40 : 96 });
        stage.style.setProperty('--view-r', `${view.r}px`);
        stage.style.setProperty('--view-b', `${view.b}px`);
        stage.style.setProperty('--m', `${view.m}px`);
        stage.style.setProperty('--edge', portrait ? '24px' : '72px');
        document.body.classList.toggle('portrait', portrait);
        if (state.screen) fitScreen();
        paintStatic();
        needsDraw = true;
    }
    addEventListener('resize', resize);

    let seed = 7;
    const rand = () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const bokeh = Array.from({ length: 64 }, () => {
        const ring = rand() < 0.5;
        const big = rand() < 0.14;
        return {
            ring,
            x: rand() * 1880 - 300,
            y: rand() * 900 - 400,
            r: big ? 60 + rand() * 50 : ring ? 8 + rand() * 34 : 6 + rand() * 40,
            depth: 0.25 + rand() * 0.9,
            a: (big ? 0.025 : 0.04) + rand() * 0.07,
            vx: (rand() - 0.5) * 9,
            phase: rand() * Math.PI * 2,
        };
    });

    const FLOOR = { cx: 500, cy: 1900, rx: 2600, ry: 1520 };
    const ORB = { x: 1157, y: 664 };
    let clock = 0;

    // Everything that doesn't move is painted once per resize; each frame only blits these
    // layers and draws the drifting bokeh sprites and floor ripples.
    const layer = () => document.createElement('canvas');
    const backC = layer();
    const floorC = layer();
    const frontC = layer();
    let sprites = [];

    // ── seasonal looks ─────────────────────────────────────
    // A theme with a `season` also repaints the sky and floor and drifts scenery over the background.
    // They are picked by hand in the theme setting and added in the month they belong to; nothing switches by date.
    const SEASONS = {
        halloween: {
            sky: [[0, '#12031f'], [0.2, '#2d0b4e'], [0.42, '#6a1f6e'], [0.66, '#d4561f'], [0.82, '#f59a3c'], [0.9, '#ffd79a'], [1, '#fff0d4']],
            haze: 'rgba(255,170,70,.5)', haze0: 'rgba(255,170,70,0)',
            floor: [[0, '#e9dccf'], [0.16, '#b9a79a'], [0.42, '#7b6a66'], [0.75, '#4b3f48'], [1, '#2c2433']],
            vig: 'rgba(14,0,24,.62)', vig0: 'rgba(14,0,24,0)',
            bokeh: '255,170,70',
        },
    };
    const seasonNow = () => SEASONS[theme.season];
    const between = (a, b) => a + Math.random() * (b - a);
    const scenery = {};
    let emberSprite = null;

    // Painted once per resize into the back layer (stage coordinates).
    function paintSeasonStatic(c, x0, y0) {
        if (theme.season !== 'halloween') return;
        const [mx, my, mr] = view.portrait ? [250, 62, 40] : [900, 150, 62];
        const mg = c.createRadialGradient(mx, my, mr * 0.5, mx, my, mr * 4.2);
        mg.addColorStop(0, 'rgba(255,230,170,.5)');
        mg.addColorStop(1, 'rgba(255,230,170,0)');
        c.fillStyle = mg;
        c.fillRect(mx - mr * 4.2, my - mr * 4.2, mr * 8.4, mr * 8.4);
        const disc = c.createRadialGradient(mx - mr * 0.2, my - mr * 0.2, mr * 0.06, mx, my, mr);
        disc.addColorStop(0, '#fffbe6');
        disc.addColorStop(1, '#f1d48e');
        c.fillStyle = disc;
        c.beginPath();
        c.arc(mx, my, mr, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(190,150,80,.28)';
        [[-0.32, -0.29, 0.18], [0.29, 0.26, 0.13], [-0.06, 0.42, 0.1], [0.4, -0.35, 0.08]].forEach(([dx, dy, r]) => {
            c.beginPath();
            c.arc(mx + dx * mr, my + dy * mr, r * mr, 0, Math.PI * 2);
            c.fill();
        });
        // cobweb in the top-left corner
        c.strokeStyle = 'rgba(255,255,255,.3)';
        c.lineWidth = 1.2;
        const L = view.portrait ? 120 : 190;
        const rays = [0, 15, 32, 50, 68, 90].map((d) => (d * Math.PI) / 180);
        rays.forEach((a) => {
            c.beginPath();
            c.moveTo(x0, y0);
            c.lineTo(x0 + Math.cos(a) * L, y0 + Math.sin(a) * L);
            c.stroke();
        });
        for (let ring = 1; ring <= 5; ring++) {
            const r = (ring / 5) * L;
            c.beginPath();
            rays.forEach((a, i) => {
                const px = x0 + Math.cos(a) * r, py = y0 + Math.sin(a) * r;
                if (!i) c.moveTo(px, py);
                else {
                    const m = (rays[i - 1] + a) / 2;
                    c.quadraticCurveTo(x0 + Math.cos(m) * r * 0.82, y0 + Math.sin(m) * r * 0.82, px, py);
                }
            });
            c.stroke();
        }
    }

    // Per frame, over the floor: rising embers, bats crossing the sky and a spider on a thread.
    function drawSeasonFx() {
        if (theme.season !== 'halloween') return;
        const x0 = -OX / S, x1 = (W - OX) / S, y0 = -OY / S, y1 = (H - OY) / S;
        const w = x1 - x0, h = y1 - y0;
        g.setTransform(DPR * S, 0, 0, DPR * S, DPR * OX, DPR * OY);
        if (!emberSprite) {
            emberSprite = layer();
            emberSprite.width = emberSprite.height = 48;
            const x = emberSprite.getContext('2d');
            const gr = x.createRadialGradient(24, 24, 0, 24, 24, 24);
            gr.addColorStop(0, 'rgba(255,150,40,1)');
            gr.addColorStop(0.35, 'rgba(255,150,40,.45)');
            gr.addColorStop(1, 'rgba(255,150,40,0)');
            x.fillStyle = gr;
            x.fillRect(0, 0, 48, 48);
            scenery.embers = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), v: between(14, 40), r: between(2, 6), ph: Math.random() * 6.28, sw: between(10, 30) }));
            scenery.bats = Array.from({ length: 10 }, (_, i) => ({ x: Math.random() * 1400, y: between(60, 300), v: between(55, 120) * (i % 3 === 2 ? -1 : 1), s: between(0.75, 1.3), ph: Math.random() * 6.28 }));
        }
        scenery.embers.forEach((e) => {
            const y = y1 + 20 - (((e.y * (h + 40)) + clock * e.v) % (h + 40));
            const x = x0 + e.x * w + Math.sin(clock * 0.8 + e.ph) * e.sw;
            g.globalAlpha = 0.3 + 0.35 * Math.sin(clock * 3 + e.ph);
            g.drawImage(emberSprite, x - e.r * 3, y - e.r * 3, e.r * 6, e.r * 6);
        });
        g.globalAlpha = 1;
        g.fillStyle = '#0c0114';
        scenery.bats.forEach((b) => {
            const span = w + 340;
            const x = (((b.x + clock * b.v) % span) + span) % span - 170 + x0;
            const y = b.y + Math.sin(clock * 1.3 + b.ph) * 18;
            const lift = Math.sin(clock * 11 + b.ph) * 14;
            g.save();
            g.translate(x, y);
            g.scale(b.s * (b.v < 0 ? -1 : 1), b.s);
            g.beginPath();
            g.moveTo(3, 0);
            g.quadraticCurveTo(12, -10 - lift * 0.6, 26, -4 - lift);
            g.quadraticCurveTo(21, -lift * 0.3, 19, 5 - lift * 0.4);
            g.quadraticCurveTo(14, 2, 10, 8 - lift * 0.2);
            g.quadraticCurveTo(6, 3, 3, 6);
            g.lineTo(-3, 6);
            g.quadraticCurveTo(-6, 3, -10, 8 - lift * 0.2);
            g.quadraticCurveTo(-14, 2, -19, 5 - lift * 0.4);
            g.quadraticCurveTo(-21, -lift * 0.3, -26, -4 - lift);
            g.quadraticCurveTo(-12, -10 - lift * 0.6, -3, 0);
            g.closePath();
            g.fill();
            g.beginPath();
            g.ellipse(0, 1, 4.5, 6, 0, 0, Math.PI * 2);
            g.fill();
            g.beginPath();
            g.moveTo(-4, -3);
            g.lineTo(-3, -10);
            g.lineTo(0, -5);
            g.lineTo(3, -10);
            g.lineTo(4, -3);
            g.fill();
            g.restore();
        });
        const sx = (view.portrait ? 330 : 700) + Math.sin(clock * 0.45) * 6;
        const sy = y0 + (view.portrait ? 34 : 110) + Math.sin(clock * 0.6) * (view.portrait ? 14 : 38);
        g.strokeStyle = 'rgba(255,255,255,.5)';
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(sx, y0);
        g.lineTo(sx, sy);
        g.stroke();
        g.strokeStyle = '#120418';
        g.lineWidth = 1.8;
        for (let side = -1; side <= 1; side += 2) {
            for (let k = 0; k < 4; k++) {
                const wig = Math.sin(clock * 5 + k + side) * 2;
                g.beginPath();
                g.moveTo(sx, sy + 4);
                g.quadraticCurveTo(sx + side * (14 + k * 2), sy - 8 + k * 7 + wig, sx + side * (20 + k * 3), sy + 8 + k * 6);
                g.stroke();
            }
        }
        g.fillStyle = '#120418';
        g.beginPath();
        g.ellipse(sx, sy + 5, 7.5, 9, 0, 0, Math.PI * 2);
        g.fill();
        g.beginPath();
        g.arc(sx, sy - 5, 5, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = '#ff5a1f';
        g.fillRect(sx - 3, sy - 6, 2, 2);
        g.fillRect(sx + 1, sy - 6, 2, 2);
    }

    function paintStatic() {
        const m = [DPR * S, 0, 0, DPR * S, DPR * OX, DPR * OY];
        const x0 = -OX / S - 2, y0 = -OY / S - 2, x1 = (W - OX) / S + 2, y1 = (H - OY) / S + 2;
        for (const c of [backC, floorC, frontC]) {
            c.width = canvas.width;
            c.height = canvas.height;
        }

        let c = backC.getContext('2d');
        c.setTransform(...m);
        const SK = seasonNow();
        const sky = c.createLinearGradient(0, -120, 0, 440);
        (SK ? SK.sky : [[0, '#264203'], [0.2, '#44700c'], [0.42, '#6b9a20'], [0.66, '#a3bf78'], [0.82, '#d3e2c3'], [0.9, '#ecf2ea'], [1, '#f3f6f2']])
            .forEach(([o, col]) => sky.addColorStop(o, SK ? col : tc(col)));
        c.fillStyle = sky;
        c.fillRect(x0, y0, x1 - x0, y1 - y0);
        const haze = c.createRadialGradient(820, 150, 0, 820, 150, 620);
        haze.addColorStop(0, SK ? SK.haze : tc('rgba(206,216,196,.55)'));
        haze.addColorStop(1, SK ? SK.haze0 : tc('rgba(206,216,196,0)'));
        c.fillStyle = haze;
        c.fillRect(x0, y0, x1 - x0, y1 - y0);
        if (SK) paintSeasonStatic(c, x0, y0);

        c = floorC.getContext('2d');
        c.setTransform(...m);
        c.beginPath();
        c.ellipse(FLOOR.cx, FLOOR.cy, FLOOR.rx, FLOOR.ry, 0, 0, Math.PI * 2);
        const floor = c.createRadialGradient(640, 470, 0, 640, 470, 1150);
        (SK ? SK.floor : [[0, '#e3e7ea'], [0.16, '#bcc3ca'], [0.42, '#8f979e'], [0.75, '#656c72'], [1, '#4a5055']])
            .forEach(([o, col]) => floor.addColorStop(o, col));
        c.fillStyle = floor;
        c.shadowColor = 'rgba(255,255,255,.9)';
        c.shadowBlur = 24 * S * DPR;
        c.fill();

        c = frontC.getContext('2d');
        c.setTransform(...m);
        const vig = c.createRadialGradient(640, 330, 260, 640, 330, 1050);
        vig.addColorStop(0, SK ? SK.vig0 : tc('rgba(10,25,0,0)'));
        vig.addColorStop(1, SK ? SK.vig : tc('rgba(10,25,0,.6)'));
        c.fillStyle = vig;
        c.fillRect(x0, y0, x1 - x0, y1 - y0);

        const BT = SK ? SK.bokeh : '255,255,255';
        sprites = bokeh.map((b) => {
            const box = b.r * 2 + 4;
            const s = layer();
            s.width = s.height = Math.max(2, Math.ceil(box * DPR * S));
            const sg = s.getContext('2d');
            sg.setTransform(s.width / box, 0, 0, s.width / box, 0, 0);
            const cx = b.r + 2;
            if (b.ring) {
                sg.lineWidth = b.r > 40 ? 2 : 1.4;
                for (let k = 0; k < 4; k++) {
                    sg.strokeStyle = `rgba(${BT},${b.a * (1.7 - k * 0.3)})`;
                    sg.beginPath();
                    sg.arc(cx, cx, b.r * (1 - k * 0.24), 0, Math.PI * 2);
                    sg.stroke();
                }
                sg.fillStyle = `rgba(${BT},${b.a * 0.35})`;
            } else {
                const grad = sg.createRadialGradient(cx, cx, 0, cx, cx, b.r);
                grad.addColorStop(0, `rgba(${BT},${b.a * 0.6})`);
                grad.addColorStop(0.82, `rgba(${BT},${b.a})`);
                grad.addColorStop(1, `rgba(${BT},0)`);
                sg.fillStyle = grad;
            }
            sg.beginPath();
            sg.arc(cx, cx, b.r, 0, Math.PI * 2);
            sg.fill();
            return s;
        });
    }

    function drawBg() {
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.drawImage(backC, 0, 0);

        g.setTransform(DPR * S, 0, 0, DPR * S, DPR * OX, DPR * OY);
        const span = 1880;
        bokeh.forEach((b, i) => {
            let x = b.x + clock * b.vx - cam.x * b.depth;
            x = ((x + 300) % span + span) % span - 300;
            let y = b.y + Math.sin(clock * 0.35 + b.phase) * 8 - cam.y * b.depth;
            y = ((y + 400) % 920 + 920) % 920 - 400;
            g.drawImage(sprites[i], x - b.r - 2, y - b.r - 2, b.r * 2 + 4, b.r * 2 + 4);
        });

        g.setTransform(1, 0, 0, 1, 0, 0);
        g.drawImage(floorC, 0, 0);

        g.setTransform(DPR * S, 0, 0, DPR * S, DPR * OX, DPR * OY);
        g.save();
        g.beginPath();
        g.ellipse(FLOOR.cx, FLOOR.cy, FLOOR.rx, FLOOR.ry, 0, 0, Math.PI * 2);
        g.clip();
        g.lineWidth = 1.5;
        for (let i = 0; i < 6; i++) {
            const p = (clock / 7 + i / 6) % 1;
            const rx = 46 + p * 540;
            g.strokeStyle = `rgba(236,240,244,${(1 - p) * 0.5 * Math.min(1, p * 6)})`;
            g.beginPath();
            g.ellipse(ORB.x, ORB.y, rx, rx * 0.2, 0, 0, Math.PI * 2);
            g.stroke();
        }
        g.restore();

        if (seasonNow()) drawSeasonFx();
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.drawImage(frontC, 0, 0);
    }

    let last = performance.now();
    let lastDraw = 0;
    function frame(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        pollPad(now);
        if (settings.motion) clock += dt;
        const k = 1 - Math.exp(-dt * 5);
        const moving = Math.abs(cam.tx - cam.x) > 0.1 || Math.abs(cam.ty - cam.y) > 0.1;
        cam.x += (cam.tx - cam.x) * k;
        cam.y += (cam.ty - cam.y) * k;
        if ((settings.motion || moving || needsDraw) && !(dimmed && now - lastDraw < 66)) {
            drawBg();
            lastDraw = now;
            needsDraw = false;
        }
        requestAnimationFrame(frame);
    }

    // ── start ──────────────────────────────────────────────
    song.loop = true;
    song.volume = 0.5;
    song.addEventListener('loadedmetadata', () => {
        if (interacted) startMusic();
    });

    setSetting('sound', settings.sound);
    $('.tr-name').textContent = PROFILE.tag;
    $('.tr-score').replaceWith(scoreLine('tr-score'));
    $('.tr-pic').src = PROFILE.gamerpic;
    resize();
    layoutChannels(false);
    if (theme.hue) applyTheme(theme);
    row = buildRow(state.ch);
    row.el.classList.add('no-anim');
    layoutRow(false);
    requestAnimationFrame(() => requestAnimationFrame(() => row.el.classList.remove('no-anim')));
    requestAnimationFrame(frame);

    function intro() {
        chEls.forEach((el, i) => el.animate([{ opacity: 0 }, { opacity: el.style.opacity }], { duration: 600, delay: 100 + i * 60, fill: 'backwards' }));
        layoutRow(true);
    }

    // ── boot ───────────────────────────────────────────────
    // Sound needs a user gesture, so the boot waits on "press any button" before the swirl and chime.
    let bootEl = null;
    let bootTimer = 0;

    function showBoot() {
        booting = true;
        bootEl = make('div', 'boot');
        bootEl.setAttribute('role', 'dialog');
        bootEl.setAttribute('aria-label', 'Press any button to start');
        bootEl.innerHTML = '<div class="boot-stage"><span class="boot-ring r1"></span><span class="boot-ring r2"></span>' +
            '<span class="boot-ring r3"></span><span class="boot-flash"></span><img class="boot-orb" alt="" draggable="false"><p class="boot-name"></p></div>' +
            '<p class="boot-prompt"><b class="pad pad-a">A</b>Press any button to start</p>';
        bootEl.querySelector('.boot-name').textContent = PROFILE.tag;
        bootEl.querySelector('.boot-orb').src = theme.logo || 'assets/logo.webp';
        bootEl.addEventListener('click', bootPress);
        document.body.append(bootEl);
    }

    function bootPress() {
        if (!bootEl) return;
        if (bootEl.classList.contains('play')) {
            endBoot();
            return;
        }
        sfx.unlock();
        sfx.boot();
        startMusic();
        wakeAvatar();
        bootEl.classList.add('play');
        bootTimer = setTimeout(endBoot, 3200);
    }

    function endBoot() {
        clearTimeout(bootTimer);
        const el = bootEl;
        bootEl = null;
        booting = false;
        el.classList.add('out');
        setTimeout(() => el.remove(), 700);
        intro();
        if (live.on && !live.announced) announceLive();
        if (rebooting) {
            rebooting = false;
            if (settings.music) song.play().catch(() => {});
        }
        setTimeout(() => {
            achQueue.unshift({ signin: true });
            unlock('boot');
            if (achStore.boot && !achStore.rrod && document.body.dataset.crashed) unlock('rrod');
            if (new Date().getHours() < 5) unlock('night');
            showAchievement();
        }, 1100);
    }

    // ── live status ────────────────────────────────────────
    function announceLive() {
        live.announced = true;
        toast(`${PROFILE.tag} is ${live.game ? `streaming ${live.game}` : 'live on Twitch'}`);
    }

    const twitchHead = () => (live.on ? `Live now${live.viewers ? ` · ${live.viewers.toLocaleString()} watching` : ''}` : statText(SOCIALS.twitch));
    function paintTwitchHead() {
        if (state.screen !== 'twitch') return;
        screenEl.querySelector('.list-head').textContent = twitchHead();
        screenEl.querySelector('.list-sub').textContent = live.on ? live.title : '';
    }

    function setLive(on, game, title = '', viewers = 0) {
        if (on === live.on && game === live.game && title === live.title && viewers === live.viewers) return;
        const wasOn = live.on;
        Object.assign(live, { on, game, title, viewers });
        document.body.classList.toggle('is-live', on);
        document.querySelectorAll('.t-status, .gc-status .presence').forEach((el) => { el.textContent = presence(); });
        document.querySelectorAll('.live-badge').forEach((el) => { el.textContent = liveBadge(); });
        paintTwitchHead();
        if (on && state.screen === 'twitch') unlock('front');
        if (on && !wasOn && !live.announced && !booting) announceLive();
        if (!on) live.announced = false;
    }

    const cleanText = (t, max) => (t.length > max || /error|not found|offline|^$/i.test(t) ? '' : t);

    async function checkLive() {
        if (document.hidden) return;
        const user = encodeURIComponent(SOCIALS.twitch.handle);
        try {
            const res = await fetch(`${TWITCH_STATUS}/uptime/${user}`, { cache: 'no-store' });
            const text = (await res.text()).trim();
            if (!res.ok) return; // service hiccup: keep the last known state
            if (/offline/i.test(text)) {
                setLive(false, '');
                return;
            }
            if (!/\d+\s+(second|minute|hour|day)/.test(text)) return;
            const get = (what) => fetch(`${TWITCH_STATUS}/${what}/${user}`, { cache: 'no-store' })
                .then((r) => (r.ok ? r.text() : ''), () => '').then((t) => t.trim());
            const [game, title, viewers] = await Promise.all([get('game'), get('title'), get('viewercount')]);
            setLive(true, cleanText(game, 60), cleanText(title, 140), parseInt(viewers, 10) || 0);
        } catch {
            // network hiccup: keep the last known state
        }
    }

    checkLive();
    setInterval(checkLive, LIVE_POLL_MS);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) checkLive(); });

    showBoot();
})();

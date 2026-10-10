(() => {
    'use strict';

    const PROFILE = {
        tag: 'mewzah',
        motto: 'living in a long forgotten world',
        location: 'グランド・エクスチェンジ',
        pic: 'assets/avatar.jpg',
        discord: 'mewzah',
    };
    const SONG_TITLE = 'x';

    // Optional real sound files, e.g. { select: 'assets/sfx/select.wav' }. Missing entries are synthesized.
    const SFX_FILES = {};

    const ICONS = {
        youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
        twitch: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z',
        tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
        discord: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
        x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
        note: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
        gear: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
    };

    const CHANNELS = [
        {
            name: 'Videos',
            tiles: [
                { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@mewzah' },
                { label: 'Twitch', icon: 'twitch', href: 'https://www.twitch.tv/mewzah' },
                { label: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@mewzah' },
            ],
        },
        {
            name: 'Social',
            tiles: [
                { label: 'Discord', icon: 'discord', copy: PROFILE.discord },
                { label: 'X', icon: 'x', href: 'https://x.com/mewzah' },
            ],
        },
        {
            name: 'My mewzah',
            tiles: [
                { kind: 'profile', label: 'Gamer Profile', screen: 'profile' },
                { label: 'Music Library', icon: 'note', screen: 'music' },
                { label: 'System Settings', icon: 'gear', screen: 'settings' },
            ],
        },
    ];

    const $ = (sel) => document.querySelector(sel);
    const stage = $('#stage');
    const channelsEl = $('#channels');
    const rowsEl = $('#rows');
    const countEl = $('#count');
    const screenEl = $('#screen');
    const toastEl = $('#toast');
    const srEl = $('#sr');
    const song = $('#song');
    const legendB = $('[data-btn="b"]');
    const legendY = $('[data-btn="y"] span');

    const n = CHANNELS.length;
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
    };
    const setSetting = (key, value) => {
        settings[key] = value;
        store.set(`mz.${key}`, value);
        legendY.textContent = settings.sound ? 'Sound On' : 'Sound Off';
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
        `<svg class="glyph" viewBox="0 0 24 24" aria-hidden="true"><path fill="url(#glyph-fill)" d="${ICONS[name]}"/></svg>`;
    const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    const songReady = () => song.readyState >= 1 && Number.isFinite(song.duration);

    let toastTimer;
    function toast(msg) {
        toastEl.querySelector('span').textContent = msg;
        toastEl.classList.add('show');
        sfx.notify();
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
    }

    function copyText(text) {
        const done = () => toast(`Discord username copied: ${text}`);
        const fail = () => toast(`Discord: ${text}`);
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, fail);
        } else {
            fail();
        }
    }

    function openLink(href, src) {
        if (src === 'pad') location.href = href;
        else window.open(href, '_blank', 'noopener');
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
        if (t.kind === 'profile') {
            el.append(make('span', 't-title', PROFILE.tag), make('span', 't-sub', 'Online'));
            const img = make('img', 't-pic');
            img.src = PROFILE.pic;
            img.alt = '';
            el.append(img);
        } else {
            el.insertAdjacentHTML('beforeend', glyph(t.icon));
            el.append(make('span', 't-label', t.label));
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

    function layoutRow(enterFromRight) {
        const f = state.focus[state.ch];
        row.tiles.forEach((el, i) => {
            const st = tileStyle(i - f);
            el.style.transform = st.t;
            el.style.opacity = st.o;
            el.style.zIndex = st.z;
            el.classList.toggle('focus', i === f);
            if (enterFromRight) {
                el.animate(
                    [{ transform: st.t.replace(/^translate\(([-\d.]+)px/, (m, x) => `translate(${+x + 320}px`), opacity: 0 }, { transform: st.t, opacity: st.o }],
                    { duration: 700, delay: 120 + i * 60, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' },
                );
            }
        });
        countEl.textContent = `${f + 1} of ${row.tiles.length}`;
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

    function gotoChannel(i, dir, steps = 1) {
        if (state.screen || i === state.ch) return;
        state.ch = i;
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
        music: { title: 'Music Library', render: renderMusic },
        settings: { title: 'System Settings', render: renderSettings },
    };

    function item(parent, label, run, value) {
        const b = make('button', 'item');
        b.type = 'button';
        b.append(make('span', '', label));
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
        pic.src = PROFILE.pic;
        pic.alt = '';
        const info = make('div', 'gc-info');
        const status = make('p', 'gc-status');
        status.append(make('i', 'dot'), document.createTextNode('Online'));
        const dl = make('dl');
        const loc = make('dd', '', PROFILE.location);
        loc.lang = 'ja';
        dl.append(make('dt', '', 'Motto'), make('dd', '', PROFILE.motto), make('dt', '', 'Location'), loc);
        info.append(make('p', 'gc-tag', PROFILE.tag), status, dl);
        card.append(pic, info);

        const list = make('div', 'list');
        body.append(card, list);
        return [
            item(list, 'View Videos', () => {
                closeScreen();
                setTimeout(() => gotoChannel(0, 1), 200);
            }),
            item(list, 'Add Friend on Discord', () => copyText(PROFILE.discord)),
        ];
    }

    function renderMusic(body) {
        const panel = make('div', 'panel player');
        const art = make('div', 'art');
        art.innerHTML = glyph('note');
        const info = make('div', 'pl-info');
        panel.append(art, info);
        body.append(panel);

        if (!songReady()) {
            info.append(make('p', 'pl-title', 'Nothing playing'), make('p', 'pl-sub', 'No music found'));
            return [];
        }
        const bar = make('div', 'pl-bar');
        bar.append(make('i'));
        const time = make('p', 'pl-time');
        time.append(make('span', 'cur', '0:00'), make('span', '', fmtTime(song.duration)));
        info.append(make('p', 'pl-title', SONG_TITLE), make('p', 'pl-sub', PROFILE.tag), bar, time);
        updateMusic();

        const list = make('div', 'list');
        body.append(list);
        const playItem = item(list, song.paused ? 'Play' : 'Pause', () => {
            if (song.paused) song.play();
            else song.pause();
        });
        const restart = item(list, 'Restart', () => {
            song.currentTime = 0;
            song.play();
        });
        song.onplay = song.onpause = () => {
            playItem.el.firstChild.textContent = song.paused ? 'Play' : 'Pause';
        };
        return [playItem, restart];
    }

    function updateMusic() {
        if (state.screen !== 'music' || !songReady()) return;
        const fill = screenEl.querySelector('.pl-bar i');
        const cur = screenEl.querySelector('.pl-time .cur');
        if (fill) fill.style.width = `${(song.currentTime / song.duration) * 100}%`;
        if (cur) cur.textContent = fmtTime(song.currentTime);
    }
    song.addEventListener('timeupdate', updateMusic);

    function renderSettings(body) {
        const list = make('div', 'list wide');
        body.append(list);
        const toggle = (label, key) => {
            const entry = item(list, label, () => {
                if (key === 'sound') {
                    toggleSound();
                    return;
                }
                setSetting(key, !settings[key]);
                entry.el.lastChild.textContent = settings[key] ? 'On' : 'Off';
            }, settings[key] ? 'On' : 'Off');
            return entry;
        };
        return [toggle('Sound Effects', 'sound'), toggle('Background Motion', 'motion')];
    }

    function highlight() {
        state.items.forEach((it, i) => it.el.classList.toggle('sel', i === state.sel));
    }

    function renderScreen() {
        const def = SCREENS[state.screen];
        screenEl.querySelector('.crumb').textContent = CHANNELS[state.ch].name;
        screenEl.querySelector('.title').textContent = def.title;
        const body = screenEl.querySelector('.body');
        body.replaceChildren();
        state.items = def.render(body);
        state.sel = Math.min(state.sel, Math.max(0, state.items.length - 1));
        highlight();
    }

    function openScreen(key) {
        state.screen = key;
        state.sel = 0;
        renderScreen();
        stage.classList.add('in-screen');
        screenEl.setAttribute('aria-hidden', 'false');
        legendB.hidden = false;
        announce();
    }

    function refreshScreen() {
        if (state.screen) renderScreen();
    }

    function closeScreen() {
        state.screen = null;
        state.items = [];
        stage.classList.remove('in-screen');
        screenEl.setAttribute('aria-hidden', 'true');
        legendB.hidden = true;
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

    // ── input ──────────────────────────────────────────────
    function input(action, src) {
        switch (action) {
            case 'left':
            case 'right': {
                const d = action === 'right' ? 1 : -1;
                if (!state.screen) moveTile(d);
                else if (state.screen === 'music' && songReady()) song.currentTime = Math.max(0, Math.min(song.duration, song.currentTime + d * 10));
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
            case 'y': toggleSound(); break;
        }
    }

    const KEYS = {
        ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
        Enter: 'a', ' ': 'a', Escape: 'b', Backspace: 'b', y: 'y', Y: 'y',
    };
    let lastMove = 0;
    addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const action = KEYS[e.key];
        if (!action) return;
        e.preventDefault();
        sfx.unlock();
        const isDir = action === 'left' || action === 'right' || action === 'up' || action === 'down';
        if (e.repeat && !isDir) return;
        if (isDir) {
            const now = performance.now();
            const gap = action === 'up' || action === 'down' ? (e.repeat ? 280 : 60) : (e.repeat ? 120 : 40);
            if (now - lastMove < gap) return;
            lastMove = now;
        }
        input(action, 'key');
    });

    ['pointerdown', 'pointerup', 'touchend'].forEach((type) => addEventListener(type, () => sfx.unlock(), { passive: true }));

    document.querySelectorAll('#legend button').forEach((b) => {
        b.addEventListener('click', () => input(b.dataset.btn, 'pointer'));
    });

    let wheelAt = 0;
    addEventListener('wheel', (e) => {
        e.preventDefault();
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
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 36) return;
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
        if (!gp) return;
        const btn = (i) => !!(gp.buttons[i] && gp.buttons[i].pressed);
        const ax = gp.axes;
        const held = {
            left: btn(14) || ax[0] < -0.55,
            right: btn(15) || ax[0] > 0.55,
            up: btn(12) || ax[1] < -0.55,
            down: btn(13) || ax[1] > 0.55,
            a: btn(0),
            b: btn(1),
            y: btn(3),
        };
        for (const key of Object.keys(held)) {
            const on = held[key];
            const vertical = key === 'up' || key === 'down';
            const isDir = vertical || key === 'left' || key === 'right';
            if (on && !pad.prev[key]) {
                input(key, 'pad');
                pad.next[key] = now + (vertical ? 420 : 340);
            } else if (on && isDir && now >= pad.next[key]) {
                input(key, 'pad');
                pad.next[key] = now + (vertical ? 300 : 140);
            }
            pad.prev[key] = on;
        }
    }
    addEventListener('gamepadconnected', () => toast('Controller connected'));

    // ── background ─────────────────────────────────────────
    const canvas = $('#bg');
    const g = canvas.getContext('2d');
    let W = 0, H = 0, DPR = 1, S = 1, OX = 0, OY = 0;
    let needsDraw = true;
    const cam = { x: 0, y: 0, tx: 0, ty: 0 };

    function resize() {
        W = innerWidth;
        H = innerHeight;
        DPR = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.round(W * DPR);
        canvas.height = Math.round(H * DPR);
        const portrait = W < H;
        S = portrait ? Math.min(H / 720, W / 530) : Math.min(W / 1280, H / 720);
        OX = portrait ? 0 : (W - 1280 * S) / 2;
        OY = (H - 720 * S) / 2;
        stage.style.transform = `translate(${OX}px, ${OY}px) scale(${S})`;
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

    function drawBg() {
        g.setTransform(DPR * S, 0, 0, DPR * S, DPR * OX, DPR * OY);
        const x0 = -OX / S - 2, y0 = -OY / S - 2, x1 = (W - OX) / S + 2, y1 = (H - OY) / S + 2;

        const sky = g.createLinearGradient(0, -120, 0, 440);
        sky.addColorStop(0, '#264203');
        sky.addColorStop(0.2, '#44700c');
        sky.addColorStop(0.42, '#6b9a20');
        sky.addColorStop(0.66, '#a3bf78');
        sky.addColorStop(0.82, '#d3e2c3');
        sky.addColorStop(0.9, '#ecf2ea');
        sky.addColorStop(1, '#f3f6f2');
        g.fillStyle = sky;
        g.fillRect(x0, y0, x1 - x0, y1 - y0);

        const haze = g.createRadialGradient(820, 150, 0, 820, 150, 620);
        haze.addColorStop(0, 'rgba(206,216,196,.55)');
        haze.addColorStop(1, 'rgba(206,216,196,0)');
        g.fillStyle = haze;
        g.fillRect(x0, y0, x1 - x0, y1 - y0);

        const span = 1880;
        for (const b of bokeh) {
            let x = b.x + clock * b.vx - cam.x * b.depth;
            x = ((x + 300) % span + span) % span - 300;
            let y = b.y + Math.sin(clock * 0.35 + b.phase) * 8 - cam.y * b.depth;
            y = ((y + 400) % 920 + 920) % 920 - 400;
            if (b.ring) {
                g.lineWidth = b.r > 40 ? 2 : 1.4;
                for (let k = 0; k < 4; k++) {
                    g.strokeStyle = `rgba(255,255,255,${b.a * (1.7 - k * 0.3)})`;
                    g.beginPath();
                    g.arc(x, y, b.r * (1 - k * 0.24), 0, Math.PI * 2);
                    g.stroke();
                }
                g.fillStyle = `rgba(255,255,255,${b.a * 0.35})`;
                g.beginPath();
                g.arc(x, y, b.r, 0, Math.PI * 2);
                g.fill();
            } else {
                const grad = g.createRadialGradient(x, y, 0, x, y, b.r);
                grad.addColorStop(0, `rgba(255,255,255,${b.a * 0.6})`);
                grad.addColorStop(0.82, `rgba(255,255,255,${b.a})`);
                grad.addColorStop(1, 'rgba(255,255,255,0)');
                g.fillStyle = grad;
                g.beginPath();
                g.arc(x, y, b.r, 0, Math.PI * 2);
                g.fill();
            }
        }

        g.save();
        g.beginPath();
        g.ellipse(FLOOR.cx, FLOOR.cy, FLOOR.rx, FLOOR.ry, 0, 0, Math.PI * 2);
        const floor = g.createRadialGradient(640, 470, 0, 640, 470, 1150);
        floor.addColorStop(0, '#e3e7ea');
        floor.addColorStop(0.16, '#bcc3ca');
        floor.addColorStop(0.42, '#8f979e');
        floor.addColorStop(0.75, '#656c72');
        floor.addColorStop(1, '#4a5055');
        g.fillStyle = floor;
        g.shadowColor = 'rgba(255,255,255,.9)';
        g.shadowBlur = 24 * S * DPR;
        g.fill();
        g.shadowBlur = 0;
        g.clip();

        for (let i = 0; i < 6; i++) {
            const p = (clock / 7 + i / 6) % 1;
            const rx = 46 + p * 540;
            const a = (1 - p) * 0.5 * Math.min(1, p * 6);
            g.strokeStyle = `rgba(236,240,244,${a})`;
            g.lineWidth = 1.5;
            g.beginPath();
            g.ellipse(ORB.x, ORB.y, rx, rx * 0.2, 0, 0, Math.PI * 2);
            g.stroke();
        }
        g.restore();

        const vig = g.createRadialGradient(640, 330, 260, 640, 330, 1050);
        vig.addColorStop(0, 'rgba(10,25,0,0)');
        vig.addColorStop(1, 'rgba(10,25,0,.6)');
        g.fillStyle = vig;
        g.fillRect(x0, y0, x1 - x0, y1 - y0);
    }

    let last = performance.now();
    function frame(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        pollPad(now);
        if (settings.motion) clock += dt;
        const k = 1 - Math.exp(-dt * 5);
        const moving = Math.abs(cam.tx - cam.x) > 0.1 || Math.abs(cam.ty - cam.y) > 0.1;
        cam.x += (cam.tx - cam.x) * k;
        cam.y += (cam.ty - cam.y) * k;
        if (settings.motion || moving || needsDraw) {
            drawBg();
            needsDraw = false;
        }
        requestAnimationFrame(frame);
    }

    // ── start ──────────────────────────────────────────────
    song.addEventListener('loadedmetadata', () => {
        if (state.screen === 'music') refreshScreen();
    });

    setSetting('sound', settings.sound);
    resize();
    layoutChannels(false);
    chEls.forEach((el, i) => el.animate([{ opacity: 0 }, { opacity: el.style.opacity }], { duration: 600, delay: 100 + i * 60, fill: 'backwards' }));
    row = buildRow(state.ch);
    row.el.classList.add('no-anim');
    layoutRow(settings.motion);
    requestAnimationFrame(() => requestAnimationFrame(() => row.el.classList.remove('no-anim')));
    requestAnimationFrame(frame);
})();

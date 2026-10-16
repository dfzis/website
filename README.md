# web

mewzah's personal site: an xbox 360 nxe-style dashboard. plain html/css/js, no build step.

hosted on github pages (custom domain in `CNAME`, `.nojekyll` so files are served as-is). © mewzah, all rights reserved.

- content (profile, gamerscore, socials and follower counts, games, channels): top of `app.js`
- channels: contact (the business email from `CONTACT` in `app.js`), friends (geobox), socials (youtube, twitch, tiktok, x, discord), my xbox (disc, gamer profile, game library, my setup once `SETUP` has items, system settings)
- controls: arrows / d-pad / swipe to move, enter / A to select, esc / B to go back, X / Y for tile actions. the phone/browser back gesture closes an open screen. the first mouse click (not touch) shows a one-time tip pointing at the keys or a controller, after sign-in; anyone who has already used the keys or a pad never sees it
- phones: portrait shows the left of the dashboard at full height; screens stack their panel over the menu (menus scroll) and pop-ups stay in view. the WebGL avatar is never fully hidden (opacity .001) because rebuilding its layer stalled phones long enough to swallow the slide animations
- reduced motion: only the background drift and pulsing glows stop; navigation transitions stay
- boot screen: plays every time the page opens (press any button, then the startup swirl and chime; pressing again skips it), then the "mewzah signed in" toast
- guide: the orb (bottom right), Home / G, or the controller's Xbox / View button opens the Xbox Guide with socials, shortcuts (achievements, profile, game library, geobox, dashboard) and settings
- screen dimming: after 3 idle minutes the dashboard dims (not while a youtube/twitch screen is open). any key, tap, click, wheel or pad button wakes it, and that first press is swallowed so it never acts. toggle in system settings / guide
- controller rumble: pads that expose a `vibrationActuator` (chromium) buzz on connect, guide, notifications, achievements, eject and the red ring (`RUMBLE` in `app.js`). toggle in system settings / guide
- themes: system settings / guide → theme recolours the site's greens at runtime (`THEMES` in `app.js`: green, blue, purple, orange, halloween), saved per browser; each theme has a boot logo in `assets/logo-<theme>.webp`. a theme with a `season` key (halloween) also repaints the sky/floor and adds scenery via `SEASONS`, `paintSeasonStatic` and `drawSeasonFx`. seasonal looks are picked by hand and added in the month they belong to, never switched by date; the default stays green
- easter egg: hold eject (X) on the disc tile for three seconds
- `404.html`: a 360-style "content unavailable" page for broken links, in the visitor's theme
- socials: youtube and twitch open in-dashboard preview screens (latest uploads / live stream); the youtube screen uses the channel's videos-only playlist (`UULF…`, no shorts or streams) set in `SOCIALS` in `app.js`. the upload waits for play: the dashboard music keeps going until the player reports it's playing (via the embed's postMessage api), and tuned in unlocks after 8s of actual playback. twitch still starts on its own
- avatar: a 60fps idle loop recorded from the [360sona](https://360sona.com) avatar. `assets/avatar.mp4` (webm fallback) holds colour on the left half and transparency on the right, recombined in the browser with webgl; `assets/avatar.webp` is its first frame and shows instantly
- emotes: Y on the gamercard tile (or tapping the avatar) plays a random emote (wave, hooray, laugh, "awww yeah!") from `assets/emotes/`. each is one 60fps standing-to-standing cycle recorded from the same 360sona widget as the idle loop, switched from idle to looping that photo-booth clip, packed colour|alpha the same way; `.av-anim.emote` in `style.css` places their (wider) crop
- images: `assets/gamerpic.png` (gamer picture); per game in `GAMES`: tile art (`assets/cod4.jpg`, `mw2.jpg`, `halo3.jpg`) and disc photos cut out to circles centred on the hub (`assets/disc-*.webp`)
- game library: visitors pick a game (shown as a spinning disc) to put it in the tray; the disc tile on my xbox switches to it and the choice is remembered in their browser. each game in `GAMES` has tile `art` and an optional cut-out `disc` image (a printed disc is drawn without one)
- geobox (sponsor): the friends channel's partner tile, opening a playable mock of geobox's search panel; `GEOBOX.code` in `app.js` is the creator code shown with a copy button (`null` hides it); logo in `assets/geobox.webp`
- live status: every 2 minutes the page asks decapi.me (free, no key) whether the twitch channel is live; when it is, the twitch tile shows LIVE with the viewer count, the twitch screen shows the stream title, the gamercard says what's being streamed and a pop-up announces it
- stats: `.github/workflows/stats.yml` runs `scripts/update-stats.mjs` every 3 hours to refresh `data/stats.json` (youtube subscriber count and latest upload) and commits it to the branch pages serves. scheduled workflows only run from the repo's default branch. twitch, x and tiktok counts are set by hand in `SOCIALS`
- achievements: 13 achievements worth 200G (like an arcade game), unlocked by exploring the site and saved in each visitor's browser. they pop up with a recreation of the 360 toast (orb pops in, bar unrolls, "Achievement unlocked / 10G - Name") and are listed under gamer profile → achievements. the chime is synthesized; drop a real file in `assets/sfx/` and set `SFX_FILES.achievement` to use it
- music: `assets/song.mp3` starts on the first key press or tap and loops; visitors can turn it off in system settings
- font: uses convection (the real 360 dashboard font) when it's installed on the visitor's computer, otherwise the free barlow, self-hosted in `assets/fonts` under the SIL open font license
- sound effects are synthesized; to use real files, put them in `assets/sfx/` and list them in `SFX_FILES` in `app.js`

## credits

- avatar by [360sona](https://360sona.com), a free fan-made xbox 360 avatar builder. thank you!
- [barlow](https://github.com/jpt/barlow) by jeremy tribby, SIL open font license 1.1 (`assets/fonts/OFL.txt`)

# web

mewzah's personal site: an xbox 360 nxe-style dashboard. plain html/css/js, no build step.

hosted on github pages (custom domain in `CNAME`, `.nojekyll` so files are served as-is). © mewzah, all rights reserved.

- content (profile, gamerscore, socials and follower counts, channels, song title): top of `app.js`
- controls: arrows / d-pad / swipe to move, enter / A to select, esc / B to go back, X / Y for tile actions
- boot screen: plays every time the page opens (press any button, then the startup swirl and chime; pressing again skips it)
- video marketplace: youtube and twitch open in-dashboard preview screens (latest uploads / live stream); the youtube screen uses the channel's videos-only playlist (`UULF…`, no shorts or streams) set in `SOCIALS` in `app.js`
- avatar: a 60fps idle loop recorded from the [360sona](https://360sona.com) avatar. `assets/avatar.mp4` (webm fallback) holds colour on the left half and transparency on the right, recombined in the browser with webgl; `assets/avatar.webp` is its first frame and shows instantly
- images: `assets/gamerpic.png` (gamer picture), `assets/cod4.jpg` (disc tile art)
- geobox (sponsor): a partner tile in my xbox opening a playable mock of geobox's search panel; set `GEOBOX.code` in `app.js` to show a creator code with a copy button
- live status: every 2 minutes the page asks decapi.me (free, no key) whether the twitch channel is live; when it is, the twitch tile shows LIVE, the gamercard says what's being streamed and a pop-up announces it
- music: `assets/song.mp3` starts on the first key press or tap and loops; visitors can turn it off in system settings
- font: uses convection (the real 360 dashboard font) when it's installed on the visitor's computer, otherwise the free barlow, self-hosted in `assets/fonts` under the SIL open font license
- sound effects are synthesized; to use real files, put them in `assets/sfx/` and list them in `SFX_FILES` in `app.js`

## credits

- avatar by [360sona](https://360sona.com), a free fan-made xbox 360 avatar builder. thank you!
- [barlow](https://github.com/jpt/barlow) by jeremy tribby, SIL open font license 1.1 (`assets/fonts/OFL.txt`)

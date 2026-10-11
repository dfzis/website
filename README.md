# web

mewzah's personal site: an xbox 360 nxe-style dashboard. plain html/css/js, no build step.

- content (profile, gamerscore, socials and follower counts, channels, song title): top of `app.js`
- controls: arrows / d-pad / swipe to move, enter / A to select, esc / B to go back, X / Y for tile actions
- boot screen: shown on a visitor's first visit (press any button, then the startup swirl and chime); add `?boot` to the url to see it again
- video marketplace: youtube and twitch open in-dashboard preview screens (latest uploads / live stream); the channel id for the youtube uploads playlist is in `SOCIALS` in `app.js`
- avatar: a 60fps idle loop recorded from the [360sona](https://360sona.com) avatar. `assets/avatar.mp4` (webm fallback) holds colour on the left half and transparency on the right, recombined in the browser with webgl; `assets/avatar.webp` is its first frame and shows instantly
- images: `assets/gamerpic.png` (gamer picture), `assets/cod4.jpg` (disc tile art)
- music: `assets/song.mp3` starts on the first key press or tap and loops; visitors can turn it off in system settings
- sound effects are synthesized; to use real files, put them in `assets/sfx/` and list them in `SFX_FILES` in `app.js`

## credits

- avatar by [360sona](https://360sona.com), a free fan-made xbox 360 avatar builder. thank you!

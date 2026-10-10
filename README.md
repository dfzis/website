# web

mewzah's personal site: an xbox 360 nxe-style dashboard. plain html/css/js, no build step.

- content (profile, gamerscore, socials and follower counts, channels): top of `app.js`
- controls: arrows / d-pad / swipe to move, enter / A to select, esc / B to go back, X / Y for tile actions
- images: `assets/gamerpic.png` (gamer picture) and `assets/cod4.jpg` (disc tile art)
- music: drop an mp3 at `assets/song.mp3` and set `SONG_TITLE` in `app.js`. it starts on the first key press or tap and loops; visitors can turn it off in system settings
- sound effects are synthesized; to use real files, put them in `assets/sfx/` and list them in `SFX_FILES` in `app.js`

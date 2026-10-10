# web

mewzah's personal site: an xbox 360 nxe-style dashboard. plain html/css/js, no build step.

- content (profile, gamerscore, socials and follower counts, channels, song title): top of `app.js`
- controls: arrows / d-pad / swipe to move, enter / A to select, esc / B to go back, X / Y for tile actions
- avatar: live 3D avatar embedded from [360sona](https://360sona.com) (`AVATAR_EMBED` in `app.js`); `assets/avatar.webp` shows while it loads or if it can't
- images: `assets/gamerpic.png` (gamer picture), `assets/cod4.jpg` (disc tile art)
- music: `assets/song.mp3` starts on the first key press or tap and loops; visitors can turn it off in system settings
- sound effects are synthesized; to use real files, put them in `assets/sfx/` and list them in `SFX_FILES` in `app.js`

## credits

- avatar rendering by [360sona](https://360sona.com), a free fan-made xbox 360 avatar builder. thank you!

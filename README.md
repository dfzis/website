# web

mewzah's personal site: an xbox 360 nxe-style dashboard. plain html/css/js, no build step.

- content (channels, tiles, links, profile): top of `app.js`
- controls: arrows / d-pad / swipe to move, enter / A to select, esc / B to go back, Y to toggle sound
- music: drop an mp3 at `assets/song.mp3` and set `SONG_TITLE` in `app.js`
- sound effects are synthesized; to use real files, put them in `assets/sfx/` and list them in `SFX_FILES` in `app.js`

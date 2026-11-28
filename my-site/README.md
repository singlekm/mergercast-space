# my.mergercast.space

Mergercast launchpad · SRAI ticket **SR-1178**.

Six boxes with white logos, each opening its destination in a popup window:

| # | Box | Destination |
|---|-----|-------------|
| 01 | Mergercast Aerospace (MA logo) | https://mergercast.space |
| 02 | Aerospace | https://aerospace.mergercast.group |
| 03 | Engineering Labs | https://engineering.mergercast.group/python/audio |
| 04 | Engineering | https://engineering.mergercast.group |
| 05 | Robotics | https://yorkai.space |
| 06 | Dyson 500 | https://dyson500.yorkai.space |

## Behaviour

- **Desktop:** each box opens a real browser popup window (one per destination, cascaded). Clicking a box again brings its window to the front. A bar at the bottom counts open windows and can bring them forward or close them all. If popups are blocked, the box falls back to a new tab and says so.
- **Phones and tablets:** each box opens an in-page popup window (full-screen sheet with the site framed inside) with a new-tab button. `aerospace.mergercast.group` sends `X-Frame-Options: SAMEORIGIN`, so on phones that box opens a new tab instead.
- The small arrow in each box's corner always opens a normal new tab.
- Skins: Parchment (Red Team crimson), Obsidian (crimson / indigo), York AI (space palette). The choice is saved per device (`localStorage mms.skin.v1`); first visit follows the OS light/dark setting.

## Look and feel

mergercast.group house style, taken from engineering.mergercast.group: canyon-river photo under a scrim, 3px crimson top rule, MG mark linked to mergercast.group, Cormorant Garamond / EB Garamond / Bebas Neue / DM Mono, blended scrollbars, 44px touch targets, everything inside one `100dvh` viewport.

## Files

- `index.html` · the whole page (inline CSS and JS, no build step)
- `assets/bg-{1280,2400}.{webp,jpg}` · canyon background
- `assets/mg-mark.png`, `assets/icons/*` · MG logo and favicons
- `assets/logos/*` · white logos (`ma-white.png` is the MA mark; the other five are SVG emblems). Swap any file for an official white logo of the same name.
- `netlify.toml` · headers; publish directory is this folder

## Deploy

Netlify project `my-mergercast-space` (team Krimson). To build from Git, link the project to `singlekm/mergercast-space`, branch `main`, **base directory `my-site`**, no build command, publish `.`.

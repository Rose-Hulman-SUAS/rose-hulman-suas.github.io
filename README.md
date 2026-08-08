# Rose Aerial Systems website

This is a lightweight static website for Rose Aerial Systems and the 2025-2026 MeadowHawk SUAS program. It uses only HTML, CSS, and JavaScript. There is no build process, database, paid hosting service, or framework to maintain.

## Start here

1. Open `assets/js/config.js` and update the shared contact information, links, TDR design weight or condition, and last-updated date.
2. Search the entire folder for `REPLACE`, `Editing reminder`, and `Required before publishing`.
3. Update the team roster and sponsors in `team.html`.
4. Verify the aircraft configuration and technical claims in `index.html` and `engineering.html`.
5. Add final proof-flight and technical-report links to `assets/js/config.js`.
6. Replace draft testing summaries with approved evidence in `testing.html`.

Full instructions are in:

- `EDITING_GUIDE.md`
- `PUBLISHING_GUIDE.md`
- `CONTENT_CHECKLIST.md`

## Preview locally

From this folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly, but a local server gives a more accurate preview.

## Main files

- `index.html` - homepage and aircraft summary
- `engineering.html` - technical design documentation and the aircraft subsystem guide
- `testing.html` - development and testing history
- `team.html` - organization, roster, sponsors, and contact
- `assets/js/config.js` - information reused across pages
- `assets/css/styles.css` - colors, layout, typography, and responsive design
- `assets/img/` - logos, CAD images, and test images

## Publishing recommendation

Publish the files through GitHub Pages. This provides free HTTPS hosting, version history, browser-based editing, and automatic republishing after each change. See `PUBLISHING_GUIDE.md`.

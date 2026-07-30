# Editing guide

## Recommended editing tools

The easiest local workflow is:

1. Install Visual Studio Code.
2. Extract this website folder.
3. In Visual Studio Code, choose **File > Open Folder** and select the website folder.
4. Use **Search** in the left sidebar to find text across all pages.
5. Preview the site with `python -m http.server 8000` or the VS Code Live Server extension.

No programming installation is required beyond a web browser and text editor. Python is only used for the optional local preview command.

## 1. Edit shared information once

Open:

```text
assets/js/config.js
```

Update:

- `teamEmail`
- `currentWeight`
- `lastUpdated`
- `proofFlightUrl`
- `technicalReportUrl`
- `githubUrl`
- `instagramUrl`
- `linkedinUrl`
- `recruitmentUrl`

Leave optional links blank to hide their buttons automatically.

Example:

```js
proofFlightUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
githubUrl: "https://github.com/YOUR-ORGANIZATION"
```

## 2. Edit page text

Each page is a normal HTML file. Most visible text appears directly between tags:

```html
<h2>Heading text</h2>
<p>Paragraph text.</p>
```

Change only the text between the opening and closing tags unless you are intentionally changing the structure.

## 3. Add a team member

Open `team.html` and find the roster section. Copy one complete block:

```html
<article class="card roster-card">
  <div class="avatar" aria-hidden="true">01</div>
  <div>
    <h3>Replace with name</h3>
    <p>Role</p>
  </div>
</article>
```

Paste it inside the roster grid and update the number, name, and role.

For headshots, replace the `avatar` div with:

```html
<img class="avatar" src="assets/img/member-name.jpg" alt="Member Name">
```

Crop headshots to square images before adding them.

## 4. Add sponsor logos

1. Put the logo in `assets/img/`, preferably as PNG, SVG, or WebP.
2. In `team.html`, replace a sponsor placeholder with:

```html
<a class="sponsor-placeholder" href="https://sponsor.example" aria-label="Sponsor Name">
  <img src="assets/img/sponsor-name.png" alt="Sponsor Name logo">
</a>
```

Use only approved sponsor logos and links.

## 5. Add a test entry

Open `testing.html` and copy one entire `timeline-entry` article:

```html
<article class="timeline-entry">
  <time datetime="2026-08-01">1 August 2026</time>
  <h2>Test title</h2>
  <p>Objective, configuration, procedure, result, and corrective action.</p>
</article>
```

Recommended content order:

1. Date
2. Objective
3. Aircraft configuration
4. Procedure
5. Pass/fail criteria
6. Results
7. Evidence
8. Corrective action
9. Next test

To add an image:

```html
<div class="timeline-media media-frame">
  <img src="assets/img/test-image.jpg" alt="Describe what the image shows" loading="lazy">
</div>
```

## 6. Replace images

Add new images to `assets/img/`. For good performance:

- Use JPG or WebP for photographs.
- Use PNG or SVG for logos and diagrams.
- Resize ordinary web images to roughly 1200-1800 pixels wide.
- Keep most photographs under 500 KB.
- Write meaningful `alt` text for every informative image.

Do not remove the `alt` attribute. Decorative images should use `alt=""`.

## 7. Change colors

Open `assets/css/styles.css` and edit the variables at the top:

```css
:root {
  --rose: #800000;
  --black: #080808;
  --cool-gray: #b1b3b3;
  --paper: #f5f3ef;
}
```

The site uses Rose-Hulman-inspired old rose, black, white, and gray. Avoid lowering text contrast.

## 8. Update search

The search index is a small list inside `assets/js/site.js`. Find:

```js
const searchEntries = [
```

Add an entry when you create a major new section:

```js
{ title: "New Section", url: "testing.html#new-section", text: "keywords and short description" }
```

## 9. Browser-only editing on GitHub

After publishing, you may edit without downloading the site:

1. Open the repository on GitHub.
2. Click the file to edit.
3. Click the pencil icon.
4. Make the change.
5. Click **Commit changes**.
6. GitHub Pages republishes the site automatically.

For image uploads, open the destination folder in GitHub and choose **Add file > Upload files**.

## 10. Before every public update

- Preview desktop and mobile layouts.
- Check all links.
- Confirm images load.
- Check spelling and dates.
- Confirm no credentials, binding phrases, private phone numbers, or sensitive flight locations are present.
- Ask the relevant subsystem owner to approve technical claims.

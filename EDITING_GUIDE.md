# Editing guide

## Recommended editing tools

The easiest local workflow is:

1. Install Visual Studio Code.
2. Extract this website folder.
3. In Visual Studio Code, choose **File > Open Folder** and select the website folder.
4. Use **Search** in the left sidebar to find text across all pages.
5. Preview the site beside the editor with the VS Code Live Preview or Live Server extension. You can also run `python -m http.server 8000` from the website folder.

No programming installation is required beyond a web browser and text editor. Python is only used for the optional local preview command.

This is a static HTML website, so it does not have a drag-and-drop editor like Google Sites. A split view in Visual Studio Code is the closest simple workflow without rebuilding the site in a different platform: edit one small text block, save, and see the browser refresh. A full visual editor would require moving the site to a site builder or adding a content-management system.

## 1. Edit shared information once

Open:

```text
assets/js/config.js
```

Update:

- `teamEmail`
- `designWeight`
- `lastUpdated`
- `sponsorshipSubject`
- `proofFlightUrl`
- `payloadDropUrl`
- `technicalReportUrl`
- `githubUrl`
- `youtubeUrl`
- `instagramUrl`
- `linkedinUrl`
- `discordUrl`

Leave optional links blank to hide their buttons automatically.

Example:

```js
proofFlightUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
payloadDropUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
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

First, place an approved portrait in `assets/img/`. Use a short lowercase filename such as `jane-doe.jpg`. Portraits should use a 4:5 crop, such as 800 by 1000 pixels, and normally stay under 500 KB. Remove GPS and other private metadata before publishing.

Open `team.html` and find:

```html
<section class="section" aria-labelledby="roster-title" hidden>
```

Remove the word `hidden` from that line when you add the first approved profile. Then find:

```html
<div class="grid three profile-grid">
```

Copy the example profile block immediately below it, paste the copy inside the same grid, and remove the surrounding comment markers from the copy:

```html
<article class="card profile-card">
  <img src="assets/img/first-last.jpg" alt="Portrait of First Last" width="800" height="1000" loading="lazy">
  <div class="profile-copy">
    <h3>First Last</h3>
    <p class="profile-role">Team role</p>
    <p>Two or three sentences about the member's work, experience, or interests.</p>
  </div>
</article>
```

Update the image path, alternative text, name, role, and short bio. Confirm that the member has approved the photo and biography before publishing them.

## 4. Add sponsor logos

The sponsor buttons use `teamEmail` and `sponsorshipSubject` from `assets/js/config.js`. Change those two values once and every sponsor button will update automatically.

1. Put the logo in `assets/img/`, preferably as PNG, SVG, or WebP.
2. In `team.html`, replace a sponsor placeholder with:

```html
<a class="sponsor-placeholder" href="https://sponsor.example" aria-label="Sponsor Name">
  <img src="assets/img/sponsor-name.png" alt="Sponsor Name logo">
</a>
```

Use only approved sponsor logos and links.

To add another sponsorship email button, use:

```html
<a class="button dark"
   data-email-link
   data-email-label="Sponsor the Team by Emailing Us"
   data-email-subject="sponsorshipSubject">
  Sponsor the Team by Emailing Us
</a>
```

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

To add an official YouTube video without autoplay, copy a `video-card` from `testing.html` and replace only the video ID, title, and caption. Use the privacy-enhanced address:

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID"
  title="Plain-language description of the test"
  loading="lazy"
  allowfullscreen>
</iframe>
```

The caption should name the vehicle and test, then state any important limit on what that test demonstrated.

## 6. Replace images

Add new images to `assets/img/`. For good performance:

- Use JPG or WebP for photographs.
- Use PNG or SVG for logos and diagrams.
- Resize ordinary web images to roughly 1200-1800 pixels wide.
- Keep most photographs under 500 KB.
- Remove location data and other private metadata from photographs.
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

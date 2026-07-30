# Publishing guide: GitHub Pages

GitHub Pages is the recommended host because this website is entirely static. It provides free HTTPS hosting, version history, browser-based editing, and automatic deployment after changes.

## Option A: publish with the GitHub website

### 1. Create the repository

1. Sign in to GitHub.
2. Click the **+** menu in the upper-right corner and choose **New repository**.
3. Choose an owner. A Rose Aerial Systems GitHub organization is preferable to a student's personal account.
4. Name the repository, for example:

```text
ras-website
```

5. Set visibility to **Public** if using GitHub Free.
6. Create the repository.

### 2. Upload the website

1. Open the new repository.
2. Choose **Add file > Upload files**.
3. Upload the *contents* of this website folder, including:

```text
index.html
engineering.html
testing.html
team.html
assets/
.nojekyll
```

Do not upload only the ZIP file. `index.html` must be at the repository root.

4. Commit the upload to the `main` branch.

### 3. Enable GitHub Pages

1. In the repository, open **Settings**.
2. In the left sidebar, choose **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`.
5. Click **Save**.
6. Wait several minutes, then return to **Settings > Pages** and click **Visit site**.

The default address will usually be:

```text
https://YOUR-GITHUB-NAME.github.io/ras-website/
```

GitHub notes that publishing may take up to about 10 minutes after a change.

## Option B: use a dedicated organization site address

To use an address without the repository name:

```text
https://rose-aerial-systems.github.io/
```

create or use a GitHub organization named `rose-aerial-systems`, then name the repository exactly:

```text
rose-aerial-systems.github.io
```

Only one organization site of this type can exist for each GitHub organization.

## Edit after publishing

### Browser method

1. Open the repository.
2. Open the file to change.
3. Click the pencil icon.
4. Make the change and commit it.
5. Wait for GitHub Pages to republish.

### Local method with GitHub Desktop

1. Install GitHub Desktop and Visual Studio Code.
2. In GitHub Desktop, choose **File > Clone repository**.
3. Edit files in Visual Studio Code.
4. Preview locally:

```bash
python -m http.server 8000
```

5. In GitHub Desktop, write a short summary, click **Commit to main**, then **Push origin**.
6. GitHub Pages republishes automatically.

## Add a custom domain later

You may first publish on the free `github.io` address and add a custom domain later.

1. Purchase or obtain permission to use the desired domain or subdomain.
2. In **Repository Settings > Pages**, enter the custom domain.
3. Configure the DNS records with the domain provider according to GitHub's current custom-domain instructions.
4. After DNS validation succeeds, enable **Enforce HTTPS**.
5. Verify the domain through the GitHub organization or account to reduce the risk of domain takeover.

Do not change DNS records without approval from the person or Rose-Hulman office that controls the domain.

## Troubleshooting

### The site shows a 404

- Confirm `index.html` is at the repository root.
- Confirm Pages is publishing from `main` and `/ (root)`.
- Confirm the latest deployment completed in the repository's **Actions** tab.
- Wait several minutes and refresh without cache.

### Images or styles do not load

- File names are case-sensitive on GitHub Pages.
- Keep the relative paths exactly as written, such as `assets/css/styles.css`.
- Do not rename the `assets` folder unless every link is updated.

### Changes do not appear

- Confirm the change was committed to the publishing branch.
- Wait up to 10 minutes.
- Use a private/incognito browser window or hard refresh.

### Contact links are hidden

Optional links remain hidden until a URL is added to `assets/js/config.js`.

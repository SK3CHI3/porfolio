# How to Push Your Portfolio to GitHub

## Step 1: Create a Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new)
2. Name your repository (e.g., "portfolio")
3. Set it as Public
4. Do NOT initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub
Open your terminal/command prompt and run these commands, replacing `YOUR-USERNAME` with your actual GitHub username:

```
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "GitHub Pages" section
4. Select "main" branch as the source
5. Click "Save"

Your portfolio will be published at `https://YOUR-USERNAME.github.io/portfolio/`

## Step 4: Visit Your Live Portfolio
After a few minutes, your portfolio will be accessible at the URL mentioned above.

---

Your repository has already been initialized and your files have been added and committed. You only need to perform Step 2 and Step 3 from these instructions. 
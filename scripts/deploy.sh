#!/bin/sh
# Build lalu publikasikan folder dist/ ke branch gh-pages di repo GitHub.
# Pemakaian: npm run deploy
set -e
cd "$(dirname "$0")/.."

REMOTE=$(git remote get-url origin)
npm run build

# GitHub Pages tidak mengenal rute React; 404.html = index.html agar /dokter dll. tetap terbuka.
cp dist/index.html dist/404.html
touch dist/.nojekyll

cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git push -f "$REMOTE" gh-pages
rm -rf .git
echo "Selesai. Situs akan diperbarui dalam 1-2 menit."

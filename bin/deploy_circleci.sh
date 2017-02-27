#!/bin/sh
# abort the script if there is a non-zero error
set -e

# show where we are on the machine
# pwd
# remote=$(git config remote.origin.url)

# now lets setup a new repo so we can update the gh-pages branch
git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1
# git remote add --fetch origin "$remote"

echo check out branch gh-pages ...
git checkout -b gh-pages
echo add dist folder
git add -f dist
echo commit changes
git commit -m ":ship: :date: $(date) [ci skip]"
echo push to remote gh-pages
git push origin `git subtree split --prefix dist`:gh-pages --force
echo checkout branch master
git checkout master
echo delete branch gh-pages
git branch -D gh-pages
echo All done!


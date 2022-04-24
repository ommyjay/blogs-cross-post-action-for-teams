yarn all
echo "Enter your commit message:"
read commit
git add .
git commit -m "$commit"
echo "Enter your tag version:"
read tag
git checkout -b releases/$tag
git tag -a -m "$commit" "$tag"
git push -u origin "releases/$tag" --follow-tags
git checkout main
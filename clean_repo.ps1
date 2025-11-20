# Create and switch to a new empty branch
git checkout --orphan empty-branch

# Remove all files
git rm -rf .

# Create an empty commit
git commit --allow-empty -m "Clean repository for redeployment"

# Force push to remote main branch
git push origin empty-branch:main --force

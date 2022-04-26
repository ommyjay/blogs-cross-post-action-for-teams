# Blogs Cross-Post Action for Teams

> GitHub action for teams to easily cross-post blog article on dev.to, hashnode.com and medium.com

## Install Dependencies

```bash
$ yarn
...
```

## Build and Test :heavy_check_mark:

```bash
$ yarn all

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Build, Test and Release

```bash
$ yarn release

...
```

## Usage

You can now consume the action by referencing the v1 branch

```bash
uses: ommyjay/blogs-cross-post-action-for-teams@v1
id: cross_post
with:
  files_location: 'posts/**/*.md'
  dry_run: 'true'
  publish: 'false'
  devto_api_key: ${{ secrets.DEVTO_API_KEY }}
  medium_api_key: ${{ secrets.MEDIUM_API_KEY }}
  devto_org_id: ${{ secrets.DEVTO_ORG_ID }}
  medium_blog_id: ${{ secrets.MEDIUM_BLOG_ID}}
  hashnode_api_key: ${{ secrets.HASHNODE_API_KEY }}
  hashnode_blog_id: ${{ secrets.HASHNODE_BLOG_ID }}

- name: Clean up changed files
  run: git rm `git ls-files --deleted` || exit 0;

- name: Commit new files
  uses: stefanzweifel/git-auto-commit-action@v4
  with:
    commit_message: '⚙️ AUTOMATED: Add posted articles files ${{ steps.cross_post.outputs.posted_articles }}'
    file_pattern: posts/**/*.md
    commit_user_name: ClickPesa-Bot
    commit_user_email: '103582747+ClickPesa-Bot@users.noreply.github.com'

```

### Use with Doppler

> NOTE:
Author's doppler.com configuration token should be set as an secret variable in your GitHub repository with the name of the author followed by _DOPPLER_TOKEN.

```bash
      - name: Set up doppler CLI
        uses: dopplerhq/cli-action@v1

      - name: Set up author doppler token env variable
        run: |
          dopplerToKenName=$(echo "${GITHUB_ACTOR}_DOPPLER_TOKEN" | tr '[:lower:]' '[:upper:]')
          echo "DOPPLER_TOKEN=$dopplerToKenName" >> $GITHUB_ENV

      - name: Set up cross-post env variables from doppler
        run: |
          doppler run -- printenv | grep DOPPLER
          echo "DEVTO_API_KEY=$(doppler secrets get DEVTO_API_KEY --plain)" >> $GITHUB_ENV
          echo "DEVTO_ORG_ID=$(doppler secrets get DEVTO_ORG_ID --plain)" >> $GITHUB_ENV
          echo "MEDIUM_API_KEY=$(doppler secrets get MEDIUM_API_KEY --plain)" >> $GITHUB_ENV
          echo "MEDIUM_BLOG_ID=$(doppler secrets get MEDIUM_BLOG_ID --plain)" >> $GITHUB_ENV
          echo "HASHNODE_API_KEY=$(doppler secrets get HASHNODE_API_KEY --plain)" >> $GITHUB_ENV
          echo "HASHNODE_BLOG_ID=$(doppler secrets get HASHNODE_BLOG_ID --plain)" >> $GITHUB_ENV
        env:
          DOPPLER_TOKEN: ${{ secrets[env.DOPPLER_TOKEN] }}

...

      uses: ommyjay/blogs-cross-post-action-for-teams@v1
      id: cross_post
      with:
        with:
          files_location: 'posts/**/*.md'
          dry_run: 'true'
          publish: 'false'
          devto_api_key: ${{ env.DEVTO_API_KEY }}
          medium_api_key: ${{ env.MEDIUM_API_KEY }}
          devto_org_id: ${{ env.DEVTO_ORG_ID }}
          medium_blog_id: ${{ env.MEDIUM_BLOG_ID}}
          hashnode_api_key: ${{ env.HASHNODE_API_KEY }}
          hashnode_blog_id: ${{ env.HASHNODE_BLOG_ID }}

      - name: Clean up changed files
        run: git rm `git ls-files --deleted` || exit 0;

      - name: Commit new files
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: '⚙️ AUTOMATED: Add posted articles files ${{ steps.cross_post.outputs.posted_articles }}'
          file_pattern: posts/**/*.md
          commit_user_name: ommyjay
          commit_user_email: 'ommyjay@gmail.com'
```

### TODO

- [ ] Create a separate Doppler action to retrieve Author's doppler.com configuration token
- [ ] Handle post cross-posting git cleanup steps within the action
- [ ] Handle post cross-posting git commit steps within the action

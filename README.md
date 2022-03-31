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
with:
  milliseconds: 1000
```

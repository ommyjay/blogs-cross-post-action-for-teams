import {test, jest, expect} from '@jest/globals'
import Git from '../src/git'
const {faker} = require('@faker-js/faker')

test('commit and push updated articles files', async () => {
  const sampleActionPayload = {
    after: 'f42befea04adb16934d450249cd8a577f9d94166',
    base_ref: null,
    before: '0000000000000000000000000000000000000000',
    commits: [
      {
        author: {
          email: 'ommyjay@gmail.com',
          name: 'Omar',
          username: 'ommyjay'
        },
        committer: {
          email: 'ommyjay@gmail.com',
          name: 'Omar',
          username: 'ommyjay'
        },
        distinct: true,
        id: 'f42befea04adb16934d450249cd8a577f9d94166',
        message: '👌 IMPROVE: get github action payload',
        timestamp: '2022-04-11T14:46:50+03:00',
        tree_id: 'daa68806bd9158b2fa6cb717f9be6fe004400097',
        url: 'https://github.com/ommyjay/blogs-cross-post-action-for-teams/commit/f42befea04adb16934d450249cd8a577f9d94166'
      }
    ],
    compare:
      'https://github.com/ommyjay/blogs-cross-post-action-for-teams/commit/f42befea04ad',
    created: true,
    deleted: false,
    forced: false,
    head_commit: {
      author: {
        email: 'ommyjay@gmail.com',
        name: 'Omar',
        username: 'ommyjay'
      },
      committer: {
        email: 'ommyjay@gmail.com',
        name: 'Omar',
        username: 'ommyjay'
      },
      distinct: true,
      id: 'f42befea04adb16934d450249cd8a577f9d94166',
      message: '👌 IMPROVE: get github action payload',
      timestamp: '2022-04-11T14:46:50+03:00',
      tree_id: 'daa68806bd9158b2fa6cb717f9be6fe004400097',
      url: 'https://github.com/ommyjay/blogs-cross-post-action-for-teams/commit/f42befea04adb16934d450249cd8a577f9d94166'
    },
    pusher: {
      email: 'ommyjay@users.noreply.github.com',
      name: 'ommyjay'
    },
    ref: 'refs/heads/commit-changed-files',
    repository: {
      allow_forking: true,
      archive_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/{archive_format}{/ref}',
      archived: false,
      assignees_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/assignees{/user}',
      blobs_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/git/blobs{/sha}',
      branches_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/branches{/branch}',
      clone_url:
        'https://github.com/ommyjay/blogs-cross-post-action-for-teams.git',
      collaborators_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/collaborators{/collaborator}',
      comments_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/comments{/number}',
      commits_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/commits{/sha}',
      compare_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/compare/{base}...{head}',
      contents_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/contents/{+path}',
      contributors_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/contributors',
      created_at: 1648702880,
      default_branch: 'main',
      deployments_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/deployments',
      description: null,
      disabled: false,
      downloads_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/downloads',
      events_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/events',
      fork: false,
      forks: 0,
      forks_count: 0,
      forks_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/forks',
      full_name: 'ommyjay/blogs-cross-post-action-for-teams',
      git_commits_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/git/commits{/sha}',
      git_refs_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/git/refs{/sha}',
      git_tags_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/git/tags{/sha}',
      git_url: 'git://github.com/ommyjay/blogs-cross-post-action-for-teams.git',
      has_downloads: true,
      has_issues: true,
      has_pages: false,
      has_projects: true,
      has_wiki: true,
      homepage: null,
      hooks_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/hooks',
      html_url: 'https://github.com/ommyjay/blogs-cross-post-action-for-teams',
      id: 476157083,
      is_template: false,
      issue_comment_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/issues/comments{/number}',
      issue_events_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/issues/events{/number}',
      issues_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/issues{/number}',
      keys_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/keys{/key_id}',
      labels_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/labels{/name}',
      language: 'TypeScript',
      languages_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/languages',
      license: {
        key: 'mit',
        name: 'MIT License',
        node_id: 'MDc6TGljZW5zZTEz',
        spdx_id: 'MIT',
        url: 'https://api.github.com/licenses/mit'
      },
      master_branch: 'main',
      merges_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/merges',
      milestones_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/milestones{/number}',
      mirror_url: null,
      name: 'blogs-cross-post-action-for-teams',
      node_id: 'R_kgDOHGGUmw',
      notifications_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/notifications{?since,all,participating}',
      open_issues: 0,
      open_issues_count: 0,
      owner: {
        avatar_url: 'https://avatars.githubusercontent.com/u/6849276?v=4',
        email: 'ommyjay@users.noreply.github.com',
        events_url: 'https://api.github.com/users/ommyjay/events{/privacy}',
        followers_url: 'https://api.github.com/users/ommyjay/followers',
        following_url:
          'https://api.github.com/users/ommyjay/following{/other_user}',
        gists_url: 'https://api.github.com/users/ommyjay/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/ommyjay',
        id: 6849276,
        login: 'ommyjay',
        name: 'ommyjay',
        node_id: 'MDQ6VXNlcjY4NDkyNzY=',
        organizations_url: 'https://api.github.com/users/ommyjay/orgs',
        received_events_url:
          'https://api.github.com/users/ommyjay/received_events',
        repos_url: 'https://api.github.com/users/ommyjay/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/ommyjay/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/ommyjay/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/ommyjay'
      },
      private: false,
      pulls_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/pulls{/number}',
      pushed_at: 1649677616,
      releases_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/releases{/id}',
      size: 1604,
      ssh_url: 'git@github.com:ommyjay/blogs-cross-post-action-for-teams.git',
      stargazers: 0,
      stargazers_count: 0,
      stargazers_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/stargazers',
      statuses_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/statuses/{sha}',
      subscribers_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/subscribers',
      subscription_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/subscription',
      svn_url: 'https://github.com/ommyjay/blogs-cross-post-action-for-teams',
      tags_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/tags',
      teams_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/teams',
      topics: [],
      trees_url:
        'https://api.github.com/repos/ommyjay/blogs-cross-post-action-for-teams/git/trees{/sha}',
      updated_at: '2022-03-31T05:01:25Z',
      url: 'https://github.com/ommyjay/blogs-cross-post-action-for-teams',
      visibility: 'public',
      watchers: 0,
      watchers_count: 0
    }
  }
  const branch = sampleActionPayload.ref.replace('refs/heads/', '')
  const repo = {
    name: sampleActionPayload.repository.name,
    user: sampleActionPayload.repository.owner.name
  }
  const updatedArticlesFilesPath = ['posts/test/test-one.md']
  const githubToken = faker.datatype.uuid()
  const commitName = sampleActionPayload.repository.owner.name
  const commitEmail = sampleActionPayload.repository.owner.email
  jest
    .spyOn(Git, 'commitAndPushUpdatedArticlesFiles')
    .mockResolvedValue(undefined)
  expect(
    Git.commitAndPushUpdatedArticlesFiles({
      updatedArticlesFilesPath,
      repo,
      branch,
      githubToken,
      commitName,
      commitEmail
    })
  ).resolves.toBe(undefined)
})

import Articles, {matterArticle} from '../src/article'
import {expect, test, jest} from '@jest/globals'
import fs from 'fs-extra'

test('getting-articles-data', async () => {
  const articlesFileLocation = 'posts/**/*.md'
  const sampleArticlContentFromFile: matterArticle = {
    file: 'posts/test/test-one.md',
    content: '\n# Test One',
    data: {
      title: 'Test One',
      author: 'Omar',
      tags: ['dev', 'medium'],
      excerpt:
        'JavaScript functions are first-class objects, because they can have properties and methods just like any other object',
      canonical_url:
        'https://www.example.com/posts/lion/using-js-functions-properties',
      series: 'Lion',
      publish_to: ['dev', 'medium']
    },
    isEmpty: false,
    excerpt: ''
  }
  jest
    .spyOn(Articles, 'getArticleContentsFromFile')
    .mockResolvedValue(sampleArticlContentFromFile)
  await expect(Articles.getArticles(articlesFileLocation)).resolves.toContain(
    sampleArticlContentFromFile
  )
})

test('rename-article-filename', async () => {
  const oldFileName = 'posts/test/test-one.md'
  const newFileName = 'posts/test/test-one.mdd'
  jest.spyOn(Articles, 'renameArticleFileName').mockResolvedValue(newFileName)
  await expect(
    Articles.renameArticleFileName(oldFileName, newFileName)
  ).resolves.toBe(newFileName)
})

test('get-devTo-Posted-article-file', async () => {
  const allArticlesSample = [
    {
      file: 'posts/test/test-one.md',
      content:
        '\n In JavaScript, functions are first-class objects, because they can have properties and methods just like any other object.\n\n 🍻 🍻 🍻 🍻 🍻\n',
      data: {
        title: 'Test Three',
        author: 'Omar',
        tags: ['javascript', 'functions'],
        excerpt:
          'JavaScript functions are first-class objects, because they can have properties and methods just like any other object',
        organization_id: '5308',
        canonical_url:
          'https://www.example.com/posts/lion/using-js-functions-properties',
        series: 'Lion',
        publish_to: ['dev', 'hashnode', 'medium']
      },
      isEmpty: false,
      excerpt: ''
    },
    {
      file: 'posts/test/test-one.md',
      content:
        '\n In JavaScript, functions are first-class objects, because they can have properties and methods just like any other object.\n\n 🍻 🍻 🍻 🍻 🍻\n',
      data: {
        title: 'Test Two',
        author: 'Omar',
        tags: ['javascript', 'functions'],
        excerpt:
          'JavaScript functions are first-class objects, because they can have properties and methods just like any other object',
        organization_id: '5308',
        canonical_url:
          'https://www.example.com/posts/lion/using-js-functions-properties',
        series: 'Lion',
        publish_to: ['dev', 'hashnode', 'medium']
      },
      isEmpty: false,
      excerpt: ''
    }
  ]
  const sampleDevToBlogPostResponse = [
    {
      type_of: 'article',
      id: 1050512,
      title: 'Test Three',
      description: 'Senora Bonita   🍻 🍻 🍻 🍻 🍻',
      readable_publish_date: null,
      slug: 'test-three-2na-temp-slug-2158217',
      path: '/clickpesa/test-three-2na-temp-slug-2158217',
      url: 'https://dev.to/clickpesa/test-three-2na-temp-slug-2158217',
      comments_count: 0,
      public_reactions_count: 0,
      collection_id: 17655,
      published_timestamp: '',
      positive_reactions_count: 0,
      cover_image: null,
      social_image: 'https://dev.to/social_previews/article/1050512.png',
      canonical_url:
        'https://www.example.com/posts/lion/using-js-functions-properties',
      created_at: '2022-04-10T07:35:18Z',
      edited_at: null,
      crossposted_at: null,
      published_at: null,
      last_comment_at: '2017-01-01T05:00:00Z',
      reading_time_minutes: 1,
      tag_list: 'javascript, functions',
      tags: ['javascript', 'functions'],
      body_html:
        '<h2>\n  <a name="senora-bonita" href="#senora-bonita">\n  </a>\n  Senora Bonita\n</h2>\n\n<p>🍻 🍻 🍻 🍻 🍻</p>\n\n',
      body_markdown: '\n## Senora Bonita\n\n 🍻 🍻 🍻 🍻 🍻\n',
      user: {
        name: 'Omar',
        username: 'ommyjay',
        twitter_username: null,
        github_username: 'ommyjay',
        website_url: 'https://ommyjay.me',
        profile_image:
          'https://res.cloudinary.com/practicaldev/image/fetch/s--2CVfF_c6--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/244703/6f0c5476-c84d-45ca-b493-fd981346d82f.jpeg',
        profile_image_90:
          'https://res.cloudinary.com/practicaldev/image/fetch/s--ou19SGrz--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/244703/6f0c5476-c84d-45ca-b493-fd981346d82f.jpeg'
      },
      organization: {
        name: 'ClickPesa',
        username: 'clickpesa',
        slug: 'clickpesa',
        profile_image:
          'https://res.cloudinary.com/practicaldev/image/fetch/s--yF7Sgr1U--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5308/13a0af00-4127-4744-9bbc-53c93c961c49.png',
        profile_image_90:
          'https://res.cloudinary.com/practicaldev/image/fetch/s--KAXR9TOL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5308/13a0af00-4127-4744-9bbc-53c93c961c49.png'
      }
    }
  ]
  await expect(
    Articles.getdevToPostedArticleFile(
      allArticlesSample,
      sampleDevToBlogPostResponse
    )
  ).resolves.toEqual(['posts/test/test-one.md'])
})

test('updated-posted-articles-file-names', async () => {
  const path = 'posts/test/test-file.md'
  const prefix = '[dev].'
  jest
    .spyOn(Articles, 'updatedPostedArticlesFileNames')
    .mockResolvedValue(['posts/test/[dev].test-file.md'])
  await expect(
    Articles.updatedPostedArticlesFileNames([path], prefix)
  ).resolves.toEqual(['posts/test/[dev].test-file.md'])
})

test('replace-text-in-file', async () => {
  const file = 'posts/test/test-one.md'
  const stringToReplace = `title`
  const replaceText = `no-title`
  jest.spyOn(Articles, 'replaceTextInFile')
  Articles.replaceTextInFile(file, stringToReplace, replaceText)
  expect(Articles.replaceTextInFile).toBeCalled()
})

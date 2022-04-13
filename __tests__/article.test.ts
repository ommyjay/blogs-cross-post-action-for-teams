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
      organization_id: '5308',
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

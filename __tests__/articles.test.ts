import Articles from './../src/article'
import {expect, test, jest} from '@jest/globals'

// getting articles data
test('getting-articles', async () => {
  const articlesFileLocation = 'posts/**/*.md'
  await expect(Articles.getArticles(articlesFileLocation)).resolves.toBe('')
})

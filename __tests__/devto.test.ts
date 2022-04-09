import {expect, test, jest} from '@jest/globals'
import devTo, {DevToArticleData} from '../src/devto'
const {faker} = require('@faker-js/faker')

// posting to dev.to blog
test('post to dev.to', async () => {
  const devToArticleData: DevToArticleData = {
    content: {
      article: {
        title: faker.random.words(),
        body_markdown: faker.random.word(),
        tags: [faker.random.word()],
        canonical_url: faker.internet.url(),
        published: 'false',
        series: faker.random.word(),
        organization_id: faker.random.word()
      }
    },
    config: {
      devtoKey: faker.random.word(),
      dryRun: true,
    }
  }
  jest
    .spyOn(devTo, 'sendPublishRequest')
    .mockImplementation(() => Promise.resolve(''))
  await expect(devTo.postToDevToBlog(devToArticleData)).resolves.toBe('')
})

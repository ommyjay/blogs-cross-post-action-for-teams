import {expect, test, jest} from '@jest/globals'
const {faker} = require('@faker-js/faker')
import devTo, {DevToArticleData} from '../src/devto'

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
        devto_organization_id: faker.random.word()
      }
    },
    config: {
      devToAPIKey: faker.random.word()
    }
  }
  jest.spyOn(devTo, 'sendPublishRequest').mockResolvedValue('')
  await expect(devTo.postToDevToBlog(devToArticleData)).resolves.toBe('')
})

import {expect, test, jest} from '@jest/globals'
import devTo, {
  DevToArticleData,
  PostToDevToBlogResponseType,
  sampleDevToPostResponse
} from '../src/devto'
const {faker} = require('@faker-js/faker')

test('post to dev.to', async () => {
  const devToArticleData: DevToArticleData = {
    content: {
      article: {
        title: faker.random.words(),
        body_markdown: faker.random.word(),
        tags: [faker.random.word()],
        canonical_url: faker.internet.url(),
        published: 'false',
        series: faker.random.word()
      }
    },
    config: {
      devtoKey: faker.random.word(),
      dryRun: false,
      localFilePath: faker.random.word(),
      organization_id: faker.random.word()
    }
  }
  jest
    .spyOn(devTo, 'sendPublishRequest')
    .mockImplementation(() =>
      Promise.resolve(sampleDevToPostResponse as PostToDevToBlogResponseType)
    )
  await expect(devTo.postToDevToBlog(devToArticleData)).resolves.toBe(
    sampleDevToPostResponse
  )
})

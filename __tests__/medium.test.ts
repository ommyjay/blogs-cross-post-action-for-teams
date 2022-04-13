import {expect, test, jest} from '@jest/globals'
import Medium, {
  MediumArticleData,
  PostToMediumBlogResponseType,
  sampleMediumPostResponse
} from '../src/medium'
const {faker} = require('@faker-js/faker')

test('post to medium', async () => {
  const mediumArticleData: MediumArticleData = {
    content: {
      title: faker.random.words(),
      contentFormat: 'markdown',
      content: faker.random.word(),
      canonicalUrl: faker.internet.url(),
      tags: [faker.random.word(), faker.random.word(), faker.random.word()],
      publishStatus: 'draft'
    },
    config: {
      mediumBlogId: faker.random.word(),
      mediumKey: faker.random.word(),
      dryRun: false,
      localFilePath: faker.random.word()
    }
  }
  jest
    .spyOn(Medium, 'sendPublishRequest')
    .mockImplementation(() =>
      Promise.resolve(sampleMediumPostResponse as PostToMediumBlogResponseType)
    )
  await expect(Medium.postToMediumBlog(mediumArticleData)).resolves.toBe(
    sampleMediumPostResponse
  )
})

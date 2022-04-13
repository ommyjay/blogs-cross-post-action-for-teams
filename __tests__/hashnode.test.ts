import {expect, test, jest} from '@jest/globals'
import Hashnode, {
  HashnodeArticleData,
  HashnodeGetAuthorsTags,
  PostToHashnodeBlogResponseType,
  sampleGetAuthorCategoriesResponse,
  sampleHashnodePostResponse
} from '../src/hashnode'
const {faker} = require('@faker-js/faker')

test('post to hashnode', async () => {
  const hashnodeArticleData: HashnodeArticleData = {
    content: {
      variables: {
        input: {
          title: faker.lorem.sentence(),
          contentMarkdown: faker.lorem.paragraph(),
          tags: [
            {
              _id: '56744723958ef13879b9549b',
              slug: 'testing',
              name: 'Testing'
            }
          ]
        },
        publicationId: faker.datatype.uuid()
      }
    },
    config: {
      hashnodeKey: faker.datatype.uuid(),
      dryRun: false,
      localFilePath: faker.random.word()
    }
  }
  jest
    .spyOn(Hashnode, 'sendPublishRequest')
    .mockImplementation(() =>
      Promise.resolve(
        sampleHashnodePostResponse as PostToHashnodeBlogResponseType
      )
    )
  await expect(Hashnode.postToHashnodeBlog(hashnodeArticleData)).resolves.toBe(
    sampleHashnodePostResponse
  )
})

test('get authors tags from hashnode', async () => {
  const requiredTags = ['reactjs', 'javascript']
  const hashnodeArticleData: HashnodeGetAuthorsTags = {
    requiredTags,
    config: {
      hashnodeKey: faker.datatype.uuid()
    }
  }
  jest
    .spyOn(Hashnode, 'getAuthorsTags')
    .mockImplementation(() =>
      Promise.resolve(sampleGetAuthorCategoriesResponse.data.tagCategories)
    )
  await expect(Hashnode.getAuthorsTags(hashnodeArticleData)).resolves.toEqual(
    sampleGetAuthorCategoriesResponse.data.tagCategories
  )
})

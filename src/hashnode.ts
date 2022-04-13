import {GlobalConfig} from './config'
import axios from 'axios'
import * as core from '@actions/core'
import Articles from './article'

export type HashnodeArticleData = {
  content: {
    variables: {
      input: {
        title: string
        contentMarkdown: string
        tags: {_id: string; slug: string; name: string}[]
      }
      publicationId: string
    }
  }
  config: {
    hashnodeKey: string
    dryRun: boolean
    localFilePath: string
  }
}

export type HashnodeGetAuthorsTags = {
  requiredTags: string[]
  config: {
    hashnodeKey: string
  }
}

export type PostToHashnodeBlogResponseType = {
  data: {
    createPublicationStory: {
      message: string
      post: {
        slug: string
        title: string
      }
    }
  }
  updated_article_file_name: string
}

type TagCategory = {
  _id: string
  name: string
  slug: string
}

type GetAuthorsTagsResponseType = {
  data: {
    tagCategories: TagCategory[]
  }
}

type HashnodeType = {
  postToHashnodeBlog(
    articleData: HashnodeArticleData
  ): Promise<PostToHashnodeBlogResponseType | undefined>
  sendPublishRequest(
    articleData: HashnodeArticleData
  ): Promise<PostToHashnodeBlogResponseType | undefined>
  getAuthorsTags(
    getTagsData: HashnodeGetAuthorsTags
  ): Promise<TagCategory[] | undefined>
}

export const sampleHashnodePostResponse = {
  data: {
    createPublicationStory: {
      message: 'publication story created successfully',
      post: {
        slug: 'using-js-functions-properties-in-real-life',
        title: 'Test three'
      }
    }
  },
  updated_article_file_name: 'post/path/to/hashnode-post.md'
}

export const sampleGetAuthorCategoriesResponse = {
  data: {
    tagCategories: [
      {
        _id: '56744721958ef13879b94cad',
        name: 'JavaScript',
        slug: 'javascript'
      },
      {
        _id: '56744723958ef13879b95434',
        name: 'React',
        slug: 'reactjs'
      },
      {
        _id: '56744723958ef13879b9549b',
        slug: 'testing',
        name: 'Testing'
      }
    ]
  }
}

const Hashnode: HashnodeType = {
  async postToHashnodeBlog(
    articleData: HashnodeArticleData
  ): Promise<PostToHashnodeBlogResponseType | undefined> {
    return await Hashnode.sendPublishRequest(articleData)
  },
  async sendPublishRequest(articleData: HashnodeArticleData) {
    if (articleData.config.localFilePath.includes('[hashnode]')) {
      core.debug(`Article already posted!`)
      return
    }

    core.debug(`hashnode article data:: ${JSON.stringify(articleData)}`)
    const hashnodePrefix = '[hashnode].'

    if (articleData.config.dryRun) {
      core.debug(articleData.config.localFilePath)
      /* await Articles.updatedPostedArticlesFileNames(
        [articleData.config.localFilePath],
        hashnodePrefix
      ) */
      return sampleHashnodePostResponse as PostToHashnodeBlogResponseType
    }

    try {
      const {data, status} = await axios.post<PostToHashnodeBlogResponseType>(
        `${GlobalConfig.hashnodeBaseURL}`,
        {
          ...articleData.content,
          query: `mutation createPublicationStory($input: CreateStoryInput! $publicationId: String!){
           createPublicationStory(input: $input,publicationId: $publicationId )
           { code success message } }`
        },
        {
          headers: {
            Authorization: `${articleData.config.hashnodeKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
      core.debug(`sendPublishRequest response status is:  ${status}`)
      await Articles.updatedPostedArticlesFileNames(
        [articleData.config.localFilePath],
        hashnodePrefix
      )
      return {
        ...data,
        updated_article_file_name: articleData.config.localFilePath
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        core.debug(`error message:  ${JSON.stringify(error?.response?.data)}`)
      } else {
        core.debug(`unexpected error: ${error}`)
      }
    }
  },
  async getAuthorsTags(getTagsData: HashnodeGetAuthorsTags) {
    try {
      const {data, status} = await axios.post<GetAuthorsTagsResponseType>(
        `${GlobalConfig.hashnodeBaseURL}`,
        {
          query: `query{
              tagCategories{
                _id
                name
                slug
              }
            }`
        },
        {
          headers: {
            Authorization: `${getTagsData.config.hashnodeKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
      core.debug(`getAuthorsTags response status is:  ${status}`)
      return data.data.tagCategories.filter(category =>
        getTagsData.requiredTags.includes(category.slug)
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        core.debug(`error message:  ${JSON.stringify(error?.response?.data)}`)
      } else {
        core.debug(`unexpected error: ${error}`)
      }
    }
  }
}

export default Hashnode

import {GlobalConfig} from './config'
import axios from 'axios'
import * as core from '@actions/core'
import Articles from './article'

export type MediumArticleData = {
  content: {
    title: string
    contentFormat: string
    content: string
    canonicalUrl: string
    tags: string[]
    publishStatus?: string
  }
  config: {
    mediumBlogId: string
    mediumKey: string
    dryRun: boolean
    localFilePath: string
  }
}

export type PostToMediumBlogResponseType = {
  data: {
    id: string
    title: string
    authorId: string
    url: string
    canonicalUrl: string
    publishStatus: string
    publishedAt: number
    license: string
    licenseUrl: string
    tags: string[]
    publicationId: string
  }
  updated_article_file_name: string
}

type MediumType = {
  postToMediumBlog(
    articleData: MediumArticleData
  ): Promise<PostToMediumBlogResponseType | undefined>
  sendPublishRequest(
    articleData: MediumArticleData
  ): Promise<PostToMediumBlogResponseType | undefined>
}

export const sampleMediumPostResponse = {
  data: {
    id: '317116d9947f',
    title: 'Test Three',
    authorId: '1198cea4d9ca7484cd12381ef06e',
    url: 'https://medium.com/@ommyjay/using-js-functions-properties-in-real-life-317116d9947f',
    canonicalUrl:
      'https://ommyjay.me/blog/using-js-functions-properties-in-real-life',
    publishStatus: '',
    publishedAt: 1648551241873,
    license: '',
    licenseUrl:
      'https://policy.medium.com/medium-terms-of-service-9db0094a1e0f',
    tags: ['function', 'property', 'javascript'],
    publicationId: 'publication_Id'
  },
  updated_article_file_name: 'post/path/to/medium-post.md'
}

const Medium: MediumType = {
  async postToMediumBlog(
    articleData: MediumArticleData
  ): Promise<PostToMediumBlogResponseType | undefined> {
    return await Medium.sendPublishRequest(articleData)
  },
  async sendPublishRequest(articleData: MediumArticleData) {
    if (articleData.config.localFilePath.includes('[medium]')) {
      core.debug(`Article already posted!`)
      return
    }

    core.debug(`medium article data:: ${JSON.stringify(articleData)}`)
    const mediumPrefix = '[medium].'

    if (articleData.config.dryRun) {
      core.debug(articleData.config.localFilePath)
      //await Articles.updatedPostedArticlesFileNames([articleData.config.localFilePath], mediumPrefix)
      return sampleMediumPostResponse as PostToMediumBlogResponseType
    }

    try {
      const {data, status} = await axios.post<PostToMediumBlogResponseType>(
        `${GlobalConfig.mediumBaseURL}/publications/${articleData.config.mediumBlogId}/posts`,
        articleData.content,
        {
          headers: {
            Authorization: `Bearer ${articleData.config.mediumKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
      core.debug(`response status is:  ${status}`)
      await Articles.updatedPostedArticlesFileNames(
        [articleData.config.localFilePath],
        mediumPrefix
      )
      return {
        ...data,
        updated_article_file_name: articleData.config.localFilePath
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        core.debug(`error message:  ${error.message}`)
      } else {
        core.debug(`unexpected error: ${error}`)
      }
    }
  }
}

export default Medium

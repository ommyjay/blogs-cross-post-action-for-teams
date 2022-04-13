import {GlobalConfig} from './config'
import axios from 'axios'
import * as core from '@actions/core'
import Articles from './article'
export type DevToArticleData = {
  content: {
    article: {
      title: string
      body_markdown: string
      tags: string[]
      canonical_url: string
      published: string
      series: string
    }
  }
  config: {
    devtoKey: string
    dryRun: boolean
    localFilePath: string
    organization_id: string
  }
}

type User = {
  name: string
  username: string
  twitter_username?: string | null
  github_username: string
  website_url: string
  profile_image: string
  profile_image_90: string
}

type Organization = {
  name: string
  username: string
  slug: string
  profile_image: string
  profile_image_90: string
}

export type PostToDevToBlogResponseType = {
  type_of: string
  id: number
  title: string
  description: string
  readable_publish_date?: Date | string | null
  slug: string
  path: string
  url: string
  comments_count: number
  public_reactions_count: number
  collection_id: number
  published_timestamp: string
  positive_reactions_count: number
  cover_image?: string | null
  social_image: string
  canonical_url: string
  created_at: Date | string | null
  edited_at?: Date | string | null
  crossposted_at?: Date | string | null
  published_at?: Date | string | null
  last_comment_at: Date | string
  reading_time_minutes: number
  tag_list: string
  tags: string[]
  body_html: string
  body_markdown: string
  user: User
  organization: Organization
  updated_article_file_name: string
}

type DevToType = {
  postToDevToBlog(
    articleData: DevToArticleData
  ): Promise<PostToDevToBlogResponseType | undefined>
  sendPublishRequest(
    articleData: DevToArticleData
  ): Promise<PostToDevToBlogResponseType | undefined>
}

export const sampleDevToPostResponse = {
  type_of: 'article',
  id: 1050512,
  title: 'Test Three',
  description: 'Senora Bonita   🍻 🍻 🍻 🍻 🍻',
  readable_publish_date: null,
  updated_article_file_name: 'post/path/to/devto-post.md'
}
const devTo: DevToType = {
  async postToDevToBlog(
    articleData: DevToArticleData
  ): Promise<PostToDevToBlogResponseType | undefined> {
    return await devTo.sendPublishRequest(articleData)
  },
  async sendPublishRequest(articleData: DevToArticleData) {
    core.debug(`dev.to article data:: ${JSON.stringify(articleData)}`)

    if (articleData.config.localFilePath.includes('[dev]')) {
      core.debug(`Article already posted!`)
      return
    }

    const devToPrefix = '[dev].'

    if (articleData.config.dryRun) {
      //await Articles.updatedPostedArticlesFileNames([articleData.config.localFilePath], devToPrefix)
      return sampleDevToPostResponse as PostToDevToBlogResponseType
    }

    try {
      const {data, status} = await axios.post<PostToDevToBlogResponseType>(
        GlobalConfig.devToBaseURL,
        articleData.content,
        {
          headers: {
            'api-key': articleData.config.devtoKey,
            'Content-Type': 'application/json'
          }
        }
      )
      core.debug(`response status is:  ${status}`)
      await Articles.updatedPostedArticlesFileNames(
        [articleData.config.localFilePath],
        devToPrefix
      )
      return {
        ...data,
        updated_article_file_name: articleData.config.localFilePath
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        core.debug(`error message:  ${error.response?.data}`)
      } else {
        core.debug(`unexpected error: ${error}`)
      }
    }
  }
}

export default devTo

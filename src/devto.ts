import {GlobalConfig} from './config'
import axios from 'axios'
import * as core from '@actions/core'

export type DevToArticleData = {
  content: {
    article: {
      title: string
      body_markdown: string
      tags: string[]
      canonical_url: string
      published: string
      series: string
      devto_organization_id: string
    }
  }
  config: {
    devToAPIKey: string
  }
}
type DevTo = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  postToDevToBlog(articleData: DevToArticleData): Promise<any>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  sendPublishRequest(articleData: DevToArticleData): Promise<any>
}
type PostToDevToBlogResponse = unknown
const devTo: DevTo = {
  async postToDevToBlog(articleData: DevToArticleData): Promise<string> {
    return await devTo.sendPublishRequest(articleData)
  },
  async sendPublishRequest(articleData: DevToArticleData) {
    try {
      const {data, status} = await axios.post<PostToDevToBlogResponse>(
        GlobalConfig.devToBaseURL,
        articleData.content,
        {
          headers: {
            Accept: 'application/json',
            'api-key': articleData.config.devToAPIKey,
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }
      )
      core.debug(`response status is:  ${status}`)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        core.debug(`error message:  ${error.message}`)
        return error.message
      } else {
        core.debug(`unexpected error: ${error}`)
        return 'An unexpected error occurred'
      }
    }
  }
}

export default devTo

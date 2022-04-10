import { GlobalConfig } from './config'
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
      organization_id: string
    }
  }
  config: {
    devtoKey: string
    dryRun: boolean
  }
}
type DevTo = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  postToDevToBlog(articleData: DevToArticleData): Promise<any>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  sendPublishRequest(articleData: DevToArticleData): Promise<any>
}

type User = {
  name: string;
  username: string;
  twitter_username?: any;
  github_username: string;
  website_url: string;
  profile_image: string;
  profile_image_90: string;
}

type Organization = {
  name: string;
  username: string;
  slug: string;
  profile_image: string;
  profile_image_90: string;
}
export type PostToDevToBlogResponse = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date?: Date | string | null;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image?: any;
  social_image: string;
  canonical_url: string;
  created_at: Date | string;
  edited_at?: any;
  crossposted_at?: any;
  published_at?: any;
  last_comment_at: Date | string;
  reading_time_minutes: number;
  tag_list: string;
  tags: string[];
  body_html: string;
  body_markdown: string;
  user: User;
  organization: Organization;
}
const devTo: DevTo = {
  async postToDevToBlog(articleData: DevToArticleData): Promise<string> {
    return await devTo.sendPublishRequest(articleData)
  },
  async sendPublishRequest(articleData: DevToArticleData) {
    core.debug(JSON.stringify(articleData))
    if (articleData.config.dryRun) {
      return {
        "type_of": "article",
        "id": 1050512,
        "title": "Test Three",
        "description": "Senora Bonita   🍻 🍻 🍻 🍻 🍻",
        "readable_publish_date": null,
        "slug": "test-three-2na-temp-slug-2158217",
        "path": "/clickpesa/test-three-2na-temp-slug-2158217",
        "url": "https://dev.to/clickpesa/test-three-2na-temp-slug-2158217",
        "comments_count": 0,
        "public_reactions_count": 0,
        "collection_id": 17655,
        "published_timestamp": "",
        "positive_reactions_count": 0,
        "cover_image": null,
        "social_image": "https://dev.to/social_previews/article/1050512.png",
        "canonical_url": "https://www.example.com/posts/lion/using-js-functions-properties",
        "created_at": "2022-04-10T07:35:18Z",
        "edited_at": null,
        "crossposted_at": null,
        "published_at": null,
        "last_comment_at": "2017-01-01T05:00:00Z",
        "reading_time_minutes": 1,
        "tag_list": "javascript, functions",
        "tags": [
          "javascript",
          "functions"
        ],
        "body_html": "<h2>\n  <a name=\"senora-bonita\" href=\"#senora-bonita\">\n  </a>\n  Senora Bonita\n</h2>\n\n<p>🍻 🍻 🍻 🍻 🍻</p>\n\n",
        "body_markdown": "\n## Senora Bonita\n\n 🍻 🍻 🍻 🍻 🍻\n",
        "user": {
          "name": "Omar",
          "username": "ommyjay",
          "twitter_username": null,
          "github_username": "ommyjay",
          "website_url": "https://ommyjay.me",
          "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--2CVfF_c6--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/244703/6f0c5476-c84d-45ca-b493-fd981346d82f.jpeg",
          "profile_image_90": "https://res.cloudinary.com/practicaldev/image/fetch/s--ou19SGrz--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/244703/6f0c5476-c84d-45ca-b493-fd981346d82f.jpeg"
        },
        "organization": {
          "name": "ClickPesa",
          "username": "clickpesa",
          "slug": "clickpesa",
          "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--yF7Sgr1U--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5308/13a0af00-4127-4744-9bbc-53c93c961c49.png",
          "profile_image_90": "https://res.cloudinary.com/practicaldev/image/fetch/s--KAXR9TOL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5308/13a0af00-4127-4744-9bbc-53c93c961c49.png"
        }
      }
    }

    try {
      const { data, status } = await axios.post<PostToDevToBlogResponse>(
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
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        core.debug(`error message:  ${error.response?.data}`)
        return error.message
      } else {
        core.debug(`unexpected error: ${error}`)
        return 'An unexpected error occurred'
      }
    }
  }
}

export default devTo

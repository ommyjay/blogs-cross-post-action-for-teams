import * as core from '@actions/core'
import * as github from '@actions/github'
import Articles from './article'
import devTo, { DevToArticleData } from './devto'

async function run(): Promise<void> {
  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    core.debug(`The event payload: ${payload}`)

    const devtoKey: string = core.getInput('devto_api_key')
    const articlesFileLocation: string = core.getInput('files_location')

    core.setSecret(devtoKey)

    const articles = await Articles.getArticles(articlesFileLocation)
    core.setOutput('formated_articles', articles[0])

    const promises = articles.map(async article => {
      const devToArticleData: DevToArticleData = {
        content: {
          article: {
            title: article?.data.title,
            body_markdown: article?.content || '# Hello World',
            tags: article?.data.tags,
            canonical_url: article?.data.canonical_url,
            published: core.getInput('publish'),
            series: article?.data.series,
            organization_id: article?.data.organization_id
          }
        },
        config: {
          devtoKey,
          dryRun: true,
        }
      }
      return devTo.postToDevToBlog(devToArticleData)
    })
    const postToDevToBlogResponse = await Promise.all(promises)
    core.debug(`Output result_json: ${postToDevToBlogResponse}`)
    core.setOutput('post_to_devto_blog_response', postToDevToBlogResponse)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

import * as core from '@actions/core'
import * as github from '@actions/github'
import devTo, {DevToArticleData} from './devto'

async function run(): Promise<void> {
  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    core.debug(`The event payload: ${payload}`)

    const devToArticleData: DevToArticleData = {
      content: {
        article: {
          title: core.getInput('title'),
          body_markdown: core.getInput('body_markdown'),
          tags: core.getInput('tags').split(','),
          canonical_url: core.getInput('canonical_url'),
          published: core.getInput('published'),
          series: core.getInput('series'),
          devto_organization_id: core.getInput('devto_organization_id')
        }
      },
      config: {
        devToAPIKey: core.getInput('devto_api_key')
      }
    }
    const postToDevToBlogResponse = await devTo.postToDevToBlog(
      devToArticleData
    )
    core.debug(`Output result_json:\n ${postToDevToBlogResponse}`)
    core.setOutput('post_to_devto_blog_response', postToDevToBlogResponse)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

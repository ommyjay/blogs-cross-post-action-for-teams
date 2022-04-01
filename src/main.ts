import {GlobalConfig} from './config'
import * as core from '@actions/core'
import * as github from '@actions/github'
import devTo, {DevToArticleData} from './devto'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    const something = GlobalConfig.something
    core.debug(`Waiting ${ms} milliseconds ...`)
    core.debug(`something: ${something}`)
    core.debug(new Date().toTimeString())
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())

    const nameToGreet = core.getInput('who-to-greet')
    core.debug(`Hello ${nameToGreet}!`)

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    core.debug(`The event payload: ${payload}`)

    core.debug(`Hello ${core.getInput('title')}!`)

    const devToArticleData: DevToArticleData = {
      content: {
        article: {
          title: core.getInput('title'),
          body_markdown: core.getInput('body_markdown'),
          tags: [core.getInput('tags')],
          canonical_url: core.getInput('canonical_url'),
          published: core.getInput('published'),
          series: core.getInput('series'),
          organization_id: core.getInput('organization_id')
        }
      },
      config: {
        devToAPIKey: core.getInput('devto_api_key')
      }
    }
    const postToDevToBlogResponse = await devTo.postToDevToBlog(
      devToArticleData
    )
    core.setOutput('postToDevToBlogResponse', postToDevToBlogResponse)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

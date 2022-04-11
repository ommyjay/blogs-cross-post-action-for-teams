import * as core from '@actions/core'
import * as github from '@actions/github'
import Articles from './article'
import devTo, { DevToArticleData } from './devto'
import Git from './git'

async function run(): Promise<void> {
  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    core.debug(`The event payload: ${payload}`)

    const devtoKey: string = core.getInput('devto_api_key')
    const articlesFileLocation: string = core.getInput('files_location')

    core.setSecret(devtoKey)

    const articlesFiles = await Articles.getArticles(articlesFileLocation)
    core.setOutput('formated_articles', articlesFiles[0])

    const postToDevToBlogResponse = await Promise.all(
      articlesFiles.map(async article => {
        const devToArticleData: DevToArticleData = {
          content: {
            article: {
              title: article?.data.title || '# Hello',
              body_markdown: article?.content || '# Hello World',
              tags: article?.data.tags || [],
              canonical_url: article?.data.canonical_url || '',
              published: core.getInput('publish'),
              series: article?.data.series || '',
              organization_id: core.getInput('devto_org_id')
            }
          },
          config: {
            devtoKey,
            dryRun: true
          }
        }
        return devTo.postToDevToBlog(devToArticleData)
      })
    )
    core.debug(`Output result_json: ${postToDevToBlogResponse}`)
    const postedFileNames = (await Articles.getdevToPostedArticleFile(
      articlesFiles,
      postToDevToBlogResponse
    )) as string[]
    const devToPrefix = '[dev].'
    const updatedArticlesFilesPath =
      await Articles.updatedPostedArticlesFileNames(
        postedFileNames,
        devToPrefix
      )

    const githubToken = core.getInput('ghub_token')
    const repo = {
      name: github.context.payload.repository?.name || 'blogs-cross-post-action-for-teams',
      user: github.context.payload.repository?.owner.name || 'ommyjay'
    }
    const commitName = github.context.payload.repository?.owner.name || 'Omar'
    const commitEmail =
      github.context.payload.repository?.owner.email || 'ommyjay@gmail.com'
    const branch = core.getInput('commiting_branch')

    Git.commitAndPushUpdatedArticlesFiles({
      updatedArticlesFilesPath,
      repo,
      branch,
      githubToken,
      commitName,
      commitEmail
    })

    core.setOutput('posted_files', postedFileNames)
    core.setOutput(
      'updated_posted_article_file_paths',
      updatedArticlesFilesPath
    )
    core.setOutput('post_to_devto_blog_response', postToDevToBlogResponse)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

import * as core from '@actions/core'
//import * as github from '@actions/github'
import Articles, {matterArticle} from './article'
import devTo, {DevToArticleData} from './devto'
import Hashnode, {HashnodeArticleData} from './hashnode'
import Medium, {MediumArticleData} from './medium'

async function run(): Promise<void> {
  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    // core.debug(`The event payload: ${payload}`)

    const devtoKey: string = core.getInput('devto_api_key')
    const devtoOrgId: string = core.getInput('devto_org_id')
    const mediumBlogId: string = core.getInput('medium_blog_id')
    const mediumKey: string = core.getInput('medium_api_key')
    const hashnodeKey: string = core.getInput('hashnode_api_key')
    const hashnodeBlogId: string = core.getInput('hashnode_blog_id')
    const dryRun: boolean = core.getInput('dry_run') === 'true'
    const publish: boolean = core.getInput('publish') === 'true'

    core.setSecret(devtoKey)
    core.setSecret(devtoOrgId)
    core.setSecret(mediumKey)
    core.setSecret(mediumBlogId)

    const {devToArticles} = await getDevToArticles()
    const postToDevToBlogResponse = await Promise.all(
      devToArticles.map(async article => {
        const devToArticleData: DevToArticleData = {
          content: {
            article: {
              title: article?.data.title || '# Hello',
              body_markdown: article?.content || '# Hello World',
              tags: article?.data.tags || [],
              canonical_url: article?.data.canonical_url || '',
              published: publish ? 'true' : 'false',
              series: article?.data.series || ''
            }
          },
          config: {
            organization_id: devtoOrgId,
            devtoKey,
            dryRun,
            localFilePath: article?.file || ''
          }
        }
        return devTo.postToDevToBlog(devToArticleData)
      })
    )

    const {mediumArticles} = await getMediumArticles()
    const postMediumBlogResponse = await Promise.all(
      mediumArticles.map(async article => {
        const mediumArticleData: MediumArticleData = {
          content: {
            title: article?.data.title || '# Hello',
            contentFormat: 'markdown',
            content: article?.content || '# Hello World',
            canonicalUrl: article?.data.canonical_url || '',
            tags: article?.data.tags || [],
            ...(!publish && {publishStatus: 'draft'})
          },
          config: {
            mediumBlogId,
            mediumKey,
            dryRun,
            localFilePath: article?.file || ''
          }
        }
        return Medium.postToMediumBlog(mediumArticleData)
      })
    )

    const {hashnodeArticles} = await getHashnodeArticles()
    const postHashnodeBlogResponse = await Promise.all(
      hashnodeArticles.map(async article => {
        const hashnodeArticleData: HashnodeArticleData = {
          content: {
            variables: {
              input: {
                title: article?.data.title || '# Hello',
                contentMarkdown: article?.content || '# Hello World',
                tags:
                  (await Hashnode.getAuthorsTags({
                    requiredTags: article?.data.tags || [],
                    config: {
                      hashnodeKey
                    }
                  })) || []
              },
              publicationId: hashnodeBlogId
            }
          },
          config: {
            hashnodeKey,
            dryRun,
            localFilePath: article?.file || ''
          }
        }
        return Hashnode.postToHashnodeBlog(hashnodeArticleData)
      })
    )

    core.debug(
      `post_to_devto_blog_response:: ${JSON.stringify(
        postToDevToBlogResponse,
        undefined,
        2
      )}`
    )
    core.debug(
      `post_to_medium_blog_response:: ${JSON.stringify(
        postMediumBlogResponse,
        undefined,
        2
      )}`
    )

    core.debug(
      `post_to_medium_blog_response:: ${JSON.stringify(
        postHashnodeBlogResponse,
        undefined,
        2
      )}`
    )

    core.setOutput(
      'posted_articles',
      [
        ...postToDevToBlogResponse.map(
          article => article?.updated_article_file_name
        ),
        ...postMediumBlogResponse.map(
          article => article?.updated_article_file_name
        ),
        ...postHashnodeBlogResponse.map(
          article => article?.updated_article_file_name
        )
      ].join(', ')
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

async function getDevToArticles(): Promise<{devToArticles: matterArticle[]}> {
  const articlesFileLocation: string = core.getInput('files_location')
  const articlesFiles = await Articles.getArticles(articlesFileLocation)
  const devToArticles = articlesFiles.filter(articles =>
    articles?.data.publish_to.includes('dev')
  )
  return {devToArticles}
}

async function getMediumArticles(): Promise<{mediumArticles: matterArticle[]}> {
  const articlesFileLocation: string = core.getInput('files_location')
  const articlesFiles = await Articles.getArticles(articlesFileLocation)
  const mediumArticles = articlesFiles.filter(articles =>
    articles?.data.publish_to.includes('medium')
  )
  return {mediumArticles}
}

async function getHashnodeArticles(): Promise<{
  hashnodeArticles: matterArticle[]
}> {
  const articlesFileLocation: string = core.getInput('files_location')
  const articlesFiles = await Articles.getArticles(articlesFileLocation)
  const hashnodeArticles = articlesFiles.filter(articles =>
    articles?.data.publish_to.includes('hashnode')
  )
  return {hashnodeArticles}
}

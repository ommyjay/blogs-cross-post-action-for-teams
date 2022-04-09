import * as fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'

export type ArticlesI = {
  getArticles: (filesGlob?: string) => Promise<
    ({
      data: {
        [title: string]: unknown
      }
      content: string
      excerpt?: string | undefined
      orig: string | Buffer
      language: string
      matter: string
      stringify(lang: string): string
      file: string
    } | null)[]
  >
  getArticleContentsFromFile: (file: string) => Promise<unknown>
}

const Articles = {
  getArticles: async (filesGlob: string) => {
    const entries = fg.sync(filesGlob, {dot: true})

    const articles = await Promise.all(
      entries.map(Articles.getArticleContentsFromFile)
    )
    return articles.filter(article => article !== null)
  },
  getArticleContentsFromFile: async (file: string) => {
    const content = await fs.readFile(file, 'utf-8')
    const article = matter(content, {language: 'yaml'})

    //eslint:disable-next-line: no-console
    //console.log('article :>> ', article)
    // An article must have a least a title property and sync should not be disabled
    if (
      !article.data.title ||
      (article.data.devto_sync !== undefined && !article.data.devto_sync)
    ) {
      //debug('File "%s" do not have a title or has sync disabled, skipping', file);
      return null
    }
    return {file, ...article}
  }
}

export default Articles

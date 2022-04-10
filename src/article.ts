import * as fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import { PostToDevToBlogResponse } from './devto'

export type matterArticle = ({
  data: {
    title: string;
    author: string;
    tags: string[];
    excerpt: string;
    organization_id: string;
    canonical_url: string;
    series: string;
    publish_to: string[];
  };
  content: string
  excerpt?: string | undefined
  orig?: string | Buffer
  language?: string
  matter?: string
  file: string
} | null)


export type ArticlesI = {
  getArticles: (filesGlob?: string) => Promise<
    matterArticle[]
  >
  getArticleContentsFromFile: (file: string) => Promise<unknown>
}

const Articles = {
  getArticles: async (filesGlob: string) => {
    const entries = fg.sync(filesGlob, { dot: true })

    const articles = await Promise.all(
      entries.map(Articles.getArticleContentsFromFile)
    )
    return articles.filter(article => article !== null)
  },
  getArticleContentsFromFile: async (file: string) => {
    const content = await fs.readFile(file, 'utf-8')
    const article = matter(content, { language: 'yaml' })
    // An article must have a least a title property
    if (!article.data.title) {
      return null
    }
    return { file, ...article }
  },
  replaceTextInFile: async (
    file: string,
    stringToReplace: string,
    replacement: string
  ) => {
    const content = await fs.readFile(file, 'utf-8')
    const toReplaceRegExp = new RegExp(stringToReplace, 'g')
    const newContent = content.replace(toReplaceRegExp, replacement)
    await fs.writeFile(file, newContent)
  },
  getdevToPostedArticleFile: async (allArticlesFiles: matterArticle[], postedArticleResult: PostToDevToBlogResponse[]) => {
    const postedArticlesFileNames = allArticlesFiles.filter(function (articleFileData) {
      return postedArticleResult.some(function (postResponseData) {
        return articleFileData?.data.title === postResponseData.title;
      });
    });
    if (postedArticlesFileNames) {
      return postedArticlesFileNames.map(files => files?.file)
    }
    return null
  },
  updatedPostedArticlesFileNames: async (postedArticlesPath: string[], newFileNamePrefix: string) => {
    return await Promise.all(postedArticlesPath.map(postedPathName => {
      const filename = postedPathName.replace(/^.*[\\\/]/, '')
      const fileDirectory = postedPathName.split(filename)[0]
      const newPathName = fileDirectory + newFileNamePrefix + filename;
      return Articles.renameArticleFileName(postedPathName, newPathName)
    }))
  },
  renameArticleFileName: async (oldFileName: string, newFileName: string) => {
    await fs.rename(oldFileName, newFileName)
    return newFileName
  }
}

export default Articles

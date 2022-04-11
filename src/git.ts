import {getExecOutput, ExecOutput} from '@actions/exec'
import * as core from '@actions/core'

const commitTitle = `Update published articles files`

const git: (
  command: string,
  args: string[],
  flags?: string[]
) => Promise<ExecOutput> = async (
  command: string,
  args: string[],
  flags: string[] = []
) => getExecOutput('git', [...flags, command, ...args])

const getRepositoryUrl: (
  repository: {
    user: string
    name: string
  },
  githubToken: string
) => string = (repository: {user: string; name: string}, githubToken: string) =>
  `https://${githubToken}@github.com/${repository.user}/${repository.name}.git`

type commitAndPushUpdatedArticlesFilesType = {
  updatedArticlesFilesPath: string[]
  repo: {
    user: string
    name: string
  }
  branch: string
  githubToken: string
  useConventionalCommitMessage?: boolean
  commitName: string
  commitEmail: string
}

const Git = {
  commitAndPushUpdatedArticlesFiles: async ({
    updatedArticlesFilesPath,
    repo,
    branch,
    githubToken,
    useConventionalCommitMessage = true,
    commitName,
    commitEmail
  }: commitAndPushUpdatedArticlesFilesType) => {
    try {
      const files = updatedArticlesFilesPath.map(filePath => filePath)
      await git('add', files)

      const status = await git('status', ['--porcelain'])
      if (status.stdout) {
        let commitMessage = useConventionalCommitMessage
          ? `chore: ${commitTitle.toLowerCase()}`
          : commitTitle
        commitMessage += ` [skip ci]`

        await git(
          'commit',
          ['-m', commitMessage],
          [
            '-c',
            `user.name="${commitName}"`,
            '-c',
            `user.email="${commitEmail}"`
          ]
        )

        await git('push', [
          getRepositoryUrl(repo, githubToken),
          `HEAD:${branch}`
        ])
      } else {
        core.debug(`Nothing to commit.`)
      }
    } catch (error) {
      if (error instanceof Error) core.setFailed(error.message)
    }
  }
}

export default Git

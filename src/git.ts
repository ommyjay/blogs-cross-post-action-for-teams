import process from 'node:process';
import { getExecOutput } from '@actions/exec';

const commitTitle = `Update published articles`;
const commitName = process.env.GIT_COMMITTER_NAME || `blogs-cross-post bot`;
const commitEmail =
   process.env.GIT_COMMITTER_EMAIL || `ommyjay@gmail.com`;
const git = (command: string, args: string[], flags: string[] = []) =>
   getExecOutput('git', [...flags, command, ...args]);

const getRepositoryUrl = (repository: { user: string, name: string }, githubToken: string) =>
   `https://${githubToken}@github.com/${repository.user}/${repository.name}.git`;

const Git = {
   commitAndPushUpdatedArticlesFiles: async (
      udatedArticlesFilesPath: string[],
      repo: { user: string, name: string },
      branch: string,
      githubToken: string,
      conventional = false
   ) => {
      try {
         const files = udatedArticlesFilesPath.map((filePath) => filePath);
         await git('add', files);

         const status = await git('status', ['--porcelain']);
         if (status.stdout) {
            let commitMessage = conventional
               ? `chore: ${commitTitle.toLowerCase()}`
               : commitTitle;
            commitMessage += ` [skip ci]`;

            await git(
               'commit',
               ['-m', commitMessage],
               ['-c', `user.name="${commitName}"`, '-c', `user.email="${commitEmail}"`]
            );

            await git('push', [
               getRepositoryUrl(repo, githubToken),
               `HEAD:${branch}`
            ]);
         } else {
            console.log('Nothing to commit');
         }
      } catch (error) {
         if (error instanceof Error) throw new Error(`Cannot commit changes: ${error.message}`);
      }
   }
}

export default Git;
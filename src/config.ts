import * as core from '@actions/core'

export const GlobalConfig = {
  something: core.getInput('something'),
  devToBaseURL: 'https://dev.to/api/articles'
}

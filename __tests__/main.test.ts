import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test} from '@jest/globals'
require('dotenv').config()

// shows how the runner will run a javascript action with env / stdout protocol
test('main', () => {
  process.env['INPUT_FILES_LOCATION'] = 'posts/**/*.md'
  process.env['INPUT_DRY_RUN'] = 'true'
  process.env['INPUT_PUBLISH'] = 'false'
  process.env['INPUT_DEVTO_API_KEY'] = process.env.DEVTO_API_KEY
  process.env['INPUT_MEDIUM_API_KEY'] = process.env.MEDIUM_API_KEY
  process.env['INPUT_DEVTO_ORG_ID'] = process.env.DEVTO_ORG_ID
  process.env['INPUT_MEDIUM_BLOG_ID'] = process.env.MEDIUM_BLOG_ID
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})

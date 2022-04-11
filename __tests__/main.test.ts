import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('main', () => {
  process.env['INPUT_PUBLISH'] = 'false'
  process.env['INPUT_DEVTO_API_KEY'] = 'zZ1wupaH72JnaGAALNjL8Bua'
  process.env['INPUT_FILES_LOCATION'] = 'posts/**/*.md'
  process.env['INPUT_DEVTO_ORG_ID'] = '5308'
  process.env['INPUT_GHUB_TOKEN'] = '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'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})

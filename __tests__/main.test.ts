import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = '500'
  process.env['INPUT_SOMETHING'] = 'nova'
  process.env['INPUT_TITLE'] = 'something else 🤿'
  process.env['INPUT_BODY_MARKDOWN'] = 'something else 🤿'
  process.env['INPUT_TAGS'] = 'something else 🤿'
  process.env['INPUT_CANONICAL_URL'] = 'something else 🤿'
  process.env['INPUT_PUBLISHED'] = 'something else 🤿'
  process.env['INPUT_SERIES'] = 'something else 🤿'
  process.env['INPUT_DEVTO_ORGANIZATION_ID'] = '0000'
  process.env['INPUT_DEVTO_API_KEY'] = 'somethingelse'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})

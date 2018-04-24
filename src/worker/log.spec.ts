/**
 * houston/src/worker/log.spec.ts
 * Tests the worker Log can do log related things :shrug:
 */

import * as path from 'path'

import { Log } from './log'

test('it can render a template', () => {
  const test1 = path.resolve(__dirname, '../../test/fixture/worker/log/test1.md')

  const log = Log.template(Log.Level.ERROR, test1, {
    body: '## This is a subheader',
    title: 'testing'
  })

  expect(log.title).toBe('testing')
  expect(log.body).toBe('This is a basic test1 Log template.\n\n## This is a subheader')
})

test('toString returns a nice templated log', () => {
  const err = new Log(Log.Level.ERROR, 'title', 'body')
  const str = err.toString()

  expect(str).toBe('# title\n\nbody')
})

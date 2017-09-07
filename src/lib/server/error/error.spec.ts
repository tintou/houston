/**
 * houston/src/lib/server/error/error.spec.ts
 * Tests the super basic http error. Mostly for coverage, but hey, can't be too careful.
 */

import { BasicHttpError } from './error'

test('defaults to a basic 500 error', () => {
  const error = new BasicHttpError()

  expect(error.httpStatus).toEqual(500)
})

test('can set properties from constructor', () => {
  const error = new BasicHttpError(404, 'Page Not Found')

  expect(error.httpStatus).toEqual(404)
  expect(error.httpMessage).toEqual('Page Not Found')
})

test('default render function sets status and sane message', async () => {
  const error = new BasicHttpError(418, 'Im a problem')

  const ctx = {}
  await error.httpRender(ctx)

  expect(ctx.status).toEqual(418)
  expect(ctx.body).toContain(418)
  expect(ctx.body).toContain('Im a problem')
})

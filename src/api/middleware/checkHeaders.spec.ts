/**
 * houston/src/api/middleware/checkHeaders.ts
 * Checks headers for the needed json api spec
 */

import { Context } from 'koa'
import { Context as FakeContext } from '../../../test/utility/koa'

import { Config } from '../../lib/config'
import { BasicHttpError } from '../../lib/server/error/error'

import { checkHeaders } from './checkHeaders'

const next = async (ctx: Context) => {
  ctx.status = 200
  ctx.body = 'win'
}

test('checkHeaders fails with incorrect accept header', () => {
  const middleware = checkHeaders()
  const ctx = FakeContext({ headers: {
    'accept': 'text*',
    'content-length': 12,
    'content-type': 'application/vnd.api+json'
  }})

  return expect(middleware(ctx, next)).rejects.toBeDefined()
})

test('checkHeaders fails with incorrect content-type header', () => {
  const middleware = checkHeaders()
  const ctx = FakeContext({ headers: {
    'accept': 'application/vnd.api+json',
    'content-length': 12,
    'content-type': 'application/json'
  }})

  return expect(middleware(ctx, next)).rejects.toBeDefined()
})

test('checkHeaders passes with correct headers', async () => {
  const middleware = checkHeaders()
  const ctx = FakeContext({ headers: {
    'accept': 'application/vnd.api+json',
    'content-length': 12,
    'content-type': 'application/vnd.api+json'
  }})

  await middleware(ctx, next)

  return expect(ctx.status).toBe(200)
})
/**
 * houston/src/api/middleware/checkHeaders.ts
 * Checks headers for the needed json api spec
 */

import { Context } from 'koa'

import { BasicHttpError } from '../../lib/server/error/error'

/**
 * checkHeaders
 * Checks headers for JSON api requirements
 *
 * @return {Function} - A middleware function
 */
export function checkHeaders () {

  /**
   * Checks headers for incomming requests
   *
   * @param {Context} ctx - A Server context
   * @param {Function|null} next - The next item in line
   *
   * @return {void}
   */
  return async (ctx: Context, next: (ctx: Context) => Promise<void>) => {
    const is = ctx.is('application/vnd.api+json')
    if (is == null || is === false) {
      throw new BasicHttpError(415, 'Invalid request headers')
    }

    const accepts = ctx.accepts('application/vnd.api+json')
    if (accepts == null || accepts === false) {
      throw new BasicHttpError(406, 'Request does not accept correct type')
    }

    return next(ctx)
  }
}
import { resolve } from 'path'
import Koa from 'koa'
import csp from 'koa-csp'
import logger from 'koa-logger'
import staticServer from 'koa-static'
import ssr from '@server/middleware/vue-server-render'
import favicon from '@server/middleware/favicon'
import * as config from '@server/config'
import { nodeEnv } from '@framework/env'
import hmr from './middleware/hmr'


export default async function(): Promise<Koa> {
  const server = new Koa()

  server
    .use(logger())
    .use(csp(config.csp))

  if (nodeEnv.is.local) server.use(await hmr())

  server
    .use(await ssr())
    .use(staticServer(resolve(__dirname, '../client')))
    .use(favicon())

  return server
}

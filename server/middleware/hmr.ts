import { resolve } from 'path'
import { Middleware } from 'koa'
import webpackMiddleware from 'koa-webpack'
import webpack from 'webpack'
import webpackConfig from '@/build/webpack.config.client'

webpackConfig.context = resolve(webpackConfig.context, '../')
webpackConfig.resolve.alias['@client'] = resolve(webpackConfig.context, 'client')
webpackConfig.resolve.alias['@framework'] = resolve(webpackConfig.context, 'framework')
webpackConfig.resolve.alias['@server'] = resolve(webpackConfig.context, 'server')

export default async function hmr(): Promise<Middleware> {
  const compiler = webpack(webpackConfig)

  const middlewareConfig = {
    compiler,
    /*
     * NOTE: used for mobile development
     * hotClient: { host: { client: '*', server: HOST } },
     */
    devMiddleware: {
      serverSideRender: true,
      noInfo: true,
      stats: {
        colors: true,
        chunks: false,
      },
    },
  }
  return await webpackMiddleware(middlewareConfig)
}

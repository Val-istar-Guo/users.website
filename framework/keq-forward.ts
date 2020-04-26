import { Middleware } from 'keq'
import { UrlWithParsedQuery } from 'url'
import url from 'url'

interface BaseOptions {
  replacer: (urlWithParsedQuery: UrlWithParsedQuery) => UrlWithParsedQuery
}

interface OptionsWithHost extends BaseOptions {
  host: string
}

interface OptionsWithMatch extends BaseOptions {
  match: RegExp
}

type Options = OptionsWithHost | OptionsWithMatch

export default function forward(options: Options): Middleware {
  return async(context, next) => {
    let needReplace = false

    if ('match' in options) {
      const uri = url.format(context.request.url)
      needReplace = options.match.test(uri)
    } else {
      needReplace = context.request.url.host === options.host
    }

    if (needReplace) context.request.url = options.replacer(context.request.url)
    await next()
  }
}

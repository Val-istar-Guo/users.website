import cookie from 'cookie'

let cookies: Record<string, string> = {}

export function init(obj: Record<string, string>): void {
  cookies = obj
}

export function set(key: string, value: string, options?: cookie.CookieSerializeOptions): void {
  cookies[key] = value
  if (document.cookie.length) document.cookie += '&'
  document.cookie += cookie.serialize(key, value, options)
}

export function get(key: string): string | undefined {
  return cookies[key]
}

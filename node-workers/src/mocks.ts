import { HttpResponse } from 'msw'

const originalFetch = global.fetch

export const fetchMock = async (
  input: string | URL | Request
): Promise<Response> => {
  const url = input instanceof URL ? input : new URL(String(input))
  switch (url.href) {
    case 'http://x.abc.com/':
      return HttpResponse.html(`<a href=http://x.abc.com/pages/1>page 1</a>
          some text
           <a href=http://x.abc.com/pages/about>about</a>
           <a href=http://x.abc.com>homepage</a> some test
            <a href=http://u.abc.com>homepage u</a>
            <a href=http://u.x.abc.com>homepage u x</a>
            <a href=http://google.com>google.com</a>
            <a href=ht://yahoo.com>yahoo.com</a>
          `)
    case 'http://x.abc.com/pages/1':
      return HttpResponse.html(`
            <a href=http://x.abc.com/pages/2>page 2</a>
            some text
            <a href=http://x.abc.com/pages/about>about</a>
            <a href=http://x.abc.com>homepage</a>
            <a href=http://x.abc.com/3>page 3</a>
            `)
    case 'http://x.abc.com/3':
    case 'http://x.abc.com/pages/2':
    case 'http://x.abc.com/pages/about':
      return HttpResponse.html(``)
    case 'http://status500.abc.com/':
    case 'http://status500.abc.com':
      return HttpResponse.text('Error', { status: 500 })
    case 'http://error.abc.com':
    case 'http://error.abc.com/':
      return HttpResponse.error()
    case 'http://null.abc.com':
    case 'http://null.abc.com/':
      return new HttpResponse()
    default:
      throw new Error(`Network Error`)
  }
}

export function restoreFetch() {
  global.fetch = originalFetch
}

export function mockFetch() {
  global.fetch = fetchMock
}

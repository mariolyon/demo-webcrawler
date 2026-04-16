import { type Link, type Links } from './types.ts'
import Fetcher from './fetcher.ts'

const testMode = import.meta.env && import.meta.env.MODE === 'test'

const MAX_JOBS = 4
let jobsInProgress: number = 0
let jobs: Map<string, Promise<Links>> = new Map()
let queue: string[] = []
let seen: Set<Link> = new Set()

function processQueue() {
  while (jobsInProgress < MAX_JOBS && queue.length > 0) {
    jobsInProgress++
    const link: string = queue.shift()!
    visitUrl(new URL(link))
  }
}

async function visitUrl(baseUrl: URL): Promise<void> {
  const fetcher = new Fetcher(baseUrl.href)
  return fetcher
    .start()
    .then((links) => {
      if (!testMode) {
        console.log({ visited: baseUrl.href, links })
      }
      const unseenLinks = links.filter((link) => !seen.has(link))
      unseenLinks.forEach((link) => {
        void seen.add(link)
        queue.push(new URL(link, baseUrl).href)
      })

      setTimeout(() => processQueue(), 0)
      return Promise.resolve()
    })
    .catch((err: Error) => {
      return Promise.reject(err)
    })

}

export default visitUrl

export async function crawl(url: URL) {
  await visitUrl(url)
  await Promise.allSettled(jobs.values())
}

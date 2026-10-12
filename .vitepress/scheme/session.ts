import { createSchemeSession, formatSchemeOutput, type SchemeSession } from './eval'
import { extractExecutableSource } from './parse'

export type SchemeBlockHandle = {
  index: number
  getSource: () => string
  setOutput: (text: string, isError?: boolean) => void
  setRunning: (running: boolean) => void
}

export type SchemeSessionFactory = () => SchemeSession

type PageSession = {
  session: SchemeSession
  blocks: Map<number, SchemeBlockHandle>
  bootstrapped: boolean
  bootstrapTimer?: ReturnType<typeof setTimeout>
}

const byIndex = (a: SchemeBlockHandle, b: SchemeBlockHandle) => a.index - b.index

/**
 * Owns one Scheme interpreter per page and replays a page's blocks in source
 * order, so each block sees the definitions of the blocks above it.
 *
 * Deliberately free of Vue (the route watcher lives in the composable) so the
 * whole lifecycle can be unit tested with a fake session.
 */
export class SchemeSessionRegistry {
  private readonly pages = new Map<string, PageSession>()

  constructor(private readonly createSession: SchemeSessionFactory = createSchemeSession) {}

  register(path: string, block: SchemeBlockHandle) {
    this.page(path).blocks.set(block.index, block)
  }

  unregister(path: string, block: SchemeBlockHandle) {
    this.pages.get(path)?.blocks.delete(block.index)
  }

  /** Re-run every block on the page from a clean interpreter state. */
  async rerun(path: string) {
    await this.replay(this.page(path))
  }

  /** Run a page's blocks once, the first time a block mounts. */
  async bootstrap(path: string) {
    const page = this.page(path)
    if (page.bootstrapped) return
    page.bootstrapped = true
    await this.replay(page)
  }

  scheduleBootstrap(path: string) {
    const page = this.page(path)
    if (page.bootstrapTimer) clearTimeout(page.bootstrapTimer)
    page.bootstrapTimer = setTimeout(() => void this.bootstrap(path), 0)
  }

  /** Release a page's interpreter and any pending work. */
  dispose(path: string) {
    const page = this.pages.get(path)
    if (!page) return
    if (page.bootstrapTimer) clearTimeout(page.bootstrapTimer)
    this.pages.delete(path)
  }

  get pageCount() {
    return this.pages.size
  }

  private page(path: string): PageSession {
    let page = this.pages.get(path)
    if (!page) {
      page = { session: this.createSession(), blocks: new Map(), bootstrapped: false }
      this.pages.set(path, page)
    }
    return page
  }

  private async replay(page: PageSession) {
    page.session.reset()
    for (const block of [...page.blocks.values()].sort(byIndex)) {
      block.setRunning(true)
      const result = page.session.run(extractExecutableSource(block.getSource()))
      block.setOutput(formatSchemeOutput(result), Boolean(result.error))
      block.setRunning(false)
    }
  }
}

import { useRoute } from 'vitepress'
import { effectScope, onScopeDispose, reactive, watch } from 'vue'
import { createSchemeSession, formatSchemeOutput, type SchemeSession } from '../../scheme/eval'
import { extractExecutableSource } from '../../scheme/parse'

export type SchemeBlockHandle = {
  index: number
  off: boolean
  getSource: () => string
  setOutput: (text: string, isError?: boolean) => void
  setRunning: (running: boolean) => void
}

type PageSession = {
  session: SchemeSession
  blocks: Map<number, SchemeBlockHandle>
  bootstrapped: boolean
  bootstrapTimer?: ReturnType<typeof setTimeout>
}

const sessions = new Map<string, PageSession>()

const getPageSession = (path: string): PageSession => {
  let page = sessions.get(path)
  if (!page) {
    page = {
      session: createSchemeSession(),
      blocks: new Map(),
      bootstrapped: false,
    }
    sessions.set(path, page)
  }
  return page
}

/** Drop a page's interpreter and pending work once we navigate away from it. */
const disposePageSession = (path: string) => {
  const page = sessions.get(path)
  if (!page) return
  if (page.bootstrapTimer) clearTimeout(page.bootstrapTimer)
  sessions.delete(path)
}

const runnableBlocks = (page: PageSession) =>
  [...page.blocks.values()].filter((b) => !b.off).sort((a, b) => a.index - b.index)

const replayBlocks = async (page: PageSession) => {
  page.session.reset()
  for (const block of runnableBlocks(page)) {
    block.setRunning(true)
    const result = page.session.run(extractExecutableSource(block.getSource()))
    block.setOutput(formatSchemeOutput(result), Boolean(result.error))
    block.setRunning(false)
  }
}

let routeWatchInstalled = false

// Kept in a detached scope so it survives the unmount of whichever block
// happened to install it; otherwise it would be disposed with that component
// and later navigations would never release their page session.
const installRouteWatch = (path: () => string) => {
  routeWatchInstalled = true
  effectScope(true).run(() => {
    watch(path, (_path, prev) => {
      if (prev) disposePageSession(prev)
    })
  })
}

export const useSchemePageSession = () => {
  const route = useRoute()
  const page = getPageSession(route.path)

  if (!routeWatchInstalled) installRouteWatch(() => route.path)

  const owned = new Set<SchemeBlockHandle>()

  const register = (block: SchemeBlockHandle) => {
    page.blocks.set(block.index, block)
    owned.add(block)
  }

  const unregister = (block: SchemeBlockHandle) => {
    page.blocks.delete(block.index)
    owned.delete(block)
  }

  const rerun = async () => {
    await replayBlocks(page)
  }

  const bootstrap = async () => {
    if (page.bootstrapped) return
    page.bootstrapped = true
    await replayBlocks(page)
  }

  const scheduleBootstrap = () => {
    if (page.bootstrapTimer) clearTimeout(page.bootstrapTimer)
    page.bootstrapTimer = setTimeout(() => void bootstrap(), 0)
  }

  onScopeDispose(() => {
    for (const block of owned) page.blocks.delete(block.index)
    owned.clear()
  })

  return reactive({
    register,
    unregister,
    rerun,
    scheduleBootstrap,
  })
}

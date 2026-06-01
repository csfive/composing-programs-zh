import { useRoute } from 'vitepress'
import { onScopeDispose, reactive, watch } from 'vue'
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
}

const sessions = new Map<string, PageSession>()
let routeWatchInstalled = false

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

export const useSchemePageSession = () => {
  const route = useRoute()
  const path = route.path
  const page = getPageSession(path)

  if (!routeWatchInstalled) {
    routeWatchInstalled = true
    watch(
      () => route.path,
      (_path, prev) => {
        if (!prev) return
        const previous = sessions.get(prev)
        if (previous) previous.bootstrapped = false
      },
    )
  }

  const register = (block: SchemeBlockHandle) => {
    page.blocks.set(block.index, block)
  }

  const unregister = (block: SchemeBlockHandle) => {
    page.blocks.delete(block.index)
  }

  const runBlock = async (index: number) => {
    const block = page.blocks.get(index)
    if (!block || block.off) return

    block.setRunning(true)
    const result = page.session.run(extractExecutableSource(block.getSource()))
    block.setOutput(formatSchemeOutput(result), Boolean(result.error))
    block.setRunning(false)
  }

  const rerunFrom = async (index: number) => {
    await replayBlocks(page)
  }

  let bootstrapTimer: ReturnType<typeof setTimeout> | undefined

  const bootstrap = async () => {
    if (page.bootstrapped) return
    page.bootstrapped = true
    await replayBlocks(page)
  }

  const scheduleBootstrap = () => {
    if (bootstrapTimer) clearTimeout(bootstrapTimer)
    bootstrapTimer = setTimeout(() => bootstrap(), 0)
  }

  onScopeDispose(() => {
    for (const block of page.blocks.values()) {
      unregister(block)
    }
  })

  return reactive({
    register,
    unregister,
    runBlock,
    rerunFrom,
    scheduleBootstrap,
  })
}

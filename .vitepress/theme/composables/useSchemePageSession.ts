import { useRoute } from 'vitepress'
import { effectScope, onScopeDispose, reactive, watch } from 'vue'
import { SchemeSessionRegistry, type SchemeBlockHandle } from '../../scheme/session'

const registry = new SchemeSessionRegistry()
let routeWatchInstalled = false

// Kept in a detached scope so the watcher survives the unmount of whichever
// block component installed it; otherwise it would be disposed with that
// component and later navigations would never release their page session.
const installRouteWatch = (path: () => string) => {
  routeWatchInstalled = true
  effectScope(true).run(() => {
    watch(path, (_path, prev) => {
      if (prev) registry.dispose(prev)
    })
  })
}

export const useSchemePageSession = () => {
  const route = useRoute()
  const path = route.path

  if (!routeWatchInstalled) installRouteWatch(() => route.path)

  const owned = new Set<SchemeBlockHandle>()

  const register = (block: SchemeBlockHandle) => {
    registry.register(path, block)
    owned.add(block)
  }

  const unregister = (block: SchemeBlockHandle) => {
    registry.unregister(path, block)
    owned.delete(block)
  }

  const rerun = () => registry.rerun(path)
  const scheduleBootstrap = () => registry.scheduleBootstrap(path)

  onScopeDispose(() => {
    for (const block of owned) registry.unregister(path, block)
    owned.clear()
  })

  return reactive({ register, unregister, rerun, scheduleBootstrap })
}

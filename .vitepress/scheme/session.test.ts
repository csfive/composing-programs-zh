import { afterEach, describe, expect, it, vi } from 'vitest'
import type { SchemeSession } from './eval'
import { SchemeSessionRegistry, type SchemeBlockHandle } from './session'

type FakeSession = {
  session: SchemeSession
  calls: { reset: number; runs: string[] }
}

const createFakeSession = (): FakeSession => {
  const calls = { reset: 0, runs: [] as string[] }
  const session = {
    reset: () => {
      calls.reset += 1
    },
    run: (code: string) => {
      calls.runs.push(code)
      return { lines: [`=> ${code}`] }
    },
  } as unknown as SchemeSession
  return { session, calls }
}

type FakeBlock = SchemeBlockHandle & { outputs: string[]; running: boolean[] }

const createBlock = (index: number, code: string): FakeBlock => {
  const outputs: string[] = []
  const running: boolean[] = []
  return {
    index,
    outputs,
    running,
    getSource: () => code,
    setOutput: (text) => outputs.push(text),
    setRunning: (value) => running.push(value),
  }
}

afterEach(() => {
  vi.useRealTimers()
})

describe('SchemeSessionRegistry', () => {
  it('replays blocks in index order, not registration order', async () => {
    const { session, calls } = createFakeSession()
    const registry = new SchemeSessionRegistry(() => session)

    registry.register('/p', createBlock(2, 'third'))
    registry.register('/p', createBlock(0, 'first'))
    registry.register('/p', createBlock(1, 'second'))

    await registry.rerun('/p')
    expect(calls.runs).toEqual(['first', 'second', 'third'])
  })

  it('runs a page exactly once on bootstrap', async () => {
    const { session, calls } = createFakeSession()
    const registry = new SchemeSessionRegistry(() => session)
    registry.register('/p', createBlock(0, '(+ 1 2)'))

    await registry.bootstrap('/p')
    await registry.bootstrap('/p')
    expect(calls.reset).toBe(1)
    expect(calls.runs).toEqual(['(+ 1 2)'])
  })

  it('replays again after rerun', async () => {
    const { session, calls } = createFakeSession()
    const registry = new SchemeSessionRegistry(() => session)
    registry.register('/p', createBlock(0, 'x'))

    await registry.bootstrap('/p')
    await registry.rerun('/p')
    expect(calls.reset).toBe(2)
  })

  it('does not replay unregistered blocks', async () => {
    const { session, calls } = createFakeSession()
    const registry = new SchemeSessionRegistry(() => session)
    const block = createBlock(0, 'x')
    registry.register('/p', block)
    registry.unregister('/p', block)

    await registry.bootstrap('/p')
    expect(calls.runs).toEqual([])
  })

  it('de-bounces bootstrap through the scheduled timer', async () => {
    vi.useFakeTimers()
    const { session, calls } = createFakeSession()
    const registry = new SchemeSessionRegistry(() => session)
    registry.register('/p', createBlock(0, 'x'))

    registry.scheduleBootstrap('/p')
    registry.scheduleBootstrap('/p')
    await vi.runAllTimersAsync()

    expect(calls.reset).toBe(1)
  })

  it('disposes a page so the next visit starts fresh', async () => {
    const { session } = createFakeSession()
    const registry = new SchemeSessionRegistry(() => session)
    registry.register('/p', createBlock(0, 'x'))
    expect(registry.pageCount).toBe(1)

    registry.dispose('/p')
    expect(registry.pageCount).toBe(0)

    await registry.bootstrap('/p')
    expect(registry.pageCount).toBe(1)
  })

  it('shares definitions between blocks on the same page (real session)', async () => {
    const registry = new SchemeSessionRegistry()
    const definition = createBlock(0, '(define shared 7)')
    const usage = createBlock(1, 'shared')
    registry.register('/p', definition)
    registry.register('/p', usage)

    await registry.bootstrap('/p')
    expect(usage.outputs).toEqual(['7'])
  })
})

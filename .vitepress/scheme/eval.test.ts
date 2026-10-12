import { describe, expect, it } from 'vitest'
import { createSchemeSession, formatSchemeOutput } from './eval'

describe('createSchemeSession', () => {
  it('evaluates an expression and returns its written value', () => {
    const session = createSchemeSession()
    const result = session.run('(+ 1 2)')
    expect(result.error).toBeUndefined()
    expect(result.lines).toEqual(['3'])
  })

  it('captures display output before the result value', () => {
    const session = createSchemeSession()
    const result = session.run('(display "hi")\n(+ 1 2)')
    expect(result.error).toBeUndefined()
    expect(result.lines).toEqual(['hi', '3'])
  })

  it('stops at the first failing form and reports the error', () => {
    const session = createSchemeSession()
    const result = session.run('(+ 1 2)\n(define)\n(* 2 2)')
    expect(result.error).toBeTruthy()
    expect(result.lines).toEqual(['3'])
  })

  it('captures parse errors instead of throwing', () => {
    const session = createSchemeSession()
    const result = session.run('(+ 1')
    expect(result.error).toBeTruthy()
    expect(result.lines).toEqual([])
  })

  it('keeps definitions across runs until reset', () => {
    const session = createSchemeSession()
    session.run('(define (sq x) (* x x))')
    expect(session.run('(sq 7)').lines).toEqual(['49'])
  })

  it('drops definitions added during the session on reset', () => {
    const session = createSchemeSession()
    session.run('(define answer 42)')
    expect(session.run('answer').lines).toEqual(['42'])

    session.reset()
    // biwascheme is lenient: an unbound name evaluates to undefined rather than
    // raising, so "undefined" is how a dropped binding becomes observable.
    expect(session.run('answer').lines).toEqual(['undefined'])
  })

  it('leaves no leftover bindings for the next session', () => {
    const first = createSchemeSession()
    first.run('(define leaked 1)')
    const second = createSchemeSession()
    expect(second.run('leaked').lines).toEqual(['undefined'])
  })
})

describe('formatSchemeOutput', () => {
  it('joins output lines', () => {
    expect(formatSchemeOutput({ lines: ['a', 'b'] })).toBe('a\nb')
  })

  it('surfaces the error message instead of the lines', () => {
    expect(formatSchemeOutput({ lines: ['a'], error: 'boom' })).toBe('boom')
  })
})

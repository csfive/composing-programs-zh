import { describe, expect, it } from 'vitest'
import { cleanFenceCode, extractExecutableSource } from './parse'

describe('cleanFenceCode', () => {
  it('strips a single leading newline and all trailing newlines', () => {
    expect(cleanFenceCode('\n(+ 1 2)\n\n')).toBe('(+ 1 2)')
  })

  it('keeps inner blank lines intact', () => {
    expect(cleanFenceCode('(a)\n\n(b)')).toBe('(a)\n\n(b)')
  })

  it('is a no-op for already clean source', () => {
    expect(cleanFenceCode('(define x 1)')).toBe('(define x 1)')
  })
})

describe('extractExecutableSource', () => {
  it('passes through plain source unchanged', () => {
    expect(extractExecutableSource('(define x 1)\n(* x 2)')).toBe('(define x 1)\n(* x 2)')
  })

  it('keeps only the REPL prompt lines and strips the prompt', () => {
    const input = '(+ 1 2)\n> (* 3 4)\n5\n> (car (list 9))'
    expect(extractExecutableSource(input)).toBe('(* 3 4)\n(car (list 9))')
  })

  it('handles prompts without a following space and with leading whitespace', () => {
    expect(extractExecutableSource('  >(+ 1 1)')).toBe('(+ 1 1)')
    expect(extractExecutableSource('\t> (+ 2 2)')).toBe('(+ 2 2)')
  })

  it('treats a lone prompt as empty executable source', () => {
    expect(extractExecutableSource('>')).toBe('')
  })
})

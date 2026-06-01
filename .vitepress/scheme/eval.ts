import BiwaScheme from 'biwascheme'

export type SchemeRunResult = {
  lines: string[]
  error?: string
}

type CapturePort = { put_string: (s: string) => void; close: () => void }

const capturePort = (sink: string[]): CapturePort => ({
  put_string(s: string) {
    sink.push(s)
  },
  close() {},
})

const snapshotTopEnv = (): Set<string> => new Set(Object.keys(BiwaScheme.TopEnv))

let pristineTopEnv: Set<string> | null = null

const getPristineTopEnv = (): Set<string> => {
  if (!pristineTopEnv) pristineTopEnv = snapshotTopEnv()
  return pristineTopEnv
}

const resetTopEnv = (baseline: Set<string>) => {
  for (const key of Object.keys(BiwaScheme.TopEnv)) {
    if (!baseline.has(key)) delete BiwaScheme.TopEnv[key]
  }
}

const evaluateForms = (interpreter: InstanceType<typeof BiwaScheme.Interpreter>, code: string): SchemeRunResult => {
  const displayed: string[] = []
  const results: string[] = []
  let error: string | undefined

  const prevOut = BiwaScheme.Port.current_output
  const prevErr = BiwaScheme.Port.current_error
  const port = capturePort(displayed)
  BiwaScheme.Port.current_output = port
  BiwaScheme.Port.current_error = port

  try {
    if (!interpreter.compiler) {
      interpreter.evaluate('()', () => {})
    }

    const parser = new BiwaScheme.Parser(code)
    for (;;) {
      const expr = parser.getObject()
      if (expr === BiwaScheme.Parser.EOS) break
      try {
        const expanded = BiwaScheme.Compiler.expand(expr)
        const vm = interpreter.compiler.run(expanded)
        const ret = interpreter.evaluate_vmcode(vm)
        if (ret !== BiwaScheme.undef) {
          results.push(BiwaScheme.to_write(ret))
        }
      } catch (e) {
        error = e instanceof Error ? e.message : String(e)
        break
      }
    }
  } finally {
    BiwaScheme.Port.current_output = prevOut
    BiwaScheme.Port.current_error = prevErr
  }

  const lines: string[] = []
  const displayText = displayed.join('').replace(/\n$/, '')
  if (displayText) lines.push(displayText)
  lines.push(...results)

  return error ? { lines, error } : { lines }
}

export type SchemeSession = {
  baseline: Set<string>
  interpreter: InstanceType<typeof BiwaScheme.Interpreter>
  run: (code: string) => SchemeRunResult
  reset: () => void
}

export const createSchemeSession = (): SchemeSession => {
  const baseline = getPristineTopEnv()
  resetTopEnv(baseline)
  const interpreter = new BiwaScheme.Interpreter(() => {})

  const reset = () => {
    resetTopEnv(baseline)
    interpreter.call_stack = []
  }

  return {
    baseline,
    interpreter,
    reset,
    run: (code: string) => evaluateForms(interpreter, code),
  }
}

export const formatSchemeOutput = (result: SchemeRunResult): string => {
  if (result.error) return result.error
  return result.lines.join('\n')
}

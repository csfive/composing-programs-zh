/** Strip leading/trailing blank lines (fence content hygiene). */
export const cleanFenceCode = (code: string): string =>
  code.replace(/^\n/, '').replace(/\n*$/, '')

/**
 * If any line is a REPL prompt (`> expr`), only those expressions are executed.
 * Otherwise the whole block is Scheme source (3.2 style).
 */
export const extractExecutableSource = (code: string): string => {
  const lines = code.split('\n')
  const promptLines = lines.filter((line) => /^\s*>\s?/.test(line))
  if (promptLines.length === 0) return code
  return promptLines.map((line) => line.replace(/^\s*>\s?/, '')).join('\n')
}

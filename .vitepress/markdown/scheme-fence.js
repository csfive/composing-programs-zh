import { cleanFenceCode } from '../scheme/parse'

/**
 * Turn ```scheme fences into an interactive, runnable block.
 *
 * A trailing `off` flag (```scheme off) opts out: those fences stay as plain
 * highlighted code, which is what the transcript-style examples use.
 *
 * @param {import('markdown-it')} md
 */
export function schemeFencePlugin(md) {
  const defaultFence = md.renderer.rules.fence

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const [lang, ...flags] = token.info.trim().split(/\s+/)

    if (lang !== 'scheme' || flags.includes('off')) {
      return defaultFence(tokens, idx, options, env, self)
    }

    if (env.schemeBlockIndex == null) env.schemeBlockIndex = 0
    const index = env.schemeBlockIndex++
    const code = cleanFenceCode(token.content)
    const codeAttr = JSON.stringify(code).replace(/'/g, '&#39;')

    return `<ClientOnly><SchemeRunBlock :index="${index}" :code='${codeAttr}' /></ClientOnly>\n`
  }
}

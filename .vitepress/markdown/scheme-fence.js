import { cleanFenceCode } from '../scheme/parse'

/**
 * @param {import('markdown-it')} md
 */
export function schemeFencePlugin(md) {
  const defaultFence = md.renderer.rules.fence

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const info = token.info.trim()
    const parts = info.split(/\s+/)
    const lang = parts[0]

    if (lang !== 'scheme') {
      return defaultFence(tokens, idx, options, env, self)
    }

    const off = parts.includes('off')
    if (off) {
      return defaultFence(tokens, idx, options, env, self)
    }

    if (env.schemeBlockIndex == null) env.schemeBlockIndex = 0
    const index = env.schemeBlockIndex++
    const code = cleanFenceCode(token.content)
    const codeAttr = JSON.stringify(code).replace(/'/g, '&#39;')

    return `<ClientOnly><SchemeRunBlock :index="${index}" :off="${off}" :code='${codeAttr}' /></ClientOnly>\n`
  }
}

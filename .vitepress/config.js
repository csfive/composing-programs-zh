import { sicp } from './sicp'

export default {
  title: 'CS Five',
  titleTemplate: ':title',
  description: 'SICP Python 中文翻译',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  srcDir: './sicp',
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css' }],
    ['meta', { name: 'keywords', content: 'SICP, Python, CS61A, Chinese Version, Translation, Composing Programs, 中文，翻译' }],
    ['meta', { name: 'description', content: 'Composing Programs, aka SICP Python, Chinese version, 中文翻译版本' }],
    ['meta', { name: 'author', content: 'CS Five' }],
  ],
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    config: (md) => {
      md.use(require('markdown-it-smartarrows'))
        .use(require('markdown-it-texmath'), { engine: require('katex'), delimiters: 'dollars', katexOptions: { macros: { '\\RR': '\\mathbb{R}' } } })
        .use(require('markdown-it-pangu'))
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    sidebar: {
      '/': sicp,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/csfive' },
      { icon: 'discord', link: 'https://discord.gg/dqZaP5yAHT' },
    ],
    outlineTitle: '大纲',
    lastUpdatedText: '上次更新时间',
    editLink: {
      pattern: 'https://github.com/csfive/composing-programs-zh/edit/main/sicp/:path',
      text: '在 GitHub 上修改此页',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    footer: {
      copyright: 'Copyright © 2022-PRESENT CS Five',
    },
    search: {
      provider: 'local',
    },
  },
}

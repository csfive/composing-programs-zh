import sicp from './sicp-python'
import sicpProjects from './sicp-python-project'

export default {
    title: 'CSfive - Composing Programs',
    description: 'SICP Python 中文翻译',
    lang: 'zh-CN',
    lastUpdated: true,
    cleanUrls: 'without-subfolders',

    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css' }],
        ['meta', { name: 'keywords', content: 'SICP, Python, CS61A' }],
    ],

    markdown: {
        // lineNumbers: true,
        theme: {
            light: 'github-light',
            dark: 'github-dark'
        },
        config: (md) => {
            md.use(require('markdown-it-imsize'))
                .use(require('markdown-it-mark'))
                .use(require('markdown-it-smartarrows'))
                .use(require('markdown-it-texmath'), { engine: require('katex'), delimiters: 'dollars', katexOptions: { macros: { "\\RR": "\\mathbb{R}" } } })
        }
    },

    themeConfig: {
        outlineTitle: '大纲',
        sidebar: {
            '/sicp-python/': sicp(),
            '/sicp-python-projects/': sicpProjects(),
        },
        nav: [
            {text: '正文', link: '/sicp-python/intro'},
            {text: '课程项目', link: '/sicp-python-projects/intro'}
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/csfive' },
            { icon: 'discord', link: 'https://discord.gg/dqZaP5yAHT' },
        ],

        editLink: {
            pattern: 'https://github.com/csfive/composing-programs-zh/edit/main/docs/:path',
            text: '在 GitHub 上修改此页'
        },

        lastUpdatedText: '上次更新时间',

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        footer: {
            copyright: 'Copyright © 2022-present csfive'
        },

        search: {
            provider: 'local'
        }
    }
}

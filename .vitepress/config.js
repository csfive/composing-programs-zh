export default {
  title: 'CS Five',
  titleTemplate: ':title',
  lang: 'zh-Hans',
  description: 'SICP Python 版，CS61A 教材中文翻译',
  lastUpdated: true,
  cleanUrls: true,
  srcDir: './sicp',

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'SICP, Python, CS61A, Composing Programs, 中文, 翻译',
      },
    ],
    [
      'meta',
      {
        name: 'description',
        content: 'Composing Programs, SICP Python, CS61A Textbook 教材中文翻译版本',
      },
    ],
    ['meta', { name: 'author', content: 'CS Five' }],
  ],

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    math: true,
  },

  vite: {
    optimizeDeps: {
      include: ['@nolebase/vitepress-plugin-enhanced-readabilities > @nolebase/ui > @rive-app/canvas'],
      exclude: ['@nolebase/vitepress-plugin-enhanced-readabilities/client'],
    },
    ssr: {
      noExternal: ['@nolebase/vitepress-plugin-enhanced-readabilities'],
    },
  },

  themeConfig: {
    sidebar: { '/': sidebar() },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/csfive' }],

    logo: {
      src: '/logo.svg',
      width: 24,
      height: 24,
    },

    editLink: {
      pattern: 'https://github.com/csfive/composing-programs-zh/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2022-${new Date().getFullYear()} CS Five`,
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
}

function sidebar() {
  return [
    { text: '简介', link: '/' },
    {
      text: '第一章：使用函数构建抽象',
      collapsed: false,
      items: [
        { text: '1.1 开始', link: '/1/1' },
        { text: '1.2 编程要素', link: '/1/2' },
        { text: '1.3 定义新的函数', link: '/1/3' },
        { text: '1.4 设计函数', link: '/1/4' },
        { text: '1.5 控制', link: '/1/5' },
        { text: '1.6 高阶函数', link: '/1/6' },
        { text: '1.7 递归函数', link: '/1/7' },
      ],
    },
    {
      text: '第二章：使用数据构建抽象',
      collapsed: true,
      items: [
        { text: '2.1 引言', link: '/2/1' },
        { text: '2.2 数据抽象', link: '/2/2' },
        { text: '2.3 序列', link: '/2/3' },
        { text: '2.4 可变数据', link: '/2/4' },
        { text: '2.5 面向对象编程', link: '/2/5' },
        { text: '2.6 实现类和对象', link: '/2/6' },
        { text: '2.7 对象抽象', link: '/2/7' },
        { text: '2.8 效率', link: '/2/8' },
        { text: '2.9 递归对象', link: '/2/9' },
      ],
    },
    {
      text: '第三章：计算机程序的解释',
      collapsed: true,
      items: [
        { text: '3.1 引言', link: '/3/1' },
        { text: '3.2 函数式编程', link: '/3/2' },
        { text: '3.3 异常', link: '/3/3' },
        { text: '3.4 组合语言的解释器', link: '/3/4' },
        { text: '3.5 抽象语言的解释器', link: '/3/5' },
      ],
    },
    {
      text: '第四章：数据处理',
      collapsed: true,
      items: [
        { text: '4.1 引言', link: '/4/1' },
        { text: '4.2 隐式序列', link: '/4/2' },
        { text: '4.3 声明式编程', link: '/4/3' },
        { text: '4.4 Logic 语言编程', link: '/4/4' },
        { text: '4.5 合一', link: '/4/5' },
        { text: '4.6 分布式计算', link: '/4/6' },
        { text: '4.7 分布式数据处理', link: '/4/7' },
        { text: '4.8 并行计算', link: '/4/8' },
      ],
    },
  ]
}

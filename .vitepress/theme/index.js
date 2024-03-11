import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import Layout from './Layout.vue'
import { useData, useRoute } from 'vitepress'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
  },
  setup() {
    const { frontmatter } = useData()
    const route = useRoute()
    giscusTalk(
      {
        repo: 'csfive/composing-programs-zh',
        repoId: 'R_kgDOI7ryQw',
        category: 'Announcements',
        categoryId: 'DIC_kwDOI7ryQ84CWSPL',
        mapping: 'title',
        strict: '1',
      },
      {
        frontmatter,
        route,
      },
    )
  },
}

import { useData, useRoute } from 'vitepress'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

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

import { useData, useRoute } from 'vitepress'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import Layout from './Layout.vue'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(Layout, null, {
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    })
  },
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

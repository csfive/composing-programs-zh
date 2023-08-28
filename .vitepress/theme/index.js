import DefaultTheme from "vitepress/theme"
import giscusTalk from "vitepress-plugin-comment-with-giscus"
import { useData, useRoute } from "vitepress"
import "./vars.css"
import "./overrides.css"

export default {
  ...DefaultTheme,
  setup() {
    const { frontmatter } = useData()
    const route = useRoute()
    giscusTalk(
      {
        repo: "csfive/composing-programs-zh",
        repoId: "R_kgDOI7ryQw",
        category: "Announcements",
        categoryId: "DIC_kwDOI7ryQ84CWSPL",
      },
      {
        frontmatter,
        route,
      }
    )
  },
}

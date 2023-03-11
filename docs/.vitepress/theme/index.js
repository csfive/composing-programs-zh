import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import './custom.css'

export default {
    ...DefaultTheme,
    setup() {
        const route = useRoute()
        const initZoom = () => {
            new mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
        }

        onMounted(() => {
            initZoom()
        })

        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        )
    }
}
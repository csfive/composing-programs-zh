import { defineConfig } from 'vitest/config'

// vitest is held on the 3.x line on purpose: vitepress 1.6 ships vite 5, and
// vitest 4+ requires vite 6+ (it imports the `vite/module-runner` subpath).
// Revisit once vitepress moves to a newer vite.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['.vitepress/**/*.test.ts'],
    exclude: ['.vitepress/dist/**', '.vitepress/cache/**', 'node_modules/**'],
  },
})

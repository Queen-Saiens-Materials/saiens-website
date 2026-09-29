import { defineConfig } from 'vitest/config'

// 本專案既有的 app/warranty/liff/__tests__/*.test.mjs 是用 node:test 手動跑的（沒有既有
// test runner），不是 vitest 測試。限制 include 只吃 *.test.ts，避免 vitest 誤抓它們。
export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
  },
})

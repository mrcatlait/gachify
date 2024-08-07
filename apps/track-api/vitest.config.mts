/// <reference types="vitest" />
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  test: {
    globals: true,
    watch: false,
    include: ['src/**/*.spec.ts'],
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './reports/unit/junit-report.xml',
    },
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['main.ts', '**/index.ts', '**/*.model.ts', '**/*.module.ts'],
      reporter: ['text', 'lcov'],
      all: true,
    },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}))

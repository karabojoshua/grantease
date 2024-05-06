import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  './grant-ease',
  {
    extends: 'frontend/vite.config.js',
    test: {
      globals: true,
      root: 'frontend',
      name: 'frontend',
      environment: 'jsdom'
    }
  },
  
  {
    test: {
      globals: true,
      root: 'backend',
      name: 'backend',
      environment: 'node'
    }
  }
])

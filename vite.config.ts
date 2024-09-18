import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
      modules: {
          scopeBehaviour: 'local',
          globalModulePaths: [],
          generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
  },
})

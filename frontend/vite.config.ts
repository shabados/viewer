/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const target = process.env.DEV_BACKEND_URL || 'http://localhost:52526'

export default defineConfig( {
  server: {
    proxy: {
      '/api': {
        target,
        rewrite: ( path ) => path.replace( /^\/api/, '' ),
      },
    },
  },
  plugins: [ react() ],
} )

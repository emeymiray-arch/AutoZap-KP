import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

function pdfDownloadPlugin(): Plugin {
  const pdfPath = resolve('public/kp.pdf')

  const middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const path = req.url?.split('?')[0]
    if (path !== '/download' && path !== '/download.pdf') {
      next()
      return
    }
    if (!existsSync(pdfPath)) {
      res.statusCode = 404
      res.end('PDF not found')
      return
    }
    const pdf = readFileSync(pdfPath)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Length', String(pdf.length))
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="KP-AutoZap-ARMTEK.pdf"',
    )
    res.end(pdf)
  }

  return {
    name: 'pdf-download',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), pdfDownloadPlugin()],
  server: {
    host: '0.0.0.0',
    port: 43147,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 43147,
    strictPort: true,
  },
  assetsInclude: ['**/*.pdf'],
})

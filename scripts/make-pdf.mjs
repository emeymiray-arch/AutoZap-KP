import { spawn } from 'node:child_process'
import { mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const OUT = resolve('public/KP-AutoZap-ARMTEK.pdf')
const URL = process.env.PDF_URL ?? 'http://127.0.0.1:43147/?print=1'
const CHROME =
  process.env.CHROME_PATH ??
  (existsSync('/usr/bin/google-chrome-stable')
    ? '/usr/bin/google-chrome-stable'
    : 'google-chrome')

function run(cmd, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('exit', (code) => {
      if (code === 0) resolvePromise()
      else reject(new Error(`${cmd} exited ${code}`))
    })
  })
}

mkdirSync('public', { recursive: true })

await run(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--hide-scrollbars',
  '--allow-running-insecure-content',
  `--print-to-pdf=${OUT}`,
  '--print-to-pdf-no-header',
  '--no-margins',
  '--virtual-time-budget=12000',
  URL,
])

copyFileSync(OUT, resolve('KP-AutoZap-ARMTEK.pdf'))
console.log('PDF saved to', OUT)

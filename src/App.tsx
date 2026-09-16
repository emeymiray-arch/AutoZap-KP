import { useEffect, useMemo, useState } from 'react'
import './document.css'
import { Proposal } from './Proposal'

const MM_TO_PX = 96 / 25.4
const PAGE_WIDTH = 210 * MM_TO_PX

export default function App() {
  const printMode = useMemo(
    () => new URLSearchParams(window.location.search).has('print'),
    [],
  )
  const [scale, setScale] = useState(printMode ? 1 : 0.9)

  useEffect(() => {
    document.documentElement.classList.toggle('print-mode', printMode)
    if (printMode) {
      document.fonts.ready.then(() => {
        document.documentElement.dataset.fonts = 'ready'
      })
      return
    }

    const fit = () => {
      const available = Math.min(window.innerWidth - 28, 920)
      setScale(Math.min(1, available / PAGE_WIDTH))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [printMode])

  const stackHeight = 4 * 297 * MM_TO_PX * scale + 3 * 18 * scale + 36

  return (
    <div className="desk">
      {!printMode && (
        <header className="toolbar">
          <div className="toolbar-brand">
            <img src="/logo.jpg" alt="" />
            <div>
              <strong>Коммерческое предложение</strong>
              <span>AutoZap × ARMTEK · 4 листа A4</span>
            </div>
          </div>
          <div className="toolbar-actions">
            <a className="btn ghost" href="/KP-AutoZap-ARMTEK.pdf" download>
              Скачать PDF
            </a>
            <button type="button" onClick={() => window.print()}>
              Печать
            </button>
          </div>
        </header>
      )}

      <div className="stage-wrap" style={printMode ? undefined : { height: stackHeight }}>
        <div
          className="stage"
          style={
            printMode
              ? undefined
              : { transform: `scale(${scale})`, transformOrigin: 'top center' }
          }
        >
          <Proposal />
        </div>
      </div>
    </div>
  )
}

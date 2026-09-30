import { useEffect, useMemo, useState } from 'react'
import { buildKpHtml, downloadHtml, printKp } from './kpTemplate'
import { PHONE, partnerBySlug, partners, type Partner } from './partners'

type Route =
  | { name: 'home' }
  | { name: 'create' }
  | { name: 'partner'; slug: string }

function currentRoute(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '')
  if (!hash || hash === '/') return { name: 'home' }
  if (hash === 'new' || hash === 'create') return { name: 'create' }
  const match = hash.match(/^p\/([^/]+)/)
  if (match) return { name: 'partner', slug: match[1] }
  return { name: 'home' }
}

function Header() {
  return (
    <header className="top">
      <a className="brand" href="#/">
        <span className="logo-clip">
          <img src="/logo.jpg" alt="" />
        </span>
        <span>
          <b>AutoZap</b>
          <small>Площадка автозапчастей и сеть СТО</small>
        </span>
      </a>
      <div className="top-actions">
        <a className="btn small" href="#/new">
          Создать КП
        </a>
        <a className="phone" href={`tel:${PHONE.replace(/[^\d+]/g, '')}`}>
          {PHONE}
        </a>
      </div>
    </header>
  )
}

function Actions({ partner }: { partner: Partner }) {
  return (
    <div className="actions">
      <a className="btn" href={partner.pdf} download>
        Скачать PDF
      </a>
      <a className="btn ghost" href={partner.docx} download>
        Скачать Word
      </a>
    </div>
  )
}

function CreatePage() {
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState(PHONE)
  const [dateValue, setDateValue] = useState(() => {
    const d = new Date()
    return d.toISOString().slice(0, 10)
  })

  const partnerName = company.trim() || 'Название компании'
  const canSave = company.trim().length > 1

  const html = useMemo(() => {
    return buildKpHtml({
      partner: partnerName,
      phone,
      date: new Date(`${dateValue}T12:00:00`),
      logoUrl: `${window.location.origin}/logo.jpg`,
    })
  }, [partnerName, phone, dateValue])

  function onSavePdf() {
    if (!canSave) {
      alert('Введите название компании')
      return
    }
    printKp(html)
  }

  function onDownloadHtml() {
    if (!canSave) {
      alert('Введите название компании')
      return
    }
    downloadHtml(html, company.trim())
  }

  return (
    <main className="wrap create-wrap">
      <a className="back" href="#/">
        ← На главную
      </a>
      <p className="kicker">Новый документ</p>
      <h1>Создать коммерческое предложение</h1>
      <p className="lead">
        Введите название компании — КП соберётся сразу. База данных не нужна.
        Чтобы получить PDF: «Сохранить PDF» → в окне печати выберите «Сохранить как PDF».
      </p>

      <form
        className="create-form"
        onSubmit={(e) => {
          e.preventDefault()
          onSavePdf()
        }}
      >
        <label htmlFor="company-input">
          Компания-получатель
          <input
            id="company-input"
            name="company"
            autoComplete="organization"
            autoFocus
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="ООО Пример"
          />
        </label>
        <label htmlFor="phone-input">
          Телефон AutoZap
          <input
            id="phone-input"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label htmlFor="date-input">
          Дата документа
          <input
            id="date-input"
            name="date"
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
        </label>
        <div className="actions">
          <button className="btn" type="submit" disabled={!canSave}>
            Сохранить PDF
          </button>
          <button
            className="btn ghost"
            type="button"
            disabled={!canSave}
            onClick={onDownloadHtml}
          >
            Скачать HTML
          </button>
        </div>
      </form>

      <div className="preview-panel">
        <div className="preview-bar">
          <strong>Предпросмотр</strong>
          <span>Бланк AutoZap · 2 листа A4</span>
        </div>
        <iframe className="preview" title="Предпросмотр КП" srcDoc={html} />
      </div>
    </main>
  )
}

function Catalog() {
  return (
    <main className="wrap">
      <section className="create-hero">
        <div>
          <p className="kicker">Главное действие</p>
          <h1>Создать КП для любой компании</h1>
          <p className="lead">
            Введите название — получите бланк AutoZap с теми же условиями.
            Без базы данных: документ собирается у вас в браузере.
          </p>
          <a className="btn" href="#/new">
            Создать коммерческое предложение
          </a>
        </div>
      </section>

      <p className="kicker" style={{ marginTop: 36 }}>
        Уже готовые КП
      </p>
      <h2 className="section-title">Готовые файлы для пересылки</h2>
      <div className="grid">
        {partners.map((partner) => (
          <a className="card" href={`#/p/${partner.slug}`} key={partner.slug}>
            <img src={partner.page1} alt="" />
            <div>
              <strong>{partner.name}</strong>
              <span>2 листа A4</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}

function Detail({ partner }: { partner: Partner }) {
  const shareUrl = `${window.location.origin}${window.location.pathname}#/p/${partner.slug}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Ссылка скопирована')
    } catch {
      window.prompt('Скопируйте ссылку', shareUrl)
    }
  }

  return (
    <main className="wrap">
      <a className="back" href="#/">
        ← Все компании
      </a>
      <p className="kicker">Коммерческое предложение</p>
      <h1>{partner.name}</h1>
      <Actions partner={partner} />
      <button className="linkish" type="button" onClick={() => void copyLink()}>
        Скопировать ссылку для пересылки
      </button>
      <a className="linkish" href="#/new">
        Создать КП для другой компании →
      </a>
      <figure className="sheet">
        <figcaption>Лист 1</figcaption>
        <img src={partner.page1} alt={`${partner.name}, лист 1`} />
      </figure>
      <figure className="sheet">
        <figcaption>Лист 2</figcaption>
        <img src={partner.page2} alt={`${partner.name}, лист 2`} />
      </figure>
    </main>
  )
}

export default function App() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHash = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className="page">
      <Header />
      {route.name === 'create' && <CreatePage />}
      {route.name === 'partner' &&
        (partnerBySlug(route.slug) ? (
          <Detail partner={partnerBySlug(route.slug)!} />
        ) : (
          <Catalog />
        ))}
      {route.name === 'home' && <Catalog />}
    </div>
  )
}

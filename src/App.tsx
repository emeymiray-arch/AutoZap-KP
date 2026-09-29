import { useEffect, useState } from 'react'
import { PHONE, partnerBySlug, partners, type Partner } from './partners'

function currentSlug() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const match = hash.match(/^p\/([^/]+)/)
  return match?.[1] ?? ''
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
      <a className="phone" href={`tel:${PHONE.replace(/[^\d+]/g, '')}`}>
        {PHONE}
      </a>
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

function Catalog() {
  return (
    <main className="wrap">
      <p className="kicker">Коммерческие предложения</p>
      <h1>Отправьте ссылку на нужную компанию</h1>
      <p className="lead">
        Сайт без базы данных. Каждая карточка открывает КП на бланке AutoZap —
        его можно скачать PDF или Word и переслать.
      </p>
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
  const shareUrl =
    typeof window === 'undefined'
      ? ''
      : `${window.location.origin}${window.location.pathname}#/p/${partner.slug}`

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
  const [slug, setSlug] = useState(currentSlug)

  useEffect(() => {
    const onHash = () => setSlug(currentSlug())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const partner = slug ? partnerBySlug(slug) : undefined

  return (
    <div className="page">
      <Header />
      {partner ? <Detail partner={partner} /> : <Catalog />}
    </div>
  )
}

import { logoUrl, qrAndroidUrl, qrIosUrl, qrRustoreUrl } from './files'

const offers = [
  {
    n: '01',
    title: 'Регистрация на площадке AutoZap',
    text: 'Регистрация компании ARMTEK на нашей площадке во всех регионах, в которых представлена компания.',
  },
  {
    n: '02',
    title: 'Бесплатное размещение ассортимента',
    text: 'Возможность бесплатно разместить на площадке AutoZap полный ассортимент продукции ARMTEK для дальнейшего продвижения и привлечения потенциальных клиентов.',
  },
  {
    n: '03',
    title: 'Выделенный менеджер по продвижению',
    text: 'Со стороны AutoZap будет выделен отдельный менеджер, который займётся продвижением ARMTEK на площадке, сопровождением взаимодействия и развитием продаж.',
  },
  {
    n: '04',
    title: 'Продвижение в течение 3–5 месяцев',
    text: 'В течение первых 3–5 месяцев менеджер будет активно продвигать ARMTEK на площадке AutoZap и привлекать к сотрудничеству небольшие магазины и представителей малого бизнеса.',
  },
  {
    n: '05',
    title: 'Региональное развитие',
    text: 'Регистрация и продвижение ARMTEK будут осуществляться в каждом регионе присутствия компании, чтобы сформировать единую сеть взаимодействия с локальными магазинами и партнёрами.',
  },
  {
    n: '06',
    title: 'Сотрудничество с СТО AutoZap',
    text: 'AutoZap готова предоставить собственные станции технического обслуживания, работающие под брендом AutoZap, как дополнительный канал реализации и поставки запчастей ARMTEK.',
  },
]

const apps = [
  {
    name: 'Android · Google Play',
    file: qrAndroidUrl,
    href: 'https://play.google.com/store/apps/details?id=com.unnamedii.autozapmobile',
    label: 'Открыть в Google Play',
  },
  {
    name: 'iPhone · App Store',
    file: qrIosUrl,
    href: 'https://apps.apple.com/ru/app/autozap/id6772788391',
    label: 'Открыть в App Store',
  },
  {
    name: 'RuStore',
    file: qrRustoreUrl,
    href: 'https://www.rustore.ru/catalog/app/com.unnamedii.autozapmobile',
    label: 'Открыть в RuStore',
  },
]

function Header({ page }: { page: string }) {
  return (
    <div className="sheet-header">
      <div className="mini-logo">
        <img src={logoUrl} alt="" />
        AutoZap
      </div>
      <div className="meta">КП-2026/09-ARMTEK · {page} / 04</div>
    </div>
  )
}

function Footer({ page }: { page: string }) {
  return (
    <div className="sheet-footer">
      <span>Конфиденциально · для ARMTEK</span>
      <span>{page}</span>
    </div>
  )
}

function CoverStreaks() {
  return (
    <svg className="cover-streaks" viewBox="0 0 800 240" fill="none" aria-hidden>
      <path d="M-20 210C140 90 340 40 820 20" stroke="url(#s)" strokeWidth="18" />
      <path d="M-20 238C160 120 380 70 820 55" stroke="url(#s)" strokeWidth="9" opacity="0.7" />
      <path d="M40 240C220 150 420 110 820 95" stroke="url(#s)" strokeWidth="4" opacity="0.45" />
      <defs>
        <linearGradient id="s" x1="0" y1="0" x2="800" y2="0">
          <stop stopColor="#1ac2ff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Proposal() {
  return (
    <>
      <section className="page cover">
        <div className="page-inner">
          <div className="cover-top">
            <span>Документ № КП-2026/09-ARMTEK</span>
            <span>16 сентября 2026</span>
          </div>
          <div className="cover-main">
            <CoverStreaks />
            <div className="logo-mark">
              <img src={logoUrl} alt="AutoZap" />
            </div>
            <div className="kicker" style={{ color: '#1ac2ff' }}>
              О сотрудничестве
            </div>
            <h1>
              Коммерческое
              <br />
              предложение
            </h1>
            <p className="subtitle">
              Развитие продаж, продвижение бренда и расширение взаимодействия
              с представителями малого бизнеса.
            </p>
            <div className="pair">
              <div className="pair-card">
                <b>AutoZap</b>
                <span>Площадка и сеть СТО</span>
              </div>
              <div className="pair-x">×</div>
              <div className="pair-card">
                <b>ARMTEK</b>
                <span>Поставщик автозапчастей</span>
              </div>
            </div>
          </div>
          <div className="cover-bottom">
            <div>
              Региональное покрытие
              <br />
              по всем точкам присутствия ARMTEK
            </div>
            <div style={{ textAlign: 'right' }}>
              Срок активного запуска
              <br />
              3–5 месяцев сопровождения
            </div>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-inner">
          <Header page="02" />
          <div className="sheet-body">
            <p className="kicker">Суть предложения</p>
            <h2 className="block-title">AutoZap предлагает ARMTEK партнёрство</h2>
            <div className="summary">
              <p className="quote">
                Компания AutoZap предлагает компании ARMTEK сотрудничество в рамках
                развития продаж, продвижения бренда и расширения взаимодействия
                с представителями малого бизнеса. Ниже — конкретные шаги со стороны
                AutoZap.
              </p>
              <div className="facts">
                <div>
                  <b>Размещение</b>
                  <span>Полный ассортимент, бесплатно</span>
                </div>
                <div>
                  <b>Менеджер</b>
                  <span>Выделенный под ARMTEK</span>
                </div>
                <div>
                  <b>Срок запуска</b>
                  <span>Активные 3–5 месяцев</span>
                </div>
                <div>
                  <b>Каналы</b>
                  <span>Площадка, МСБ и СТО AutoZap</span>
                </div>
              </div>
            </div>

            <p className="kicker">Что делает AutoZap</p>
            <div className="offers">
              {offers.slice(0, 4).map((item) => (
                <article className="offer" key={item.n}>
                  <div className="num">{item.n}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <Footer page="02" />
        </div>
      </section>

      <section className="page">
        <div className="page-inner">
          <Header page="03" />
          <div className="sheet-body">
            <p className="kicker">Регионы и сервис</p>
            <h2 className="block-title">Продвижение, регионы и СТО</h2>
            <div className="offers">
              {offers.slice(4).map((item) => (
                <article className="offer" key={item.n}>
                  <div className="num">{item.n}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="task">
              <p className="kicker">Основная задача</p>
              <p>
                Создать эффективное взаимодействие между крупным поставщиком
                и небольшими торговыми организациями. Это расширит представленность
                продукции ARMTEK и откроет дополнительные каналы продаж.
              </p>
            </div>

            <p className="kicker" style={{ marginTop: 18 }}>
              Модель взаимодействия
            </p>
            <div className="eco">
              <div className="eco-card">
                <div className="role">Поставщик</div>
                <strong>ARMTEK</strong>
                <p>Ассортимент, наличие и поставка запчастей в регионы присутствия.</p>
              </div>
              <div className="eco-card">
                <div className="role">Площадка</div>
                <strong>AutoZap</strong>
                <p>Регистрация, продвижение, менеджер и доступ к малому бизнесу.</p>
              </div>
              <div className="eco-card">
                <div className="role">Сбыт</div>
                <strong>Магазины и СТО</strong>
                <p>Локальные магазины, МСБ и станции технического обслуживания AutoZap.</p>
              </div>
            </div>
          </div>
          <Footer page="03" />
        </div>
      </section>

      <section className="page">
        <div className="page-inner">
          <Header page="04" />
          <div className="sheet-body">
            <p className="kicker">Инструменты партнёра</p>
            <h2 className="block-title">Мобильное приложение AutoZap</h2>
            <p className="lead">
              Для удобства клиентов и партнёров приложение AutoZap доступно
              на основных мобильных платформах. Отсканируйте QR-код или перейдите
              по ссылке.
            </p>
            <div className="apps">
              {apps.map((app) => (
                <article className="app-card" key={app.name}>
                  <b>{app.name}</b>
                  <img src={app.file} alt={`QR ${app.name}`} />
                  <a href={app.href} target="_blank" rel="noreferrer">
                    {app.label}
                  </a>
                </article>
              ))}
            </div>

            <div className="goal">
              <h3>Цель сотрудничества</h3>
              <p>
                Создание устойчивой модели взаимодействия между ARMTEK, компанией
                AutoZap, малым бизнесом и сетью СТО. Задача — расширить рынок сбыта,
                увеличить представленность продукции и выстроить долгосрочное
                партнёрство.
              </p>
            </div>

            <p className="kicker">Порядок запуска</p>
            <div className="steps">
              <div className="step">
                <b>1</b>
                <p>Регистрация ARMTEK на площадке AutoZap во всех регионах присутствия.</p>
              </div>
              <div className="step">
                <b>2</b>
                <p>Бесплатное размещение полного ассортимента продукции.</p>
              </div>
              <div className="step">
                <b>3</b>
                <p>Назначение выделенного менеджера и старт продвижения на 3–5 месяцев.</p>
              </div>
              <div className="step">
                <b>4</b>
                <p>Подключение магазинов МСБ и станций технического обслуживания AutoZap.</p>
              </div>
            </div>

            <div className="signs">
              <div className="sign">
                <h4>AutoZap</h4>
                <div className="line" />
                <div className="hint">Должность, подпись, расшифровка</div>
                <div className="line" />
                <div className="hint">Дата · М.П.</div>
              </div>
              <div className="sign">
                <h4>ARMTEK</h4>
                <div className="line" />
                <div className="hint">Должность, подпись, расшифровка</div>
                <div className="line" />
                <div className="hint">Дата · М.П.</div>
              </div>
            </div>
          </div>
          <Footer page="04" />
        </div>
      </section>
    </>
  )
}

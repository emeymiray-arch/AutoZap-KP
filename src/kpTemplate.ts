import { PHONE } from './partners'

const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

const CYR_MAP: Record<string, string> = {
  а: 'A',
  б: 'B',
  в: 'V',
  г: 'G',
  д: 'D',
  е: 'E',
  ё: 'E',
  ж: 'ZH',
  з: 'Z',
  и: 'I',
  й: 'Y',
  к: 'K',
  л: 'L',
  м: 'M',
  н: 'N',
  о: 'O',
  п: 'P',
  р: 'R',
  с: 'S',
  т: 'T',
  у: 'U',
  ф: 'F',
  х: 'H',
  ц: 'C',
  ч: 'CH',
  ш: 'SH',
  щ: 'SCH',
  ъ: '',
  ы: 'Y',
  ь: '',
  э: 'E',
  ю: 'YU',
  я: 'YA',
}

export function formatRuDate(date: Date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} г.`
}

export function makeDocId(partner: string) {
  const raw = partner
    .toLowerCase()
    .replace(/ооо\s*/gi, '')
    .replace(/тд\s*/gi, 'TD-')
    .replace(/тпк\s*/gi, 'TPK-')
    .split('')
    .map((ch) => CYR_MAP[ch] ?? ch)
    .join('')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 28)
  return raw || 'PARTNER'
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export type KpInput = {
  partner: string
  phone?: string
  date?: Date
  logoUrl?: string
}

export function buildKpHtml(input: KpInput) {
  const partner = escapeHtml(input.partner.trim())
  const phone = escapeHtml(input.phone?.trim() || PHONE)
  const date = input.date ?? new Date()
  const docId = makeDocId(input.partner)
  const dateLabel = formatRuDate(date)
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const logo = escapeHtml(input.logoUrl ?? `${window.location.origin}/logo.jpg`)

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>Коммерческое предложение AutoZap — ${partner}</title>
    <style>
      @page { size: A4; margin: 12mm 16mm 14mm 16mm; }
      * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      html, body {
        margin: 0; padding: 0; color: #1c2430;
        font: 10.5pt/1.4 'Liberation Sans', 'Noto Sans', Arial, sans-serif;
      }
      .doc { width: 100%; border-collapse: collapse; }
      .doc > thead > tr > td, .doc > tfoot > tr > td { padding: 0; }
      .head { padding-bottom: 8px; border-bottom: 2.5px solid #0a78f0; }
      .head-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
      .brand { display: flex; align-items: center; gap: 12px; }
      .logo-clip { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
      .logo-clip img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.4); }
      .company { font-size: 20pt; font-weight: 800; color: #0b4aa2; line-height: 1; }
      .company span { display: block; margin-top: 4px; font-size: 8.5pt; font-weight: 500; color: #5b6b80; }
      .contacts { text-align: right; font-size: 10.5pt; }
      .contacts b { display: block; font-size: 12pt; color: #0b4aa2; }
      .foot {
        border-top: 1px solid #cfd6e0; padding-top: 6px; margin-top: 8px;
        font-size: 8.5pt; color: #5b6b7c; display: flex; justify-content: space-between;
      }
      h1 {
        margin: 14px 0 4px; font-size: 15pt; font-weight: 800; text-transform: uppercase;
        letter-spacing: 0.04em; color: #0b4aa2;
      }
      .about { margin: 0 0 12px; font-size: 12pt; }
      .meta { margin: 0 0 16px; font-size: 10pt; color: #5b6b7c; }
      p { margin: 0 0 10px; text-align: justify; }
      .closing, .goal, .signs { break-inside: avoid; page-break-inside: avoid; }
      .goal {
        margin: 12px 0 8px; padding: 10px 12px; background: #f3f7fc; border-left: 3px solid #0a78f0;
      }
      h2 { margin: 16px 0 8px; font-size: 12.5pt; color: #0b4aa2; break-after: avoid; }
      .signs { display: flex; gap: 36px; margin-top: 18px; }
      ol { margin: 0 0 8px; padding-left: 22px; }
      ol li { margin: 0 0 9px; }
      ol li .t { font-weight: 700; }
      ul.apps { margin: 0 0 10px; padding-left: 18px; }
      ul.apps li { margin: 0 0 4px; }
      a { color: #0b4aa2; text-decoration: none; }
      .sign { flex: 1; }
      .sign b { display: block; margin-bottom: 6px; }
      .line { border-bottom: 1px solid #8b97a6; height: 26px; margin-bottom: 4px; }
      .hint { font-size: 9pt; color: #5b6b7c; margin-bottom: 10px; }
    </style>
  </head>
  <body>
    <table class="doc">
      <thead>
        <tr>
          <td>
            <div class="head">
              <div class="head-row">
                <div class="brand">
                  <div class="logo-clip"><img src="${logo}" alt="AutoZap" /></div>
                  <div class="company">
                    AutoZap
                    <span>Площадка автозапчастей и сеть СТО</span>
                  </div>
                </div>
                <div class="contacts"><b>${phone}</b></div>
              </div>
            </div>
          </td>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td>
            <div class="foot">
              <span>AutoZap · коммерческое предложение · конфиденциально</span>
              <span>${phone}</span>
            </div>
          </td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>
            <h1>Коммерческое предложение</h1>
            <p class="about">о сотрудничестве между компаниями «AutoZap» и ${partner}</p>
            <p class="meta">№ КП-${year}/${month}-${docId} &nbsp;·&nbsp; ${dateLabel}</p>
            <p>
              Компания AutoZap предлагает ${partner} сотрудничество в рамках
              развития продаж, продвижения бренда и расширения взаимодействия с
              представителями малого бизнеса.
            </p>
            <h2>Со стороны компании AutoZap предлагаем</h2>
            <ol>
              <li>
                <span class="t">Регистрация на площадке AutoZap.</span>
                Регистрация ${partner} на нашей площадке во всех регионах,
                в которых представлена компания.
              </li>
              <li>
                <span class="t">Бесплатное размещение ассортимента.</span>
                Возможность бесплатно разместить на нашей площадке полный
                ассортимент продукции ${partner} для дальнейшего продвижения и
                привлечения потенциальных клиентов.
              </li>
              <li>
                <span class="t">Выделенный менеджер по продвижению.</span>
                Со стороны компании AutoZap будет выделен отдельный менеджер,
                который будет заниматься продвижением ${partner} на нашей площадке,
                сопровождать взаимодействие и помогать в развитии продаж.
              </li>
              <li>
                <span class="t">Продвижение в течение 3–5 месяцев.</span>
                В течение первых 3–5 месяцев менеджер будет активно заниматься
                продвижением ${partner} на площадке AutoZap, а также
                привлекать к сотрудничеству небольшие магазины и представителей
                малого бизнеса.
              </li>
            </ol>
            <p>
              Основная задача — создать эффективное взаимодействие между крупным
              поставщиком и небольшими торговыми организациями, что позволит
              расширить представленность продукции ${partner} и обеспечить
              дополнительные каналы продаж.
            </p>
            <ol start="5">
              <li>
                <span class="t">Региональное развитие.</span>
                Регистрация и продвижение ${partner} будут осуществляться
                в каждом регионе, где представлена компания, с целью формирования
                единой сети взаимодействия с локальными магазинами и партнёрами.
              </li>
              <li>
                <span class="t">Сотрудничество с СТО AutoZap.</span>
                Компания AutoZap также готова предоставить собственные станции
                технического обслуживания, работающие под брендом AutoZap, в
                качестве дополнительного канала реализации и поставки запчастей
                ${partner}.
              </li>
            </ol>
            <h2>Мобильное приложение AutoZap</h2>
            <p>Для удобства клиентов и партнёров приложение AutoZap доступно на основных мобильных платформах:</p>
            <ul class="apps">
              <li>Android — Google Play: <a href="https://play.google.com/store/apps/details?id=com.unnamedii.autozapmobile">https://play.google.com/store/apps/details?id=com.unnamedii.autozapmobile</a></li>
              <li>iPhone — App Store: <a href="https://apps.apple.com/ru/app/autozap/id6772788391">https://apps.apple.com/ru/app/autozap/id6772788391</a></li>
              <li>RuStore: <a href="https://www.rustore.ru/catalog/app/com.unnamedii.autozapmobile">https://www.rustore.ru/catalog/app/com.unnamedii.autozapmobile</a></li>
            </ul>
            <section class="closing">
              <h2>Цель сотрудничества</h2>
              <div class="goal">
                Создание устойчивой модели взаимодействия между ${partner}, компанией
                AutoZap, малым бизнесом и сетью СТО, направленной на расширение
                рынка сбыта, увеличение представленности продукции и развитие
                долгосрочного партнёрства.
              </div>
              <p>Контактный телефон AutoZap: <b>${phone}</b></p>
              <div class="signs">
                <div class="sign">
                  <b>AutoZap</b>
                  <div class="line"></div>
                  <div class="hint">Должность, подпись, расшифровка</div>
                  <div class="line"></div>
                  <div class="hint">Дата · М.П.</div>
                </div>
                <div class="sign">
                  <b>${partner}</b>
                  <div class="line"></div>
                  <div class="hint">Должность, подпись, расшифровка</div>
                  <div class="line"></div>
                  <div class="hint">Дата · М.П.</div>
                </div>
              </div>
            </section>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`
}

export function printKp(html: string) {
  const win = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1100')
  if (!win) {
    alert('Разрешите всплывающие окна, чтобы сохранить PDF.')
    return
  }
  win.document.open()
  win.document.write(html)
  win.document.close()
  win.focus()
  window.setTimeout(() => {
    win.print()
  }, 350)
}

export function downloadHtml(html: string, partner: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `KP-AutoZap-${makeDocId(partner)}.html`
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

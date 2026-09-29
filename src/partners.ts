export const PHONE =
  import.meta.env.VITE_PHONE ?? '+7 (927) 877-77-95'

export type Partner = {
  slug: string
  name: string
  pdf: string
  docx: string
  page1: string
  page2: string
}

export const partners: Partner[] = [
  {
    slug: 'brend-parts',
    name: 'ООО «Бренд-Партс»',
    pdf: '/files/KP-AutoZap-OOO-Brend-Parts.pdf',
    docx: '/files/01-KP-AutoZap-OOO-Brend-Parts.docx',
    page1: '/pages/01-Brend-Parts-list-1.png',
    page2: '/pages/01-Brend-Parts-list-2.png',
  },
  {
    slug: 'sk-opt-shina',
    name: 'ООО «СК-ОПТ-ШИНА»',
    pdf: '/files/KP-AutoZap-OOO-SK-OPT-SHINA.pdf',
    docx: '/files/02-KP-AutoZap-OOO-SK-OPT-SHINA.docx',
    page1: '/pages/02-SK-OPT-SHINA-list-1.png',
    page2: '/pages/02-SK-OPT-SHINA-list-2.png',
  },
  {
    slug: 'specstalzapchast',
    name: 'ООО «СПЕЦСТАЛЬЗАПЧАСТЬ»',
    pdf: '/files/KP-AutoZap-OOO-Specstalzapchast.pdf',
    docx: '/files/03-KP-AutoZap-OOO-Specstalzapchast.docx',
    page1: '/pages/03-Specstalzapchast-list-1.png',
    page2: '/pages/03-Specstalzapchast-list-2.png',
  },
  {
    slug: 'avtolada',
    name: 'ООО «АВТОЛАДА»',
    pdf: '/files/KP-AutoZap-OOO-AvtoLada.pdf',
    docx: '/files/04-KP-AutoZap-OOO-AvtoLada.docx',
    page1: '/pages/04-AvtoLada-list-1.png',
    page2: '/pages/04-AvtoLada-list-2.png',
  },
  {
    slug: 'tpk-transsnab',
    name: 'ООО «ТПК „Трансснаб“»',
    pdf: '/files/KP-AutoZap-OOO-TPK-Transsnab.pdf',
    docx: '/files/05-KP-AutoZap-OOO-TPK-Transsnab.docx',
    page1: '/pages/05-TPK-Transsnab-list-1.png',
    page2: '/pages/05-TPK-Transsnab-list-2.png',
  },
  {
    slug: 'avtohadom',
    name: 'ООО «АВТОХАДОМ»',
    pdf: '/files/KP-AutoZap-OOO-AvtoHadom.pdf',
    docx: '/files/06-KP-AutoZap-OOO-AvtoHadom.docx',
    page1: '/pages/06-AvtoHadom-list-1.png',
    page2: '/pages/06-AvtoHadom-list-2.png',
  },
  {
    slug: 'zhivaya-stal',
    name: 'ООО ТД «ЖИВАЯ СТАЛЬ»',
    pdf: '/files/KP-AutoZap-OOO-TD-Zhivaya-Stal.pdf',
    docx: '/files/07-KP-AutoZap-OOO-TD-Zhivaya-Stal.docx',
    page1: '/pages/07-TD-Zhivaya-Stal-list-1.png',
    page2: '/pages/07-TD-Zhivaya-Stal-list-2.png',
  },
  {
    slug: 'transkavkaz',
    name: 'ООО «ТРАНСКАВКАЗ»',
    pdf: '/files/KP-AutoZap-OOO-Transkavkaz.pdf',
    docx: '/files/08-KP-AutoZap-OOO-Transkavkaz.docx',
    page1: '/pages/08-Transkavkaz-list-1.png',
    page2: '/pages/08-Transkavkaz-list-2.png',
  },
]

export function partnerBySlug(slug: string) {
  return partners.find((item) => item.slug === slug)
}

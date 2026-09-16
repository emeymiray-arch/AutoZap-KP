import logo from './assets/logo.jpg'
import qrAndroid from './assets/qr-android.svg'
import qrIos from './assets/qr-ios.svg'
import qrRustore from './assets/qr-rustore.svg'
import kpPdf from './assets/kp-autozap-armtek.pdf?url'

export const logoUrl = logo
export const qrAndroidUrl = qrAndroid
export const qrIosUrl = qrIos
export const qrRustoreUrl = qrRustore
export const kpPdfUrl = kpPdf
export const kpFileName = 'KP-AutoZap-ARMTEK.pdf'

export async function downloadProposal(): Promise<void> {
  const candidates = [kpPdfUrl, 'kp.pdf', 'download.pdf', 'KP-AutoZap-ARMTEK.pdf']

  for (const href of candidates) {
    try {
      const res = await fetch(href)
      if (!res.ok) continue
      const blob = await res.blob()
      if (blob.size < 1000) continue
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = kpFileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 2000)
      return
    } catch {
      continue
    }
  }

  throw new Error('PDF not found')
}

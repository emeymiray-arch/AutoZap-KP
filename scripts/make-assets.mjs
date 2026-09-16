import QRCode from 'qrcode'
import { writeFileSync } from 'node:fs'

const links = {
  android: 'https://play.google.com/store/apps/details?id=com.unnamedii.autozapmobile',
  ios: 'https://apps.apple.com/ru/app/autozap/id6772788391',
  rustore: 'https://www.rustore.ru/catalog/app/com.unnamedii.autozapmobile',
}

for (const [name, url] of Object.entries(links)) {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    margin: 1,
    width: 280,
    errorCorrectionLevel: 'M',
    color: { dark: '#07162f', light: '#00000000' },
  })
  writeFileSync(new URL(`../public/qr-${name}.svg`, import.meta.url), svg)
  console.log('wrote', name)
}

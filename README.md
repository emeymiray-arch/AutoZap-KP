# КП AutoZap

Статический сайт без базы данных и без GitHub.

На главной можно **создать КП** для любой компании: введите название, сохраните PDF через печать браузера. Готовые КП восьми компаний тоже остаются для пересылки.

Телефон задаётся в `.env` / `.env.example`:

```
VITE_PHONE=+7 (927) 877-77-95
```

## Постоянная ссылка (рекомендуется)

Временные ссылки Cloudflare/Vercel гаснут. Чтобы ссылка была постоянной **без GitHub**:

1. Скачайте архив [`autozap-site-netlify.zip`](autozap-site-netlify.zip)
2. Откройте https://app.netlify.com/drop
3. Перетащите zip на страницу
4. Netlify выдаст постоянный адрес вида `https://что-то.netlify.app`

Можно войти по почте — GitHub подключать не обязательно.

## Локально

```bash
npm install
npm run dev
```

http://127.0.0.1:43147

## Сборка

```bash
npm run build
```

Готовый сайт в папке `dist/`.

## GitHub

Репозиторий: https://github.com/emeymiray-arch/AutoZap-KP

Постоянный деплой на Vercel:
1. https://vercel.com/new/import?s=https://github.com/emeymiray-arch/AutoZap-KP
2. Deploy (framework Vite определится сам)

## Постоянная ссылка

https://emeymiray-arch.github.io/AutoZap-KP/

Создать КП: https://emeymiray-arch.github.io/AutoZap-KP/#/new

Репозиторий: https://github.com/emeymiray-arch/AutoZap-KP

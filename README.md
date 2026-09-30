# КП AutoZap

Статический сайт без базы данных и без GitHub.

На главной можно **создать КП** для любой компании: введите название, сохраните PDF через печать браузера. Готовые КП восьми компаний тоже остаются для пересылки.

Телефон задаётся в `.env` / `.env.example`:

```
VITE_PHONE=+7 (927) 877-77-95
```

## Локально

```bash
npm install
npm run dev
```

http://127.0.0.1:43147

## Vercel без GitHub

```bash
npm run build
npx vercel deploy dist --temporary --yes
```

Появится публичная ссылка и Claim URL. Claim нужен, чтобы сайт не истёк через час. GitHub подключать не требуется.

## Публичная ссылка сейчас

Если Vercel даёт 403, сайт открыт через Cloudflare Tunnel (без GitHub и без базы):

https://september-courier-adventure-browsers.trycloudflare.com

Создание КП: https://september-courier-adventure-browsers.trycloudflare.com/#/new

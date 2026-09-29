# КП AutoZap

Статический сайт без базы данных и без GitHub. На нём можно открыть коммерческие предложения и переслать ссылку.

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

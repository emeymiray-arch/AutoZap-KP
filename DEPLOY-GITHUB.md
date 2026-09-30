# Деплой через GitHub + Vercel

Репозиторий: https://github.com/emeymiray-arch/AutoZap-KP

## 1. Залить код

Нужен Personal Access Token GitHub с правом `repo`:  
https://github.com/settings/tokens/new?scopes=repo&description=AutoZap-KP-push

Пришлите токен в чат — агент запушит сам.

Или вручную:

```bash
git remote add github https://github.com/emeymiray-arch/AutoZap-KP.git
git push -u https://ВАШ_ТОКЕН@github.com/emeymiray-arch/AutoZap-KP.git main
```

## 2. Постоянная ссылка на Vercel

1. https://vercel.com/new
2. Import → `emeymiray-arch/AutoZap-KP`
3. Framework: Vite
4. Deploy

Адрес будет постоянный: `https://....vercel.app`

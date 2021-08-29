<div aligin="center">
  <img src="./documents/logo.svg">
</div>
<h1  align="center">Front</h1>
<div align="center">This repository is responsible for the frontend of Hello Slide.</div>

## Required Dependency

- node: latest
- yarn: latest

```bash
yarn install
```

## Environments

```env
NEXT_PUBLIC_API_DOMAIN=****   # APIのドメイン
NEXT_PUBLIC_DOMAIN=****       # ページのドメイン
GOOGLE_ANALYTICS_ID=****      # Google analytics id
```

## Lint and Build

- Lint

  ```bash
  # run linter
  yarn run lint

  # fix
  yarn run fix
  ```

- Build

  ```bash
  yarn run build
  ```

- ログインした状態でデバッグ

[やり方](./documents/debug.md)

## Start (or dev start)

```bash
yarn run start
```

To start for debugging purposes:

```bash
yarn run dev
```

## Deploy

Deploy to GAE.\
Normally it will be automatically deployed when pushed to the main branch.\
However, it can also be deployed explicitly.

```bash
# notice: require gcloud.
yarn run deploy
```

## LICENSE

[MIT](./LICENSE)

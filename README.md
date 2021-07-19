<div aligin="center">
  <img src="./assets/logo.svg">
</div>
<h1  align="center">Front</h1>
<div align="center">This repository is responsible for the frontend of Hello Slide.</div>

## Required Dependency

- node: latest
- yarn: latest

```bash
yarn install
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
  yarn build
  ```

## Start (or dev start)

```bash
yarn start
```

To start for debugging purposes:

```bash
yarn dev
```

## Deploy

Deploy to GAE.\
Normally it will be automatically deployed when pushed to the main branch.\
However, it can also be deployed explicitly.

```bash
# notice: require gcloud.
yarn deploy
```

## LICENSE

[MIT](./LICENSE)

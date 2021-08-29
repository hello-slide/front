# デバッグ方法

- デバッグ用ドメイン: `hello-slide.net`

## 1. 環境変数設定

```env
NEXT_PUBLIC_API_DOMAIN=api.hello-slide.net
NEXT_PUBLIC_DOMAIN=hello-slide.net
```

## 2. hostsファイル変更

```bash
sudo vi /etc/hosts
```

```text
172.0.0.1 hello-slide.net
```

## 3. オレオレ認証局！！！

**Cookieにセキュア属性がついているためsslじゃないとログインできない！！**

- 必要なもの
  - Openssl

### 3.1 認証用の鍵を作成（プロジェクトリポジトリ上で）

```bash
openssl req -x509 -out certificates/localhost.crt -keyout certificates/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

### 4.1 Run!!

```bash
yarn run dev:ssl
```

[https://hello-slide.net](https://hello-slide.net)

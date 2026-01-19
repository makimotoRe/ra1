# Keycloak (keycloak-js) — 初期化 / ログイン関連パラメータ参照

このドキュメントは、プロジェクトで使用している `keycloak-js`（型定義は `node_modules/keycloak-js/lib/keycloak.d.ts`）の初期化やログイン／ログアウトに関する主要なオプションと、その意味・使い方を日本語でまとめたメモです。Keycloak JS アダプタのバージョンによって細部は異なる可能性があるため、より詳しい情報は公式型定義やドキュメントを参照してください。

---

## 目次

- 概要
- コンストラクタ/設定オブジェクト
- init オプション（KeycloakInitOptions）
- login オプション（KeycloakLoginOptions）
- logout オプション（KeycloakLogoutOptions）
- よく使うメソッドと挙動メモ
- 実例（init / login）
- 注意点・補足

---

## 概要

`keycloak-js` を使うとブラウザアプリケーションから Keycloak サーバーへリダイレクトして認証を行えます。主に以下の API を使います。

- コンストラクタ: `new Keycloak(config)`（`config` はサーバ URL / realm / clientId などを含む）
- `init(initOptions)` : アダプタの初期化。`onLoad` などで自動リダイレクトの挙動を決める
- `login(options)` / `logout(options)` / `register(options)` : 各種画面へのリダイレクト
- `updateToken(minValidity)` : トークン更新

---

## コンストラクタ / 設定オブジェクト

Keycloak インスタンス生成時に渡す設定（`KeycloakConfig`）は主に2種類:

1. Keycloak サーバの設定オブジェクト（通常使う）
   - `url` : Keycloak サーバのベース URL（例: `http://localhost:8080` または `http://keycloak-server/auth`）
   - `realm`: 利用する realm 名（例: `master` や `myrealm`）
   - `clientId`: Keycloak に登録したクライアント ID（例: `react-admin`）

2. Generic OIDC 設定（OpenID Connect プロバイダを直接指定する場合）
   - `clientId`, `oidcProvider`（metadata の URL かオブジェクト）

---

## init オプション（KeycloakInitOptions）

主要オプションと意味（型・デフォルトを含む）:

- `useNonce?: boolean` — 認証応答の一致確認のための nonce を付与するか。デフォルト true。
- `adapter?: 'default' | 'cordova' | 'cordova-native' | KeycloakAdapter` — 環境ごとのアダプタ。通常は `default`。
- `onLoad?: 'login-required' | 'check-sso'` — 初期化時の挙動。
  - `login-required` : 未認証なら即座に Keycloak のログインページへリダイレクト
  - `check-sso` : SSO があればログインするが、なければログインページにはリダイレクトしない
- `token?: string`, `refreshToken?: string`, `idToken?: string` — 初期トークンをセットする場合に使用
- `timeSkew?: number` — サーバーとの時差（秒）をセット
- `checkLoginIframe?: boolean` (default true) — セッション監視用 iframe を有効化するか
- `checkLoginIframeInterval?: number` (default 5) — iframe チェックの間隔（秒）
- `responseMode?: 'query' | 'fragment'` (default `'fragment'`) — 認可レスポンスの返却方式（URL の query or fragment）
- `redirectUri?: string` — 初期化で指定するデフォルトのリダイレクト先 URI
- `silentCheckSsoRedirectUri?: string` — silent check-sso 用のリダイレクト先（`public/silent-check-sso.html` のような小さなページを置く）
- `silentCheckSsoFallback?: boolean` — 3rd party cookie がブロックされている場合にフォールバックするか（デフォルト true）
- `flow?: 'standard' | 'implicit' | 'hybrid'` (default `standard`) — OIDC フロー
- `pkceMethod?: 'S256' | false` — PKCE を使う (推奨: 'S256')、無効化するには `false`
- `enableLogging?: boolean` — Keycloak のログを console に出すか（default false）
- `scope?: string` — デフォルト scope（`openid` は常に含まれる）
- `messageReceiveTimeout?: number` — postMessage 等のタイムアウト ms（default 10000）
- `locale?: string` — `onLoad: 'login-required'` の場合に `ui_locales` を付与
- `logoutMethod?: 'GET' | 'POST'` — logout endpoint 呼び出し方法（default GET）

よく使う組み合わせ例:
- SPA でログイン必須にする: `init({ onLoad: 'login-required', pkceMethod: 'S256' })`
- SSO を静かにチェックして表示だけ変える: `init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' })`

---

## login オプション（KeycloakLoginOptions）

`keycloak.login(options)` に渡せる主なオプション:

- `scope?: string` — login 時に渡す scope（`openid` は自動で追加される）
- `redirectUri?: string` — ログイン後に戻す URI
- `prompt?: 'none' | 'login' | 'consent'` — 認証画面の挙動
  - `none` : ログイン画面を表示せず既存セッションのみで認証する
  - `login` : 強制再認証
  - `consent` : 同意画面を表示
- `action?: string` — `'register'` などのアクション（register へ飛ばしたい場合など）
- `maxAge?: number` — 既存認証の最大許容年齢（秒）
- `loginHint?: string` — ログイン名をプレフィル
- `acr?: Acr` — ACR claims（OIDC の `claims` に関する設定）
- `acrValues?: string` — `acr_values`（認証レベルを指定）
- `idpHint?: string` — どの IDP（Identity Provider）を使うかをヒントとして渡せる
- `locale?: string` — `ui_locales` を指定
- `cordovaOptions?: { [optionName: string]: string }` — Cordova 向けの in-app browser オプション

補足:
- `idpHint` は例えば `google` や `github` のように Keycloak の ID プロバイダを特定して直接外部IDPでのログインに誘導したい時に使います。

---

## logout オプション（KeycloakLogoutOptions）

- `redirectUri?: string` — ログアウト後に戻す URI
- `logoutMethod?: 'GET' | 'POST'` — logout エンドポイント呼び出しの HTTP メソッド

---

## その他の便利なメソッド / プロパティ

- `authenticated: boolean` — 認証状態か
- `token`, `refreshToken`, `idToken` — 生のトークン
- `tokenParsed`, `idTokenParsed` — パース済みトークンオブジェクト
- `init(initOptions)` — 初期化（Promise<boolean>）
- `login(options)`, `logout(options)`, `register(options)`, `accountManagement()`
- `createLoginUrl(options)` / `createLogoutUrl(options)` — URL を取得するだけのメソッド
- `updateToken(minValidity?: number)` — トークンを更新し、更新結果を Promise で返す（成功/失敗）
- `isTokenExpired(minValidity?: number)` — トークンの有効期限チェック
- `loadUserProfile()` — ユーザープロファイルを取得

---

## 実例

1) シンプルな初期化 (SPA でログインを強制)

```ts
const keycloak = new Keycloak({ url: 'http://localhost:8080', realm: 'master', clientId: 'react-admin' });

keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256' })
  .then((authenticated) => {
    if (authenticated) {
      // アプリを表示
    }
  })
  .catch((err) => console.error('Keycloak init failed', err));
```

2) check-sso + silent SSO（サイレントチェック用 HTML が必要）

```ts
keycloak.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  pkceMethod: 'S256'
});
```

3) 明示的にログイン画面へ遷移させる（React Admin の login ハンドラなど）

```ts
keycloak.login({ redirectUri: window.location.origin + '/', idpHint: 'google' });
```

4) ログアウト

```ts
keycloak.logout({ redirectUri: window.location.origin + '/' });
```

---

## 注意点・補足

- `redirectUri` は Keycloak 管理画面のクライアント設定にて許可されたリダイレクト URI のひとつである必要があります。
- SPA では PKCE (`pkceMethod: 'S256'`) を有効にするのが推奨されます。
- `silentCheckSsoRedirectUri` を使う場合は、その URL がアプリ内で利用可能な HTML を提供する必要があります（例: `public/silent-check-sso.html`）。
- `checkLoginIframe` を有効化すると、セッション状態を iframe 経由で定期チェックしますが、環境によっては必要ない・またはブロックされる場合があります。
- 型定義は `node_modules/keycloak-js/lib/keycloak.d.ts` にあり、ここを参照すると各オプションの型とデフォルトが確認できます。

---

## 参考

- 型定義（プロジェクト内）: `node_modules/keycloak-js/lib/keycloak.d.ts`
- 公式ドキュメント: Keycloak JS adapter ドキュメント（Keycloak の公式サイト）


---

作成日: 2025-11-15

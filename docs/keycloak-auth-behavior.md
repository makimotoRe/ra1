# React-Admin における Keycloak 認証の挙動

このドキュメントでは、React-Admin アプリケーションにおける Keycloak 認証フローについて説明します。ログイン、ログアウト、画面リロード、トークンのセッション切れ、トークンのリフレッシュに関する挙動や、呼び出されるメソッドの順序、変数の内容についてまとめています。

---

## **1. ログイン**

### **フロー**

1. ユーザーがログインを試みると、`authProvider.login` メソッドが呼び出されます。
2. `keycloak.login` メソッドが Keycloak のログインページにリダイレクトします。
3. 認証が成功すると、Keycloak はアプリケーションに認可コードを付与してリダイレクトします。
4. Keycloak の JavaScript アダプターが認可コードをトークン（アクセストークン、リフレッシュトークンなど）に交換します。

### **主な変数**

- `keycloak.authenticated`: 認証成功後に `true` に設定されます。
- `keycloak.token`: アクセストークンを保持します。
- `keycloak.refreshToken`: リフレッシュトークンを保持します。

### **呼び出されるメソッド**

- `authProvider.login`
- `keycloak.login`

---

## **2. ログアウト**

### **フロー**

1. ユーザーがログアウトボタンをクリックすると、`authProvider.logout` メソッドが呼び出されます。
2. `keycloak.logout` メソッドが Keycloak のログアウトエンドポイントにリダイレクトします。
3. ログアウト後、ユーザーはアプリケーションにリダイレクトされます。

### **主な変数**

- `keycloak.authenticated`: ログアウト後に `false` に設定されます。
- `keycloak.token`: ログアウト後にクリアされます。
- `keycloak.refreshToken`: ログアウト後にクリアされます。

### **呼び出されるメソッド**

- `authProvider.logout`
- `keycloak.logout`

---

## **3. 画面リロード**

### **フロー**

1. 画面がリロードされると、`authProvider.checkAuth` メソッドが呼び出されます。
2. `keycloak.init` メソッドが `onLoad: 'check-sso'` オプションでトリガーされます。
3. ユーザーがまだ認証されている場合（セッションが有効な場合）、`keycloak.authenticated` は `true` のままです。
4. セッションが無効な場合、`keycloak.authenticated` は `false` に設定されます。

### **主な変数**

- `keycloak.authenticated`: ユーザーがまだログインしているかどうかを確認します。
- `keycloak.token`: セッションが有効な場合にリフレッシュされます。

### **呼び出されるメソッド**

- `authProvider.checkAuth`
- `keycloak.init`

---

## **4. トークンの有効期限切れ**

### **フロー**

1. トークンには有効期限があります（例: アクセストークンは 5 分間有効）。
2. トークンが期限切れになると、トークンがリフレッシュされない限り、ユーザーはログアウトされます。

### **主な変数**

- `keycloak.token`: 有効期限切れ後に無効になります。
- `keycloak.refreshToken`: 新しいアクセストークンを取得するために使用されます。

### **呼び出されるメソッド**

- 特に呼び出されるメソッドはありません（Keycloak アダプターが内部的に処理します）。

---

## **5. トークンのリフレッシュ**

### **フロー**

1. `setupTokenRefresh` メソッドがタイマーを設定し、有効期限が切れる前にトークンをリフレッシュします。
2. `keycloak.updateToken` メソッドがトークンをリフレッシュします。
3. リフレッシュが成功すると、`keycloak.token` が更新されます。
4. リフレッシュが失敗すると、ユーザーはログアウトされます。

### **主な変数**

- `keycloak.token`: 新しいアクセストークンで更新されます。
- `keycloak.refreshToken`: 有効期限が切れるまで保持されます。

### **呼び出されるメソッド**

- `setupTokenRefresh`
- `keycloak.updateToken`

---

## **メソッド呼び出しの概要**

| アクション             | 呼び出されるメソッド                        |
| ---------------------- | ------------------------------------------- |
| ログイン               | `authProvider.login`, `keycloak.login`      |
| ログアウト             | `authProvider.logout`, `keycloak.logout`    |
| 画面リロード           | `authProvider.checkAuth`, `keycloak.init`   |
| トークンの有効期限切れ | Keycloak が内部的に処理                     |
| トークンのリフレッシュ | `setupTokenRefresh`, `keycloak.updateToken` |

---

## **ベストプラクティス**

- `keycloak.init` で `onLoad: 'check-sso'` を使用して、画面リロード後もセッションを維持します。
- `setupTokenRefresh` を実装して、トークンの有効期限が切れる前にリフレッシュを行います。
- トークンリフレッシュの失敗を適切に処理し、ユーザーをログインページにリダイレクトします。

---

このドキュメントは、アプリケーションにおける Keycloak 認証フローの包括的な概要を提供します。要件に応じて調整してください。

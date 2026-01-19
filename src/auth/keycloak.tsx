import Keycloak from 'keycloak-js';

// Keycloakインスタンスの初期化
export const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
    realm: import.meta.env.VITE_KEYCLOAK_REALM || 'master',
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'react-admin',
});

// Keycloak初期化関数
export const initKeycloak = (): Promise<boolean> => {
    return keycloak.init({
        // `check-sso` にすると既存セッションがあれば自動で認証され、
        // 無ければリダイレクトは行われません（アプリ側で明示的に login を呼ぶ）。
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        // session monitoring
        checkLoginIframe: true,
        checkLoginIframeInterval: 5,
    });
};

// トークンリフレッシュ用タイマーをセット
export const setupTokenRefresh = () => {
    // SPA 向けに定期的にトークン更新を試みる（updateToken を利用）
    setInterval(() => {
        keycloak
            .updateToken(70)
            .then((refreshed) => {
                // refreshed === true => トークンがリフレッシュされた
                // refreshed === false => トークンはまだ有効
            })
            .catch(() => {
                // トークン更新に失敗した場合は認証状態をクリア
                keycloak.clearToken();
            });
    }, 60000); // 1分ごとにチェック
};
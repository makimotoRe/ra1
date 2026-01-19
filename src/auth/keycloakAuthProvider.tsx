import { AuthProvider } from "react-admin";
import { keycloak } from "./keycloak";

const clientId = process.env.VITE_KEYCLOAK_CLIENT_ID || "";

export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: async (params?: { redirectTo?: string }) => {
    // Keycloakのログイン画面にリダイレクト
    // params.redirectTo があればそこへ戻る
    const target = "/loading";
    await keycloak.login({
      redirectUri: window.location.origin + target,
    });
    return Promise.resolve();
  },
  // called when the user clicks on the logout button
  logout: async () => {
    await keycloak.logout({
      redirectUri: window.location.origin,
    });
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      keycloak.logout({
        redirectUri: window.location.origin,
      });
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: async () => {
    // ルート側の / へのリダイレクトは App 側で制御する（フルリロードを避けるため）
    const path = window.location.pathname || "";

    // 認証済みなら許可
    if (keycloak.authenticated) {
      return Promise.resolve();
    }

    // トークン交換中のリダイレクト（?code=... 等）が付与されている場合は待機扱いにして許可
    if (
      window.location.search.includes("code") ||
      window.location.search.includes("session_state")
    ) {
      return Promise.resolve();
    }

    if (!keycloak.authenticated) {
      return Promise.reject();
    }

    try {
      console.log();
      return Promise.resolve();
    } catch (error) {
      // それ以外は未認証として拒否（React Admin がログインページへ遷移させます）
      return Promise.resolve();
    }
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    const realmRoles = keycloak.realmAccess?.roles || [];
    const clientRoles = keycloak.resourceAccess?.[clientId]?.roles || [];
    return Promise.resolve(clientRoles);
  },
};
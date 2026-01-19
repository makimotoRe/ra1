// in src/authProvider.tsx
import { AuthProvider } from "react-admin";
import { updateSessionTime } from "./utils/updateSessionTime";
import errorMessages from "../messages/errorMessages";
import Keycloak, { KeycloakConfig, KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { keycloakAuthProvider } from "ra-keycloak";

// const loginLocalServer = import.meta.env.LOGIN_LOCAL_SERVER_URL;
// const logoutLocalServer = import.meta.env.LOGOUT_LOCAL_SERVER_URL;
// Keycloakの設定
const keycloakConfig: KeycloakConfig = {
  url: 'https://your-keycloak-server/auth',
  realm: 'your-realm',
  clientId: 'your-client-id'
};
// const keycloak: KeycloakInstance = new Keycloak(keycloakConfig);
const keycloak = new Keycloak('/keycloak.json');
interface KeycloakState {
  keycloak: Keycloak | null;
  authenticated: Boolean;
}

// here you can implement the permission mapping logic for react-admin
const getPermissions = (decoded: KeycloakTokenParsed): string | false => {
  const roles = decoded?.realm_access?.roles;
  if (!roles) {
      return false;
  }
  if (roles.includes('admin')) return 'admin';
  if (roles.includes('user')) return 'user';
  return false;
};

export const oAuthProvider = keycloakAuthProvider(
  keycloak,
  {
    initOptions: {
      // responseMode: 'query',
      onLoad: 'check-sso',
    },
    loginRedirectUri: `/#/auth-callback`,
    logoutRedirectUri: `/#/login`,
    onPermissions: getPermissions,
  }
)
// npm install @mui/material@latest @emotion/react@latest @emotion/styled@latest

// export const oAuthProvider: AuthProvider = {
//   // called when the user navigates to a new location, to check for authentication
//   async checkAuth(){
//     const authenticated = await keycloak.init({ onLoad: 'check-sso' });
//     if (authenticated) {
//         return;
//     }
//     // then redirect the user to the Auth0 service
//     // authenticated.loginWithRedirect({
//     //     authorizationParams: {
//     //         // after login, Auth0 will redirect users back to this page
//     //         redirect_uri: `${window.location.origin}/auth-callback`,
//     //     },
//     // });
//   },
//   async login(){},
//     // return new Promise((resolve,reject) =>{
//     //   console.log('login')
//     //   const response_type = 'response_type=' + 'code';
//     //   const client_id = 'client_id=' + 'template_pj_client';
//     //   // const redirect_uri = 'redirect_uri=' + 'https%3A%2F%2F172.16.15.236%2Fmanage_service%2Fdebug%2Fcallback';
//     //   const redirect_uri = 'redirect_uri=' + encodeURIComponent('http://localhost:5173/login')
//     //   const scope = 'scope=' + 'openid+profile+email';
//     //   const code_challenge = 'code_challenge=' + 'RN9FbJMIubzxCqJbam8QAft6Sg64RxsKTl-ozKKjEqU';
//     //   const code_challenge_method = 'code_challenge_method=' + 'S256'
//     //   const state ='state=' + '60c05102-8a3b-4ce6-9f53-fc28be780f1d';
//     //   const path = response_type + '&' + client_id + '&' +redirect_uri+ '&' +scope+ '&' +code_challenge+ '&' +code_challenge_method+ '&' +state;
//     //   window.open('https://172.16.15.236/auth_server/realms/template_pj_realm/protocol/openid-connect/auth?'+path)
//       // window.open('https://172.16.15.236/auth_server/realms/template_pj_realm/protocol/openid-connect/auth?response_type=code&client_id=template_pj_client&redirect_uri=https%3A%2F%2F172.16.15.236%2Fmanage_service%2Fdebug%2Fcallback&scope=openid+profile+email&code_challenge=RN9FbJMIubzxCqJbam8QAft6Sg64RxsKTl-ozKKjEqU&code_challenge_method=S256&state=60c05102-8a3b-4ce6-9f53-fc28be780f1d', '_blank')
    
//     // })
//     // const request = new Request(loginLocalServer, {
//     //   method: "POST",
//     //   body: JSON.stringify(),
//     //   headers: new Headers({ "Content-Type": "application/json" }),
//     // });
//     // return fetch(request)
//     //   .then((response) => {
//     //     if (!response.ok) {
//     //       return response.json().then((errorData) => {
//     //         const status = response.status;

//     //         let key = undefined;
//     //         if (errorData.detail[0].type) key = errorData.detail[0].type; // pydantic&HTTPException error
//     //         if (key) key = key.toUpperCase()?.replace(/\s+/g, "_");

//     //         //error文 errorMessageに記述
//     //         const errorKey = key || "default";
//     //         const errorMessageCasted = errorMessages.login as any;
//     //         const errorMessage =
//     //           (errorMessageCasted[status] &&
//     //             errorMessageCasted[status][errorKey]) ||
//     //           errorMessageCasted[status] ||
//     //           errorMessageCasted.default;
//     //         throw new Error(errorMessage);
//     //       });
//     //     }
//     //     return response.json();
//     //   })
//     //   .then((auth) => {
//     //     if (auth === undefined) {
//     //       return Promise.reject();
//     //     }
//     //     localStorage.setItem("auth", JSON.stringify(auth));
//     //     return Promise.resolve();
//     //   })
//     //   .catch((error) => {
//     //     return Promise.reject(error);
//     //   });

//   // called when the user clicks on the logout button
//   async logout() {
//     // const auth = localStorage.getItem("auth");
//     // if (!auth || auth == undefined) {
//     //   return Promise.resolve();
//     // }

//     // const authData = JSON.parse(auth);
//     // const session_id = authData.session_id;
//     // const request = new Request(logoutLocalServer, {
//     //   method: "POST",
//     //   body: JSON.stringify({ session_id }),
//     //   headers: new Headers({ "Content-Type": "application/json" }),
//     // });
//     // return fetch(request)
//     //   .then((response) => {
//     //     localStorage.removeItem("auth");
//     //     return Promise.resolve();
//     //   })
//     //   .catch((error) => {
//     //     return Promise.reject(error);
//     //   });
//   },
//   // called when the API returns an error
//   checkError: ({ status }: { status: number }) => {
//     if (status === 401 || status === 403) {
//       localStorage.removeItem("auth");
//       return Promise.reject();
//     }
//     return Promise.resolve();
//   },

//   // called when the user navigates to a new location, to check for permissions / roles
//   getPermissions: () => Promise.resolve(),
//   // async getIdentity(): Promise<UserIdentity> {
//   //     const user = supabase.auth.user();
//   //     if (!user) throw new Error("Failed to get user identity");
//   //     return { id: user.id, fullName: user.email };
//   //   },
//   getIdentity: () => {
//     const profile = localStorage.getItem("userProfile");

//     if (profile) {
//       const data = JSON.parse(profile);
//       return Promise.resolve(data);
//     }

//     return Promise.resolve();
//   },
// };

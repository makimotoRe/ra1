// in src/authProvider.tsx
import { AuthProvider } from "react-admin";
import { updateSessionTime } from "./utils/updateSessionTime";
import errorMessages from "../messages/errorMessages";

const loginLocalServer = process.env.LOGIN_LOCAL_SERVER_URL;
const logoutLocalServer = process.env.LOGOUT_LOCAL_SERVER_URL;

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    console.log(loginLocalServer)
    const request = new Request(loginLocalServer, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            const status = response.status;

            let key = undefined;
            if (errorData.detail[0].type) key = errorData.detail[0].type; // pydantic&HTTPException error
            if (key) key = key.toUpperCase()?.replace(/\s+/g, "_");

            //error文 errorMessageに記述
            const errorKey = key || "default";
            const errorMessageCasted = errorMessages.login as any;
            const errorMessage =
              (errorMessageCasted[status] &&
                errorMessageCasted[status][errorKey]) ||
              errorMessageCasted[status] ||
              errorMessageCasted.default;
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((auth) => {
        if (auth === undefined) {
          return Promise.reject();
        }
        localStorage.setItem("auth", JSON.stringify(auth));
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  // called when the user clicks on the logout button
  logout: () => {
    const auth = localStorage.getItem("auth");
    if (!auth || auth == undefined) {
      return Promise.resolve();
    }

    const authData = JSON.parse(auth);
    const session_id = authData.session_id;
    const request = new Request(logoutLocalServer, {
      method: "POST",
      body: JSON.stringify({ session_id }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        localStorage.removeItem("auth");
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  // called when the API returns an error
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    const auth = localStorage.getItem("auth");
    if (!auth || auth == undefined) {
      localStorage.removeItem("auth");
      return Promise.reject("No auth data");
    }

    const authData = JSON.parse(auth);
    const expiredAt = new Date(authData.expiration_date);
    const currentTime = new Date();
    if (currentTime > expiredAt) {
      return Promise.reject("セッションが切れました。");
    } else {
      updateSessionTime();
      return Promise.resolve();
    }
  },

  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
  // async getIdentity(): Promise<UserIdentity> {
  //     const user = supabase.auth.user();
  //     if (!user) throw new Error("Failed to get user identity");
  //     return { id: user.id, fullName: user.email };
  //   },
  getIdentity: () => {
    const profile = localStorage.getItem("userProfile");

    if (profile) {
      const data = JSON.parse(profile);
      return Promise.resolve(data);
    }

    return Promise.resolve();
  },
};

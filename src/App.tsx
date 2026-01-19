import { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  Admin,
  CustomRoutes,
  Resource,
  ShowGuesser,
} from "react-admin";
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import { UserList } from './users';
import { PostList, PostEdit, PostCreate } from './posts';
import { dataProvider } from "./dataProvider";
import { authProvider as keycloakAuthProvider } from "../src/auth/keycloakAuthProvider";
import { Dashboard } from "./Dashboard";
import { initKeycloak, keycloak, setupTokenRefresh } from "../src/auth/keycloak";
import LoginPage from './LoginPage';
import LoadingPage from './LoadingPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Button, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e7f3ffff', // ブランドカラー
    },
    secondary: {
      main: '#ff4081', // アクセントカラー
    },
    background: {
      default: '#f4f6f8', // 背景色
    },
    mode: 'light', // ダークモードを有効にする場合は 'dark'
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14, // 基本フォントサイズ
    h1: {
      fontSize: '2rem',
    },
    button: {
      textTransform: 'none', // ボタンのテキストを小文字に
    },
  },
});

// const Loading = () => (
//   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//     <CircularProgress />
//   </div>
// );

const CustomButton = () => (
  <Button
    variant="contained"
    size="large"
    style={{
      borderRadius: '8px', // 角丸
      padding: '12px 24px', // サイズ調整
      backgroundColor: '#1976d2', // ボタン色
      color: '#fff',
    }}
    startIcon={<SaveIcon />}
  >
    保存
  </Button>
);

const CustomLayout = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <div>左側のコンテンツ</div>
    </Grid>
    <Grid item xs={12} sm={6}>
      <div>右側のコンテンツ</div>
    </Grid>
  </Grid>
);

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const redirectedRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Keycloakを初期化（check-sso）
    initKeycloak()
      .then((auth: any) => {
        setAuthenticated(Boolean(auth));
        if (auth) {
          // トークンリフレッシュのセットアップ
          setupTokenRefresh();
        }
      })
      .catch(() => {
        // init が失敗してもアプリを表示（必要ならエラーハンドリング追加）
      })
      .finally(() => {
        setIsInitialized(true);
        console.log('initKeycloak finally')
      });
  }, []);

  // // ルート ("/") にいるときはクライアントサイドで /login に遷移させる
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' && !authenticated) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    keycloakAuthProvider.getPermissions({})
      .then((perms) => {
        setPermissions(perms);
      });
  }, [authenticated]);

  if (!isInitialized) {
    return <LoadingPage />;
  } else {

    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/loading" element={<LoadingPage />} />
          <Route
            path="/*"
            element={
              <Admin
                loginPage={LoginPage}
                authProvider={keycloakAuthProvider}
                dataProvider={dataProvider}
                dashboard={Dashboard}
              >
                <Resource
                  name="posts"
                  list={PostList}
                  edit={PostEdit}
                  create={PostCreate}
                  icon={PostIcon}
                />
                {permissions.includes("admin") && (
                  <Resource
                    name="users"
                    list={UserList}
                    show={ShowGuesser}
                    icon={UserIcon}
                    recordRepresentation="name"
                  />
                )}
                <CustomButton />
                <CustomLayout />
              </Admin>
            }
          />
        </Routes>
      </ThemeProvider>
    );
  }
};

// if (!isInitialized) {
//   return <Loading />;
// }

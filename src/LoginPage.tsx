import React from 'react';
import { Login, LoginProps, useLogin } from 'react-admin';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import { authProvider } from '../src/auth/keycloakAuthProvider';

const KeycloakLoginCard: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Typography variant="h5">ログイン</Typography>
          <Typography variant="body2">Keycloak を使ってログインします</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => authProvider.login({})}
          >
            Keycloak でログイン
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export const LoginPage: React.FC<LoginProps> = (props) => (
  <Login {...props}>
    <KeycloakLoginCard />
  </Login>
);

export default LoginPage;

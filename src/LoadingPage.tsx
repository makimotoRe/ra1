import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keycloak } from '../src/auth/keycloak';

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    // ポーリングして Keycloak の認証状態を監視する
    const interval = setInterval(() => {
      if (cancelled) return;
      if (keycloak.authenticated) {
        clearInterval(interval);
        // 認証済みになったら保護ページへ遷移
        navigate('/posts', { replace: true });
      }
    }, 300);

    // タイムアウト: 10秒後にまだ認証されていなければルートへ戻す
    const timeout = setTimeout(() => {
      if (cancelled) return;
      clearInterval(interval);
      navigate('/', { replace: true });
    }, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
      <CircularProgress />
      <Typography>ログイン処理中… そのままお待ちください</Typography>
    </Box>
  );
};

export default LoadingPage;

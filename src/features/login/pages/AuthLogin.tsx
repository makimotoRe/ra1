import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 管理用ログインページ
const AuthLogin = () => {
    // const location = useLocation();

    // // クエリパラメータを取得する関数
    // const getQueryParams = () => {
    //     const params = new URLSearchParams(location.search);
    //     return {
    //         code: params.get('code'),
    //         redirect_uri: params.get('redirect_uri'),
    //         code_verifier: params.get('code_verifier'),
    //     };
    // };

    // const authenticateUser = async (authData: any) => {
    //     try {
    //         const response = await fetch('https://172.16.15.236/manage_service/login', {
    //             method: 'POST',
    //             headers: {
    //                 'accept': 'application/json',
    //                 'API-Key': '79d2c3a6c5fd50cedeae3424b7ca1c90054e7dc803085537f286e105dbf8bf60',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(authData),
    //         });

    //         if (response.ok) {
    //             const jsonResponse = await response.json();
    //             console.log('認証成功:', jsonResponse);
    //             // 認証成功後の処理
    //         } else {
    //             console.error('認証失敗:', response.statusText);
    //             // エラー処理
    //         }
    //     } catch (error:any) {
    //         console.error('ネットワークエラー:', error.message);
    //         // ネットワークエラー処理
    //     }
    // };

    // useEffect(() => {
    //     const authData = getQueryParams();
    //     if (authData.code) {
    //         authenticateUser(authData);
    //     }
    // }, [location]);

    return (
      <>
        <h1>認証中...</h1>
      </>
    );
  };
  export default AuthLogin;
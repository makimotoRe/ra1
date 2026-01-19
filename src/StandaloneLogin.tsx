import React from 'react';
import { useNavigate } from 'react-router-dom';
import { keycloak } from './keycloak';

const StandaloneLogin: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await keycloak.login({
                redirectUri: window.location.origin + '/loading',
            });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Login</h1>
            <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Login with Keycloak
            </button>
        </div>
    );
};

export default StandaloneLogin;
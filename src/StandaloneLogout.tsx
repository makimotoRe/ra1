import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { keycloak } from './keycloak';

const StandaloneLogout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await keycloak.logout({
                    redirectUri: window.location.origin,
                });
            } catch (error) {
                console.error('Logout failed', error);
            } finally {
                navigate('/');
            }
        };

        logout();
    }, [navigate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Logging out...</h1>
        </div>
    );
};

export default StandaloneLogout;
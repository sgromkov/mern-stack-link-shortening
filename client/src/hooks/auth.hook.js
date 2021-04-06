import { useState, useCallback, useEffect } from 'react';

const LOCAL_STORAGE_USER_DATA = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify({
            userId: id, token: jwtToken
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA));

        if (data && data.token) {
            login(data.token, data.userId);
        }
    }, [login]);

    return { login, logout, token, userId };
};

// Deconnect.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';

const cookieStorage = new CookieStorage();

const Deconnect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        cookieStorage.removeItem("user");
        navigate('/login');
    }, [navigate]);
};

export default Deconnect;

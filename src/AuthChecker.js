// AuthChecker.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';

const cookieStorage = new CookieStorage();

const AuthChecker = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si un utilisateur est déjà connecté (cookie dans le localStorage)
        const storedUser = cookieStorage.getItem('user');
        if (storedUser) {
            // const user = JSON.parse(storedUser);
            // Rediriger vers le tableau de bord si l'utilisateur est déjà connecté
            navigate('/dashboard');
        }
    }, [navigate]);

    return null; // Pas de rendu visible dans ce composant
};

export default AuthChecker;

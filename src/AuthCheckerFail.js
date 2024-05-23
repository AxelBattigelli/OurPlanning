// AuthCheckerFail.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';

const cookieStorage = new CookieStorage();

const AuthCheckerFail = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si un utilisateur est déjà connecté (cookie dans le localStorage)
        const storedUser = cookieStorage.getItem('user');
        if (!storedUser) {
            // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
            navigate('/login');
        }
    }, [navigate]);

    return null; // Pas de rendu visible dans ce composant
};

export default AuthCheckerFail;

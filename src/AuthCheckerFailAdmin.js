// AuthCheckerFailAdmin.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';

const cookieStorage = new CookieStorage();

const AuthCheckerFailAdmin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si un utilisateur est déjà connecté (cookie dans le localStorage)
        const userDataString = cookieStorage.getItem('user');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        // console.log(userData.username);
        if (userData) {
            // Rediriger vers la page de connexion si l'utilisateur n'est pas root
            const val = userData.username.localeCompare("root");
            if (val !== 0) {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return null; // Pas de rendu visible dans ce composant
};

export default AuthCheckerFailAdmin;

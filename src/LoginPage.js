// Login.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthChecker from './AuthChecker';
import { useNavigate } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';
// import userCredentials from './userCredentials.json';

const cookieStorage = new CookieStorage();

const Login = () => {
    const [userCredentials, getUserCredentials] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/myplanning/userCredentials.json') // Utilisation du port 3001 pour le serveur backend
            .then(response => getUserCredentials(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleLogin = () => {
        const user = userCredentials.find(cred => cred.username === username && cred.password === password);

        if (user) {
            // Authentification réussie, stockage des informations utilisateur dans le localStorage
            var expires = new Date();
            expires.setHours(expires.getHours() + 1);
            cookieStorage.setItem('user', JSON.stringify(user), {
                path: '/',
                expires: expires,
                secure: false,
                sameSite: 'Strict'
            });
            // Redirection vers la page de tableau de bord
            navigate('/dashboard');
        } else {
            setError('Nom d\'utilisateur ou mot de passe incorrect');
        }
    };

    return (
        <div>
            <AuthChecker />
            <h2>Connexion</h2>
            <div>
                <label htmlFor="username">Nom d'utilisateur:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin}>Se connecter</button>
        </div>
    );
};

export default Login;

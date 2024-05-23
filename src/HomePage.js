// HomePage.js

import React from 'react';
import AuthChecker from './AuthChecker';

const HomePage = () => {
    return (
        <div>
            <AuthChecker />
            <h2>Page d'accueil</h2>
            {/* Contenu de la page d'accueil */}
        </div>
    );
};

export default HomePage;

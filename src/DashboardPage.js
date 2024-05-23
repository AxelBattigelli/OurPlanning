// DashboardPage.js

import React from 'react';
import { CookieStorage } from 'cookie-storage';
import AuthCheckerFail from './AuthCheckerFail';

const cookieStorage = new CookieStorage();

const DashboardPage = () => {
    let tmp = cookieStorage.getItem('user');
    console.log(tmp);
    return (
        <div>
            <AuthCheckerFail />
            <h2>DashboardPage</h2>
            {/* Contenu de la page d'accueil */}
        </div>
    );
};

export default DashboardPage;

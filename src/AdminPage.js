// AdminPage.js

import React from 'react';
import { CookieStorage } from 'cookie-storage';
import AuthCheckerFailAdmin from './AuthCheckerFailAdmin';

const cookieStorage = new CookieStorage();

const AdminPage = () => {
    let tmp = cookieStorage.getItem('user');
    console.log(tmp);
    return (
        <div>
            <AuthCheckerFailAdmin />
            <h2>AdminPage</h2>
            <p>Ajouter un nouvel utilisateur :</p>
        </div>
    );
};

export default AdminPage;

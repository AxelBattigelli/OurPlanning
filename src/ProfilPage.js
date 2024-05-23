// ProfilPage.js

import React from 'react';
import AuthCheckerFail from './AuthCheckerFail';
import { CookieStorage } from 'cookie-storage';
import './css/profil.css';

const cookieStorage = new CookieStorage();

const DashboardPage = () => {
    const userDataString = cookieStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const username = userData ? userData.username : null;
    const fullName = userData ? userData.fullName : null;
    const password = userData ? userData.password : null;
    const avatar = userData ? userData.avatar : null;

    let adminpage = [];
    if (username === "root") {
        adminpage.push(<a href="/admin">Administration</a>);
    }
    // console.log(avatar);

    return (
        <div>
            <AuthCheckerFail />
            <h2>Profil</h2>
            <br></br>
            <p>Nom d'utilisateur : {username}</p>
            <p>Nom full : {fullName}</p>
            <p>mdp : {password} <button>Changer</button></p>
            <p>avatar : {avatar} <button>Changer</button></p>
            {adminpage}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {/* Contenu de la page d'accueil */}
        </div>
    );
};

export default DashboardPage;

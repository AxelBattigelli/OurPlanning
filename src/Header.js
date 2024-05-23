// Header.js

import React, { useEffect } from 'react';
import './css/header.css';
import def_avatar from './img/default.jpg';
import logo from './img/logo.png';
import deco from './img/deco.svg';
import { CookieStorage } from 'cookie-storage';

// const images = require.context('./img', true);
// const imageList = images.keys().map(image => images(image));
const cookieStorage = new CookieStorage();
// console.log(imageList);

const Header = () => {
    const userDataString = cookieStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    let avatar;

    useEffect(() => {
        const userDataString = cookieStorage.getItem('user');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const IntervalID = setInterval(() => {

            if (userDataString) {
                avatar = process.env.PUBLIC_URL + "avatars/" + userData?.avatar;
                console.log(avatar);
            } else {
                avatar = def_avatar;
            }
            return avatar
        }, 1000);
        return () => { clearInterval(IntervalID) }
    }, [userDataString, userData]);

    // console.log(userData.avatar);
    return (
        <header className="header">
            <a href="/">
                <img src={logo} alt="Logo" className="logo" />
            </a>
            <ul className="menu">
                <li className="menu_item"><a className="menu_link" href="/dashboard">Dashboard</a></li>
                <li className="menu_item"><a className="menu_link" href="/myweek">Ma semaine</a></li>
                <li className="menu_item"><a className="menu_link" href="/recap">Récap</a></li>
                <li className="menu_item"><a className="menu_link" href="/about">À propos</a></li>
                <li className="menu_item"><a className="menu_link" href="/contact">Contact</a></li>
            </ul>


            {/* check if user exist change default avatar by real
            def on userCredential (path) */}
            <a href="/profil">
                <img src={userData?.avatar ? avatar : def_avatar} alt="Avatar" className="avatar" />
            </a>
            <a href="/deconnect">
                <img src={deco} alt="Deco" className="deco" />
            </a>

        </header>
    );
};

export default Header;

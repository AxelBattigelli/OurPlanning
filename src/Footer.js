// Footer.js

import React from 'react';
import './css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <div className="menu_f">
                <li className="menu_f_item"><a className="menu_f_link" href="/">Home</a></li>
                <li className="menu_f_item"><a className="menu_f_link" href="/about">About</a></li>
                <li className="menu_f_item"><a className="menu_f_link" href="/contact">Contact</a></li>
            </div>
            <p>&copy;2024 Axel Battigelli | Tout droits réservés</p>
        </footer>
    );
};

export default Footer;

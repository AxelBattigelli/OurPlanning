// App.js

import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import AdminPage from './AdminPage';
import Header from './Header';
import CheaterFooter from './CheaterFooter'
import Footer from './Footer';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import Deconnect from './Deconnect';
import DashboardPage from './DashboardPage';
import ContactPage from './ContactPage';
import MyWeekPage from './MyWeekPage';
import RecapPage from './RecapPage';
import ProfilPage from './ProfilPage';
import Error from './error';
// Import other pages here

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/deconnect" element={<Deconnect />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/myweek" element={<MyWeekPage />} />
        <Route path="/recap" element={<RecapPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="*" element={<Error />} />
        {/* Add other routes for your pages here */}
      </Routes>
      <CheaterFooter />
      <Footer />
    </div>
  );
};

export default App;

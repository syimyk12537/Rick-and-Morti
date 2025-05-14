import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/main.css';

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <Header scrolled={scrolled} />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
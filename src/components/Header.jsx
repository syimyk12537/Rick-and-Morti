import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import img1 from '../assets/logo-black 1.png'

const Header = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={img1}></img></Link>
        </div>
        
        <button className="burger-menu" onClick={toggleMenu}>
          ☰
        </button>
        
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/characters" onClick={() => setMenuOpen(false)} >Characters</Link>
            </li>
            <li>
              <Link to="/locations" onClick={() => setMenuOpen(false)}>Locations</Link>
            </li>
            <li>
              <Link to="/episodes" onClick={() => setMenuOpen(false)}>Episodes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
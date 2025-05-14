import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Home = () => {
  return (
    <div className="page-container home-page">
      <h1>Добро пожаловать в Rick and Morty</h1>
      <div className="home-links">
        <Link to="/characters" className="home-link">
          <h2>Персонажи</h2>
          <p>Просмотр всех персонажей</p>
        </Link>
        <Link to="/locations" className="home-link">
          <h2>Локации</h2>
          <p>Все локации</p>
        </Link>
        <Link to="/episodes" className="home-link">
          <h2>Эпизоды</h2>
          <p>Все эпизоды</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
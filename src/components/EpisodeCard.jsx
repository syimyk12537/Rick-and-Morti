import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const EpisodeCard = ({ episode }) => {
  return (
    <div className="card episode-card">
      <Link to={`/episodes/${episode.id}`}>
        <div className="card-content">
          <h3>{episode.name}</h3>
          <p><strong>Эпизод:</strong> {episode.episode}</p>
          <p><strong>Дата выхода:</strong> {episode.air_date}</p>
        </div>
      </Link>
    </div>
  );
};

export default EpisodeCard;
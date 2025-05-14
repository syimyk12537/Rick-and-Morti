import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const CharacterCard = ({ character }) => {
  return (
    <div className="card character-card">
      <Link to={`/characters/${character.id}`}>
        <img src={character.image} alt={character.name} />
        <div className="card-content">
          <h3>{character.name}</h3>
          
          <div className={`status ${character.status.toLowerCase()}`}>
            <span className="status-icon"></span>
            {character.status} - {character.species}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;
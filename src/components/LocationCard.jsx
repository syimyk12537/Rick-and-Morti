import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const LocationCard = ({ location }) => {
  return (
    <div className="card location-card">
      <Link to={`/locations/${location.id}`}>
        <div className="card-content">
          <h3>{location.name}</h3>
          <p><strong>Тип:</strong> {location.type}</p>
          <p><strong>Измерение:</strong> {location.dimension}</p>
        </div>
      </Link>
    </div>
  );
};

export default LocationCard;
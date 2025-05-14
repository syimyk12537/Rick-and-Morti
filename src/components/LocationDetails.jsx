import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/main.css';

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const locationResponse = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
        setLocation(locationResponse.data);
        
        
        if (locationResponse.data.residents.length > 0) {
          const residentsData = await Promise.all(
            locationResponse.data.residents.map(url => axios.get(url))
          );
          setResidents(residentsData.map(res => res.data));
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!location) return <div>Location not found</div>;

  return (
    <div className="location-details-container">
      <h1 className="location-title">{location.name}</h1>
      
      <div className="location-info">
        <div className="info-row">
          <span className="info-label">Type</span>
          <span className="info-value">{location.type}</span>

          <span className="info-label">Dimension</span>
          <span className="info-value">{location.dimension}</span>
        </div>
        
        
      </div>
      
      <div className="residents-section">
        <h2>Residents ({residents.length})</h2>
        {residents.length > 0 ? (
          <div className="residents-grid">
            {residents.map(resident => (
              <div key={resident.id} className="resident-card">
                <Link to={`/characters/${resident.id}`} className="resident-link">
                  <div className="resident-image-container">
                    <img 
                      src={resident.image} 
                      alt={resident.name}
                      className="resident-image"
                    />
                  </div>
                  <div className="resident-info">
                    <h3 className="resident-name">{resident.name}</h3>
                    <div className={`resident-status ${resident.status.toLowerCase()}`}>
                      <span className="status-icon"></span>
                      {resident.status} - {resident.species}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-residents">No residents found</p>
        )}
      </div>
    </div>
  );
};

export default LocationDetails;
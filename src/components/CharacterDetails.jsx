import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../components/Skeleton';
import Loader from './Loader';
import '../styles/main.css';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData  = async () => {
      try {
      
        const charResponse = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(charResponse.data);
        
       
        if (charResponse.data.episode.length > 0) {
          const episodesData = await Promise.all(
            charResponse.data.episode.slice(0, 4).map(url => axios.get(url))
          );
          setEpisodes(episodesData.map(res => res.data));
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
  if (!character) return <div>Character not found</div>;

  return (
    <div className="character-details-container">
      <div className="character-header">
        <center><img src={character.image} alt={character.name} className="character-image" /></center>
        
        <center><h1 className="character-name">{character.name}</h1></center>
        
      </div>
      
      <div className="details-sections">
        <section className="info-section">
          <h2>Informations</h2>
          <div className="info-grid">
            <div className="info-label">Gender</div>
            <div className="info-value">{character.gender}</div>
            
            <div className="info-label">Specie</div>
            <div className="info-value">{character.species}</div>
            
            <div className="info-label">Type</div>
            <div className="info-value">{character.type || "Unknown"}</div>
            
            <div className="info-label">Origin</div>
            <div className="info-value">
              <Link to={`/locations?name=${encodeURIComponent(character.origin.name)}`}>
                {character.origin.name}
              </Link>
            </div>
            
            <div className="info-label">Location</div>
            <div className="info-value">
              <Link to={`/locations?name=${encodeURIComponent(character.location.name)}`}>
                {character.location.name}
              </Link>
            </div>
          </div>
        </section>

        <section className="episodes-section">
          <h2>Episodes</h2>
          <div className="episodes-list">
            {episodes.map(episode => (
              <div key={episode.id} className="episode-item">
                <Link to={`/episodes/${episode.id}`} className="episode-link">
                  <h3>{episode.episode}</h3>
                  <p className="episode-name">{episode.name}</p>
                  <p className="episode-date">{new Date(episode.air_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }).toUpperCase()}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CharacterDetails;
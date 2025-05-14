import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/main.css';

const EpisodeDetails = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        setEpisode(episodeResponse.data);
        
        if (episodeResponse.data.characters.length > 0) {
          const charactersData = await Promise.all(
            episodeResponse.data.characters.map(url => axios.get(url))
          );
          setCharacters(charactersData.map(res => res.data));
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
  if (!episode) return <div>Episode not found</div>;

  const formattedDate = new Date(episode.air_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="episode-details-container">
      <div className="episode-header">
        <h1 className="episode-name">{episode.name}</h1>
      </div>
      
      <div className="episode-info">
        <div className="info-row">
          <span className="info-label">Episode</span>
          <span className="info-value">{episode.episode}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Date</span>
          <span className="info-value">{formattedDate}</span>
        </div>
      </div>
      
      <div className="cast-section">
        <h2>Cast ({characters.length})</h2>
        {characters.length > 0 ? (
          <div className="cast-grid">
            {characters.map(character => (
              <div key={character.id} className="character-card">
                <Link to={`/characters/${character.id}`} className="character-link">
                  <div className="character-image-container">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="character-image1"
                    />
                  </div>
                  <div className="character-info">
                    <h3 className="character-name">{character.name}</h3>
                    <div className={`character-status ${character.status.toLowerCase()}`}>
                      <span className="status-icon"></span>
                      {character.status} - {character.species}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-cast">No cast information available</p>
        )}
      </div>
    </div>
  );
};

export default EpisodeDetails;
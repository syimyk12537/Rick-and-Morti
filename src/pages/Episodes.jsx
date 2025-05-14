import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EpisodeCard from '../components/EpisodeCard.jsx';
import Filter from '../components/Filter.jsx';
import Pagination from '../components/Pagination.jsx';
import '../styles/main.css';
import img3 from '../assets/rick-and-morty2 1.png'


const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    name: '',
    episode: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEpisodes = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }
      
      params.append('page', page);
      
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?${params.toString()}`);
      setEpisodes(response.data.results);
      setInfo(response.data.info);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setEpisodes([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes(currentPage, filters);
  }, [currentPage, filters]);

  const handlePageChange = (url) => {
    if (!url) return;
    const page = new URL(url).searchParams.get('page');
    setCurrentPage(parseInt(page));
  };

  return (
    <div className="page-container">
      <center><img src={img3}></img></center>
      
      <Filter type="episode" filters={filters} setFilters={setFilters} />
      
      {loading && <div className="loading">Загрузка...</div>}
      {error && <div className="error">Ошибка: {error}</div>}
      
      <div className="cards-grid">
        {episodes.map(episode => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
      
      <Pagination 
        info={info} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default Episodes;
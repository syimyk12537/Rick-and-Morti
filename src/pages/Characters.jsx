import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img2 from '../assets/PngItem_438051 1.png'
import CharacterCard from '../components/CharacterCard';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import Skeleton from '../components/Skeleton';

import '../styles/main.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCharacters = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }
      
      params.append('page', page);
      
      const response = await axios.get(`https://rickandmortyapi.com/api/character?${params.toString()}`);
      setCharacters(response.data.results);
      setInfo(response.data.info);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setCharacters([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage, filters);
  }, [currentPage, filters]);

  const handlePageChange = (url) => {
    if (!url) return;
    const page = new URL(url).searchParams.get('page');
    setCurrentPage(parseInt(page));
  };
  const skeletonCards = Array(8).fill(0);

    return (
    <div className="page-container">
      <center><img className='img' src={img2}></img></center>
      
      
      
      <Filter type="character" filters={filters} setFilters={setFilters} />
      
      {error ? (
        <div className="error">Ошибка: {error}</div>
      ) : (
        <>
          <div className="cards-grid">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <Skeleton key={i} type="card" />
              ))
            ) : (
              characters.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))
            )}
          </div>
          
          {!loading && (
            <Pagination 
              info={info} 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default Characters;
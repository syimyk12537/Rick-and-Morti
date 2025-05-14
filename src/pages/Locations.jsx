import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationCard from '../components/LocationCard';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import '../styles/main.css';
import img4 from '../assets/rick-and-morty 1.png'

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    dimension: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLocations = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }
      
      params.append('page', page);
      
      const response = await axios.get(`https://rickandmortyapi.com/api/location?${params.toString()}`);
      setLocations(response.data.results);
      setInfo(response.data.info);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLocations([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(currentPage, filters);
  }, [currentPage, filters]);

  const handlePageChange = (url) => {
    if (!url) return;
    const page = new URL(url).searchParams.get('page');
    setCurrentPage(parseInt(page));
  };

  return (
    <div className="page-container">
      <center><img src={img4}></img></center>
      
      <Filter className='filter1' type="location" filters={filters} setFilters={setFilters} />
      
      {loading && <div className="loading">Загрузка...</div>}
      {error && <div className="error">Ошибка: {error}</div>}
      
      <div className="cards-grid">
        {locations.map(location => (
          <LocationCard key={location.id} location={location} />
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

export default Locations;
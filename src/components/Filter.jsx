import React from 'react';
import '../styles/main.css';

const Filter = ({ type, filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

 

  return (
    <div className="filter-container">
      <input
      className='ber'
        type="text"
        name="name"
        placeholder="     Filter by name..."
        value={filters.name}
        onChange={handleChange}
      />
      
      
      {type === 'character' && (
        <>
          <select className='ber1' name="status" value={filters.status} onChange={handleChange}>
            <option value="">All Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          
          <select className='ber2' name="species" value={filters.species} onChange={handleChange}>
            <option value="">All Species</option>
            <option value="human">Human</option>
            <option value="alien">Alien</option>
            <option value="humanoid">Humanoid</option>
            <option value="robot">Robot</option>
          </select>
          
          <select className='ber3' name="gender" value={filters.gender} onChange={handleChange}>
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </>
      )}
      
      
      
    </div>
  );
};

export default Filter;
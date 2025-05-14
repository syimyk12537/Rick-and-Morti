import React from 'react';
import '../styles/main.css';

const Pagination = ({ info, currentPage, onPageChange }) => {
  const { pages, prev, next } = info || {};
  
  if (!pages || pages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(prev)} 
        disabled={!prev}
      >
        Previous
      </button>
      
      <span>Page {currentPage} of {pages}</span>
      
      <button 
        onClick={() => onPageChange(next)} 
        disabled={!next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
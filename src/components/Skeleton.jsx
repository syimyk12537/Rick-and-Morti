import React from 'react';
import '../styles/main.css';

const Skeleton = ({ type = 'card' }) => {
  return (
    <div className={`skeleton ${type}`}>
      {type === 'card' && (
        <>
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-status"></div>
          </div>
        </>
      )}
      {type === 'details' && (
        <div className="skeleton-details">
          <div className="skeleton-details-image"></div>
          <div className="skeleton-details-content">
            <div className="skeleton-details-title"></div>
            <div className="skeleton-details-text"></div>
            <div className="skeleton-details-section">
              <div className="skeleton-details-subtitle"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-details-text"></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skeleton;
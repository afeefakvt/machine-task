import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ total, itemsPerPage, currentPage, onPageChange }) => {
  const pages = Math.ceil(total / itemsPerPage);

  return (
    <div className="pagination">
      {/* Previous arrow */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={currentPage === i + 1 ? 'active' : ''}
        >
          {i + 1}
        </button>
      ))}

      {/* Next arrow */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pages}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;

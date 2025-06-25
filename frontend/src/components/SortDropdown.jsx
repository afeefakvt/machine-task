import React from 'react';
import '../styles/SortDropdown.css';
import { FaTh, FaSlidersH } from 'react-icons/fa';

const SortDropdown = ({ onSortChange }) => {
  return (
    <div className="sort-bar">
      <div className="view-icons">
        <FaTh />
        <FaSlidersH />
      </div>
       <div className="sort-dropdown">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          onChange={(e) => onSortChange(e.target.value)}
          defaultValue=""
        >
          <option value="">Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;

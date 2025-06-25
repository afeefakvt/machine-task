import React, { useState, useEffect } from "react";
import "../styles/FilterSidebar.css";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft, FaSlidersH, FaTh } from "react-icons/fa";
import { getAllCategories } from "../api/productApi";

const FilterSidebar = ({ onCategoryChange, onPriceChange }) => {
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState({ min: 0, max: 5000 });
  const [isOpen, setIsOpen] = useState(false);
  const ratings = [5, 4, 3, 2];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories(); // Adjust to your actual endpoint
        setCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handlePriceChange = (value, type) => {
    const num = Number(value);
    let updated = { ...price, [type]: num };

    if (updated.min > updated.max) {
      if (type === "min") updated.max = num;
      else updated.min = num;
    }

    setPrice(updated);
    onPriceChange(updated); //notify parent
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="mobile-filter-toggle">
        <FaChevronLeft
          className="toggle-arrow"
          onClick={() => setIsOpen(!isOpen)}
        />
        {/* <FaTh className="view-icon" />
        <FaSlidersH className="sort-icon" />
        <span className="sort-text">Sort by: <strong>Popular</strong></span> */}
      </div>
  {isOpen && <div className="filter-backdrop" onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar */}
      <div className={`filter-sidebar-wrapper ${isOpen ? "open" : ""}`}>
        <div className="filter-sidebar">
          <div className="header">
            <h4>Filter</h4>
            <span>Advanced</span>
          </div>

          {/* Category Section */}
          <div className="filter-section">
            <div className="filter-title">Category</div>
            <input
              className="search-input"
              type="text"
              placeholder="🔍 Search brand..."
            />
            <select
              className="category-dropdown"
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Section */}
          <div className="filter-section">
            <div className="filter-title">Price</div>
            <div className="price-chart">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bar"
                  style={{ height: `${Math.random() * 40 + 10}px` }}
                />
              ))}
            </div>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="5000"
                value={price.min}
                onChange={(e) => handlePriceChange(e.target.value, "min")}
              />

              <input
                type="range"
                min="0"
                max="5000"
                value={price.max}
                onChange={(e) => handlePriceChange(e.target.value, "max")}
              />
            </div>
            <div className="price-values">
              <div>
                {price.min.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <div>
                {price.max.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="filter-section">
            <div className="filter-title">Rating</div>
            <div className="ratings">
              {ratings.map((stars, i) => (
                <div key={i} className="star-row">
                  {[...Array(5)].map((_, j) => (
                    <FaStar
                      key={j}
                      color={j < stars ? "#facc15" : "#e5e7eb"}
                      size={18}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

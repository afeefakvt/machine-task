import React, { useState, useEffect, useContext } from "react";
import "../styles/Navbar.css";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { searchQuery, setSearchQuery } = useContext(SearchContext); 
  const { isLoggedIn } = useContext(AuthContext);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          {/* <img src="/logo.svg" alt="Logo" /> */}
          <span>Logo Here</span>
        </div>
        {!isMobile && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />{" "}
          </div>
        )}
      </div>

      <div className="navbar-right">
        {!isMobile ? (
          <ul className="nav-links">
            <li>
              {isLoggedIn ? (
                <>
                  Zoffi <span>▼</span>
                </>
              ) : (
                <Link to="/login" className="nav-login-link">
                  Login
                </Link>
              )}
            </li>
            <li>Become a Seller</li>
            <li>
              More <span>▼</span>
            </li>
            <li>
              <strong>Cart</strong>
            </li>
          </ul>
        ) : (
          <div className="icon-buttons">
            <FaSearch className="nav-icon" />
            <FaUser className="nav-icon" />
            <FaShoppingCart className="nav-icon" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components-css/NavigationHeader.css';

const NavigationHeader = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const cartItemCount = props.cart.length
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(searchTerm)
  } 

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }
  return (
    <div className="store-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <h1>Cool Clothes</h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products/1">All Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>

          </ul>
        </nav>
        
        {/* Header Actions */}
        <div className="header-actions">
          {/* Search Bar */}
          <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
            <button 
              className="search-toggle" 
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              {isSearchOpen ? '✕' : '🔍'}
            </button>
            {isSearchOpen && (
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  aria-label="Search products"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  onKeyDown={(event) => {if(event.key === "Enter") handleSubmit(event);}}
                />
                <button type="submit" aria-label="Submit search" onClick={handleSubmit}>Search</button>
              </div>
            )}
          </div>
          
          {/* Shopping Cart */}
          <Link to="/cart" className="cart-link" aria-label="Shopping Cart">
            🛒
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/products/1" onClick={toggleMenu}>All Products</Link></li>
            <li><Link to="/categories" onClick={toggleMenu}>Categories</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavigationHeader;
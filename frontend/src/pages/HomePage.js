import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to HotelBook</h1>
          <p>Find and book your perfect hotel stay</p>
        </div>
      </div>

      <div className="search-section">
        <SearchBar />
      </div>

      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔒 Secure Booking</h3>
            <p>Your bookings are secure and encrypted</p>
          </div>
          <div className="feature-card">
            <h3>💰 Best Prices</h3>
            <p>Get the best rates on hotel stays</p>
          </div>
          <div className="feature-card">
            <h3>⭐ Quality Hotels</h3>
            <p>Choose from premium hotels worldwide</p>
          </div>
          <div className="feature-card">
            <h3>📱 Easy Booking</h3>
            <p>Simple and fast booking process</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start?</h2>
        <p>Sign up today and get exclusive deals on your first booking</p>
        <Link to="/register" className="cta-btn">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

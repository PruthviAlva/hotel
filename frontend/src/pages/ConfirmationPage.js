import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ConfirmationPage.css';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!booking) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate('/bookings');
    }

    return () => clearInterval(timer);
  }, [countdown, booking, navigate]);

  if (!booking) {
    return null;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your hotel booking has been successfully confirmed</p>
        </div>

        <div className="confirmation-details">
          <div className="detail-section">
            <h3>Booking Reference</h3>
            <p className="booking-id">{booking._id}</p>
          </div>

          <div className="detail-section">
            <h3>Hotel Details</h3>
            <p><strong>Hotel:</strong> {booking.hotelId?.name || 'Hotel'}</p>
            <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ₹{booking.totalPrice}</p>
          </div>

          <div className="detail-section">
            <h3>Confirmation Email</h3>
            <p>A confirmation email has been sent to {booking.guestDetails?.email}</p>
          </div>

          <div className="detail-section">
            <h3>What's Next?</h3>
            <ul>
              <li>Check your email for booking confirmation and hotel details</li>
              <li>Review your booking in "My Bookings"</li>
              <li>Contact the hotel directly if you have any questions</li>
              <li>Have your booking reference ready when you check in</li>
            </ul>
          </div>
        </div>

        <div className="confirmation-actions">
          <button onClick={() => navigate('/')} className="home-btn">
            Back to Home
          </button>
          <button onClick={() => navigate('/bookings')} className="bookings-btn">
            View My Bookings
          </button>
        </div>

        <div className="auto-redirect">
          <p>Redirecting to bookings in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

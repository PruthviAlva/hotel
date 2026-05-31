import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../services/api';
import '../styles/BookingsPage.css';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getUserBookings();
      setBookings(response.data.bookings || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(bookingId);
        alert('Booking cancelled successfully');
        fetchBookings();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  if (loading) return <div className="loading-container">Loading bookings...</div>;

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>

      {error && <div className="error-message">{error}</div>}

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet</p>
          <button onClick={() => navigate('/')} className="search-btn">
            Search Hotels
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.hotelId?.name}</h3>
                <span className={`status ${booking.bookingStatus}`}>
                  {booking.bookingStatus.toUpperCase()}
                </span>
              </div>

              <div className="booking-details">
                <div className="detail">
                  <label>Check-in:</label>
                  <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
                </div>
                <div className="detail">
                  <label>Check-out:</label>
                  <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                </div>
                <div className="detail">
                  <label>Nights:</label>
                  <span>{booking.numberOfNights}</span>
                </div>
                <div className="detail">
                  <label>Guests:</label>
                  <span>{booking.numberOfGuests}</span>
                </div>
                <div className="detail">
                  <label>Total Amount:</label>
                  <span className="amount">₹{booking.totalPrice}</span>
                </div>
              </div>

              <div className="booking-footer">
                <span className={`payment-status ${booking.paymentStatus}`}>
                  Payment: {booking.paymentStatus.toUpperCase()}
                </span>
                <div className="booking-actions">
                  <button
                    onClick={() => navigate(`/bookings/${booking._id}`)}
                    className="view-details-btn"
                  >
                    View Details
                  </button>
                  {booking.bookingStatus !== 'cancelled' && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;

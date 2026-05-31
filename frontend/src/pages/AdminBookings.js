import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminBookingsPage.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getAllBookings();
      setBookings(response.data.bookings || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await bookingService.updateBookingStatus(bookingId, { bookingStatus: status });
      alert('Booking status updated');
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update booking');
    }
  };

  if (!isAdmin) {
    return <div className="error-container">Access Denied</div>;
  }

  if (loading) return <div className="loading-container">Loading bookings...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="admin-bookings-page">
      <h1>All Bookings</h1>

      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Guest</th>
              <th>Hotel</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="booking-id">{booking._id.slice(-8)}</td>
                <td>{booking.userId?.firstName} {booking.userId?.lastName}</td>
                <td>{booking.hotelId?.name}</td>
                <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td className="amount">₹{booking.totalPrice}</td>
                <td>
                  <select
                    value={booking.bookingStatus}
                    onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <span className={`payment-badge ${booking.paymentStatus}`}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td>
                  <button onClick={() => alert(JSON.stringify(booking, null, 2))} className="details-btn">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;

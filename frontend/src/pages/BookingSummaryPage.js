import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService, paymentService } from '../services/api';
import { useBooking } from '../context/BookingContext';
import '../styles/BookingSummaryPage.css';

const BookingSummaryPage = () => {
  const navigate = useNavigate();
  const { selectedRooms, selectedHotel, guestDetails, searchParams, clearBooking, setBookingSummary } = useBooking();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  // Calculate nights
  const checkIn = new Date(searchParams.checkInDate);
  const checkOut = new Date(searchParams.checkOutDate);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  // Calculate total price
  const totalPrice = selectedRooms.reduce((sum, room) => sum + room.price * nights * room.quantity, 0);

  if (!selectedHotel || !guestDetails || selectedRooms.length === 0) {
    return <div className="error-container">Invalid booking state. Please start over.</div>;
  }

  const handleBooking = async () => {
    try {
      setLoading(true);
      setError('');

      // Create booking
      const bookingRes = await bookingService.createBooking({
        hotelId: selectedHotel._id,
        rooms: selectedRooms.map((r) => ({ roomId: r._id, quantity: r.quantity })),
        checkInDate: searchParams.checkInDate,
        checkOutDate: searchParams.checkOutDate,
        numberOfGuests: searchParams.guests,
        guestDetails,
        specialRequests: guestDetails.specialRequests,
      });

      const booking = bookingRes.data.booking;

      // Create payment
      const paymentRes = await paymentService.createPayment({
        bookingId: booking._id,
        paymentMethod,
        cardDetails: {
          cardHolder: `${guestDetails.firstName} ${guestDetails.lastName}`,
          lastFourDigits: '****',
        },
      });

      // Verify payment (mock)
      await paymentService.verifyPayment(paymentRes.data.payment._id, { status: 'completed' });

      setBookingSummary(booking);
      navigate('/booking/confirmation', { state: { booking } });
      clearBooking();
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-summary-page">
      <h1>Booking Summary</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="summary-container">
        <div className="summary-section">
          <h3>Hotel Information</h3>
          <div className="summary-item">
            <label>Hotel Name:</label>
            <span>{selectedHotel.name}</span>
          </div>
          <div className="summary-item">
            <label>Location:</label>
            <span>{selectedHotel.city}, {selectedHotel.state}</span>
          </div>
        </div>

        <div className="summary-section">
          <h3>Booking Dates</h3>
          <div className="summary-item">
            <label>Check-in:</label>
            <span>{new Date(searchParams.checkInDate).toLocaleDateString()}</span>
          </div>
          <div className="summary-item">
            <label>Check-out:</label>
            <span>{new Date(searchParams.checkOutDate).toLocaleDateString()}</span>
          </div>
          <div className="summary-item">
            <label>Total Nights:</label>
            <span>{nights}</span>
          </div>
          <div className="summary-item">
            <label>Guests:</label>
            <span>{searchParams.guests}</span>
          </div>
        </div>

        <div className="summary-section">
          <h3>Rooms Selected</h3>
          {selectedRooms.map((room) => (
            <div key={room._id} className="room-summary">
              <p>
                <strong>Room {room.roomNumber}</strong> ({room.roomType}) - Quantity: {room.quantity}
              </p>
              <p>₹{room.price}/night × {nights} nights × {room.quantity} = ₹{room.price * nights * room.quantity}</p>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <h3>Guest Information</h3>
          <div className="summary-item">
            <label>Name:</label>
            <span>{guestDetails.firstName} {guestDetails.lastName}</span>
          </div>
          <div className="summary-item">
            <label>Email:</label>
            <span>{guestDetails.email}</span>
          </div>
          <div className="summary-item">
            <label>Phone:</label>
            <span>{guestDetails.phone}</span>
          </div>
          <div className="summary-item">
            <label>Address:</label>
            <span>{guestDetails.address}, {guestDetails.city}</span>
          </div>
        </div>

        <div className="summary-section">
          <h3>Payment Information</h3>
          <div className="form-group">
            <label>Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="net_banking">Net Banking</option>
              <option value="upi">UPI</option>
              <option value="wallet">Digital Wallet</option>
            </select>
          </div>
        </div>

        <div className="summary-section total-section">
          <div className="total-item">
            <strong>Subtotal:</strong>
            <span>₹{totalPrice}</span>
          </div>
          <div className="total-item">
            <strong>Taxes & Fees:</strong>
            <span>₹{Math.round(totalPrice * 0.1)}</span>
          </div>
          <div className="total-item total-price">
            <strong>Total Amount:</strong>
            <span>₹{totalPrice + Math.round(totalPrice * 0.1)}</span>
          </div>
        </div>

        <div className="summary-actions">
          <button onClick={() => navigate(-1)} className="back-btn" disabled={loading}>
            ← Back
          </button>
          <button onClick={handleBooking} className="book-btn" disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${totalPrice + Math.round(totalPrice * 0.1)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryPage;

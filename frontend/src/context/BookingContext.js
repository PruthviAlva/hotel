import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [guestDetails, setGuestDetails] = useState({});
  const [bookingSummary, setBookingSummary] = useState(null);

  const updateSearchParams = (params) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  const addRoom = (room) => {
    setSelectedRooms((prev) => [...prev, { ...room, quantity: 1 }]);
  };

  const removeRoom = (roomId) => {
    setSelectedRooms((prev) => prev.filter((r) => r._id !== roomId));
  };

  const updateRoomQuantity = (roomId, quantity) => {
    setSelectedRooms((prev) =>
      prev.map((r) => (r._id === roomId ? { ...r, quantity } : r))
    );
  };

  const clearBooking = () => {
    setSelectedHotel(null);
    setSelectedRooms([]);
    setGuestDetails({});
    setBookingSummary(null);
  };

  const value = {
    searchParams,
    updateSearchParams,
    selectedHotel,
    setSelectedHotel,
    selectedRooms,
    addRoom,
    removeRoom,
    updateRoomQuantity,
    guestDetails,
    setGuestDetails,
    bookingSummary,
    setBookingSummary,
    clearBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

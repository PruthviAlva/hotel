import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Hotel Services
export const hotelService = {
  getAllHotels: () => api.get('/hotels'),
  getHotel: (id) => api.get(`/hotels/${id}`),
  searchHotels: (params) => api.get('/hotels/search', { params }),
  createHotel: (data) => api.post('/hotels', data),
  updateHotel: (id, data) => api.put(`/hotels/${id}`, data),
  deleteHotel: (id) => api.delete(`/hotels/${id}`),
};

// Room Services
export const roomService = {
  getAllRooms: () => api.get('/rooms'),
  getRoom: (id) => api.get(`/rooms/${id}`),
  getRoomsByHotel: (hotelId) => api.get(`/rooms/hotel/${hotelId}`),
  createRoom: (data) => api.post('/rooms', data),
  updateRoom: (id, data) => api.put(`/rooms/${id}`, data),
  updateAvailability: (id, data) => api.patch(`/rooms/${id}/availability`, data),
  deleteRoom: (id) => api.delete(`/rooms/${id}`),
};

// Booking Services
export const bookingService = {
  createBooking: (data) => api.post('/bookings', data),
  getUserBookings: () => api.get('/bookings'),
  getBooking: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
  getAllBookings: () => api.get('/bookings/admin/all'),
  updateBookingStatus: (id, data) => api.patch(`/bookings/admin/${id}`, data),
};

// Payment Services
export const paymentService = {
  createPayment: (data) => api.post('/payment/create', data),
  verifyPayment: (paymentId, data) => api.post(`/payment/verify/${paymentId}`, data),
  getPayment: (id) => api.get(`/payment/${id}`),
};

// Dashboard Services
export const dashboardService = {
  getDashboardStats: () => api.get('/dashboard/stats'),
  getRevenueAnalytics: () => api.get('/dashboard/revenue'),
  getBookingAnalytics: () => api.get('/dashboard/bookings'),
};

export default api;

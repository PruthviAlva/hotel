import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HotelsPage from './pages/HotelsPage';
import RoomsPage from './pages/RoomsPage';
import GuestDetailsPage from './pages/GuestDetailsPage';
import BookingSummaryPage from './pages/BookingSummaryPage';
import ConfirmationPage from './pages/ConfirmationPage';
import BookingsPage from './pages/BookingsPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminHotels from './pages/AdminHotels';
import AdminRooms from './pages/AdminRooms';
import AdminBookings from './pages/AdminBookings';

import './styles/Navigation.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <div className="App">
            <Navigation />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/hotel/:hotelId/rooms" element={<RoomsPage />} />

              {/* Protected User Routes */}
              <Route
                path="/booking/guest-details"
                element={
                  <ProtectedRoute>
                    <GuestDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking/summary"
                element={
                  <ProtectedRoute>
                    <BookingSummaryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking/confirmation"
                element={
                  <ProtectedRoute>
                    <ConfirmationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingsPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/hotels"
                element={
                  <AdminRoute>
                    <AdminHotels />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/rooms"
                element={
                  <AdminRoute>
                    <AdminRooms />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <AdminRoute>
                    <AdminBookings />
                  </AdminRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

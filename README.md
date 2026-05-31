# Hotel Booking Application

A full-stack hotel booking application built with React, Express, and MongoDB.

## Project Overview

HotelBook is a comprehensive hotel booking platform that allows users to search for hotels, view available rooms, make bookings with guest details, and complete mock payments. Admin users can manage hotels, rooms, and view booking analytics.

## Tech Stack

- **Frontend**: React 18, React Router, Axios, Date-fns
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS3 (Responsive Design)

## Features

### User Features
- User Registration and Login with JWT Authentication
- Search hotels by city and dates
- View hotel details and available rooms
- Select rooms and proceed to booking
- Enter guest details
- Review booking summary
- Mock payment processing
- View booking history
- Cancel bookings

### Admin Features
- Admin Dashboard with analytics
- Manage Hotels (Create, Read, Update, Delete)
- Manage Rooms (Create, Read, Update, Delete, Update Availability)
- View all customers
- View all bookings
- Update booking status
- Revenue analytics
- Booking analytics

### UI Features
- Responsive design for desktop and mobile
- Modern gradient design
- Smooth animations and transitions
- Intuitive user flow
- Real-time validation

## Project Structure

```
hotel/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Hotel.js
│   │   ├── Room.js
│   │   ├── Booking.js
│   │   └── Payment.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── hotelController.js
│   │   ├── roomController.js
│   │   ├── bookingController.js
│   │   ├── paymentController.js
│   │   └── dashboardController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── hotels.js
│   │   ├── rooms.js
│   │   ├── bookings.js
│   │   ├── payments.js
│   │   └── dashboard.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   ├── SearchBar.js
│   │   │   ├── HotelCard.js
│   │   │   ├── RoomCard.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── HotelsPage.js
│   │   │   ├── RoomsPage.js
│   │   │   ├── GuestDetailsPage.js
│   │   │   ├── BookingSummaryPage.js
│   │   │   ├── ConfirmationPage.js
│   │   │   ├── BookingsPage.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── BookingContext.js
│   │   ├── styles/
│   │   │   ├── Navigation.css
│   │   │   ├── SearchBar.css
│   │   │   ├── HomePage.css
│   │   │   ├── AuthPages.css
│   │   │   ├── HotelCard.css
│   │   │   ├── RoomCard.css
│   │   │   ├── HotelsPage.css
│   │   │   ├── RoomsPage.css
│   │   │   ├── GuestDetailsPage.css
│   │   │   ├── BookingSummaryPage.css
│   │   │   ├── ConfirmationPage.css
│   │   │   ├── BookingsPage.css
│   │   │   ├── AdminDashboard.css
│   │   │   └── ProtectedRoute.css
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

## Setup Steps

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/hotel-booking
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

5. Make sure MongoDB is running locally or update the connection string

6. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` if needed (default is http://localhost:5000):
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

5. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Reference

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user and receive JWT token
- `GET /auth/profile` - Get user profile (requires auth)

### Hotels
- `GET /hotels` - Fetch all hotels
- `GET /hotels/:id` - Fetch specific hotel
- `GET /hotels/search` - Search hotels by city
- `POST /hotels` - Create hotel (admin only)
- `PUT /hotels/:id` - Update hotel (admin only)
- `DELETE /hotels/:id` - Delete hotel (admin only)

### Rooms
- `GET /rooms` - Fetch all rooms
- `GET /rooms/:id` - Fetch specific room
- `GET /rooms/hotel/:hotelId` - Fetch rooms by hotel
- `POST /rooms` - Create room (admin only)
- `PUT /rooms/:id` - Update room (admin only)
- `PATCH /rooms/:id/availability` - Update room availability (admin only)
- `DELETE /rooms/:id` - Delete room (admin only)

### Bookings
- `POST /bookings` - Create booking (user auth required)
- `GET /bookings` - Get user's bookings (user auth required)
- `GET /bookings/:id` - Get specific booking (user auth required)
- `DELETE /bookings/:id` - Cancel booking (user auth required)
- `GET /bookings/admin/all` - Get all bookings (admin only)
- `PATCH /bookings/admin/:id` - Update booking status (admin only)

### Payments
- `POST /payment/create` - Create payment (user auth required)
- `POST /payment/verify/:paymentId` - Verify payment (user auth required)
- `GET /payment/:id` - Get payment details (user auth required)

### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics (admin only)
- `GET /dashboard/revenue` - Get revenue analytics (admin only)
- `GET /dashboard/bookings` - Get booking analytics (admin only)

## Assumptions Made

1. **Mock Payment System**: The payment system is a mock implementation that simulates payment processing without connecting to a real payment gateway.

2. **JWT Authentication**: JWT tokens are used for authentication and stored in browser's localStorage.

3. **Single Admin Role**: There is one admin role type; in production, this could be expanded with more granular permissions.

4. **Booking Flow**: Users must be logged in to complete bookings; guest checkout is not supported.

5. **Guest Details**: Guest details are captured per booking and not tied to user profile.

6. **Room Quantity**: Users can book multiple rooms of the same type; the room selection allows quantity specification.

7. **Date Validation**: Check-out date must be after check-in date; same-day bookings are not allowed.

8. **No Email Verification**: Email is captured but not verified in this version.

9. **Hotel Images**: Hotel and room images use placeholder URLs and should be replaced with actual image URLs.

10. **Refunds**: Cancelled bookings result in refund; in production, this would involve actual payment processing.

11. **No Intermediate Database**: Booking data is persistent in MongoDB; no session storage is used for incomplete bookings.

12. **Admin Creation**: Admin users must be created manually in the database or via registration with role modification.

## How to Use

### For Users:
1. Visit the homepage
2. Search for hotels by city and dates
3. View available hotels
4. Select a hotel and view available rooms
5. Select desired rooms
6. Create an account or login
7. Enter guest details
8. Review booking summary
9. Complete mock payment
10. View confirmation and booking details

### For Admins:
1. Login with admin account
2. Access admin dashboard
3. Manage hotels: Add, edit, or delete hotels
4. Manage rooms: Add, edit, or delete rooms
5. View bookings and manage booking status
6. View analytics and revenue reports

## Running Both Servers

For development, you'll need to run both servers in separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Notes for Development

- The application uses CORS enabled by default for localhost development
- MongoDB must be running on the default port (27017) or update the connection string
- Admin users can be created by modifying the role field in the User model during registration
- Mock payment always succeeds in this implementation; in production, integrate with real payment gateway

## Future Enhancements

- Real payment gateway integration (Stripe, Razorpay)
- Email notifications for bookings
- Room image uploads
- Reviews and ratings system
- Promo codes and discounts
- Multiple admin roles and permissions
- Real-time room availability
- Cancellation policies
- Email verification
- Two-factor authentication

## License

MIT

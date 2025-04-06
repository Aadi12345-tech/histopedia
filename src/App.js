import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import SignUp from './pages/SignUp';
import City from './pages/City';
import Monument from './pages/Monument';
import Artifacts from './pages/Artifacts';
import Geotagging from './pages/Geotagging';
import Excavations from './pages/Excavations';
import Events from './pages/Events';
import Guides from './pages/Guides';
import TourServices from './pages/TourServices';
import BookTicket from './pages/BookTicket';
import ImageDebugger from './components/ImageDebugger';
import GuideBooking from './pages/GuideBooking';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import './styles/DarkTheme.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/city/:cityName" element={<City />} />
                <Route path="/monument/:monumentId" element={<Monument />} />
                <Route path="/monument/:monumentId/artifacts" element={<Artifacts />} />
                <Route path="/monument/:monumentId/geotagging" element={<Geotagging />} />
                <Route path="/monument/:monumentId/excavations" element={<Excavations />} />
                <Route path="/monument/:monumentId/events" element={<Events />} />
                <Route path="/monument/:monumentId/guides" element={<Guides />} />
                <Route path="/monument/:monumentId/tour-services" element={<TourServices />} />
                
                {/* Protected routes - User must be logged in */}
                <Route 
                  path="/monument/:monumentId/book-ticket" 
                  element={
                    <ProtectedRoute>
                      <BookTicket />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/monument/:monumentId/book-guide" 
                  element={
                    <ProtectedRoute>
                      <GuideBooking />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin only routes */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/debug/images" 
                  element={
                    <AdminRoute>
                      <ImageDebugger />
                    </AdminRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

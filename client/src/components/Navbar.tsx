import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gilt-gold to-gilt-orange rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gilt-gold">Gilt Counselling</h1>
              <p className="text-xs text-gray-600">Consult</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gilt-gold transition">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-gilt-gold transition">Services</Link>
            <Link to="/about" className="text-gray-700 hover:text-gilt-gold transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gilt-gold transition">Contact</Link>

            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-gilt-gold transition font-semibold"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-gilt-gold transition"
                  >
                    My Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gilt-gold hover:text-gilt-orange transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/book-appointment"
                  className="bg-gilt-gold text-white px-6 py-2 rounded-lg hover:bg-gilt-orange transition"
                >
                  Book Appointment
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

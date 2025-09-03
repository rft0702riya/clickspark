import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Briefcase, FolderOpen, Phone, User, LogOut, Moon, Sun, LogIn, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/about', label: 'About', icon: <Users size={20} /> },
    { path: '/services', label: 'Services', icon: <Briefcase size={20} /> },
    { path: '/projects', label: 'Projects', icon: <FolderOpen size={20} /> },
    { path: '/contact', label: 'Contact', icon: <Phone size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignIn = () => {
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const handleSignUp = () => {
    setIsDropdownOpen(false);
    navigate('/register');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${isDarkTheme ? 'dark' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/new.png" alt="ClickSpark Logo" />
          <span className="navbar-brand">ClickSpark</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <button onClick={toggleTheme} className="navbar-action-btn">
            {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="navbar-user">
              <Link to="/profile" className="navbar-user-link">
                <User size={18} />
                <span>{user.name || 'User'}</span>
              </Link>
              <button onClick={logout} className="navbar-logout-btn">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="navbar-auth-dropdown" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="navbar-auth-btn">
                <User size={18} />
                <ChevronDown size={14} className={`dropdown-arrow ${isDropdownOpen ? 'rotate' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="navbar-dropdown-menu">
                  <button onClick={handleSignIn} className="navbar-dropdown-item">
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </button>
                  <button onClick={handleSignUp} className="navbar-dropdown-item">
                    <User size={16} />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="navbar-mobile-btn">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-mobile-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="navbar-mobile-actions">
          <button onClick={toggleTheme} className="navbar-mobile-action">
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {user ? (
            <>
              <Link to="/profile" className="navbar-mobile-action" onClick={() => setIsMobileMenuOpen(false)}>
                <User size={20} />
                <span>{user.name || 'Profile'}</span>
              </Link>
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="navbar-mobile-action logout">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { handleSignIn(); setIsMobileMenuOpen(false); }} className="navbar-mobile-action">
                <LogIn size={20} />
                <span>Sign In</span>
              </button>
              <button onClick={() => { handleSignUp(); setIsMobileMenuOpen(false); }} className="navbar-mobile-action">
                <User size={20} />
                <span>Sign Up</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from './Header';
import Navbar from './Navbar';

const Home = () => {
  const [adminDropdown, setAdminDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  
  const adminRef = useRef(null);
  const userRef = useRef(null);

  const handleClickOutside = (event) => {
    if (adminRef.current && !adminRef.current.contains(event.target)) {
      setAdminDropdown(false);
    }
    if (userRef.current && !userRef.current.contains(event.target)) {
      setUserDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className='home'>
        <div className='section'>
          <h1>Admin Section</h1>
          <div className="button-container">
            <button 
              className='dropdown-toggle' 
              onClick={() => setAdminDropdown(!adminDropdown)} 
              aria-expanded={adminDropdown}
            >
              {adminDropdown ? 'Hide Admin Menu' : 'Show Admin Menu'}
            </button>
          </div>
          {adminDropdown && (
            <ul className="dropdown-menu" ref={adminRef}>
              <li><Link to="/admin/login">Admin Login</Link></li>
              <li><Link to="/admin/login">Admin Register</Link></li>
              <li><Link to="/admin/create-bunk">Create Charging Station</Link></li>
              <li><Link to="/admin/manage-bunks">Manage Charging Stations</Link></li>
              <li><Link to="/admin/manage-slots">Manage Recharge Slots</Link></li>
            </ul>
          )}
        </div>

        <div className='section'>
          <h2>User Section</h2>
          <div className="button-container">
            <button 
              className='dropdown-toggle' 
              onClick={() => setUserDropdown(!userDropdown)} 
              aria-expanded={userDropdown}
            >
              {userDropdown ? 'Hide User Menu' : 'Show User Menu'}
            </button>
          </div>
          {userDropdown && (
            <ul className="dropdown-menu" ref={userRef}>
              <li><Link to="/user/login">User Login</Link></li>
              <li><Link to="/user/login">User Register</Link></li>
              <li><Link to="/search-nearby-bunks">Search Nearby Charging Stations</Link></li>
              <li><Link to="/view-bunk-details">View Charging Station Details</Link></li>
              <li><Link to="/view-slots">View Available Slots In Charging Station</Link></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

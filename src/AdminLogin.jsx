import React, { useState } from 'react';
import './AdminLogin.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { assets } from './assets/assets';
import { Link } from 'react-router-dom';

const AdminLogin = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User login successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User registration successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currState === "Login") {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className='user-popup'>
      <form className="user-popup-container" onSubmit={handleSubmit}>
        <div className="user-popup-title">
          <h2>{currState}</h2>
          <Link to='/'><img src={assets.cross_icon} alt="" /></Link>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="user-popup-inputs">
          {currState === "Admin Reg" && 
            <input 
              type="text" 
              placeholder='Your name' 
              required 
              onChange={(e) => setName(e.target.value)} 
            />
          }
          <input 
            type="email" 
            placeholder='Your email' 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder='Password' 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">{currState === "Admin Reg" ? "Create account" : "Login"}</button>
        <div className="user-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to all the terms & conditions.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Admin Reg")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
}

export default AdminLogin;



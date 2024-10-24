// CreateBunk.js
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './CreateBunk.css'; // Ensure to import the CSS

const CreateBunk = () => {
  const [bunkName, setBunkName] = useState('');
  const [location, setLocation] = useState('');
  const [locationUrl, setLocationUrl] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [slots, setSlots] = useState(0);

  const handleCreateBunk = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'bunks'), {
        bunkName,
        location,
        locationUrl,
        mobileNo,
        slots,
      });
      alert('Bunk created successfully');
      
      // Resetting input fields
      setBunkName('');
      setLocation('');
      setLocationUrl('');
      setMobileNo('');
      setSlots(0);
    } catch (error) {
      console.error(error);
      alert('Failed to create bunk');
    }
  };

  return (
    <form onSubmit={handleCreateBunk} className="create-bunk-form">
      <h2>Create Bunk Location</h2>
      <input
        type="text"
        placeholder="Bunk Name"
        value={bunkName}
        onChange={(e) => setBunkName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Location URL"
        value={locationUrl}
        onChange={(e) => setLocationUrl(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Number of Slots"
        value={slots}
        onChange={(e) => setSlots(Number(e.target.value))}
        required
        min={0}
      />
      <button type="submit">Create Bunk</button>
    </form>
  );
};

export default CreateBunk;

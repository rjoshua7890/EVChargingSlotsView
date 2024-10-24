import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Adjust the import according to your firebase setup
import { collection, getDocs } from 'firebase/firestore';
import './ViewBunkDetails.css'
const ViewBunkDetails = () => {
  const [bunks, setBunks] = useState([]);
  const [selectedBunk, setSelectedBunk] = useState(null);

  useEffect(() => {
    const fetchBunks = async () => {
      try {
        const bunkCollection = collection(db, 'bunks');
        const bunkSnapshot = await getDocs(bunkCollection);
        const bunkList = bunkSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBunks(bunkList);
      } catch (error) {
        console.error("Error fetching bunks:", error);
      }
    };

    fetchBunks();
  }, []);

  const handleBunkSelect = (bunk) => {
    setSelectedBunk(bunk);
  };

  return (
    <div className='vbd'>
      <h2>Available Bunks</h2>
      

      {selectedBunk && (
        <div>
          <h2>Bunk Details</h2>
          <h3>{selectedBunk.bunkName}</h3>
          <p><strong>Location:</strong> {selectedBunk.location}</p>
          <p><strong>URL:</strong> <a href={selectedBunk.locationUrl} target="_blank" rel="noopener noreferrer">{selectedBunk.locationUrl}</a></p>
          <p><strong>Mobile:</strong> {selectedBunk.mobileNo}</p>
          <p><strong>Slots:</strong> {selectedBunk.slots}</p>
        </div>
      )}

      <ul>
        {bunks.map((bunk) => (
          <li key={bunk.id} onClick={() => handleBunkSelect(bunk)} style={{ cursor: 'pointer' }}>
            <h3>{bunk.bunkName}</h3>
            <p>Location: {bunk.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBunkDetails;

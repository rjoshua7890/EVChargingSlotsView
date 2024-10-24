import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './ViewSlotVacancy.css'

const ViewSlotVacancy = () => {
  const [bunks, setBunks] = useState([]);

  useEffect(() => {
    const fetchBunks = async () => {
      const bunkCollection = collection(db, 'bunks');
      const bunkSnapshot = await getDocs(bunkCollection);
      const bunkList = bunkSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBunks(bunkList);
    };

    fetchBunks();
  }, []);

  return (
    <div className='slot'>
      <h2>Available Slot Vacancies</h2>
      <ul>
        {bunks.map((bunk) => (
          <li key={bunk.id}>
            <h3>{bunk.bunkName}</h3>
            <p>Location: {bunk.location}</p>
            <p>Current Slots: {bunk.slots}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSlotVacancy;

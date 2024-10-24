// ManageSlot.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const ManageSlot = () => {
  const [bunks, setBunks] = useState([]);
  const [updatedSlots, setUpdatedSlots] = useState({});

  useEffect(() => {
    const fetchBunks = async () => {
      const bunkCollection = collection(db, 'bunks');
      const bunkSnapshot = await getDocs(bunkCollection);
      const bunkList = bunkSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBunks(bunkList);
    };

    fetchBunks();
  }, []);

  const handleUpdateSlots = async (id, currentSlots) => {
    const newSlots = updatedSlots[id];

    // Validate the new slot value
    if (newSlots > currentSlots) {
      alert('New slots must not be greater than current slots');
      return;
    }

    const bunkRef = doc(db, 'bunks', id);
    try {
      await updateDoc(bunkRef, { slots: newSlots });
      setBunks(bunks.map(bunk => (bunk.id === id ? { ...bunk, slots: newSlots } : bunk)));
      alert('Slots updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update slots');
    }
  };

  return (
    <div>
      <h2>Manage Available Slots</h2>
      <ul className='manage-bunk-list'>
        {bunks.map((bunk) => (
          <li  className='bunk-list' key={bunk.id}>
            <h3>{bunk.bunkName}</h3>
            <p>Location: {bunk.location}</p>
            <p>Current Slots: {bunk.slots}</p>
            <input
              type="number"
              placeholder="Available Slots"
              value={updatedSlots[bunk.id] || ''}
              onChange={(e) => setUpdatedSlots({ ...updatedSlots, [bunk.id]: Number(e.target.value) })}
              min={0}
            />
            <button onClick={() => handleUpdateSlots(bunk.id, bunk.slots)}>Update Slots</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSlot;

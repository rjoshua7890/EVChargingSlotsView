import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './ManageBunk.css'
const ManageBunk = () => {
  const [bunks, setBunks] = useState([]);
  const [editingBunk, setEditingBunk] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    bunkName: '',
    location: '',
    locationUrl: '',
    mobileNo: '',
    slots: 0,
  });

  useEffect(() => {
    const fetchBunks = async () => {
      const bunkCollection = collection(db, 'bunks');
      const bunkSnapshot = await getDocs(bunkCollection);
      const bunkList = bunkSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBunks(bunkList);
    };

    fetchBunks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'bunks', id));
      setBunks(bunks.filter(bunk => bunk.id !== id));
      alert('Bunk deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete bunk');
    }
  };

  const handleUpdate = async (id) => {
    const bunkRef = doc(db, 'bunks', id);
    try {
      await updateDoc(bunkRef, updatedData);
      setBunks(bunks.map(bunk => (bunk.id === id ? { ...bunk, ...updatedData } : bunk)));
      setEditingBunk(null);
      alert('Bunk updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update bunk');
    }
  };

  const startEditing = (bunk) => {
    setEditingBunk(bunk.id);
    setUpdatedData({
      bunkName: bunk.bunkName || '',
      location: bunk.location || '',
      locationUrl: bunk.locationUrl || '',
      mobileNo: bunk.mobileNo || '',
      slots: bunk.slots || 0,
    });
  };

  return (
    <div>
      <h2>Manage Bunks</h2>
      <ul className='manage-bunk-list'>
        {bunks.map((bunk) => (
          <li className='bunk-list' key={bunk.id}>
            <h3>{bunk.bunkName}</h3>
            <p>Location: {bunk.location}</p>
            <p>
              URL: 
              <a href={bunk.locationUrl} target="https://www.google.com/maps/@14.3631845,75.8623123" rel="noopener noreferrer">
                {bunk.locationUrl}
              </a>
            </p>
            <p>Mobile: {bunk.mobileNo}</p>
            <p>Slots: {bunk.slots}</p>
            <button onClick={() => handleDelete(bunk.id)}>Delete</button>
            <button onClick={() => startEditing(bunk)}>
              Edit
            </button>
            {editingBunk === bunk.id && (
              <div>
                <input
                  type="text"
                  placeholder="Bunk Name"
                  value={updatedData.bunkName}
                  onChange={(e) => setUpdatedData({ ...updatedData, bunkName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={updatedData.location}
                  onChange={(e) => setUpdatedData({ ...updatedData, location: e.target.value })}
                />
                <input
                  type="url"
                  placeholder="Location URL"
                  value={updatedData.locationUrl}
                  onChange={(e) => setUpdatedData({ ...updatedData, locationUrl: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={updatedData.mobileNo}
                  onChange={(e) => setUpdatedData({ ...updatedData, mobileNo: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Number of Slots"
                  value={updatedData.slots}
                  onChange={(e) => setUpdatedData({ ...updatedData, slots: Number(e.target.value) })}
                />
                <button onClick={() => handleUpdate(bunk.id)}>Save</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBunk;

import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './SearchNearbyBunks.css'
const SearchNearbyBunk = () => {
  const [bunks, setBunks] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredBunks, setFilteredBunks] = useState([]);

  useEffect(() => {
    const fetchBunks = async () => {
      const bunkCollection = collection(db, 'bunks');
      const bunkSnapshot = await getDocs(bunkCollection);
      const bunkList = bunkSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBunks(bunkList);
    };

    fetchBunks();
  }, []);

  const handleSearch = () => {
    const results = bunks.filter(bunk =>
      bunk.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredBunks(results);
  };

  return (
    <div className='search'>
      <h2>Search Nearby Bunks</h2>
      <input
        type="text"
        placeholder="Enter Location"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {filteredBunks.length > 0 ? (
        <ul>
          {filteredBunks.map((bunk) => (
            <li key={bunk.id}>
              <h3>{bunk.bunkName}</h3>
              <p>Location: {bunk.location}</p>
              <p>URL: {bunk.locationUrl}</p>
              <p>Mobile: {bunk.mobileNo}</p>
              <p>Slots: {bunk.slots}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bunks found in this location.</p>
      )}
    </div>
  );
};

export default SearchNearbyBunk;

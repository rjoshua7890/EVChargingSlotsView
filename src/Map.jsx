import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from 'react-router-dom';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
  const [bunks, setBunks] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchBunks = async () => {
      const bunkCollection = await db.collection('bunks').get();
      setBunks(bunkCollection.docs.map(doc => doc.data()));
    };

    fetchBunks();
  }, []);

  const handleExit = () => {
    navigate('/'); // Navigate to home
  };

  const handleViewAll = () => {
    navigate('/view-bunk-details'); // Navigate to the "All Bunks" page
  };

  return (
    <div style={{ position: 'relative', height: '500px', width: '100%' }}>
      <button 
        onClick={handleExit} 
        style={{ position: 'absolute', top: '10px', right: '50px', zIndex: 1 }}>
        x
      </button>
      <button 
        onClick={handleViewAll} 
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
        View All Bunks
      </button>
      <GoogleMapReact
        defaultCenter={{ lat: 14.30, lng: 76.63 }}
        defaultZoom={11}
      >
        {bunks.map((bunk, index) => (
          <AnyReactComponent
            key={AIzaSyBJ_XlxltqRMHEaqUxKak6LkIb0jt4qRWM}
            lat={bunk.latitude}
            lng={bunk.longitude}
            text={bunk.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;

import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    const updatePosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("position updated");
            setCurrentPosition({
              lat: latitude,
              lng: longitude
            });
          },
          (error) => console.error(error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    };

    updatePosition(); // Initial position update
    const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={16}
      options={{
    // Set default map mode to satellite
        disableDefaultUI: true // Remove the header part
      }}
    >
      <Marker position={currentPosition} />
    </GoogleMap>
  );
};

export default LiveTracking;
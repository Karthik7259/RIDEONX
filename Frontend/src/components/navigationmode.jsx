import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const NavigationMode = ({ pickup, destination }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    if (pickup && destination && isLoaded) {
      calculateRoute();
    }
  }, [pickup, destination, isLoaded]);

  const calculateRoute = () => {
    if (window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
            const bounds = new window.google.maps.LatLngBounds();
            result.routes[0].legs.forEach(leg => {
              leg.steps.forEach(step => {
                bounds.extend(step.start_location);
                bounds.extend(step.end_location);
              });
            });
            mapRef.current.fitBounds(bounds);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={1}
      mapTypeId="satellite"
      onLoad={map => (mapRef.current = map)}
      options={{
        disableDefaultUI: true, // Disable default UI controls
      }}
    >
      {pickup && (
        <Marker
          position={{ lat: pickup.lat, lng: pickup.lng }}
          label="P"
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Custom icon URL
            scaledSize: new window.google.maps.Size(40, 40) // Adjust the size of the icon
          }}
        />
      )}
      {destination && (
        <Marker
          position={{ lat: destination.lat, lng: destination.lng }}
          label="D"
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom icon URL
            scaledSize: new window.google.maps.Size(40, 40) // Adjust the size of the icon
          }}
        />
      )}
      {directionsResponse && (
        <DirectionsRenderer
          options={{
            directions: directionsResponse
          }}
        />
      )}
    </GoogleMap>
  );
};

export default NavigationMode;
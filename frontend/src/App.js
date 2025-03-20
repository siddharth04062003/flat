import React, { useState, useEffect } from 'react';

const App = () => {
  const [flats, setFlats] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    // Get user location using the Geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lon: longitude });

      // Fetch flats from the backend
      fetch(`/flats?lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => setFlats(data))
        .catch(error => console.error('Error fetching data:', error));
        setLat(latitude);
        setLon(longitude);
    });

    
  }, []);

  useEffect(() => {
    const fect = async () => {
        const response = await fetch("https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:76.5577776,30.7723475,10000&bias=proximity:76.5577776,30.7723475&limit=20&apiKey=255c614fdd074fe5bc7af626836f2fb5")
        const data = await response.json()
        const fasdf = (data.features.map((item) => item.properties.name))
        setFlats(fasdf);
        }

    fect();

  }, []);

  return (
    // <div>
    //   <h1>Available Flats</h1>
    //   {userLocation ? (
    //     <div>
    //       <h3>Your Location: Lat: {userLocation.lat}, Lon: {userLocation.lon}</h3>
    //       <ul>
    //         {flats.length > 0 ? (
    //           flats.map((flat, index) => (
    //             <li key={index}>
    //               <strong>{flat.name}</strong><br />
    //               Price: {flat.price}<br />
    //               Location: {flat.location}<br />
    //               Distance: {calculateDistance(userLocation.lat, userLocation.lon, flat.lat, flat.lon)} km
    //             </li>
    //           ))
    //         ) : (
    //           <p>No flats found within 3 km.</p>
    //         )}
    //       </ul>
    //     </div>
    //   ) : (
    //     <p>Loading your location...</p>
    //   )}
    // </div>

    <div>{flats}</div>
  );

  // Calculate distance function on the frontend (same as backend)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Distance in km
  }
};

export default App;

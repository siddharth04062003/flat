import React, { useState, useEffect } from "react";

const App = () => {
  const [flats, setFlats] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);

      const fect = async () => {
        const response = await fetch(
          `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},10000&bias=proximity:${longitude},${latitude}&limit=20&apiKey=255c614fdd074fe5bc7af626836f2fb5`
        );
        const data = await response.json();
        const fasdf = data.features.map((item) => item.properties.name);
        setFlats(fasdf);
      };

      fect();
    });
  }, []); // Empty dependency array means this will run once on mount

  return (
    <div>
      <h1>Available Flats</h1>
      {userLocation ? (
        <div>
          <h3>
            Your Location: Lat: {userLocation.lat}, Lon: {userLocation.lon}
          </h3>
          <ul>
            {flats.length > 0 ? (
              flats.map((flat, index) => (
                <li key={index}>
                  <strong>{flat}</strong>
                  <br />
                </li>
              ))
            ) : (
              <p>No flats found within 10 km.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading your location...</p>
      )}
        <div>{flats}</div>
    </div>
  );
};

export default App;

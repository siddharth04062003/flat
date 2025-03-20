import React, { useState, useEffect } from "react";

const App = () => {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const fetchData = async () => {
        const response = await fetch(
          `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},10000&bias=proximity:${longitude},${latitude}&limit=20&apiKey=255c614fdd074fe5bc7af626836f2fb5`
        );
        const data = await response.json();
        const hotelDetails = data.features.map((item) => {
          return {
            name: item.properties.name,
            address: item.properties.formatted,  // Full address
            pinCode: item.properties.postcode,  // Pin code
          };
        });
        setFlats(hotelDetails);
      };

      fetchData();
    });
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1 style={{ color: "#4CAF50", textAlign: "center" }}>Available Hotels</h1>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        {flats.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {flats.map((flat, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#f1f1f1",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <strong style={{ fontSize: "18px" }}>{flat.name}</strong>
                <p style={{ margin: "5px 0" }}>
                  <strong>Address:</strong> {flat.address}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Pin Code:</strong> {flat.pinCode}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: "center" }}>No hotels found within 10 km.</p>
        )}
      </div>
    </div>
  );
};

export default App;

const express = require('express');
const app = express();

// Basic endpoint to handle flats requests
app.get('/flats', (req, res) => {
  // Example flat data (you can replace it with dynamic data later)
  const flats = [
    { name: 'Hotel A', location: 'Location 1' },
    { name: 'Hotel B', location: 'Location 2' },
    { name: 'Hotel C', location: 'Location 3' },
  ];

  res.json(flats); // Return flat data
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

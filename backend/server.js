const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Haversine formula to calculate distance between two geographical points
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

// Function to scrape flats data from a website (e.g., OYO)
const scrapeData = async () => {
  const { data } = await axios.get('https://www.oyorooms.com/api/pwa/getListingPage?url=%2Fsearch%3Flocation%3DAround%2520me%26latitude%3D30.76862834832535%26longitude%3D76.576164445933%26city%3D%26searchType%3Dlocality%26coupon%3D%26checkin%3D20%252F03%252F2025%26checkout%3D21%252F03%252F2025%26roomConfig%255B%255D%3D1%26showSearchElements%3Dfalse%26guests%3D1%26rooms%3D1&locale=en'); // Replace with the URL of the site you want to scrape
  const $ = cheerio.load(data);
  
  const flats = [];
  $('div.flat-listing').each((index, element) => {  // Replace the selector with the correct one for the site
    const flat = {
      name: $(element).find('.flat-name').text(), // Replace with correct selector
      price: $(element).find('.flat-price').text(), // Replace with correct selector
      location: $(element).find('.flat-location').text(), // Replace with correct selector
      lat: parseFloat($(element).find('.flat-lat').text()), // Replace with correct selector
      lon: parseFloat($(element).find('.flat-lon').text())  // Replace with correct selector
    };
    flats.push(flat);
  });
  return flats;
};

// Endpoint to get filtered flats based on user location
app.get('/flats', async (req, res) => {
  const { lat, lon } = req.query;  // Get user's location from the query

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  const flats = await scrapeData();
  
  const filteredFlats = flats.filter(flat => {
    const distance = calculateDistance(lat, lon, flat.lat, flat.lon);
    return distance <= 200;  // Filter flats within 3 km
  });
  
  res.json(filteredFlats);  // Return filtered flats to the frontend
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

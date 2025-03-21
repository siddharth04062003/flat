import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Wifi, Wind, Star, Search, Loader } from "lucide-react";

// CSS styles
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    margin: 0,
    padding: 0
  },
  header: {
    background: "linear-gradient(to right, #2563eb, #1e40af)",
    color: "white",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  },
  headerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  searchBox: {
    position: "relative",
    width: "100%",
    maxWidth: "400px"
  },
  searchInput: {
    width: "100%",
    padding: "10px 15px 10px 40px",
    borderRadius: "50px",
    border: "none",
    fontSize: "16px",
    color: "#333",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af"
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px"
  },
  filterBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)"
  },
  filterTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "15px"
  },
  selectContainer: {
    display: "flex",
    alignItems: "center"
  },
  sortLabel: {
    marginRight: "10px",
    color: "#4b5563"
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "250px"
  },
  loadingText: {
    marginTop: "15px",
    color: "#4b5563",
    fontSize: "18px"
  },
  hotelGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "24px"
  },
  hotelCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    transition: "box-shadow 0.3s ease",
    cursor: "pointer"
  },
  hotelCardHover: {
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)"
  },
  hotelImage: {
    height: "200px",
    backgroundColor: "#e5e7eb",
    position: "relative"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  ratingBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "white",
    padding: "5px 10px",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
  },
  ratingText: {
    fontWeight: "bold",
    marginLeft: "5px"
  },
  hotelInfo: {
    padding: "20px"
  },
  hotelName: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "10px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  addressRow: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "10px"
  },
  addressIcon: {
    color: "#ef4444",
    marginRight: "10px",
    marginTop: "3px",
    flexShrink: 0
  },
  addressText: {
    color: "#4b5563",
    fontSize: "14px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  },
  distanceRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  distanceIcon: {
    color: "#3b82f6",
    marginRight: "10px"
  },
  distanceText: {
    color: "#4b5563"
  },
  facilitiesSection: {
    marginBottom: "20px"
  },
  facilitiesTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "8px"
  },
  facilitiesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px"
  },
  facilityTag: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    fontSize: "13px",
    borderRadius: "50px"
  },
  facilityIcon: {
    marginRight: "5px"
  },
  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "600",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease"
  },
  buttonHover: {
    backgroundColor: "#1d4ed8"
  },
  emptyState: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)"
  },
  emptyStateText: {
    color: "#4b5563",
    fontSize: "18px",
    marginBottom: "20px"
  },
  clearButton: {
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "600",
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease"
  },
  footer: {
    marginTop: "50px",
    backgroundColor: "#1f2937",
    color: "white",
    padding: "30px 0",
    textAlign: "center"
  },
  footerText: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px"
  },
  // Media queries need to be implemented separately with window event listeners or conditionally in the component
};

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

// Function to get a random hotel price between 550 and 5500
function getRandomPrice() {
  return Math.floor(Math.random() * (5500 - 550 + 1)) + 550;
}

const App = () => {
  const [flats, setFlats] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  useEffect(() => {
    // Get user location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });

        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},10000&bias=proximity:${longitude},${latitude}&limit=20&apiKey=255c614fdd074fe5bc7af626836f2fb5`
            );
            const data = await response.json();

            const hotelDetails = data.features.map((item) => {
              // Calculate the distance from user's location to the hotel
              const distance = calculateDistance(
                latitude,
                longitude,
                item.properties.lat,
                item.properties.lon
              );

              // Extract specific facilities
              const facilities = [];
              if (item.properties.facilities) {
                if (item.properties.facilities.air_conditioning) {
                  facilities.push("AC");
                }
                if (item.properties.facilities.internet_access) {
                  facilities.push("Wi-Fi");
                }
                if (item.properties.accommodation && item.properties.accommodation.rooms) {
                  facilities.push("Accommodation Available");
                }
              }

              // Generate random rating for demo purposes
              const rating = (Math.random() * 2 + 3).toFixed(1);
              const price = getRandomPrice(); // Generate random price for each hotel

              return {
                name: item.properties.name || "Unnamed Hotel",
                address: item.properties.formatted,
                pinCode: item.properties.postcode,
                distance: distance.toFixed(2), // Distance in km (rounded to 2 decimal places)
                facilities: facilities.length > 0 ? facilities : ["No facilities listed"],
                rating,
                price, // Adding the price
                lat: item.properties.lat,
                lon: item.properties.lon,
              };
            });

            setFlats(hotelDetails);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
          }
        };

        fetchData();
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    );
  }, []);

  // Filter hotels based on search term
  const filteredHotels = flats.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort hotels based on selected criteria
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === "distance") {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === "rating") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    return 0;
  });

  // Function to get facility icon
  const getFacilityIcon = (facility) => {
    if (facility.includes("Wi-Fi")) return <Wifi size={16} style={styles.facilityIcon} />;
    if (facility.includes("AC")) return <Wind size={16} style={styles.facilityIcon} />;
    return null;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>StayFinder</h1>

          {/* Search Box */}
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search hotels..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search style={styles.searchIcon} size={16} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Filter Controls */}
        <div style={styles.filterBar}>
          <div>
            <h2 style={styles.filterTitle}>
              {loading ? "Finding nearby hotels..." : `${sortedHotels.length} Hotels Found`}
            </h2>
          </div>

          <div style={styles.selectContainer}>
            <label htmlFor="sortBy" style={styles.sortLabel}>Sort by:</label>
            <select
              id="sortBy"
              style={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="distance">Nearest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <Loader style={{ color: "#2563eb" }} size={48} />
            <p style={styles.loadingText}>Discovering hotels near you...</p>
          </div>
        ) : (
          <>
            {/* Hotel Grid */}
            {sortedHotels.length > 0 ? (
              <div style={styles.hotelGrid}>
                {sortedHotels.map((hotel, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.hotelCard,
                      ...(hoveredCardIndex === index ? styles.hotelCardHover : {})
                    }}
                    onMouseEnter={() => setHoveredCardIndex(index)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                  >
                    {/* Hotel Image (Placeholder) */}
                    <div style={styles.hotelImage}>
                      <img
                        src={`/api/placeholder/400/320`}
                        alt={hotel.name}
                        style={styles.img}
                      />
                      <div style={styles.ratingBadge}>
                        <Star style={{ color: "#facc15" }} size={16} />
                        <span style={styles.ratingText}>{hotel.rating}</span>
                      </div>
                    </div>

                    {/* Hotel Info */}
                    <div style={styles.hotelInfo}>
                      <h3 style={styles.hotelName}>{hotel.name}</h3>

                      <div style={styles.addressRow}>
                        <MapPin style={styles.addressIcon} size={18} />
                        <p style={styles.addressText}>{hotel.address}</p>
                      </div>

                      <div style={styles.distanceRow}>
                        <Navigation style={styles.distanceIcon} size={18} />
                        <span style={styles.distanceText}>{hotel.distance} km away</span>
                      </div>

                      <div style={styles.distanceRow}>
                        <span style={styles.distanceText}>Price: ₹{hotel.price} Lowest Vendor Pricing !!</span>
                      </div>

                      {/* Facilities */}
                      <div style={styles.facilitiesSection}>
                        <h4 style={styles.facilitiesTitle}>Facilities:</h4>
                        <div style={styles.facilitiesContainer}>
                          {hotel.facilities.map((facility, idx) => (
                            <span key={idx} style={styles.facilityTag}>
                              {getFacilityIcon(facility)}
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        style={{
                          ...styles.button,
                          ...(hoveredCardIndex === index ? styles.buttonHover : {})
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <p style={styles.emptyStateText}>No hotels found matching your criteria</p>
                <button
                  style={styles.clearButton}
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerText}>
          <p>© 2025 StayFinder | Find the perfect accommodation nearby</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
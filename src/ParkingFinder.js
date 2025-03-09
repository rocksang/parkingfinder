import React, { useState } from 'react';

function ParkingFinder() {
  const [spots, setSpots] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    city: 'Sydney',
    location: '',
    parkingType: 'any',
    parkingLength: '',
    parkingTime: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetch('https://parking-pro.onrender.com/parking', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Fetched spots:', data.spots);
        setSpots(data.spots || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f7fa',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        padding: '20px 0',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h1 style={{ color: '#2c3e50', margin: 0, fontSize: '2.5em' }}>
          Parking Pro
        </h1>
        <p style={{ color: '#7f8c8d', margin: '5px 0 0' }}>
          Find the perfect parking spot near you
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}
      >
        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #dcdcdc',
                borderRadius: '5px',
                fontSize: '1em'
              }}
              placeholder="e.g., Sydney"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #dcdcdc',
                borderRadius: '5px',
                fontSize: '1em'
              }}
              placeholder="e.g., 56 Glebe Point Rd"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
              Parking Type
            </label>
            <select
              name="parkingType"
              value={formData.parkingType}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #dcdcdc',
                borderRadius: '5px',
                fontSize: '1em',
                backgroundColor: '#fff'
              }}
            >
              <option value="any">Any</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
              Parking Length (minutes)
            </label>
            <input
              type="number"
              name="parkingLength"
              value={formData.parkingLength}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #dcdcdc',
                borderRadius: '5px',
                fontSize: '1em'
              }}
              placeholder="e.g., 120"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
              Parking Time
            </label>
            <input
              type="time"
              name="parkingTime"
              value={formData.parkingTime}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #dcdcdc',
                borderRadius: '5px',
                fontSize: '1em'
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '20px',
            backgroundColor: loading ? '#95a5a6' : '#f5f5dc', // Beige when not loading
            color: loading ? '#fff' : '#964b00', // Brown text, white when loading
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1em',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#ebebcb')} // Slightly darker beige on hover
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#f5f5dc')}
        >
          {loading ? 'Searching...' : 'Find Parking'}
        </button>
      </form>

      {/* Results */}
      {error && (
        <p style={{ color: '#e74c3c', textAlign: 'center', fontSize: '1.1em' }}>
          Error: {error}
        </p>
      )}
      {spots.length > 0 && !loading && (
        <div style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Parking Results</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {spots.map((spot, index) => (
              <li
                key={index}
                style={{
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: spot.free ? '#e8f5e9' : '#fff3e6',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong style={{ color: '#2c3e50' }}>{spot.address}</strong>
                  <p style={{ margin: '5px 0 0', color: '#7f8c8d' }}>
                    {spot.free ? 'Free' : 'Paid'} - {spot.rules}
                  </p>
                </div>
                {spot.distance_km && (
                  <span style={{
                    backgroundColor: '#3498db',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    fontSize: '0.9em'
                  }}>
                    {spot.distance_km} km
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!loading && !error && spots.length === 0 && (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '1.1em' }}>
          No parking spots found. Enter details and search!
        </p>
      )}
    </div>
  );
}

export default ParkingFinder;
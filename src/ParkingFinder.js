import React, { useState } from 'react';

function ParkingFinder() {
  const [spots, setSpots] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
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
      .then(res => res.ok ? res.json() : Promise.reject(`HTTP error: ${res.status}`))
      .then(data => {
        setSpots(data.spots || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not fetch parking spots.');
        setLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerText}>Parking Pro</h1>
        <p style={styles.subText}>Find The Perfect Parking Spot Near You</p>
      </header>

      <div className="form-section">
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="e.g., Sydney"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Park Type</label>
              <select name="parkingType" value={formData.parkingType} onChange={handleInputChange} style={styles.input}>
                <option value="any">Any</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="e.g., 474 Darling St"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Park Time</label>
              <input
                type="time"
                name="parkingTime"
                value={formData.parkingTime}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Park Length (minutes)</label>
              <input
                type="number"
                name="parkingLength"
                value={formData.parkingLength}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="e.g., 120"
              />
            </div>
            <div style={styles.inputGroup}></div>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={loading ? styles.buttonDisabled : styles.button}
            onMouseOver={(e) => !loading && (e.target.style.background = 'linear-gradient(to bottom, #f5f5dc, #ebebcb)')}
            onMouseOut={(e) => !loading && (e.target.style.background = '#f5f5dc')}
          >
            {loading ? 'Searching...' : 'Find Parking'}
          </button>
        </form>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {spots.length > 0 && !loading && (
        <div style={styles.results}>
          <h2 style={styles.resultsHeader}>YAY! We Find Your Parking Spots</h2>
          {spots.map((spot) => (
            <div key={spot.address} style={styles.spotCard}>
              <div style={styles.spotInfo}>
                <strong style={styles.spotName}>{spot.address}</strong>
                <p style={styles.spotDetails}>{spot.free ? 'Free' : 'Paid'} - {spot.rules}</p>
              </div>
              <span style={styles.distanceBadge}>{spot.distance_km} km</span>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && spots.length === 0 && (
        <p style={styles.noResults}>Enter details to find parking!</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '100vh',
    fontFamily: "'Playfair Display', serif"
  },
  header: {
    backgroundColor: '#402905',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  headerText: {
    color: '#FFFDFD',
    fontSize: '36px',
    margin: '0',
    fontFamily: "'Playfair Display', serif"
  },
  subText: {
    color: '#FFFDFD',
    fontSize: '18px',
    margin: '5px 0 0',
    fontFamily: "'Playfair Display', serif"
  },
  form: {
    backgroundColor: 'transparent',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  formRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  inputGroup: {
    width: '455px'
  },
  label: {
    display: 'block',
    color: '#000000',
    fontSize: '16px',
    marginBottom: '5px'
  },
  input: {
    width: '455px',
    height: '71px',
    padding: '10px',
    backgroundColor: '#402905',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '15px',
    background: '#f5f5dc',
    color: '#964b00',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  buttonDisabled: {
    width: '100%',
    padding: '15px',
    background: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'not-allowed'
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    fontSize: '16px'
  },
  results: {
    backgroundColor: '#5F4226', // New background for results section
    padding: '20px',
    borderRadius: '5px'
  },
  resultsHeader: {
    backgroundColor: '#F1E1C9', // Header background for "YAY! We Find..."
    color: '#390D0D', // Font color for header
    fontSize: '24px',
    margin: '0 0 15px',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center'
  },
  spotCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    marginBottom: '10px'
  },
  spotInfo: {
    flex: 1
  },
  spotName: {
    color: '#2c3e50',
    fontSize: '16px'
  },
  spotDetails: {
    color: '#7f8c8d',
    fontSize: '14px',
    margin: '5px 0 0'
  },
  distanceBadge: {
    backgroundColor: '#402905',
    color: '#fff',
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '14px'
  },
  noResults: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '16px'
  }
};

export default ParkingFinder;
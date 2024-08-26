import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';  // Import the CSS file

function Home() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/inventory/v1/city')
      .then(response => {
        if (response.data && response.data.data) {
          setCities(response.data.data);
        } else {
          console.error('Unexpected response format:', response);
        }
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  const handleCitySelect = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleProceed = () => {
    if (selectedCity) {
      navigate(`/city/${selectedCity}`);
    }
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="home-container">
      <button className="admin-button" onClick={handleAdmin}>Admin</button>
      <div className="main-content">
        <h1>Select City</h1>
        <select value={selectedCity} onChange={handleCitySelect}>
          <option value="" disabled>Select a city</option>
          {cities.map(city => (
            <option key={city.cityID} value={city.cityID}>
              {city.cityName} - {city.state}
            </option>
          ))}
        </select>
        <button className="proceed-button" onClick={handleProceed} disabled={!selectedCity}>Proceed</button>
      </div>
    </div>
  );
}

export default Home;

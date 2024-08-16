// src/components/LocationTable.js

import React from 'react';
import './LocationTable.css'; // Import the CSS file

function LocationTable({ locations }) {
  return (
    <div className="container">
      <h2>Location Table</h2>
      {locations && locations.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>City ID</th>
                <th>City Name</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <tr key={index}>
                  <td>{location.cityID}</td>
                  <td>{location.cityName}</td>
                  <td>{location.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-message">No locations found.</p>
      )}
    </div>
  );
}

export default LocationTable;

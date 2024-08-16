// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CityInventory from './cityInventory';
import Admin from './Admin';  // Import the Admin component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityId" element={<CityInventory />} />
        <Route path="/admin" element={<Admin />} />  {/* Add route for Admin */}
      </Routes>
    </Router>
  );
}

export default App;

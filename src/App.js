// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CityInventory from './cityInventory';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityId" element={<CityInventory />} />
        <Route path="/admin" element={<Admin />} /> 
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuditTable from './components/AuditTable/AuditTable';
import LocationTable from './components/LocationTable/LocationTable';
import ProductTable from './components/ProductTable/ProductTable';
import InventoryTable from './components/InventoryTable/InventoryTable';


function Admin() {
  const [audits, setAudits] = useState([]);
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/inventory/v1/city')
      .then(response => {
        setCities(response.data.data || []);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setError('Failed to load cities');
      });
  }, []);

  const handleCheckAudits = () => {
    setLoading(true);
    setError(null);

    if (view === 'audits') {
      setView(null);
      setLoading(false);
    } else {
      axios.get('http://localhost:8080/inventory/v1/audit', {
        headers: { 'client_id': 1 }
      })
      .then(response => {
        setAudits(response.data.data || []);
        setLoading(false);
        setView('audits');
      })
      .catch(error => {
        console.error('Error fetching audits:', error);
        setError('Failed to load audits');
        setLoading(false);
      });
    }
  };

  const handleViewLocations = () => {
    setLoading(true);
    setError(null);

    if (view === 'locations') {
      setView(null);
      setLoading(false);
    } else {
      axios.get('http://localhost:8080/inventory/v1/city', {
        headers: { 'client_id': 1 }
      })
      .then(response => {
        setLocations(response.data.data || []);
        setLoading(false);
        setView('locations');
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        setError('Failed to load locations');
        setLoading(false);
      });
    }
  };

  const handleViewProducts = () => {
    setLoading(true);
    setError(null);

    if (view === 'products') {
      setView(null);
      setLoading(false);
    } else {
      axios.get('http://localhost:8080/inventory/v1/sku', {
        headers: { 'client_id': 1 }
      })
      .then(response => {
        setProducts(response.data.data || []);
        setLoading(false);
        setView('products');
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      });
    }
  };

  const handleViewInventory = () => {
    setLoading(true);
    setError(null);

    if (view === 'inventory') {
      setView(null);
      setLoading(false);
    } else {
      axios.get('http://localhost:8080/inventory/v1/inventory', {
        headers: { 'client_id': 1 }
      })
      .then(response => {
        setInventory(response.data.data || []);
        setLoading(false);
        setView('inventory');
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
        setError('Failed to load inventory');
        setLoading(false);
      });
    }
  };

  const handleCitySelect = (event) => {
    setSelectedCityId(event.target.value);
  };

  return (
    <div>
      <h1>Admin Page</h1>

      <div className="button-group">
        <button
          className={view === 'audits' ? 'active' : ''}
          onClick={handleCheckAudits}
        >
          {view === 'audits' ? 'Hide Audits' : 'Check Audits'}
        </button>
        <button
          className={view === 'products' ? 'active' : ''}
          onClick={handleViewProducts}
        >
          {view === 'products' ? 'Hide Products' : 'View Products'}
        </button>
        <button
          className={view === 'locations' ? 'active' : ''}
          onClick={handleViewLocations}
        >
          {view === 'locations' ? 'Hide Locations' : 'View Locations'}
        </button>
        <button
          className={view === 'inventory' ? 'active' : ''}
          onClick={handleViewInventory}
        >
          {view === 'inventory' ? 'Hide Inventory' : 'View Inventory'}
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {view === 'audits' && (
        <div>
          <div>
            <label htmlFor="citySelect"></label>
            <select id="citySelect" value={selectedCityId} onChange={handleCitySelect}>
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city.cityID} value={city.cityID}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>
          <AuditTable audits={audits} cities={cities} selectedCityId={selectedCityId} />
        </div>
      )}

      {view === 'locations' && (
        <LocationTable locations={locations} />
      )}

      {view === 'products' && (
        <ProductTable products={products} />
      )}

      {view === 'inventory' && (
        <InventoryTable inventory={inventory} />
      )}
    </div>
  );
}

export default Admin;

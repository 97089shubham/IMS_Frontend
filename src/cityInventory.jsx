import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddInventoryForm from './components/AddInventory/AddInventoryForm';
import DeductInventoryForm from './components/DeductInventory/DeductInventoryForm';
import ProductList from './components/ProductList/ProductList';
import axios from 'axios';
import './CityInventory.css'; // Import the CSS file

function CityInventory() {
  const { cityId } = useParams();
  const [view, setView] = useState('');
  const [products, setProducts] = useState([]);
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    // Fetch city details and set the city name
    axios.get('http://localhost:8080/inventory/v1/cities')
      .then(response => {
        const cities = response.data.data; // Adjust based on the actual response format
        const city = cities.find(city => city.cityID === parseInt(cityId));
        if (city) {
          setCityName(city.cityName);
        } else {
          setCityName('City not found');
        }
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setCityName('Error fetching city name');
      });
  }, [cityId]);

  const fetchProducts = () => {
    console.log('Fetching products for cityId:', cityId);  // Debug line
    if (!cityId) {
      console.error('City ID is not set');
      return;
    }
    fetch(`http://localhost:8080/inventory/v1/skus/${cityId}`, {
      headers: { 'client_id': 1 } // Example client ID; adjust as needed
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data.data || []);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleViewChange = (viewType) => {
    if (view === viewType) {
      // If the same view button is clicked again, hide the view
      setView('');
    } else {
      // Otherwise, set the view to the clicked button's type
      setView(viewType);
      if (viewType === 'list') {
        fetchProducts();
      }
    }
  };

  return (
    <div className="city-inventory-container">
      <h1>{cityName} Inventory Management</h1>
      <div className="button-group">
        <button
          className={view === 'add' ? 'active' : ''}
          onClick={() => handleViewChange('add')}
        >
          Add Inventory
        </button>
        <button
          className={view === 'deduct' ? 'active' : ''}
          onClick={() => handleViewChange('deduct')}
        >
          Deduct Inventory
        </button>
        <button
          className={view === 'list' ? 'active' : ''}
          onClick={() => handleViewChange('list')}
        >
          View All Products
        </button>
      </div>

      <div className="forms-container">
        {view === 'add' && <AddInventoryForm cityId={cityId} />}
        {view === 'deduct' && <DeductInventoryForm cityId={cityId} />}
      </div>
      {view === 'list' && (
        <div className="product-list-container">
          <ProductList products={products} />
        </div>
      )}
    </div>
  );
}

export default CityInventory;

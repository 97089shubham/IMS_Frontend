import React, { useState } from 'react';
import axios from 'axios';
import './AddInventoryForm.css'; // Import the CSS file
import { FaTrash } from 'react-icons/fa';


function AddInventoryForm({ cityId }) {
  const [referenceId, setReferenceId] = useState('');
  const [products, setProducts] = useState([{ skuId: '', skuName: '', quantity: '', uom: '' }]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState({ message: '', skusListMissing: [] });

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { skuId: '', skuName: '', quantity: '', uom: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { referenceId, products };

    axios.post(`http://localhost:8080/inventory/v1/add/${cityId}`, data, {
      headers: { 'client_id': 1 }
    })
    .then(response => {
      console.log('Inventory added:', response.data);
      setIsSubmitted(true);
      setError({ message: '', skusListMissing: [] }); // Clear any previous errors
    })
    .catch(error => {
      console.error('Error adding inventory:', error);
      if (error.response && error.response.data) {
        const { message, skusListMissing } = error.response.data;
        setError({
          message: message || 'Failed to add inventory. Please check the product details and try again.',
          skusListMissing: skusListMissing || []
        });
      } else {
        setError({
          message: 'Failed to add inventory. Please check the product details and try again.',
          skusListMissing: []
        });
      }
    });
  };

  return (
    <div className="container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Add Inventory</h2>
          <input
            type="number"
            placeholder="Reference ID"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            required
          />
          {products.map((product, index) => (
            <div key={index} className="product-row">
              <input
                type="text"
                name="skuId"
                placeholder="SKU ID"
                value={product.skuId}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
              <input
                type="text"
                name="skuName"
                placeholder="SKU Name"
                value={product.skuName}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
              <input
                type="text"
                name="uom"
                placeholder="UOM"
                value={product.uom}
                onChange={(e) => handleProductChange(index, e)}
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveProduct(index)}
                className="remove-button"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddProduct} className="add-button">Add Another Product</button>
          <button type="submit">Submit</button>
          {error.message && (
            <div className="error-message">
              <p>{error.message}</p>
              {error.skusListMissing.length > 0 && (
                <ul>
                  {error.skusListMissing.map((sku, idx) => (
                    <li key={idx}>SKU ID causing issue: {sku}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </form>
      ) : (
        <div>
          <h2>Products Added Successfully</h2>
          <button onClick={() => setIsSubmitted(false)}>Add More Products</button>
        </div>
      )}
    </div>
  );
}

export default AddInventoryForm;

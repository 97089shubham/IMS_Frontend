import React, { useState } from 'react';
import axios from 'axios';
import './DeductInventoryForm.css'; // Ensure the CSS file is imported
import { FaTrash } from 'react-icons/fa';

function DeductInventoryForm({ cityId }) {
  const [referenceId, setReferenceId] = useState('');
  const [products, setProducts] = useState([{ skuId: '', quantity: '' }]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { skuId: '', quantity: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { referenceId, products };

    axios.post(`http://localhost:8080/inventory/v1/deduct/${cityId}`, data, {
      headers: { 'client_id': 1 }
    })
    .then(response => {
      console.log('Inventory deducted:', response.data);
      setIsSubmitted(true);
      setError(null);
    })
    .catch(error => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setError({
          message: errorData.message,
          skusListMissing: errorData.skusListMissing,
          skusListExcess: errorData.skusListExcess
        });
      } else {
        console.error('Error deducting inventory:', error);
        setError({
          message: 'An unknown error occurred while deducting inventory.',
          skusListMissing: [],
          skusListExcess: []
        });
      }
    });
  };

  return (
    <div className="container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Deduct Inventory</h2>
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
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={product.quantity}
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
          <button type="submit" className="submit-button">Submit</button>
          {error && (
            <div className="error-message">
              <p>{error.message}</p>
              {error.skusListMissing.length > 0 && (
                <div>
                  <strong>Missing Products:</strong>
                  <ul>
                    {error.skusListMissing.map((sku, index) => (
                      <li key={index}>{sku}</li>
                    ))}
                  </ul>
                </div>
              )}
              {error.skusListExcess.length > 0 && (
                <div>
                  <strong>Excess Quantity:</strong>
                  <ul>
                    {error.skusListExcess.map((sku, index) => (
                      <li key={index}>{sku}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </form>
      ) : (
        <div>
          <h2>Products Deducted Successfully</h2>
          <button onClick={() => setIsSubmitted(false)}>Deduct More Products</button>
        </div>
      )}
    </div>
  );
}

export default DeductInventoryForm;

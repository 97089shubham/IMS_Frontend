import React from 'react';
import './ProductList.css'; // Ensure the CSS file is imported

function ProductList({ products }) {
  return (
    <div className="container">
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p className="empty-message">No products found.</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>SKU Name</th>
                <th>SKU ID</th>
                <th>Quantity</th>
                <th>UOM</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.skuName}</td>
                  <td>{product.skuId}</td>
                  <td>{product.quantity}</td>
                  <td>{product.uom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;

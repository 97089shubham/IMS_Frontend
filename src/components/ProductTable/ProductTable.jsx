// src/components/ProductTable.js

import React from 'react';
// import './ProductTable.css'; // Import the CSS file

function ProductTable({ products }) {
  return (
    <div className="container">
      <h2>Products Table</h2>
      {products && products.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>SKU ID</th>
                <th>Product Name</th>
                <th>Unit of Measure</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.skuId}</td>
                  <td>{product.skuName}</td>
                  <td>{product.uom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-message">No products found.</p>
      )}
    </div>
  );
}

export default ProductTable;

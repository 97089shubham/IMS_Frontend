import React from 'react';
import '../AuditTable/AuditTable.css'; // Import the CSS file

function InventoryTable({ inventory }) {
  return (
    <div className="container">
      <h2>Inventory List</h2>
      {inventory.length === 0 ? (
        <p className="empty-message">No inventory data available.</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>SKU ID</th>
                <th>City ID</th>
                <th>Quantity</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index}>
                  <td>{item.skuId}</td>
                  <td>{item.cityId}</td>
                  <td>{item.quantity}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>{new Date(item.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InventoryTable;

import React from 'react';
import './AuditTable.css'; // Import the CSS file

function AuditTable({ audits, cities, selectedCityId }) {
  const filteredAudits = selectedCityId
    ? audits.filter(audit => audit.cityId === parseInt(selectedCityId))
    : audits;

  return (
    <div className="container">
      <h2>Audit Table</h2>
      {filteredAudits && filteredAudits.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>SKU ID</th>
                <th>City Name</th>
                <th>Client ID</th>
                <th>Reference ID</th>
                <th>Operation Type</th>
                <th>Requested Quantity</th>
                <th>Previous Quantity</th>
                <th>Updated Quantity</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredAudits.map((audit, index) => {
                const city = cities.find(city => city.cityID === audit.cityId);
                return (
                  <tr key={index}>
                    <td>{audit.auditId}</td>
                    <td>{audit.skuId}</td>
                    <td>{city ? city.cityName : audit.cityId}</td>
                    <td>{audit.clientId}</td>
                    <td>{audit.referenceId}</td>
                    <td>{audit.operationType}</td>
                    <td>{audit.requestedQuantity}</td>
                    <td>{audit.previousQuantity}</td>
                    <td>{audit.updatedQuantity}</td>
                    <td>{new Date(audit.timeStamp).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-message">No audit records found.</p>
      )}
    </div>
  );
}

export default AuditTable;

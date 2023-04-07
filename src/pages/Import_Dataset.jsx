import React, { useState } from 'react';
import { TopProduct, SalesByMonth, SalesByRegion } from '../components';
import { Header } from '../components';

const Import_Dataset = () => {
  const [selectedForm, setSelectedForm] = useState('TopProduct');

  const handleSelectChange = (event) => {
    setSelectedForm(event.target.value);
  };

  const selectStyle = {
    backgroundColor: 'rgba(25, 151, 245, 0.5)',
    color: 'black',
    marginTop: '10px',
    display: 'block',
    width: '100%',
    height: '40px',
    borderRadius: '5px',
    padding: '0 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Import_Dataset"/>
      <div>
        <label htmlFor="form-select" style={{ fontWeight: 'bold' }}>Select a form:</label>
        <select id="form-select" value={selectedForm} onChange={handleSelectChange} style={selectStyle}>
          <option value="TopProduct" style={selectStyle}>Top Product</option>
          <option value="SalesByMonth" style={selectStyle}>Top Sales By Month</option>
          <option value="SalesByRegion" style={selectStyle}>Top Sales By Region</option>
        </select>
      </div>
      {selectedForm === 'TopProduct' && <TopProduct />}
      {selectedForm === 'SalesByMonth' && <SalesByMonth />}
      {selectedForm === 'SalesByRegion' && <SalesByRegion />}
    </div>
  );
};

export default Import_Dataset;

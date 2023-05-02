import React, { useState } from 'react';
import {
  Header, Forms, TopProduct, SalesByMonth, SalesByRegion, SalesDataEntry, CustomerDataEntry, TransporterDataEntry,
  UnitPriceDataEntry
} from '../components';
import { Form } from 'react-router-dom';

const Import_Dataset = () => {
  const [selectedForm, setSelectedForm] = useState('TopProduct');

  const handleSelectChange = (event) => {
    setSelectedForm(event.target.value);
  };

  const selectStyle = {
    backgroundColor: 'rgb(3,201,215)',
    color: 'white',
    marginTop: '10px',
    display: 'block',
    width: '100%',
    height: '40px',
    borderRadius: '5px',
    padding: '0 20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Import_Dataset" />
      <div>
        <label htmlFor="form-select" style={{ fontWeight: 'bold' }}>Select a form:</label>
        <select id="form-select" value={selectedForm} onChange={handleSelectChange} style={selectStyle}>
          <option value="" style={selectStyle}>Please Select A Form</option>
          <option value="SalesDataEntry" style={selectStyle}>Insert Invoice</option>
          <option value="CustomerDataEntry" style={selectStyle}>Create New Customer</option>
          <option value="TransporterDataEntry" style={selectStyle}>Create New Transporter</option>
          <option value="UnitPriceDataEntry" style={selectStyle}>Create New Product</option>
        </select>
      </div>
      {selectedForm === 'SalesDataEntry' && <SalesDataEntry />}
      {selectedForm === 'CustomerDataEntry' && <CustomerDataEntry />}
      {selectedForm === 'TransporterDataEntry' && <TransporterDataEntry />}
      {selectedForm === 'UnitPriceDataEntry' && <UnitPriceDataEntry />}
      <br /><Forms />
    </div>

  );
};

export default Import_Dataset;

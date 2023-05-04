import React, { useState } from 'react';
import {
  Header, SalesDataEntry, CustomerDataEntry, TransporterDataEntry, UnitPriceDataEntry
} from '../components';

const Import_Dataset = () => {
  const [selectedForm, setSelectedForm] = useState(''); //useState() empty because set default no form selected

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
    fontSize: '1rem',
  };
  const buttonStyle = {
    backgroundColor: 'rgb(3,201,215)',
    color: 'white',
    marginTop: '10px',    
    marginBottom: '10px',
    display: 'block',
    width: '30%',
    height: '40px',
    borderRadius: '5px',
    padding: '0 20px',
    cursor: 'pointer',
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Import_Dataset" />
      <div>
        <p style={{ fontWeight: 'bold' }}>Import Excel</p>
        <button type="button" style={buttonStyle}>
        Press Import Csv</button>
      </div>
      <div>
        <label htmlFor="form-select" style={{ fontWeight: 'bold' }}>Select a form:</label>
        <select id="form-select" value={selectedForm} onChange={handleSelectChange} style={selectStyle}>
          <option value="" style={selectStyle}>Please Select A Form</option>
          <option value="SalesDataEntry" style={selectStyle}>Insert Invoice</option>
          <option value="CustomerDataEntry" style={selectStyle}>Create New Customer</option>
          <option value="TransporterDataEntry" style={selectStyle}>Create New Transporter</option>
          <option value="UnitPriceDataEntry" style={selectStyle}>Create New Product</option>
          {/* <option value="TopProduct" style={selectStyle}>Test</option> */}
        </select>
      </div>
      {selectedForm === 'SalesDataEntry' && <SalesDataEntry />}
      {selectedForm === 'CustomerDataEntry' && <CustomerDataEntry />}
      {selectedForm === 'TransporterDataEntry' && <TransporterDataEntry />}
      {selectedForm === 'UnitPriceDataEntry' && <UnitPriceDataEntry />}
      {/* {selectedForm === 'TopProduct' && <TopProduct/>} */}
    </div>

  );
};

export default Import_Dataset;

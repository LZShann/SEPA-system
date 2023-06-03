import React, { useState } from 'react';
import {
  Header, SalesDataEntry, CustomerDataEntry, TransporterDataEntry, UnitPriceDataEntry
} from '../components';
import { useCSVReader } from 'react-papaparse';
import './Import_Dataset.css';

const Import_Dataset = () => {
  const [selectedForm, setSelectedForm] = useState(''); //useState() empty because set default no form selected
  const { CSVReader } = useCSVReader();
  const [parsedData, setParsedData] = useState('');

  const handleSelectChange = (event) => {
    setSelectedForm(event.target.value);
  };

  const handleUploadAccepted = (results) => {
    console.log('---------------------------');
    console.log(results);
    console.log('---------------------------');
    setParsedData(JSON.stringify(results)); // Store the parsed data as a string in state
  };

return (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Import_Dataset" />
    <CSVReader onUploadAccepted={handleUploadAccepted}>
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <div className="csvReader">
            <button type='button' {...getRootProps()} className="browseFile">
              Browse 
            </button>
            <div className="acceptedFileBox">
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} className="removeButtonStyle">
              Remove
            </button>
          </div>
          <ProgressBar style={{ backgroundColor: 'lightgreen' }} />
        </>
      )}
    </CSVReader>
    <div>
      <label htmlFor="form-select" className={{ fontWeight: 'bold' }}>Select a form:</label>
      <select id="form-select" value={selectedForm} onChange={handleSelectChange} className="selectStyle">
        <option value="" className="selectStyle">Please Select A Form</option>
        <option value="SalesDataEntry" className="selectStyle">Insert Invoice</option>
        <option value="CustomerDataEntry" className="selectStyle">Create New Customer</option>
        <option value="TransporterDataEntry" className="selectStyle">Create New Transporter</option>
        <option value="UnitPriceDataEntry" className="selectStyle">Create New Product</option>
        {/* <option value="TopProduct" className="selectStyle">Test</option> */}
      </select>
    </div>
    {selectedForm === 'SalesDataEntry' && <SalesDataEntry />}
    {selectedForm === 'CustomerDataEntry' && <CustomerDataEntry />}
    {selectedForm === 'TransporterDataEntry' && <TransporterDataEntry />}
    {selectedForm === 'UnitPriceDataEntry' && <UnitPriceDataEntry />}
    {/* {selectedForm === 'TopProduct' && <TopProduct/>} */}
    {parsedData && (
        <span className="spanStyle">{parsedData}</span> // Display the parsed data in a <span> element
      )}
  </div>

);
};

export default Import_Dataset;

import React, { useState } from 'react';
import { SalesDataEntry, CustomerDataEntry, TransporterDataEntry, UnitPriceDataEntry } from '../components';
import { Navbar, Footer, Sidebar, Header } from '../components';
import { useCSVReader } from 'react-papaparse';
import { useStateContext } from '../contexts/ContextProvider';
import './Import_Dataset.css';

const Import_Dataset = () => {
  const { activeMenu, currentColor } = useStateContext();
  

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
  <div className='flex relative'>
    {activeMenu ? (
            <div className="w-72 fixed sidebar bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg w-full min-h-screen flex-2 '
            }
          >
      <div className="fixed md:static bg-main-bg navbar w-full ">
              <Navbar />
      </div>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Pages" title="Import_Dataset" />
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
    <Footer />
    </div>
  </div>
  );
};

export default Import_Dataset;

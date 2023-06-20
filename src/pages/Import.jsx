import React, { useState } from 'react';
import { SalesDataEntry, CustomerDataEntry, TransporterDataEntry, UnitPriceDataEntry } from '../components';
import { Navbar, Footer, Sidebar, Header } from '../components';
import { useCSVReader } from 'react-papaparse';
import { useStateContext } from '../contexts/ContextProvider';

import './Import.css';

import * as XLSX from 'xlsx';
import { format, parse } from 'date-fns';

import { supabase } from '../client';

const Import = () => {
  const { activeMenu, currentColor } = useStateContext();
  
  const [selectedForm, setSelectedForm] = useState('');
  const { CSVReader } = useCSVReader();
  const [parsedData, setParsedData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedForm(event.target.value);
  };

  const handleUploadAccepted = (results) => {
    console.log('---------------------------');
    console.log(results);
    console.log('---------------------------');
    setParsedData(JSON.stringify(results));
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
  
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
  
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
        const columnIndices = {
          sales_order_id: 0,
          order_date: 1,
          customer_id: 2,
          products: 3,
          payment_type: 4,
          quantity: 5,
          sales_man_name: 6,
          service_rating: 7,
          delivery_date: 8,
          transporter_name: 9,
          delivery_fee: 10,
        };
  
        const dataRows = jsonData.slice(1);
  
        const dataToInsert = dataRows.map((row) => {
          const rowData = {};
  
          Object.keys(columnIndices).forEach((key) => {
            const columnIndex = columnIndices[key];

            if (key === 'order_date' || key === 'delivery_date') {
              const serialNumber = row[columnIndex];
              const dateValue = new Date((serialNumber - 25569) * 86400 * 1000);
              const adjustedDate = new Date(dateValue.getTime() - dateValue.getTimezoneOffset() * 60000);
              rowData[key] = format(adjustedDate, 'yyyy-MM-dd');
           
            } else {
              rowData[key] = row[columnIndex];
            }
          });
  
          return rowData;
        });
  
        supabase
          .from('sales_data_e2')
          .insert(dataToInsert)
          .then((response) => {
            console.log('Data inserted successfully:', response);
            console.log(dataToInsert);

          })
          .catch((error) => {
            console.error('Error inserting data:', error);
          });
      };
  
      reader.readAsArrayBuffer(selectedFile);
    }
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
        <div className="m-10 md:m-10 mt-20 md:mt-10 p-5 md:p-5 bg-gray-100 rounded-3xl">
          <Header category="Pages" title="Import" />
          <div className="bg-white p-5 pt-7 border-gray-300 border-2 rounded-2xl">
            <CSVReader onUploadAccepted={handleUploadAccepted}>
              {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
                <>
                  <div>
                    <label htmlFor="form-select" className={{ fontWeight: 'bold' }}>Browse data file:</label>
                  </div>
                
                    <input
                      type="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={handleFileSelect}
                    />

                  <button onClick={handleFileUpload} className='removeButtonStyle'>Submit</button>
                </>
              )}
            </CSVReader>
            <div>
              <label htmlFor="form-select" className={{ fontWeight: 'bold' }}>Select a form:</label>
              <select id="form-select" value={selectedForm} className="selectStyle" onChange={handleSelectChange}>
                <option value="" className="selectStyle">Please Select A Form</option>
                <option value="SalesDataEntry" className="selectStyle">Insert Invoice</option>
                <option value="CustomerDataEntry" className="selectStyle">Create New Customer</option>
                <option value="TransporterDataEntry" className="selectStyle">Create New Transporter</option>
                <option value="UnitPriceDataEntry" className="selectStyle">Create New Product</option>
              </select>
            </div>
            {selectedForm === 'SalesDataEntry' && <SalesDataEntry />}
            {selectedForm === 'CustomerDataEntry' && <CustomerDataEntry />}
            {selectedForm === 'TransporterDataEntry' && <TransporterDataEntry />}
            {selectedForm === 'UnitPriceDataEntry' && <UnitPriceDataEntry />}
            {parsedData && (
              <span className="spanStyle">{parsedData}</span>
            )}
           
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Import;
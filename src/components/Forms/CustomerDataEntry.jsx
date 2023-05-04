import React, { useState } from 'react';
import './DataEntry.css'

//datepicker library
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

const CustomerDataEntry = () => {
  const [formData, setFormData] = useState({
    customerID: generateCustomerID(),
    customerAddress: '',
    customerCity: '',
    customerState: '',
    customerZip: '',
    CustomerType: '',
    Region: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Submit the form data to the database
    const { data, error } = await supabase
      .from('customer_data_entry')
      .insert([
        {
          customer_id: formData.customerID,
          customer_address: formData.customerAddress,
          customer_city: formData.customerCity,
          customer_state: formData.customerState,
          customer_zip: formData.customerZip,
          customer_type: formData.customerType,
          region: formData.region
        }
      ]);
    if (error) {
      console.log('Error inserting data:', error.message);
    } else if (data) {
      console.log('Data inserted successfully');
    }
  };

  function generateCustomerID() {
    // Generate a random ID using a library or algorithm of your choice
    return "C" + Math.floor(Math.random() * 100);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cID" className="labelStyle">Customer ID</label>
        <input
          type="text"
          className="form-control inputStyle"
          id="cID"
          name="customerID"
          value={formData.customerID}
          placeholder="..."
          min="0"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="cA" className="labelStyle">Customer Address</label>
        <input
          type="text"
          className="form-input"
          id="cA"
          name="customerAddress"
          value={formData.customerAddress}
          onChange={handleChange}
          required
          placeholder="Enter Customer Address"
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="cC" className="labelStyle">Customer City</label>
        <select
          type="number"
          className="form-control inputStyle"
          id="cC"
          name="customerCity"
          value={formData.customerCity}
          onChange={handleChange}
          required
          placeholder='Choose a Customer City'
        >
          <option value="">Select a Customer City</option>
          <option value="An">An</option>
          <option value="BatuPahat">Batu Pahat</option>
          <option value="Den">Den</option>
          <option value="Gan">Gan</option>
          <option value="Heig">Heig</option>
          <option value="Ily">Ily</option>
          <option value="Ja">Ja</option>
          <option value="JohorBahru">Johor Bahru</option>
          <option value="Kali">Kali</option>
          <option value="Kil">Kil</option>
          <option value="Kluang">Kluang</option>
          <option value="Lan">Lan</option>
          <option value="Lon">Lon</option>
          <option value="LosJac">Los Jac</option>
          <option value="Man">Man</option>
          <option value="Mon">Mon</option>
          <option value="Pan">Pan</option>
          <option value="Pashj">Pashj</option>
          <option value="Peace">Peace</option>
          <option value="Quil">Quil</option>
          <option value="Ung">Ung</option>
          <option value="Von">Von</option>
          <option value="Wing">Wing</option>
          <option value="Ziam">Ziam</option>
          <option value="Zon">Zon</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cS" className="form-label">Customer State</label>
        <select
          className="form-control inputStyle"
          id="cS"
          name="customerState"
          value={formData.customerState}
          onChange={handleChange}
          required
        >
          <option value="">Select a Customer State</option>
          <option value="Johor">Johor</option>
          <option value="Penang">Penang</option>
          <option value="Selangor">Selangor</option>
          <option value="Terengganu">Terengganu</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cZ" className="labelStyle">Customer ZIP/Postal Code</label>
        <input
          type='number'
          className="form-control inputStyle"
          id="cZ"
          name="customerZip"
          value={formData.customerZip}
          onChange={handleChange}
          placeholder='Enter Customer Zip/Postal Code'
          required
          onInput={(event) => {
            if (event.target.value.length > 5) {
              event.target.value = event.target.value.slice(0, 5);
            }
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cT" className="form-label">Customer Type</label>
        <select
          className="form-control inputStyle"
          id="cT"
          name="customerType"
          value={formData.customerType}
          onChange={handleChange}
          required
        >
          <option value="">Select a Customer Type</option>
          <option value="1">1</option>
          <option value="2">2</option>

        </select>
      </div>
      <div className="form-group">
        <label htmlFor="region" className="form-label">Region</label>
        <select
          className="form-control inputStyle"
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        >
          <option value="">Select a Region</option>
          <option value="East">East</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="West">West</option>
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-primary submitButtonStyle"
        onClick={() => alert('Data submitted successfully!')}
      >
        Submit
      </button>
    </form>
  );
};

export default CustomerDataEntry;

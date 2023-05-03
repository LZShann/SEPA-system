import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

//styling
const labelStyle = { 
  color: 'black',
  fontWeight: 'bold' ,
  fontSize: '1.0rem',
  marginTop: '10px',
  display: 'block'
};

const inputStyle = {
  backgroundColor: 'rgba(128, 128, 128, 0.2)',
  color: 'black',
  marginTop: '10px',
  display: 'block',
  width: '100%',
  height: '40px',
  border: 'none',
  borderRadius: '5px',
  padding: '0 20px',
  zIndex: '1'
};
const submitButtonStyle = {
  backgroundColor: 'rgb(25,151,245)',
  borderRadius: '5px',
  padding: '10px 20px',
  border: 'none',
  color: 'white',
  marginTop: '20px',
  cursor: 'pointer'
};
//styling

const SalesByRegion = () => {
  const [formData, setFormData] = useState({
    region: '',
    regionCode:'',
    productQuantity: '',
    productRevenue: '',
    ABC: ''
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
      .from('sales_by_region')
      .insert([
        {
          region_code: formData.regionCode,
          region: formData.region,
          product_quantity: formData.productQuantity,
          product_revenue: formData.productRevenue,
          abc : formData.ABC
        }
      ]);
    if (error) {
      console.log('Error inserting data:', error.message);
    } else if (data){
      console.log('Data inserted successfully');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="region" style={labelStyle}>Region Name</label>
        <input
          type="text"
          className="form-control"
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
          placeholder="Enter Region Name"
          style={inputStyle}
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity" style={labelStyle}>Quantity</label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          name="productQuantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          placeholder='Enter Quantity'
          style={inputStyle}
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="revenue" style={labelStyle}>Revenue</label>
        <input
          type="number"
          className="form-control"
          id="revenue"
          name="productRevenue"
          value={formData.revenue}
          onChange={handleChange}
          required
          placeholder='Enter Revenue'
          style={inputStyle}
          min="0"
        />
      </div>
      <div className="form-group">
          <label htmlFor="regionCode" className="form-label">Region Code</label>
          <input
              type="number"
              className="form-input"
              id="regionCode"
              name="regionCode"
              value={formData.regionCode}
              onChange={handleChange}
              required
              placeholder='Enter Revenue Code'
              min="0"
              onInput={(event) => {
                  if (event.target.value.length > 6) {
                    event.target.value = event.target.value.slice(0, 6);
                  }
              }}                />
      </div>
      <div className="form-group">
          <label htmlFor="ABC" className="form-label">ABC</label>
          <input
              type="text"
              className="form-input"
              id="ABC"
              name="ABC"
              value={formData.ABC}
              onChange={handleChange}
              required
              placeholder='Enter ABC number'
              min="0"
          />
      </div>
      <button type="submit" className="btn btn-primary" style={submitButtonStyle}>
        Submit
      </button>
    </form>
  );
};

export default SalesByRegion;
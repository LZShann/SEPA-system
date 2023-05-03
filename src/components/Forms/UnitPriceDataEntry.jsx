import React, { useState } from 'react';
import './DataEntry.css'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

const UnitPriceDataEntry = () => {
  const [formData, setFormData] = useState({
    productID: generateProductID(),
    productName: '',
    unitPrice: '',
    quantity: '',
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
      .from('products_data_entry')
      .insert([
        {
            product_id: formData.productID,
            product_name: formData.productName,
            unit_price: formData.unitPrice,
            quantity:  formData.quantity
        }
      ]);
    if (error) {
      console.log('Error inserting data:', error.message);
    } else if (data){
      console.log('Data inserted successfully');
    }
  };

  function generateProductID() {
    // Generate a random ID using a library or algorithm of your choice
    return "P" + Math.floor(Math.random() * 20);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="pID" className="labelStyle">Product ID</label>
        <input
          type="text"
          className="form-control inputStyle"
          id="pID"
          name="productID"
          value={formData.productID}
          placeholder="..."
          min="0"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="pN" className="labelStyle">Product Name</label>
        <input
          type="text"
          className="form-control inputStyle"
          id="pN"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
          placeholder='Enter product Name'
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="uP" className="labelStyle">Unit Price</label>
        <input
          type="number"
          className="form-control inputStyle"
          id="uP"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          required
          placeholder='Enter Unit Price (RM)'
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity" className="labelStyle">Quantity</label>
        <input
          type="number"
          className="form-control inputStyle"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          placeholder='Enter Quantity (Tons)'
          min="0"
        />
      </div>
      <button type="submit" className="btn btn-primary submitButtonStyle">
        Submit
      </button>
    </form>
  );
};

export default UnitPriceDataEntry;

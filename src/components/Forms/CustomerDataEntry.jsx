import React, { useState } from 'react';
import './DataEntry.css'

//datepicker library
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomerDataEntry = () => {
  const [formData, setFormData] = useState({
    customerID: generateSalesOrderID(),
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

  const handleSubmit = e => {
    e.preventDefault();
    alert('Form submitted successfully!');
    // TODO: Submit the form data to the database
    console.log(formData);
  };

  function generateSalesOrderID() {
    // Generate a random ID using a library or algorithm of your choice
    return "SO" + Math.floor(Math.random() * 1000);
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
          id="cA" // htmlFor and id must match
          name="customerAddress"
          value={formData.customerAddress} // variable name must match the name and inside useState
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
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="Golden">Golden</option>
          <option value="Green">Green</option>
          <option value="Red">Red</option>
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
          <option value="" style={{ color: 'gray' }}>Select a Customer State</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="Golden">Golden</option>
          <option value="Green">Green</option>
          <option value="Red">Red</option>
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
          <option value="" style={{ color: 'gray' }}>Select a Customer State</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="Golden">Golden</option>
          <option value="Green">Green</option>
          <option value="Red">Red</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dD" className="form-label">Region</label>
        <select
          className="form-control inputStyle"
          id="cS"
          name="customerState"
          value={formData.customerState}
          onChange={handleChange}
          required
        >
          <option value="" style={{ color: 'gray' }}>Select a Customer State</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="Golden">Golden</option>
          <option value="Green">Green</option>
          <option value="Red">Red</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary submitButtonStyle">
        Submit
      </button>
    </form>
  );
};

export default CustomerDataEntry;

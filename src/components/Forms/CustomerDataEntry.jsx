import React, { useState } from 'react';
import './DataEntry.css'

//datepicker library
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

  const handleSubmit = e => {
    e.preventDefault();
    alert('Form submitted successfully!');
    // TODO: Submit the form data to the database
    console.log(formData);
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
        <label htmlFor="dD" className="form-label">Region</label>
        <select
          className="form-control inputStyle"
          id="cS"
          name="customerState"
          value={formData.customerState}
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
      <button type="submit" className="btn btn-primary submitButtonStyle">
        Submit
      </button>
    </form>
  );
};

export default CustomerDataEntry;

import React, { useState } from 'react';

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

const Form = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productQuantity: '',
    productRevenue: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Submit the form data to the database
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" style={labelStyle}>Product Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="productName"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter Product Name"
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
      <button type="submit" className="btn btn-primary" style={submitButtonStyle}>
        Submit
      </button>
    </form>
  );
};

export default Form;

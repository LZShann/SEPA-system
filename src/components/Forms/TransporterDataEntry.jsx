import React, { useState } from 'react';
import './DataEntry.css'

const SalesDataEntry = () => {
  const [formData, setFormData] = useState({
    transporterID: generateTransporterID(),
    transporterType: '',
    customerID: '',
    transporterTypeLabel: '',
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

  function generateTransporterID() {
    // Generate a random ID using a library or algorithm of your choice
    return "T" + Math.floor(Math.random() * 50);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="tID" className="labelStyle">Transporter ID</label>
        <input
          type="text"
          className="form-control inputStyle"
          id="tID"
          name="transporterID"
          value={formData.transporterID}
          placeholder="..."
          min="0"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="tFT" className="form-label">Transporter/Forwarder Type</label>
        <select
          className="form-control inputStyle"
          id="tFT"
          name="transporterType"
          value={formData.transporterType}
          onChange={handleChange}
          required
        >
          <option value="">Select a Type</option>
          <option value="Forwarder">Forwarder</option>
          <option value="Transporter">Transporter</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tFTL" className="form-label">Transporter/Forwarder Type Label</label>
        <select
          className="form-control inputStyle"
          id="tFTL"
          name="transporterTypeLabel"
          value={formData.transporterTypeLabel}
          onChange={handleChange}
          required
        >
          <option value="">Select a Label</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="H">H</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tFN" className="labelStyle">Transporter/Forwarder Name</label>
        <input
          type="text"
          className="form-input"
          id="tFN"
          name="transporterName"
          value={formData.transporterName}
          onChange={handleChange}
          required
          placeholder="Enter Transporter Name"
        />
      </div>
      <button type="submit" className="btn btn-primary submitButtonStyle">
        Submit
      </button>
    </form>
  );
};

export default SalesDataEntry;

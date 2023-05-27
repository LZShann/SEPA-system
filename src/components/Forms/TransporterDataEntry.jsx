import React, { useState } from 'react';
import './DataEntry.css'

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

const TransporterDataEntry = () => {
  const [formData, setFormData] = useState({
    // transporterID: generateTransporterID(),
    transporterID: '',
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

  const handleSubmit = async e => {
    e.preventDefault();
    // Submit the form data to the database
    const { data, error } = await supabase
      .from('transporter_data_entry')
      .insert([
        {
          transporter_id: formData.transporterID,
          transporter_name: formData.transporterName,
          transporter_type: formData.transporterType,
          transporter_type_label: formData.transporterTypeLabel
        }
      ]);
    if (error) {
      console.log('Error inserting data:', error.message);
    } else if (data) {
      console.log('Data inserted successfully');
    }
  };

  // function generateTransporterID() {
  //   // Generate a random ID using a library or algorithm of your choice
  //   return "T" + Math.floor(Math.random() * 50);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="tID" className="labelStyle">Transporter ID</label>
        <input
          type="number"
          className="form-control inputStyle"
          id="tID"
          name="transporterID"
          value={formData.transporterID}
          onChange={handleChange}
          required
          placeholder="Enter Transporter ID"
          min="0"
        // disabled
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

export default TransporterDataEntry;

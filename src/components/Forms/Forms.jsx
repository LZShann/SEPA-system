import React, { useState } from 'react';
import 'Forms.css';


const Forms = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productQuantity: '',
    productRevenue: '',
    regionName: '',
    regionQuantity: '',
    regionRevenue: '',
    regionCode: '',
    ABC: '',
    monthProductName: '',
    monthProductQuantity: '',
    monthProductRevenue: '',
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
    <div>
        <h2 className="title-md">Top Product</h2>
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="productName" className="form-label">Product Name</label>
                <input
                    type="text"
                    className="form-input"
                    id="productName" // htmlFor and id must match
                    name="productName"
                    value={formData.productName} // variable name must match the name and inside useState
                    onChange={handleChange}
                    required
                    placeholder="Enter Product Name"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="productQuantity" className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-input"
                    id="productQuantity"
                    name="productQuantity"
                    value={formData.productQuantity}
                    onChange={handleChange}
                    required
                    placeholder='Enter Quantity'
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="productRevenue" className="form-label">Revenue</label>
                <input
                    type="number"
                    className="form-input"
                    id="productRevenue"
                    name="productRevenue"
                    value={formData.productRevenue}
                    onChange={handleChange}
                    required
                    placeholder='Enter Revenue'
                    min="0"
                />
            </div>
        </form>

        <h2 className="title-md">Sales By Region</h2>
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="regionName" className="form-label">Region Name</label>
                <input
                    type="text"
                    className="form-input"
                    id="regionName" 
                    name="regionName"
                    value={formData.regionName}
                    onChange={handleChange}
                    required
                    placeholder="Enter Region Name"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="regionQuantity" className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-input"
                    id="regionQuantity"
                    name="regionQuantity"
                    value={formData.regionQuantity}
                    onChange={handleChange}
                    required
                    placeholder='Enter Quantity'
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="regionRevenue" className="form-label">Revenue</label>
                <input
                    type="number"
                    className="form-input"
                    id="regionRevenue"
                    name="regionRevenue"
                    value={formData.regionRevenue}
                    onChange={handleChange}
                    required
                    placeholder='Enter Revenue'
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
        </form>

        <h2 className="title-md">Sales By Month</h2>
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="monthProductName" className="form-label">Product Name</label>
                <input
                    type="text"
                    className="form-input"
                    id="monthProductName"
                    name="monthProductName"
                    value={formData.monthProductName}
                    onChange={handleChange}
                    required
                    placeholder="Enter Product Name"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="monthProductQuantity" className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-input"
                    id="monthProductQuantity"
                    name="monthProductQuantity"
                    value={formData.monthProductQuantity}
                    onChange={handleChange}
                    required
                    placeholder='Enter Quantity'
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="monthproductRevenue" className="form-label">Revenue</label>
                <input
                    type="number"
                    className="form-input"
                    id="monthproductRevenue"
                    name="monthproductRevenue"
                    value={formData.monthproductRevenue}
                    onChange={handleChange}
                    required
                    placeholder='Enter Revenue'
                    min="0"
                />
            </div>
            <button type="submit" className="form-button">
                Submit
            </button>
        </form>
    </div>
  );
};

export default Forms;

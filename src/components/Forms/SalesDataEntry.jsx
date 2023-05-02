import React, { useState } from 'react';
import './SalesDataEntry.css'

//datepicker library
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SalesDataEntry = () => {
    const [formData, setFormData] = useState({
        salesOrderID: generateSalesOrderID(),
        orderDate: '',
        customerID: '',
        products: '',
        paymentType: '',
        quantity: '',
        deliveryDate: '',
        deliveryFee: '',
        transporter: ''
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
                <label htmlFor="soID" className="labelStyle">Sales Order ID</label>
                <input
                    type="text"
                    className="form-control inputStyle"
                    id="soID"
                    name="salesOrderID"
                    value={formData.salesOrderID}
                    placeholder="..."
                    min="0"
                    disabled
                />
            </div>
            <div className="form-group">
                <label htmlFor="OD" className="labelStyle">Order Date</label>
                <DatePicker
                    className="form-control inputStyle"
                    id="OD"
                    name="orderDate"
                    selected={formData.orderDate}
                    onChange={(date) => setFormData({ ...formData, orderDate: date })}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select the Order Date"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="cID" className="labelStyle">Customer ID</label>
                <input
                    type="number"
                    className="form-control inputStyle"
                    id="cID"
                    name="customerID"
                    value={formData.customerID}
                    onChange={handleChange}
                    required
                    placeholder='Enter Customer ID'
                    min="0"
                    onInput={(event) => {
                        if (event.target.value.length > 5) {
                            event.target.value = event.target.value.slice(0, 5);
                        }
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="products" className="form-label">Products</label>
                <select
                    className="form-control inputStyle"
                    id="products"
                    name="products"
                    value={formData.products}
                    onChange={handleChange}
                    required
                >
                    <option value="" style={{ color: 'gray' }}>Select a Product Type</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Golden">Golden</option>
                    <option value="Green">Green</option>
                    <option value="Red">Red</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="paymentType" className="labelStyle">Payment Type</label>
                <select
                    className="form-control inputStyle"
                    id="paymentType"
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Payment Type</option>
                    <option value="bankIn">Bank In</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="creditCard">Credit Card</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-control inputStyle"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    placeholder='Enter Purchased Quantity'
                    min="0"
                    onInput={(event) => {
                        if (event.target.value.length > 5) {
                            event.target.value = event.target.value.slice(0, 5);
                        }
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="DD" className="form-label">Delivery Date</label>
                <DatePicker
                    className="form-control inputStyle"
                    id="DD"
                    name="deliveryDate"
                    selected={formData.deliveryDate}
                    onChange={(date) => setFormData({ ...formData, deliveryDate: date })}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select the Delivery Date"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="DF" className="form-label">Delivery Fee</label>
                <input
                    type="number"
                    className="form-input"
                    id="DF"
                    name="deliveryFee"
                    value={formData.deliveryFee}
                    onChange={handleChange}
                    required
                    placeholder='Enter Delivery Fee'
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="transporter" className="form-label">Transporter</label>
                <input
                    type="number"
                    className="form-input"
                    id="transporter"
                    name="transporter"
                    value={formData.transporter}
                    onChange={handleChange}
                    required
                    placeholder='Enter Transporter Number'
                    min="0"
                />
            </div>
            <button type="submit" className="btn btn-primary submitButtonStyle">
                Submit
            </button>
        </form>
    );
};

export default SalesDataEntry;

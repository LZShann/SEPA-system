import React, { useState } from 'react';
import './DataEntry.css'

//datepicker library
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);

const SalesDataEntry = () => {
    const [formData, setFormData] = useState({
        // salesOrderID: generateSalesOrderID(),
        salesOrderID: '',
        salesManName: '',
        orderDate: '',
        customerID: '',
        products: '',
        paymentType: '',
        quantity: '',
        deliveryDate: '',
        deliveryFee: '',
        transporterName: '',
        serviceRating: ''
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
            .from('sales_data_entry')
            .insert([
                {
                    sales_order_id: formData.salesOrderID,
                    sales_man_name: formData.salesManName,
                    order_date: formData.orderDate,
                    customer_id: formData.customerID,
                    products: formData.products,
                    payment_type: formData.paymentType,
                    quantity: formData.quantity,
                    delivery_date: formData.deliveryDate,
                    delivery_fee: formData.deliveryFee,
                    transporter_name: formData.transporterName,
                    service_rating: formData.serviceRating
                }
            ]);
        if (error) {
            console.log('Error inserting data:', error.message);
        } else if (data) {
            console.log('Data inserted successfully');
        }
    };


    // function generateSalesOrderID() {
    //     // Generate a random ID using a library or algorithm of your choice
    //     return "SO" + Math.floor(Math.random() * 1000);
    // }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="soID" className="labelStyle">Sales Order ID</label>
                <input
                    type="number"
                    className="form-control inputStyle"
                    id="soID"
                    name="salesOrderID"
                    value={formData.salesOrderID}
                    onChange={handleChange}
                    required
                    placeholder="Enter Sales Order ID"
                    min="0"
                // disabled
                />
            </div>
            <div className="form-group">
                <label htmlFor="salesManName" className="labelStyle">Sales Man</label>
                <input
                    type="text"
                    className="form-control inputStyle"
                    id="salesManName"
                    name="salesManName"
                    value={formData.salesManName}
                    onChange={handleChange}
                    required
                    // disabled
                    placeholder="Enter Sales Man Name"
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
                    <option value="">Select a Product Type</option>
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
                    placeholder='Enter Delivery Fee (RM)'
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="transporterName" className="form-label">Transporter Name</label>
                <input
                    type="text"
                    className="form-input"
                    id="transporterName"
                    name="transporterName"
                    value={formData.transporterName}
                    onChange={handleChange}
                    required
                    placeholder='Enter Transporter Name'
                />
            </div>
            <div className="form-group">
                <label htmlFor="serviceRating" className="labelStyle">Service Rating</label>
                <select
                    className="form-control inputStyle"
                    id="serviceRating"
                    name="serviceRating"
                    value={formData.serviceRating}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Rating</option>
                    <option value="Worse">Worse</option>
                    <option value="Average">Average</option>
                    <option value="Good">Good</option>
                    <option value="Excellence">Excellence</option>
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

export default SalesDataEntry;

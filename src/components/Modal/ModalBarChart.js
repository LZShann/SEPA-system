import React, { useState } from 'react';
import "./Modal.css";
import { MdOutlineCancel } from "react-icons/md";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aehwgrirrnhmatqmqcsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHdncmlycm5obWF0cW1xY3NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg2NTg4MywiZXhwIjoxOTk2NDQxODgzfQ.DeXxoWY65kzpbvdxME16mAHj2KGMwDRg_jEGgUIxKc0';
const supabase = createClient(supabaseUrl, supabaseKey);
const userName = sessionStorage.getItem('currentUserName');
console.log(userName);
function ModalBarChart({ setOpenModal, onGenerateChart }) {

    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenModal(false);
        // get selected form title and send to Statistic.jsx
        onGenerateChart(formData.selectTitle);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        className="closeButton"
                        onClick={() => setOpenModal(false)}
                    >
                        <MdOutlineCancel />
                    </button>
                </div>
                <div className="title">
                    <h1>Add Bar Chart</h1>
                </div>
                <div className="body">
                    <form onSubmit={handleSubmit}>
                        <div className="selectTitleRow">
                            <span className="selectTitle">Select Title:</span>
                            <select
                                className="selectModalStyle"
                                name="selectTitle"
                                value={formData.selectOption}
                                onChange={handleChange}
                            >
                                <option value="" className="selectModalStyle">Select an Option</option>
                                <option value="totalSales" className="selectModalStyle">Total Sales</option>
                                {/* <option value="Option 1">Total Sales (ADMIN)</option>
                                <option value="Option 2">Top 3 Products (ADMIN)</option> */}
                                <option value="topCustomer" className="selectModalStyle">Top Customer</option>
                                <option value="topSalesProducts" className="selectModalStyle">Top Sales Products</option>
                                {/* <option value="Option 3">Top Sales Products (ADMIN)</option>
                                <option value="Option 3">Top Sales By Region (ADMIN)</option> */}
                                <option value="topSalesByRegionByMonth" className="selectModalStyle">Top Sales By Region & Month</option>
                                {/* <option value="Option 3">Top Sales By Region & Month (ADMIN)</option> */}
                                {/* <option value="salesByRegion3">Revenue Performance (Sales By Region 3)</option> */}
                            </select>
                        </div>
                        {formData.selectTitle === "totalSales" && (
                            <div className="selectRow">
                                <label className="selectTitle">Sales Man:</label>
                                <input
                                    type="text"
                                    className="selectModalDropdownStyle"
                                    id="salesManName"
                                    name="salesManName"
                                    value={userName}
                                    disabled
                                />
                                {/* <label className="selectTitle">Select Region:</label>
                                <select
                                    className="selectModalDropdownStyle"
                                    name="totalSales"
                                    value={formData.totalSales}
                                    onChange={handleChange}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="east">EAST</option>
                                    <option value="north">NORTH</option>
                                    <option value="south">SOUTH</option>
                                    <option value="west">WEST</option>
                                </select> */}
                            </div>
                        )}
                        {formData.selectTitle === "topCustomer" && (
                            <div className="selectRow">
                                <label className="selectTitle">Sales Man:</label>
                                <input
                                    type="text"
                                    className="selectModalDropdownStyle"
                                    id="salesManName"
                                    name="salesManName"
                                    value={userName}
                                    disabled
                                />
                                {/* <label className="selectTitle">Type:</label>
                                <select
                                    className="selectModalDropdownStyle"
                                    name="topCustomer"
                                    value={formData.topCustomer}
                                    onChange={handleChange}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="top3">Top 3</option>
                                    <option value="top5">Top 5</option>
                                    <option value="top10">Top 10</option>
                                </select> */}
                            </div>
                        )}
                        {formData.selectTitle === "topSalesProducts" && (
                            <div className="selectRow">
                                <label className="selectTitle">Sales Man:</label>
                                <input
                                    type="text"
                                    className="selectModalDropdownStyle"
                                    id="salesManName"
                                    name="salesManName"
                                    value={userName}
                                    disabled
                                />
                                {/* <label className="selectTitle">Type:</label>
                                <select
                                    className="selectModalDropdownStyle"
                                    name="topCustomer"
                                    value={formData.topCustomer}
                                    onChange={handleChange}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="top3">Top 3</option>
                                    <option value="top5">Top 5</option>
                                </select> */}
                            </div>
                        )}
                        {formData.selectTitle === "topSalesByRegionByMonth" && (
                            <div className="selectRow">
                                <label className="selectTitle">Sales Man:</label>
                                <input
                                    type="text"
                                    className="selectModalDropdownStyle"
                                    id="salesManName"
                                    name="salesManName"
                                    value={userName}
                                    disabled
                                />
                                {/* <label className="selectTitle">Type:</label>
                                <select
                                    className="selectModalDropdownStyle"
                                    name="topCustomer"
                                    value={formData.topCustomer}
                                    onChange={handleChange}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="quater1">Q1</option>
                                    <option value="quater2">Q2</option>
                                    <option value="quater3">Q3</option>
                                    <option value="quater4">Q4</option>
                                    <option value="quater4">Yearly</option>
                                </select> */}
                            </div>
                        )}
                        {/* {formData.selectTitle === "salesByRegion3" && (
                            <div className="selectRow">
                                <label className="selectTitle">Select Option:</label>
                                <select
                                    className="selectModalDropdownStyle"
                                    name="salesByRegion3"
                                    value={formData.salesByRegion3}
                                    onChange={handleChange}
                                >
                                    <option value="">Select an Option</option>
                                    <option value="Option1">Option 1</option>
                                    <option value="Option2">Option 2</option>
                                    <option value="Option3">Option 3</option>
                                </select>
                            </div>
                        )} */}
                        <div className="footer">
                            <button
                                type="button"
                                className="footerButton"
                                id="cancelBtn"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="footerButton generateButton">
                                Generate
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalBarChart;

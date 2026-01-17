import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
const LTSDealCreation = () => {
    const location = useLocation();
    const { entityName, uen } = location.state || {}; // Get passed state

    // State for form fields
    const [formData, setFormData] = useState({
        transactionSummary: entityName || 'jan09',
        dealId: uen ? Math.floor(100000 + Math.random() * 900000).toString() : '1178232', // Generate random 6-digit Deal ID if new
        lastUpdated: 'Jan 15, 2026',
        createdBy: 'Reddy, Madduri Maheshwar',
        newBusiness: false,
        rarocModel: '',
        purposeOfRequest: 'Select',
        currency: 'CAD',
        documentation: '',
        comments: ''
    });

    return (
        <div style={{ display: 'flex', height: '100%', backgroundColor: '#f5f5f5', fontSize: '12px' }}>
            {/* Left Sidebar - Deal Navigation */}
            <div style={{ width: '220px', backgroundColor: '#e6e6e6', borderRight: '1px solid #ccc' }}>
                <div style={{ padding: '10px', fontWeight: 'bold', borderBottom: '1px solid #ccc', backgroundColor: '#d9d9d9' }}>
                    DEAL NAVIGATION <span style={{ float: 'right' }}>&#9664;</span>
                </div>
                <div style={{ padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#d0e0f0' }}>&gt; Borrower Credit Summary</div>
                {['Deal Preferences', 'Collateral Pool', 'Regulatory Data Capture', 'Covenants & Triggers', 'Exception and Elevation ...', 'Event Tracking', '> Connection', 'Transaction Commentary', 'Error Log'].map((item, idx) => (
                    <div key={idx} style={{ padding: '10px', borderBottom: '1px solid #ccc', color: '#333' }}>
                        {item}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Top Toolbar (Replicating the blue header strip from screenshot) */}
                <div style={{ backgroundColor: '#005eb8', color: 'white', padding: '5px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span>Help</span>
                        <div style={{ position: 'relative' }}>
                            <input type="text" placeholder="Enter your Keyword(s) here" style={{ padding: '2px 5px', fontSize: '11px' }} />
                            <span style={{ position: 'absolute', right: '5px', top: '2px', color: '#666' }}>&#128269;</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '16px' }}>
                        {/* Icons similar to screenshot */}
                        <span>&#8853;</span> <span>&#11123;</span> <span>&#11120;</span> <span>&#128196;</span> <span>&#128221;</span> <span>&#9989;</span> <span>&#11123;</span> <span>&#9776;</span> <span>&#9432;</span> <span>&#10006;</span>
                    </div>
                </div>

                {/* Section Header: Credit Application */}
                <div style={{
                    backgroundColor: '#005eb8',
                    color: 'white',
                    padding: '8px 15px',
                    fontWeight: 'bold',
                    marginTop: '10px',
                    marginRight: '10px',
                    marginLeft: '10px',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px'
                }}>
                    Credit Application
                </div>

                {/* Form Content */}
                <div style={{
                    backgroundColor: 'white',
                    margin: '0 10px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderTop: 'none'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        {/* Column 1 */}
                        <div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Transaction Summary for <span style={{ color: 'red' }}>*</span></label>
                                <input type="text" value={formData.transactionSummary} readOnly style={{ width: '100%', padding: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }}>New Business - per Policy <span style={{ cursor: 'pointer' }}>&#9432;</span></label>
                                <div style={{ marginTop: '5px' }}>
                                    <input type="checkbox" checked={formData.newBusiness} readOnly />
                                </div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>RAROC Model <span style={{ cursor: 'pointer' }}>&#9432;</span></label>
                                <select style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}>
                                    <option></option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Currency Used for CaR Report</label>
                                <select value={formData.currency} readOnly style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}>
                                    <option>CAD</option>
                                </select>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Deal ID</label>
                                <input type="text" value={formData.dealId} readOnly style={{ width: '100%', padding: '5px', backgroundColor: '#ccc', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Purpose of Request <span style={{ color: 'red' }}>*</span></label>
                                <select value={formData.purposeOfRequest} style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}>
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Last Updated</label>
                                <input type="text" value={formData.lastUpdated} readOnly style={{ width: '100%', padding: '5px', backgroundColor: '#ccc', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Created by</label>
                                <input type="text" value={formData.createdBy} readOnly style={{ width: '100%', padding: '5px', backgroundColor: '#ccc', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Documentation <span style={{ cursor: 'pointer' }}>&#9432;</span></label>
                                <select style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Purpose of Request Comments</label>
                        <textarea style={{ width: '100%', height: '80px', border: '1px solid #ccc' }}></textarea>
                    </div>
                </div>

                {/* Section Header: Borrower Summary */}
                <div style={{
                    backgroundColor: '#005eb8',
                    color: 'white',
                    padding: '8px 15px',
                    fontWeight: 'bold',
                    marginTop: '10px',
                    marginRight: '10px',
                    marginLeft: '10px',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>Borrower Summary</span>
                    <span>&#9660;</span>
                </div>
                <div style={{
                    backgroundColor: '#e6e6e6',
                    margin: '0 10px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderTop: 'none',
                    display: 'flex',
                    gap: '10px'
                }}>
                    <button style={{ padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', color: '#ccc' }}>Delete</button>
                    <button style={{ padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#005eb8', color: 'white' }}>Refresh</button>
                    <button style={{ padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', color: '#666' }}>Add</button>

                    <span style={{ marginLeft: 'auto', fontSize: '11px', fontStyle: 'italic', alignSelf: 'center' }}>Last Refresh on 15-Jan-2026</span>
                    <button style={{ padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#005eb8', color: 'white', fontSize: '11px' }}>Refresh Covenants & Triggers</button>
                </div>

            </div>
        </div>
    );
};

export default LTSDealCreation;

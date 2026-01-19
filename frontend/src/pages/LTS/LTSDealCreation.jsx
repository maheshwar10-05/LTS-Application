import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LTSDealCreation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { entityName, uen, borrowerId } = location.state || {};

    const [formData, setFormData] = useState({
        transactionSummary: entityName || '',
        dealId: uen ? Math.floor(100000 + Math.random() * 900000).toString() : '',
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdBy: 'User Name', // Should come from context
        newBusiness: false,
        rarocModel: '',
        purposeOfRequest: 'Select',
        currency: 'CAD',
        documentation: '',
        comments: ''
    });

    // Preferences for sections
    const [preferences, setPreferences] = useState({
        general: true,
        highVolume: false,
        smallCommercial: false
    });

    // Toggle preferences modal? For now just simulate checkboxes as requested if "Deal Preferences" page is separate or inline.
    // The request said: "If a user clicks on a deal ... deal preferences page should open."
    // And also: "When the user selects a deal and clicks on Deal Preferences.. page should show hidden sections based on selected checkboxes"
    // So likely "Deal Preferences" is a separate view or modal to configure WHAT is seen on the Deal Page.
    // For simplicity, I'll add a "Deal Preferences" button/section within this page or a toggle.

    const [showPreferences, setShowPreferences] = useState(false);

    useEffect(() => {
        if (!entityName && !uen) {
            // navigate('/'); // Redirect if no state (commented out for dev/testing)
        }
    }, [entityName, uen, navigate]);

    const handleSave = async () => {
        try {
            await fetch('http://localhost:5000/api/lts/deals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dealId: formData.dealId,
                    borrowerId: borrowerId, // We might need this if we have it
                    transactionSummary: formData.transactionSummary,
                    purposeOfRequest: formData.purposeOfRequest,
                    newBusiness: formData.newBusiness,
                    currency: formData.currency
                })
            });
            alert('Deal Saved!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100%', backgroundColor: '#f5f5f5', fontSize: '12px' }}>
            {/* Left Sidebar */}
            <div style={{ width: '220px', backgroundColor: '#e6e6e6', borderRight: '1px solid #ccc' }}>
                <div style={{ padding: '10px', fontWeight: 'bold', borderBottom: '1px solid #ccc', backgroundColor: '#d9d9d9' }}>
                    DEAL NAVIGATION <span style={{ float: 'right' }}>&#9664;</span>
                </div>
                <div style={{ padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#d0e0f0' }}>&gt; Borrower Credit Summary</div>

                <div onClick={() => setShowPreferences(!showPreferences)} style={{ padding: '10px', borderBottom: '1px solid #ccc', color: '#333', cursor: 'pointer', backgroundColor: showPreferences ? '#fff' : '' }}>
                    Deal Preferences
                </div>

                {['Collateral Pool', 'Regulatory Data Capture', 'Covenants & Triggers', 'Exception and Elevation ...', 'Event Tracking', '> Connection', 'Transaction Commentary', 'Error Log'].map((item, idx) => (
                    <div key={idx} style={{ padding: '10px', borderBottom: '1px solid #ccc', color: '#333' }}>
                        {item}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Deal Preferences Overlay/Section */}
                {showPreferences && (
                    <div style={{ padding: '20px', backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}>
                        <h3>Deal Preferences</h3>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <label><input type="checkbox" checked={preferences.general} onChange={(e) => setPreferences({ ...preferences, general: e.target.checked })} /> General</label>
                            <label><input type="checkbox" checked={preferences.highVolume} onChange={(e) => setPreferences({ ...preferences, highVolume: e.target.checked })} /> High Volume (RBLO)</label>
                            <label><input type="checkbox" checked={preferences.smallCommercial} onChange={(e) => setPreferences({ ...preferences, smallCommercial: e.target.checked })} /> Small Commercial</label>
                        </div>
                        <button onClick={() => setShowPreferences(false)} style={{ marginTop: '10px' }}>Close</button>
                    </div>
                )}


                {/* Top Toolbar */}
                <div style={{ backgroundColor: '#005eb8', color: 'white', padding: '5px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span>Help</span>
                        <div style={{ position: 'relative' }}>
                            <input type="text" placeholder="Enter your Keyword(s) here" style={{ padding: '2px 5px', fontSize: '11px' }} />
                            <span style={{ position: 'absolute', right: '5px', top: '2px', color: '#666' }}>&#128269;</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '16px', alignItems: 'center' }}>
                        <button onClick={handleSave} style={{ backgroundColor: 'white', color: '#005eb8', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
                    </div>
                </div>

                {/* Section Header: Credit Application */}
                {preferences.general && (
                    <>
                        <div style={{
                            backgroundColor: '#005eb8', color: 'white', padding: '8px 15px', fontWeight: 'bold',
                            marginTop: '10px', marginRight: '10px', marginLeft: '10px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px'
                        }}>
                            Credit Application
                        </div>
                        <div style={{ backgroundColor: 'white', margin: '0 10px', padding: '20px', border: '1px solid #ccc', borderTop: 'none' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Transaction Summary <span style={{ color: 'red' }}>*</span></label>
                                        <input type="text" value={formData.transactionSummary} onChange={(e) => setFormData({ ...formData, transactionSummary: e.target.value })} style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }} />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ fontWeight: 'bold' }}>New Business</label>
                                        <div style={{ marginTop: '5px' }}>
                                            <input type="checkbox" checked={formData.newBusiness} onChange={(e) => setFormData({ ...formData, newBusiness: e.target.checked })} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Deal ID</label>
                                        <input type="text" value={formData.dealId} readOnly style={{ width: '100%', padding: '5px', backgroundColor: '#ccc', border: '1px solid #ccc' }} />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Purpose of Request <span style={{ color: 'red' }}>*</span></label>
                                        <select value={formData.purposeOfRequest} onChange={(e) => setFormData({ ...formData, purposeOfRequest: e.target.value })} style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}>
                                            <option>Select</option>
                                            <option>New Deal</option>
                                            <option>Review</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Last Updated</label>
                                        <input type="text" value={formData.lastUpdated} readOnly style={{ width: '100%', padding: '5px', backgroundColor: '#ccc', border: '1px solid #ccc' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {preferences.highVolume && (
                    <div style={{ margin: '10px', padding: '10px', backgroundColor: '#eef', border: '1px solid #99f' }}>
                        <h3>High Volume (RBLO) Section</h3>
                        <p>RBLO specific fields would go here...</p>
                    </div>
                )}

                {preferences.smallCommercial && (
                    <div style={{ margin: '10px', padding: '10px', backgroundColor: '#efe', border: '1px solid #9f9' }}>
                        <h3>Small Commercial Section</h3>
                        <p>Small Commercial specific fields would go here...</p>
                    </div>
                )}

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
                <div style={{ backgroundColor: '#e6e6e6', margin: '0 10px', padding: '10px', border: '1px solid #ccc', borderTop: 'none', display: 'flex', gap: '10px' }}>
                    <button style={{ padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', color: '#ccc' }}>Delete</button>
                    <button style={{ padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#005eb8', color: 'white' }}>Refresh</button>
                    <button style={{ padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', color: '#666' }}>Add</button>
                </div>

            </div>
        </div>
    );
};

export default LTSDealCreation;

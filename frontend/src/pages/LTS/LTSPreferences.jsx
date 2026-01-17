import React, { useState } from 'react';

const LTSPreferences = () => {
    const [selectedBorrowers, setSelectedBorrowers] = useState({
        jan09: false,
        lendingTest: false,
        newBBUS: false
    });

    return (
        <div className="lts-preferences">
            {/* Breadcrumb / Title area */}
            <div style={{ padding: '0 0 10px 0', borderBottom: '1px solid #ccc', marginBottom: '15px' }}>
                <span style={{ color: 'var(--lts-blue)', fontWeight: 'bold' }}>My Preferences</span>
            </div>

            {/* My Borrower's View Settings Panel */}
            <div style={{
                border: '1px solid #0079c1',
                borderRadius: '5px',
                overflow: 'hidden',
                marginBottom: '20px',
                backgroundColor: 'white'
            }}>
                <div style={{
                    backgroundColor: '#0079c1', /* var(--lts-blue) */
                    color: 'white',
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>My Borrower's View Settings</span>
                    <span>&#9650;</span>
                </div>

                <div style={{ padding: '20px' }}>

                    <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>My Favourite Borrowers</div>

                    {/* Selection Box */}
                    <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd' }}>
                        <div style={{ padding: '10px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
                            <button disabled style={{ marginRight: '10px', padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#eee', color: '#999' }}>Delete</button>
                            <button style={{ padding: '5px 20px', borderRadius: '15px', border: 'none', backgroundColor: 'var(--lts-blue)', color: 'white' }}>Add</button>
                        </div>

                        <div style={{ backgroundColor: '#e6e6e6', padding: '8px', fontWeight: 'bold', fontSize: '12px', display: 'flex' }}>
                            <span style={{ width: '50px' }}>Select</span>
                            <span style={{ flex: 1, textAlign: 'center' }}>Borrower Name &#9650;</span>
                        </div>

                        <div style={{ backgroundColor: '#f5f5f5', padding: '8px', borderBottom: '1px solid #eee', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" style={{ marginRight: '15px' }} />
                            <span>jan09</span>
                        </div>
                        <div style={{ backgroundColor: '#f5f5f5', padding: '8px', borderBottom: '1px solid #eee', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" style={{ marginRight: '15px' }} />
                            <span>Lending test</span>
                        </div>
                        <div style={{ backgroundColor: '#f5f5f5', padding: '8px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" style={{ marginRight: '15px' }} />
                            <span>new BBUS</span>
                        </div>
                    </div>

                    {/* Columns Checkboxes */}
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '13px' }}>Columns to be Added to "My Borrowers" in Home Page</div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', maxWidth: '800px', margin: '0 auto', fontSize: '12px', textAlign: 'left' }}>
                            <label><input type="checkbox" /> Connection Name</label>
                            <label><input type="checkbox" /> Risk Rating</label>
                            <label><input type="checkbox" /> Annual Review Date</label>
                            <label><input type="checkbox" /> Rating Alert Due Date</label>

                            <label><input type="checkbox" /> Interim Review Date</label>
                            <label><input type="checkbox" /> Above the line Authorization</label>
                            <label><input type="checkbox" /> Below the line Authorization</label>
                            <label><input type="checkbox" /> Next 959 Due Date</label>

                            {/* Empty placeholders to align valid ones */}
                            <div></div>
                            <div></div>
                            <div></div>
                            <label><input type="checkbox" /> Upcoming Facility Maturity</label>

                            <div style={{ gridColumn: '4' }}>
                                <label><input type="checkbox" checked readOnly /> Prospect</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Global Deal Settings Panel (Collapsed) */}
            <div style={{
                border: '1px solid #0079c1',
                borderRadius: '5px',
                overflow: 'hidden',
                marginBottom: '20px',
                backgroundColor: 'white'
            }}>
                <div style={{
                    backgroundColor: '#0079c1',
                    color: 'white',
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>My Global Deal Settings</span>
                    <span>&#9650;</span>
                </div>
            </div>

            {/* My Default Team Members (Collapsed Header) */}
            <div style={{
                border: '1px solid #0079c1',
                borderRadius: '5px',
                overflow: 'hidden',
                backgroundColor: 'white'
            }}>
                <div style={{
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <span>My Default Team Members</span>
                    <button style={{ position: 'absolute', right: '50%', transform: 'translateX(100px)', padding: '2px 15px', backgroundColor: 'var(--lts-blue)', color: 'white', border: 'none', borderRadius: '10px' }}>Add</button>
                </div>
            </div>

        </div>
    );
};

export default LTSPreferences;

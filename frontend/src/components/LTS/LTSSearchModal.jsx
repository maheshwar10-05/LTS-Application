import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LTSSearchModal = ({ onClose, initialTerm = '' }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(initialTerm);
    const [searchStatus, setSearchStatus] = useState('idle'); // idle, searching, found, not-found, error
    const [foundDeals, setFoundDeals] = useState([]);

    const handleSearch = () => {
        setSearchStatus('searching');

        // Fetch from LocalStorage or use defaults
        const stored = localStorage.getItem('lts_borrowers');
        const allBorrowers = stored ? JSON.parse(stored) : [];

        // Simple Search Logic
        const lowerTerm = searchTerm.toLowerCase();
        const results = allBorrowers.filter(b =>
            (b.name && b.name.toLowerCase().includes(lowerTerm)) ||
            (b.uen && b.uen.includes(lowerTerm))
        );

        setTimeout(() => {
            if (results.length > 0) {
                setFoundDeals(results);
                setSearchStatus('found');
            } else {
                setFoundDeals([]);
                setSearchStatus('not-found');
            }
        }, 500);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1100
        }}>
            <div style={{
                backgroundColor: 'white',
                width: '800px',
                border: '1px solid #ccc',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    backgroundColor: '#e6e6e6',
                    padding: '8px 15px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #ccc'
                }}>
                    <span>Search Existing Entity:</span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Borrower or connection UEN / Name, or TIN / SSN or Address"
                        style={{ width: '400px', padding: '2px 5px', border: '1px solid #ccc', fontSize: '11px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span onClick={() => { setSearchTerm(''); setSearchStatus('idle'); }} style={{ marginRight: '10px', color: '#666', cursor: 'pointer' }}>&#10005;</span>
                        <button onClick={handleSearch} style={{ backgroundColor: 'var(--lts-blue)', color: 'white', border: 'none', padding: '2px 8px', cursor: 'pointer' }}>&#128269;</button>
                    </div>
                    <span style={{ cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }} onClick={onClose}>&#10005;</span>
                </div>

                {/* Error / Status Message */}
                {searchStatus === 'validation-error' && (
                    <div style={{ padding: '10px 15px', fontSize: '11px', color: 'red', backgroundColor: '#fff0f0' }}>
                        Error: Please enter a valid 7-digit UEN starting with 3 or 4.
                    </div>
                )}
                {searchStatus === 'not-found' && (
                    <div style={{ padding: '10px 15px', fontSize: '11px', color: 'red', backgroundColor: '#fff0f0' }}>
                        Error: No result has been found. Please try again.
                    </div>
                )}
                {searchStatus === 'found' && (
                    <div style={{ padding: '10px 15px', fontSize: '11px', color: 'green', backgroundColor: '#f0fff0' }}>
                        1 result found.
                    </div>
                )}


                {/* Results Table Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 60px 50px 80px 70px 60px', backgroundColor: '#ccc', fontWeight: 'bold', fontSize: '11px', textAlign: 'center' }}>
                    <div style={{ padding: '5px', borderRight: '1px solid #aaa' }}>Select &#9432;</div>
                    <div style={{ padding: '5px', borderRight: '1px solid #aaa' }}>Name</div>
                    <div style={{ padding: '5px', borderRight: '1px solid #aaa' }}>Prospect</div>
                    <div style={{ padding: '5px', borderRight: '1px solid #aaa' }}>UEN</div>
                    <div style={{ padding: '5px', borderRight: '1px solid #aaa' }}>Connection</div>
                    <div style={{ padding: '5px', borderRight: '1px solid #aaa' }}>TIN/SSN</div>
                    <div style={{ padding: '5px' }}>Address</div>
                </div>

                {/* Body Content */}
                <div style={{ height: '150px', backgroundColor: '#f9f9f9', overflowY: 'auto' }}>
                    {searchStatus === 'found' && foundDeals.map((deal, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 60px 50px 80px 70px 60px', borderBottom: '1px solid #eee', fontSize: '11px', textAlign: 'center', backgroundColor: 'white' }}>
                            <div style={{ padding: '5px' }}><input type="radio" name="selectedDeal" /></div>
                            <div style={{ padding: '5px' }}>{deal.name}</div>
                            <div style={{ padding: '5px' }}>{deal.prospect}</div>
                            <div style={{ padding: '5px' }}>{deal.uen}</div>
                            <div style={{ padding: '5px' }}>{deal.connection}</div>
                            <div style={{ padding: '5px' }}>{deal.tin}</div>
                            <div style={{ padding: '5px' }}>{deal.address}</div>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div style={{ padding: '10px', textAlign: 'right', borderTop: '1px solid #ccc' }}>
                    {searchStatus === 'not-found' && (
                        <button onClick={() => navigate('/new-entity')} style={{
                            backgroundColor: 'var(--lts-blue)',
                            color: 'white',
                            border: 'none',
                            padding: '5px 15px',
                            borderRadius: '15px',
                            fontSize: '11px',
                            marginRight: '10px',
                            cursor: 'pointer'
                        }}>Create/Convert UEN</button>
                    )}

                    <button onClick={onClose} style={{
                        backgroundColor: 'white',
                        color: '#333',
                        border: '1px solid #ccc',
                        padding: '5px 15px',
                        borderRadius: '15px',
                        fontSize: '11px',
                        cursor: 'pointer'
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LTSSearchModal;

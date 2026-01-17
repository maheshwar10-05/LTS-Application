import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LTSSearchModal from '../../components/LTS/LTSSearchModal';

const LTSDashboard = () => {
    const navigate = useNavigate();

    // Initial Mock Data (seeded if empty)
    const initialBorrowers = [
        { id: 1, rrt: '+', prospect: 'N', name: 'jan09', uen: '3000000', connection: 'Existing', tin: '123456789', address: 'Toronto, ON, Canada', arrow: 'v' },
        { id: 2, rrt: '+', prospect: 'N', name: 'Lending test', uen: '3000001', connection: 'Existing', tin: '987654321', address: 'New York, NY, USA', arrow: 'v' },
        { id: 3, rrt: '+', prospect: 'N', name: 'new BBUS', uen: '3000002', connection: 'New', tin: '456123789', address: 'Chicago, IL, USA', arrow: 'v' },
    ];

    const [borrowers, setBorrowers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [showSearchModal, setShowSearchModal] = useState(false);
    const [modalInitialTerm, setModalInitialTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('lts_borrowers');
        if (stored) {
            setBorrowers(JSON.parse(stored));
        } else {
            setBorrowers(initialBorrowers);
            localStorage.setItem('lts_borrowers', JSON.stringify(initialBorrowers));
        }
    }, []);

    // Load borrowers only for the main dashboard list (optional, or just show all/recent)
    // The user request implies the "Search" is the main interaction for finding specific things?
    // But typically a dashboard shows a list AND has a lookup.
    // We will keep the default list logic but REMOVE the inline filtering 'filteredBorrowers' logic
    // because the user wants the "search popup" to appear when searching.

    useEffect(() => {
        // Just ensure borrowers are loaded for the main/recent view if we keep it.
        // If the user wants the *original* state where maybe the dashboard was just a list, 
        // and search was a separate action.

        // We won't filter 'borrowers' here based on 'searchTerm'. 
        // Instead, 'searchTerm' will be passed to the modal.
    }, [searchTerm]);

    const toggleMenu = (id) => {
        if (openMenuId === id) {
            setOpenMenuId(null);
        } else {
            setOpenMenuId(id);
        }
    };

    const handleSearch = () => {
        setModalInitialTerm(searchTerm);
        setShowSearchModal(true);
    };

    return (
        <div className="lts-dashboard" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>

            {/* Search Bar Section */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                backgroundColor: '#f5f5f5',
                padding: '15px',
                border: '1px solid #ddd'
            }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '12px' }}>Borrower Search:</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Enter UEN or Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '5px', width: '250px', border: '1px solid #ccc' }}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            marginLeft: '10px',
                            padding: '5px 15px',
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center'
                        }}
                    >
                        <span style={{ marginRight: '5px' }}>&#128269;</span> Search
                    </button>
                    {/* Reset/Clear if needed */}
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            style={{ marginLeft: '5px', cursor: 'pointer', border: 'none', background: 'none', color: 'blue', fontSize: '11px', textDecoration: 'underline' }}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{
                border: '1px solid #ccc',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                {/* Header Strip */}
                <div style={{
                    backgroundColor: 'var(--lts-blue)', // Using global var or fallback
                    color: 'white',
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>My Borrowers</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span>&#9881;</span> {/* Settings Icon */}
                        <span>&#10060;</span> {/* Close Icon */}
                    </div>
                </div>

                {/* Table Header - Updated Columns */}
                {/* Columns: Select (i), Name, Prospect, UEN, Connection, TIN/SSN, Address */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 2fr 60px 80px 80px 100px 2fr', backgroundColor: '#e6e6e6', fontWeight: 'bold', fontSize: '11px', color: '#333' }}>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>Select &#9432;</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc' }}>Name</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>Prospect</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>UEN</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>Connection</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>TIN/SSN</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc' }}>Address</div>
                </div>

                {/* Table Rows or Not Found State */}
                <>
                    {/* We display ALL borrowers here by default, or the filtered list if we kept inline filtering 
                            BUT the user asked to "revert... when entered another pop up... was displayed".
                            So we show the standard list here, and the search happens in the MODAL. */}
                    {borrowers.map((b, idx) => (
                        <div key={idx} style={{
                            display: 'grid',
                            gridTemplateColumns: '50px 2fr 60px 80px 80px 100px 2fr',
                            borderBottom: '1px solid #eee',
                            fontSize: '12px',
                            color: '#333',
                            backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white'
                        }}>
                            {/* Select / Action Column */}
                            <div style={{
                                padding: '8px',
                                borderRight: '1px solid #eee',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                position: 'relative'
                            }}>
                                <span
                                    onClick={() => toggleMenu(b.id)}
                                    style={{ cursor: 'pointer', userSelect: 'none', color: 'var(--lts-blue)', fontSize: '16px' }}
                                >
                                    {b.rrt || '+'}
                                </span>

                                {/* Dropdown Menu */}
                                {openMenuId === b.id && (
                                    <div style={{
                                        position: 'absolute', top: '100%', left: '0', zIndex: 10,
                                        backgroundColor: 'white', border: '1px solid #ccc', boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                        whiteSpace: 'nowrap', textAlign: 'left'
                                    }}>
                                        <div
                                            onClick={() => navigate('/deal-creation', { state: { entityName: b.name, uen: b.uen } })}
                                            style={{
                                                padding: '5px 10px', fontSize: '11px', cursor: 'pointer', color: '#333', backgroundColor: 'white'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                                        >
                                            Create New LTS
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ padding: '8px', borderRight: '1px solid #eee' }}>{b.name}</div>
                            <div style={{ padding: '8px', borderRight: '1px solid #eee', textAlign: 'center' }}>{b.prospect}</div>
                            <div style={{ padding: '8px', borderRight: '1px solid #eee', textAlign: 'center' }}>{b.uen}</div>
                            <div style={{ padding: '8px', borderRight: '1px solid #eee', textAlign: 'center' }}>{b.connection}</div>
                            <div style={{ padding: '8px', borderRight: '1px solid #eee', textAlign: 'center' }}>{b.tin}</div>
                            <div style={{ padding: '8px', borderRight: '1px solid #eee' }}>{b.address}</div>
                        </div>
                    ))}
                </>

            </div>


            {/* Search Modal */}
            {
                showSearchModal && (
                    <LTSSearchModal
                        onClose={() => setShowSearchModal(false)}
                        initialTerm={modalInitialTerm}
                    />
                )
            }
        </div >
    );
};

export default LTSDashboard;

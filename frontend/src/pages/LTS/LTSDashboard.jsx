import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LTSSearchModal from '../../components/LTS/LTSSearchModal';
import LTSCreateUENModal from '../../components/LTS/LTSCreateUENModal';
import { AuthContext } from '../../context/AuthContext';

const LTSDashboard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [borrowers, setBorrowers] = useState([]);
    const [expandedBorrowerId, setExpandedBorrowerId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showCreateUENModal, setShowCreateUENModal] = useState(false);
    const [modalInitialTerm, setModalInitialTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);

    const fetchBorrowers = async () => {
        try {
            const userId = user ? user.id : 0;
            const response = await fetch(`http://localhost:5000/api/lts/borrowers?userId=${userId}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setBorrowers(data);
            }
        } catch (error) {
            console.error('Error fetching borrowers:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBorrowers();
        }
    }, [user]);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const toggleExpand = (id) => {
        setExpandedBorrowerId(expandedBorrowerId === id ? null : id);
    };

    const handleSearch = () => {
        setModalInitialTerm(searchTerm);
        setShowSearchModal(true);
    };

    const handleCreateSuccess = (newBorrower) => {
        fetchBorrowers(); // Refresh list
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
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            style={{ marginLeft: '5px', cursor: 'pointer', border: 'none', background: 'none', color: 'blue', fontSize: '11px', textDecoration: 'underline' }}
                        >
                            Clear
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setShowCreateUENModal(true)}
                    style={{ marginLeft: 'auto', padding: '5px 15px', backgroundColor: 'var(--lts-blue)', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    Create UEN
                </button>
            </div>

            {/* Main Content Area */}
            <div style={{
                border: '1px solid #ccc',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                {/* Header Strip */}
                <div style={{
                    backgroundColor: 'var(--lts-blue)',
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
                        <span>&#9881;</span>
                        <span>&#10060;</span>
                    </div>
                </div>

                {/* Table Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 2fr 60px 80px 80px 100px 2fr', backgroundColor: '#e6e6e6', fontWeight: 'bold', fontSize: '11px', color: '#333' }}>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>Select &#9432;</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc' }}>Name</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>Prospect</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>UEN</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>Connection</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc', textAlign: 'center' }}>TIN/SSN</div>
                    <div style={{ padding: '8px', borderRight: '1px solid #ccc' }}>Address</div>
                </div>

                {/* Table Rows */}
                <>
                    {borrowers.map((b, idx) => (
                        <div key={b.id}>
                            <div style={{
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
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '5px'
                                }}>
                                    <span
                                        onClick={() => toggleExpand(b.id)}
                                        style={{ cursor: 'pointer', userSelect: 'none', color: 'var(--lts-blue)', fontSize: '14px', border: '1px solid #ccc', padding: '0 4px', height: 'fit-content' }}
                                    >
                                        {expandedBorrowerId === b.id ? '-' : '+'}
                                    </span>
                                    <span
                                        onClick={() => toggleMenu(b.id)}
                                        style={{ cursor: 'pointer', userSelect: 'none', color: 'var(--lts-blue)', fontSize: '14px' }}
                                    >
                                        {b.arrow || 'v'}
                                    </span>

                                    {/* Dropdown Menu */}
                                    {openMenuId === b.id && (
                                        <div style={{
                                            position: 'absolute', top: '100%', left: '0', zIndex: 10,
                                            backgroundColor: 'white', border: '1px solid #ccc', boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                            whiteSpace: 'nowrap', textAlign: 'left'
                                        }}>
                                            <div
                                                onClick={() => navigate('/deal-creation', { state: { entityName: b.name, uen: b.uen, borrowerId: b.id } })}
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

                                <div style={{ padding: '8px', borderRight: '1px solid #eee' }}>{b.name} {b.is_favorite && <span style={{ color: 'gold' }}>&#9733;</span>}</div>
                                <div style={{ padding: '8px', borderRight: '1px solid #eee', textAlign: 'center' }}>{b.prospect}</div>
                                <div style={{ padding: '8px', borderRight: '1px solid #eee', textAlign: 'center' }}>{b.uen}</div>
                                <div style={{ padding: '8px', borderRight: '1px solid #eee', textAlign: 'center' }}>{b.connection}</div>
                                <div style={{ padding: '8px', borderRight: '1px solid #eee', textAlign: 'center' }}>{b.tin}</div>
                                <div style={{ padding: '8px', borderRight: '1px solid #eee' }}>{b.address}</div>
                            </div>

                            {/* Expanded Section */}
                            {expandedBorrowerId === b.id && (
                                <div style={{ padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#f0f8ff' }}>
                                    <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                                        <div style={{ padding: '5px 10px', fontWeight: 'bold', borderBottom: '2px solid var(--lts-blue)', color: 'var(--lts-blue)' }}>Facility Summary</div>
                                        <div style={{ padding: '5px 10px', color: '#666', cursor: 'pointer' }}>Collateral Summary</div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#333' }}>
                                        No facilities found for this borrower.
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {borrowers.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '13px' }}>
                            No borrowers found. Click "Create UEN" to add one.
                        </div>
                    )}
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

            {/* Create UEN Modal */}
            {
                showCreateUENModal && (
                    <LTSCreateUENModal
                        onClose={() => setShowCreateUENModal(false)}
                        onSuccess={handleCreateSuccess}
                    />
                )
            }
        </div>
    );
};

export default LTSDashboard;

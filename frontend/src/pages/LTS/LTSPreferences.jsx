import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LTSPreferences = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [allBorrowers, setAllBorrowers] = useState([]);
    const [selectedToAdd, setSelectedToAdd] = useState('');
    const [selectedToRemove, setSelectedToRemove] = useState({});

    useEffect(() => {
        if (user) {
            fetchFavorites();
            fetchAllBorrowers();
        }
    }, [user]);

    const fetchFavorites = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/lts/favorites/${user.id}`);
            const data = await res.json();
            setFavorites(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAllBorrowers = async () => {
        try {
            // Fetch all borrowers to populate the "Add" dropdown/search
            const res = await fetch(`http://localhost:5000/api/lts/borrowers?userId=${user.id}`);
            const data = await res.json();
            setAllBorrowers(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async () => {
        // Find borrower by name (simple implementation)
        const borrower = allBorrowers.find(b => b.name === selectedToAdd);
        if (borrower) {
            await toggleFavorite(borrower.id);
            setSelectedToAdd('');
            fetchFavorites();
        } else {
            alert('Borrower not found');
        }
    };

    const handleRemove = async () => {
        // Remove all checked
        for (const [id, checked] of Object.entries(selectedToRemove)) {
            if (checked) {
                await toggleFavorite(id);
            }
        }
        setSelectedToRemove({});
        fetchFavorites();
    };

    const toggleFavorite = async (borrowerId) => {
        try {
            await fetch('http://localhost:5000/api/lts/favorites/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, borrowerId })
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="lts-preferences">
            <div style={{ padding: '0 0 10px 0', borderBottom: '1px solid #ccc', marginBottom: '15px' }}>
                <span style={{ color: 'var(--lts-blue)', fontWeight: 'bold' }}>My Preferences</span>
            </div>

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
                    fontSize: '14px'
                }}>
                    My Borrower's View Settings
                </div>

                <div style={{ padding: '20px' }}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>My Favourite Borrowers</div>

                    <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd' }}>
                        <div style={{ padding: '10px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <button onClick={handleRemove} style={{ marginRight: '10px', padding: '5px 15px', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: '#eee', cursor: 'pointer' }}>Delete</button>
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <input
                                    list="borrower-list"
                                    value={selectedToAdd}
                                    onChange={(e) => setSelectedToAdd(e.target.value)}
                                    placeholder="Enter borrower name"
                                    style={{ padding: '5px' }}
                                />
                                <datalist id="borrower-list">
                                    {allBorrowers.map(b => <option key={b.id} value={b.name} />)}
                                </datalist>
                                <button onClick={handleAdd} style={{ padding: '5px 20px', borderRadius: '15px', border: 'none', backgroundColor: 'var(--lts-blue)', color: 'white', cursor: 'pointer' }}>Add</button>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#e6e6e6', padding: '8px', fontWeight: 'bold', fontSize: '12px', display: 'flex' }}>
                            <span style={{ width: '50px' }}>Select</span>
                            <span style={{ flex: 1, textAlign: 'center' }}>Borrower Name &#9650;</span>
                        </div>

                        {favorites.map(fav => (
                            <div key={fav.id} style={{ backgroundColor: '#f5f5f5', padding: '8px', borderBottom: '1px solid #eee', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    style={{ marginRight: '15px' }}
                                    checked={!!selectedToRemove[fav.id]}
                                    onChange={(e) => setSelectedToRemove({ ...selectedToRemove, [fav.id]: e.target.checked })}
                                />
                                <span>{fav.name}</span>
                            </div>
                        ))}

                        {favorites.length === 0 && <div style={{ padding: '10px', textAlign: 'center', fontSize: '12px' }}>No favorites yet.</div>}
                    </div>

                    {/* Columns Checkboxes (kept static as per orig file but functional if needed later) */}
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
                            <div></div><div></div><div></div>
                            <label><input type="checkbox" /> Upcoming Facility Maturity</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LTSPreferences;

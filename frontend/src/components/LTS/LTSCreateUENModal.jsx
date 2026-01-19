import React, { useState } from 'react';

const LTSCreateUENModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        uen: '',
        name: '',
        address: '',
        tin: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/lts/borrowers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create borrower');
            }

            onSuccess(data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '400px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ marginTop: 0, color: 'var(--lts-blue)' }}>Create UEN</h3>
                {error && <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>UEN *</label>
                        <input name="uen" value={formData.uen} onChange={handleChange} required style={{ width: '100%', padding: '5px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Entity Name *</label>
                        <input name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '5px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>TIN/SSN</label>
                        <input name="tin" value={formData.tin} onChange={handleChange} style={{ width: '100%', padding: '5px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Address</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '5px', height: '60px' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '5px 15px', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{
                            padding: '5px 15px', backgroundColor: 'var(--lts-blue)', color: 'white', border: 'none', cursor: 'pointer'
                        }}>
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LTSCreateUENModal;

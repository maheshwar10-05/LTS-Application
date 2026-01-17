import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LTSRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        country: '',
        state: '',
        city: '',
        password: '',
        confirmPassword: ''
    });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const result = await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
        });

        if (result.success) {
            navigate('/lts/login');
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                width: '500px',
                padding: '30px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                backgroundColor: 'white'
            }}>
                <h2 style={{ color: 'var(--lts-blue, #0056b3)', textAlign: 'center', marginBottom: '20px' }}>
                    Create LTS Account
                </h2>

                {error && <div style={{
                    backgroundColor: '#fff0f0', color: 'red',
                    padding: '10px', marginBottom: '15px', borderRadius: '4px', fontSize: '14px'
                }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>First Name</label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Last Name</label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Email ID</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Address</label>
                        <input name="address" value={formData.address} onChange={handleChange} required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>City</label>
                            <input name="city" value={formData.city} onChange={handleChange} required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>State</label>
                            <input name="state" value={formData.state} onChange={handleChange} required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Country</label>
                            <input name="country" value={formData.country} onChange={handleChange} required
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Confirm New Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <button type="submit" style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'var(--lts-blue, #0056b3)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        Register
                    </button>

                    <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '13px' }}>
                        Already have an account? <Link to="/lts/login" style={{ color: 'var(--lts-blue, #0056b3)' }}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LTSRegister;

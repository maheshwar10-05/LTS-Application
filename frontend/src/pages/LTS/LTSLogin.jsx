import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LTSLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/lts'); // Navigate to Dashboard
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
                width: '400px',
                padding: '30px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                backgroundColor: 'white'
            }}>
                <h2 style={{ color: 'var(--lts-blue, #0056b3)', textAlign: 'center', marginBottom: '20px' }}>
                    LTS Login
                </h2>

                {error && <div style={{
                    backgroundColor: '#fff0f0', color: 'red',
                    padding: '10px', marginBottom: '15px', borderRadius: '4px', fontSize: '14px'
                }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
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
                        Login
                    </button>

                    <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '13px' }}>
                        New user? <Link to="/lts/register" style={{ color: 'var(--lts-blue, #0056b3)' }}>Create an Account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LTSLogin;

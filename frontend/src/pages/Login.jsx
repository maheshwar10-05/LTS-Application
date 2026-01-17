import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="container">
            <h2 style={{ margin: '30px 0' }}>Account Login</h2>
            <div style={{ display: 'flex', gap: '30px' }}>

                {/* New Customer */}
                <div style={{ flex: 1, padding: '20px', border: '1px solid #eee', borderRadius: '4px' }}>
                    <h3>New Customer</h3>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        I am a new customer. By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
                    </p>
                    <Link to="/register" className="btn btn-primary">Continue</Link>
                </div>

                {/* Returning Customer */}
                <div style={{ flex: 1, padding: '20px', border: '1px solid #eee', borderRadius: '4px' }}>
                    <h3>Returning Customer</h3>
                    <p style={{ color: '#666', marginBottom: '20px' }}>I am a returning customer</p>

                    {error && <div style={{ background: '#f2dede', color: '#a94442', padding: '10px', marginBottom: '15px' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Login Name:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

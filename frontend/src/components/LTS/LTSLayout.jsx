import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LTSLayout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/lts/login');
    };

    return (
        <div className="lts-app" style={{ backgroundColor: 'var(--lts-light-bg)', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            {/* Top Header */}
            <header className="lts-header" style={{
                backgroundColor: '#fff',
                borderBottom: '1px solid #ccc',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 15px',
                fontSize: '12px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#666', marginRight: '5px' }}>BMO</span>
                    <span style={{ color: '#666' }}>LTS SIT06(Cloud) - Work - Microsoft Edge</span>
                </div>
                <div style={{ display: 'flex', gap: '15px', color: '#666' }}>
                    {/* Window Controls simulation */}
                    <span>&#9472;</span>
                    <span>&#9633;</span>
                    <span>&#10005;</span>
                </div>
            </header>

            {/* Main Navigation Bar */}
            <div className="lts-nav-bar" style={{
                backgroundColor: 'var(--lts-blue)',
                color: 'white',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                justifyContent: 'space-between'
            }}>
                {/* Logo Section - Always Visible */}
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginRight: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        lineHeight: '1'
                    }}>
                        <span>LTS</span>
                        <span style={{ fontSize: '10px' }}>SIT06(Cloud)</span>
                    </div>

                    {/* Navigation Links - Only if Logged In */}
                    {user && (
                        <nav style={{ height: '100%', display: 'flex' }}>
                            <Link to="/" style={{
                                color: 'white',
                                textDecoration: 'none',
                                padding: '0 15px',
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                fontSize: '13px'
                            }}>Home</Link>
                            <Link to="/preferences" style={{
                                backgroundColor: '#005a8c',
                                color: 'white',
                                padding: '0 15px',
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                height: '100%',
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}>My Preferences</Link>
                        </nav>
                    )}
                </div>

                {/* User/Search Section - Only if Logged In */}
                {user && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                            <span style={{ marginRight: '5px' }}>&#10068;</span> Help
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '2px 5px', borderRadius: '2px' }}>
                            <input
                                type="text"
                                placeholder="Enter your Keyword(s)"
                                style={{ border: 'none', outline: 'none', fontSize: '12px', width: '150px' }}
                            />
                            <span style={{ color: '#666', cursor: 'pointer' }}>&#128269;</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', textAlign: 'right' }}>
                            <span style={{ fontSize: '16px', marginRight: '5px' }}>&#128276;</span>
                            <div style={{ lineHeight: '1.2' }}>
                                <div>Hello, {user.firstName}</div>
                                <div>{user.lastName}</div>
                            </div>
                            <span style={{ marginLeft: '5px' }}>&#9660;</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', borderLeft: '1px solid #7cb9e8', paddingLeft: '15px' }}>
                            More Actions <span style={{ marginLeft: '5px' }}>&#9660;</span>
                        </div>

                        <div
                            onClick={handleLogout}
                            style={{ fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Sign Out
                        </div>

                        <div style={{ fontSize: '16px' }}>&#9733; &#9660;</div>
                    </div>
                )}
            </div>

            {/* Sub-header / Breadcrumbs area if needed, otherwise direct content */}
            <main style={{ padding: '20px' }}>
                {children}
            </main>
        </div>
    );
};

export default LTSLayout;

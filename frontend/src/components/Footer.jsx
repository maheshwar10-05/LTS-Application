import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#333', color: '#fff', padding: '40px 0', marginTop: '50px' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                <div>
                    <h3>ABOUT US</h3>
                    <p style={{ color: '#aaa', fontSize: '0.9em' }}>
                        This is a replica of the Automation Test Store for educational purposes.
                    </p>
                </div>
                <div>
                    <h3>CUSTOMER SERVICE</h3>
                    <ul style={{ color: '#aaa', fontSize: '0.9em' }}>
                        <li>Contact Us</li>
                        <li>Returns</li>
                        <li>Site Map</li>
                    </ul>
                </div>
                <div>
                    <h3>EXTRAS</h3>
                    <ul style={{ color: '#aaa', fontSize: '0.9em' }}>
                        <li>Brands</li>
                        <li>Gift Vouchers</li>
                        <li>Affiliates</li>
                        <li>Specials</li>
                    </ul>
                </div>
                <div>
                    <h3>MY ACCOUNT</h3>
                    <ul style={{ color: '#aaa', fontSize: '0.9em' }}>
                        <li>My Account</li>
                        <li>Order History</li>
                        <li>Wish List</li>
                        <li>Newsletter</li>
                    </ul>
                </div>
            </div>
            <div className="copyright" style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #444' }}>
                © 2026 Automation Test Store Replica
            </div>
        </footer>
    );
};

export default Footer;

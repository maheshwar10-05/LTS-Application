import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    const cartCount = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const cartTotal = cart.total ? parseFloat(cart.total).toFixed(2) : '0.00';

    return (
        <header>
            <div className="header-top">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <img src="https://automationteststore.com/resources/image/18/7a/1.png" alt="Automation Test Store" style={{ height: '50px' }} />
                    </Link>

                    {/* User & Cart Actions */}
                    <div className="header-actions" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div className="user-menu">
                            {user ? (
                                <>
                                    <span>Welcome, {user.firstName}</span>
                                    <span style={{ margin: '0 10px' }}>|</span>
                                    <button onClick={logout} className="btn-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--secondary-color)' }}>Logout</button>
                                </>
                            ) : (
                                <Link to="/login" style={{ color: 'var(--secondary-color)' }}>Login or register</Link>
                            )}
                        </div>

                        <Link to="/cart" className="cart-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-color)' }}>
                            <i className="fa fa-shopping-cart"></i>
                            <span>CART</span>
                            <span className="badge" style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '2px 6px', borderRadius: '50%' }}>{cartCount}</span>
                            <span className="total">${cartTotal}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="nav-main">
                <div className="container">
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/products/Apparel & accessories">APPAREL & ACCESSORIES</Link></li>
                        <li><Link to="/products/Makeup">MAKEUP</Link></li>
                        <li><Link to="/products/Skincare">SKINCARE</Link></li>
                        <li><Link to="/products/Fragrance">FRAGRANCE</Link></li>
                        <li><Link to="/products/Men">MEN</Link></li>
                        <li><Link to="/products/Hair Care">HAIR CARE</Link></li>
                        <li><Link to="/products/Books">BOOKS</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;

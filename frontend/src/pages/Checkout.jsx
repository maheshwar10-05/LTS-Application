import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authService } from '../services/api';

const Checkout = () => {
    const { cart, fetchCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [shipping, setShipping] = useState({
        address: '123 Test St',
        city: 'Test City',
        zip: '12345'
    });

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.orderId) {
                await fetchCart(); // Refresh cart to empty it
                navigate(`/order-confirmation/${response.data.orderId}`);
            }
        } catch (error) {
            alert('Checkout failed: ' + error.response?.data?.message || error.message);
        }
    };

    if (!cart.items || cart.items.length === 0) {
        return <div className="container" style={{ padding: '50px' }}>Cart is empty</div>;
    }

    return (
        <div className="container">
            <h2 style={{ margin: '30px 0', borderBottom: '1px solid #eee' }}>Checkout</h2>

            <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: 1 }}>
                    <h3>Shipping Details</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Address</label>
                        <input
                            type="text"
                            value={shipping.address}
                            onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>City</label>
                        <input
                            type="text"
                            value={shipping.city}
                            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                </div>

                <div style={{ flex: 1, background: '#f9f9f9', padding: '20px' }}>
                    <h3>Order Summary</h3>
                    {cart.items.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2em' }}>
                        <span>Total:</span>
                        <span style={{ color: 'var(--primary-color)' }}>${parseFloat(cart.total).toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '20px' }}
                    >
                        CONFIRM ORDER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

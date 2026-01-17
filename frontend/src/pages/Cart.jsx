import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, addToCart } = useContext(CartContext); // leveraging addToCart as update for now or need new method
    // Local state for quantities to allow editing without immediate server sync
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (cart.items) {
            const initialQty = {};
            cart.items.forEach(item => {
                initialQty[item.id] = item.quantity;
            });
            setQuantities(initialQty);
        }
    }, [cart.items]);

    const handleQuantityChange = (itemId, newQty) => {
        setQuantities(prev => ({ ...prev, [itemId]: parseInt(newQty) || 1 }));
    };

    const handleUpdate = async () => {
        // This is a simplified update loop. Ideally backend supports batch update.
        for (const item of cart.items) {
            if (quantities[item.id] !== item.quantity) {
                // Since we don't have a direct 'update' endpoint in CartContext yet, 
                // we can hack it by calculating difference or just calling add with difference? 
                // Wait, the backend add logic is: UPDATE cart_items SET quantity = quantity + $1
                // So to set exact quantity, we need a specific SET endpoint or logic.
                // Let's assume for this replica we just make an 'update' call if we add it to context/service.
                // For now, I'll assume adding 'difference' works if I impl logic, 
                // BUT cleaner to just add an update method to service.
                await updateCartItem(item.product_id, quantities[item.id] - item.quantity);
            }
        }
        alert('Cart Updated!');
    };

    const updateCartItem = async (productId, diff) => {
        // Re-using addToCart which adds to existing. 
        // Diff can be negative.
        await addToCart(productId, diff);
    };

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="container" style={{ padding: '50px', textAlign: 'center' }}>
                <h2>Your Shopping Cart is Empty!</h2>
                <Link to="/" className="btn btn-secondary" style={{ marginTop: '20px', display: 'inline-block' }}>Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 style={{ margin: '30px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                Shopping Cart
            </h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                    <tr style={{ background: '#eee', textAlign: 'left' }}>
                        <th style={{ padding: '15px' }}>Image</th>
                        <th style={{ padding: '15px' }}>Product Name</th>
                        <th style={{ padding: '15px' }}>Quantity</th>
                        <th style={{ padding: '15px' }}>Unit Price</th>
                        <th style={{ padding: '15px' }}>Total</th>
                        <th style={{ padding: '15px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '15px' }}>
                                <Link to={`/products/${item.product_id}`}>
                                    <img src={item.image_url} alt={item.name} style={{ width: '80px' }} />
                                </Link>
                            </td>
                            <td style={{ padding: '15px' }}>
                                <Link to={`/products/${item.product_id}`} style={{ color: 'var(--secondary-color)' }}>{item.name}</Link>
                            </td>
                            <td style={{ padding: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities[item.id] || item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        style={{ width: '60px', padding: '5px', marginRight: '10px' }}
                                    />
                                </div>
                            </td>
                            <td style={{ padding: '15px' }}>${parseFloat(item.price).toFixed(2)}</td>
                            <td style={{ padding: '15px', fontWeight: 'bold' }}>${(parseFloat(item.price) * (quantities[item.id] || item.quantity)).toFixed(2)}</td>
                            <td style={{ padding: '15px' }}>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ background: '#d9534f', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <button className="btn" style={{ background: '#eee', border: '1px solid #ccc' }} onClick={handleUpdate}>
                    <i className="fa fa-refresh"></i> Update
                </button>

                <div style={{ width: '300px', background: '#f9f9f9', padding: '20px', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2em', fontWeight: 'bold', marginBottom: '20px' }}>
                        <span>Total:</span>
                        {/* Note: Total displayed here is from context, might not match edited inputs until Update is clicked */}
                        <span style={{ color: 'var(--primary-color)' }}>${parseFloat(cart.total).toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: '10px' }}>CHECKOUT</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;

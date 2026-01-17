import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order', error);
            }
        };
        fetchOrder();
    }, [id]);

    if (!order) return <div className="container" style={{ padding: '50px' }}>Loading Order Details...</div>;

    return (
        <div className="container" style={{ padding: '50px', textAlign: 'center' }}>
            <div style={{ fontSize: '4em', color: 'green', marginBottom: '20px' }}>
                <i className="fa fa-check-circle"></i>
            </div>
            <h1 style={{ color: 'var(--primary-color)' }}>YOUR ORDER HAS BEEN PROCESSED!</h1>
            <p style={{ fontSize: '1.2em', margin: '20px 0' }}>
                Thank you for your purchase!
            </p>
            <div style={{ background: '#f9f9f9', padding: '20px', display: 'inline-block', textAlign: 'left', minWidth: '400px' }}>
                <p><strong>Order ID:</strong> #{order.order.id}</p>
                <p><strong>Status:</strong> {order.order.status}</p>
                <p><strong>Total Amount:</strong> ${order.order.total_amount}</p>

                <h4 style={{ marginTop: '20px' }}>Items:</h4>
                <ul>
                    {order.items.map(item => (
                        <li key={item.id} style={{ marginBottom: '5px' }}>
                            {item.quantity}x {item.name} - ${item.price}
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ marginTop: '40px' }}>
                <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;

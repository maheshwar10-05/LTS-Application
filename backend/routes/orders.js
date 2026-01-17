const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

router.post('/', auth, async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Get Cart Items
        const cartRes = await client.query(
            `SELECT ci.*, p.price 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.user_id = $1`,
            [req.user.id]
        );

        if (cartRes.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 2. Calculate Total
        const totalAmount = cartRes.rows.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

        // 3. Create Order
        const orderRes = await client.query(
            'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
            [req.user.id, totalAmount, 'Success']
        );
        const orderId = orderRes.rows[0].id;

        // 4. Create Order Items
        for (const item of cartRes.rows) {
            await client.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        // 5. Clear Cart
        await client.query('DELETE FROM cart_items WHERE user_id = $1', [req.user.id]);

        await client.query('COMMIT');
        res.json({ message: 'Order created successfully', orderId });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const orderRes = await pool.query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [id, req.user.id]);

        if (orderRes.rows.length === 0) return res.status(404).json({ message: 'Order not found' });

        const itemsRes = await pool.query(
            `SELECT oi.*, p.name, p.image_url 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = $1`,
            [id]
        );

        res.json({ order: orderRes.rows[0], items: itemsRes.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware to verify token
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

// Get Cart
router.get('/', auth, async (req, res) => {
    try {
        const cart = await pool.query(
            `SELECT ci.id, ci.quantity, p.name, p.price, p.image_url, ci.product_id 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.user_id = $1`,
            [req.user.id]
        );

        // Calculate total
        const total = cart.rows.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

        res.json({ items: cart.rows, total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add to Cart
router.post('/', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Check if item exists
        const existing = await pool.query(
            'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
            [req.user.id, productId]
        );

        if (existing.rows.length > 0) {
            await pool.query(
                'UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2',
                [quantity, existing.rows[0].id]
            );
        } else {
            await pool.query(
                'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)',
                [req.user.id, productId, quantity]
            );
        }

        res.json({ message: 'Item added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove from Cart
router.delete('/:itemId', auth, async (req, res) => {
    try {
        await pool.query('DELETE FROM cart_items WHERE id = $1 AND user_id = $2', [req.params.itemId, req.user.id]);
        res.json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

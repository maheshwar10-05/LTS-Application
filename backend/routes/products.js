const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all products (with optional category filter)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id';
        let params = [];

        if (category) {
            // Use ILIKE for case-insensitive matching or plain =
            query += ' WHERE c.name = $1';
            params.push(category);
        }

        const products = await pool.query(query, params);
        res.json(products.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Featured products
router.get('/featured', async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products WHERE is_featured = true');
        res.json(products.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (product.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json(product.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

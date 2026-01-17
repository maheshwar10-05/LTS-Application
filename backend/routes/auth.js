const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, address, city, state, country } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password, address, city, state, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, email, first_name',
            [firstName, lastName, email, hashedPassword, address, city, state, country]
        );

        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        res.json({ token, user: newUser.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const validPassword = await bcryptjs.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        res.json({ token, user: { id: user.rows[0].id, email: user.rows[0].email, firstName: user.rows[0].first_name, lastName: user.rows[0].last_name } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Helper to get all borrowers with favorite status for a user
router.get('/borrowers', async (req, res) => {
    const { userId, search } = req.query;
    try {
        let query = `
            SELECT b.*, 
            CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END as is_favorite
            FROM lts_borrowers b
            LEFT JOIN lts_favorites f ON b.id = f.borrower_id AND f.user_id = $1
        `;
        const params = [userId || 0];

        if (search) {
            query += ` WHERE b.name ILIKE $2 OR b.uen ILIKE $2`;
            params.push(`%${search}%`);
        }

        query += ` ORDER BY b.created_at DESC`;

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create new borrower (UEN)
router.post('/borrowers', async (req, res) => {
    const { uen, name, address, tin } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO lts_borrowers (uen, name, address, tin) VALUES ($1, $2, $3, $4) RETURNING *',
            [uen, name, address, tin]
        );
        res.json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') { // Unique violation
            return res.status(400).json({ message: 'Borrower with this UEN already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

// Toggle Favorite
router.post('/favorites/toggle', async (req, res) => {
    const { userId, borrowerId } = req.body;
    if (!userId || !borrowerId) return res.status(400).json({ message: 'Missing userId or borrowerId' });

    try {
        // Check if exists
        const check = await pool.query('SELECT * FROM lts_favorites WHERE user_id = $1 AND borrower_id = $2', [userId, borrowerId]);

        if (check.rows.length > 0) {
            // Remove
            await pool.query('DELETE FROM lts_favorites WHERE user_id = $1 AND borrower_id = $2', [userId, borrowerId]);
            res.json({ message: 'Removed from favorites', isFavorite: false });
        } else {
            // Add
            await pool.query('INSERT INTO lts_favorites (user_id, borrower_id) VALUES ($1, $2)', [userId, borrowerId]);
            res.json({ message: 'Added to favorites', isFavorite: true });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Favorites
router.get('/favorites/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query(`
            SELECT b.* 
            FROM lts_borrowers b
            JOIN lts_favorites f ON b.id = f.borrower_id
            WHERE f.user_id = $1
            ORDER BY b.name ASC
        `, [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Deal
router.post('/deals', async (req, res) => {
    const { dealId, borrowerId, transactionSummary, purposeOfRequest, newBusiness, currency } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO lts_deals (deal_id, borrower_id, transaction_summary, purpose_of_request, new_business, currency, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [dealId, borrowerId, transactionSummary, purposeOfRequest, newBusiness, currency, 'Draft']
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get Deal
router.get('/deals/:dealId', async (req, res) => {
    const { dealId } = req.params;
    try {
        const result = await pool.query(`
            SELECT d.*, b.name as borrower_name, b.uen, b.id as borrower_id
            FROM lts_deals d
            JOIN lts_borrowers b ON d.borrower_id = b.id
            WHERE d.deal_id = $1
        `, [dealId]);

        if (result.rows.length === 0) return res.status(404).json({ message: 'Deal not found' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

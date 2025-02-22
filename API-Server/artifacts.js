// artifacts.js
const express = require('express');
const router = express.Router();
const pool = require('./db');

// GET /artifacts
router.get('/artifacts', async (req, res) => {
    try {
        const artifacts = await pool.query('SELECT * FROM Artifacts');
        res.json(artifacts.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving artifacts' });
    }
});

// POST /add-artifact
router.post('/add-artifact', async (req, res) => {
    try {
        const { title, description, multimediaLinks } = req.body;
        const result = await pool.query(
            'INSERT INTO Artifacts (title, description, multimedia_links) VALUES ($1, $2, $3) RETURNING *',
            [title, description, multimediaLinks]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding artifact' });
    }
});

module.exports = router;

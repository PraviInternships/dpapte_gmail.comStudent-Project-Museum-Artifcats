// quizzes.js
const express = require('express');
const router = express.Router();
const pool = require('./db');

// GET /quiz/:artifactId
router.get('/quiz/:artifactId', async (req, res) => {
    try {
        const artifactId = req.params.artifactId;
        const quizzes = await pool.query(
            'SELECT * FROM Quizzes WHERE artifact_id = $1',
            [artifactId]
        );
        res.json(quizzes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving quizzes' });
    }
});

// POST /submit-quiz
router.post('/submit-quiz', async (req, res) => {
    try {
        const { artifactId, quizId, answers } = req.body;
        const result = await pool.query(
            'INSERT INTO Visitor_Quiz_Scores (artifact_id, quiz_id, answers) VALUES ($1, $2, $3) RETURNING *',
            [artifactId, quizId, answers]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error submitting quiz' });
    }
});

module.exports = router;

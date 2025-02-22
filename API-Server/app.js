// app.js
const express = require('express');
const app = express();
const artifactsRouter = require('./artifacts');
const quizzesRouter = require('./quizzes');
const visitorsRouter = require('./visitors');
const pool = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use('/artifacts', artifactsRouter);
app.use('/quiz', quizzesRouter);
app.use('/visitor', visitorsRouter);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

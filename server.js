const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database/db.js');
const cors  = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "./public/index.html"); // serve the HTML file
});


// Routes
app.use('/api', expenseRoutes);

pool.getConnection((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

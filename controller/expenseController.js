const pool = require('../database/db.js');

// Get all expenses
const getExpenses = (req, res) => {
    pool.query('SELECT * FROM expenses', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
};

// Add an expense
const addExpense = (req, res) => {
    const { amount, description, category } = req.body;

    if (!amount || !description || !category) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    pool.query('INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)', [amount, description, category], (error, results) => {
        if (error) {
            console.error('Error inserting expense:', error);
            return res.status(500).send({ message: 'Error adding expense' });
        }
        res.status(201).json({ id: results.insertId, amount, description, category });
    });
};

// Delete an expense
const deleteExpense = (req, res) => {
    const expenseId = req.params.id;

    pool.query('DELETE FROM expenses WHERE id = ?', [expenseId], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    });
};

module.exports = { getExpenses, addExpense, deleteExpense };

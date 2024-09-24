const express = require('express');
const { getExpenses, addExpense, deleteExpense } = require('../controller/expenseController');
const router = express.Router();

// Routes
router.get('/expenses', getExpenses);      // Get all expenses
router.post('/add-expense', addExpense);   // Add an expense
router.delete('/delete-expense/:id', deleteExpense); // Delete an expense

module.exports = router;

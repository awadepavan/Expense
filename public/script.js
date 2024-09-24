document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const amount = document.querySelector('#amount').value;
    const description = document.querySelector('#description').value;
    const category = document.querySelector('#category').value;

    try {
        const response = await fetch('/api/add-expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, description, category })
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById('message').textContent = 'Expense added successfully!';
        } else {
            document.getElementById('message').textContent = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
    }

    // Clear form fields
    document.querySelector('#amount').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#category').value = '';
});


// Function to fetch expenses from the backend and display them
async function fetchExpenses() {
    try {
        const response = await fetch('/api/expenses');  // Fetch data from backend
        const expenses = await response.json();
        
        const expenseList = document.getElementById('expenseList');
        expenseList.innerHTML = '';  // Clear existing list

        // Loop through the expenses and display them
        expenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.textContent = `Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`;
            expenseList.appendChild(expenseItem);
        });

    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Fetch expenses when the page loads
window.onload = function() {
    fetchExpenses();
};

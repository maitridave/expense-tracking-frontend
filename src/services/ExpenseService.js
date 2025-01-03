import axios from 'axios';

const API_URL = 'https://localhost:51522/api';

class ExpenseService {
    async createExpense(expenseData) {
        const response = await axios.post(API_URL, expenseData);
        return response.data;
    }

    async fetchExpenses() {
        const response = await axios.get(API_URL);
        return response.data;
    }

    async fetchExpenseCategories() {
        const response = await axios.get(`${API_URL}/categories`, {
            method: 'Get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
        return response.data;
    }

    async fetchCategories() {
        const response = await axios.get(`${API_URL}/categories`, {
            method: 'Get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
        return response.data;
    }
}

export default new ExpenseService();
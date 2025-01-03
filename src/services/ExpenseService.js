import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';

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
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    }

    async fetchCategories() {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    }
}

export default new ExpenseService();
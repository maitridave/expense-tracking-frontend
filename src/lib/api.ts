import type { Expense, Category, ExpenseWithCategory } from './types';

const API_URL = 'https://localhost:51522/api';

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  },
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to post data');
    return response.json();
  },
  postWithToken: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to post data');
    return response.json();
  },
  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update data');
    return response.json();
  },
  delete: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    if (!response.ok) throw new Error('Failed to delete data');
  }
};

export async function fetchExpenses(): Promise<ExpenseWithCategory[]> {
  return apiClient.get('/Expenses');
}

export async function fetchCategories(): Promise<Category[]> {
  return apiClient.get('/Categories');
}

export async function createExpense(expense: Omit<Expense, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Expense> {
  return apiClient.post('/Expenses', expense);
}

export async function updateExpense(id: string, expense: Partial<Expense>): Promise<Expense> {
  return apiClient.put(`/Expenses/${id}`, expense);
}

export async function deleteExpense(id: string): Promise<void> {
  return apiClient.delete(`/Expenses/${id}`);
}
import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { createExpense } from '../lib/api';
import type { Expense } from '../lib/types';

export default function AddExpense() {
  const handleSubmit = async (values: Omit<Expense, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    await createExpense(values);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Expense</h1>
      <ExpenseForm onSubmit={handleSubmit} submitLabel="Add Expense" />
    </div>
  );
}
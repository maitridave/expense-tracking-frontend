import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import { updateExpense } from '../lib/api';
import type { Expense } from '../lib/types';

export default function EditExpense() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const loadExpense = async () => {
      try {
        const { data, error } = await supabase
          .from('expenses')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setExpense(data);
      } catch (err) {
        setError('Failed to load expense');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadExpense();
  }, [id, navigate]);

  const handleSubmit = async (values: Omit<Expense, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!id) return;
    await updateExpense(id, values);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Expense</h1>
      {expense && (
        <ExpenseForm
          initialValues={expense}
          onSubmit={handleSubmit}
          submitLabel="Update Expense"
        />
      )}
    </div>
  );
}
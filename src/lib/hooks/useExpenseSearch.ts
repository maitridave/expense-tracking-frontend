import { useState, useMemo } from 'react';
import type { ExpenseWithCategory } from '../types';
import type { SortField, SortDirection } from '../../components/search/SortOptions';

const ITEMS_PER_PAGE = 10;

export function useExpenseSearch(expenses: ExpenseWithCategory[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      // Search term filter
      const searchMatch =
        !searchTerm ||
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Date range filter
      const dateMatch =
        (!dateRange.start || expense.date >= dateRange.start) &&
        (!dateRange.end || expense.date <= dateRange.end);

      // Category filter
      const categoryMatch = !selectedCategory || expense.categoryid === selectedCategory;

      // Amount range filter
      const amountMatch =
        (!amountRange.min || expense.amount >= Number(amountRange.min)) &&
        (!amountRange.max || expense.amount <= Number(amountRange.max));

      return searchMatch && dateMatch && categoryMatch && amountMatch;
    });
  }, [expenses, searchTerm, dateRange, selectedCategory, amountRange]);

  const sortedExpenses = useMemo(() => {
    return [...filteredExpenses].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'date':
          comparison = a.date.localeCompare(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.name.localeCompare(b.category.name);
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredExpenses, sortField, sortDirection]);

  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedExpenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedExpenses, currentPage]);

  const totalPages = Math.ceil(sortedExpenses.length / ITEMS_PER_PAGE);

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  };

  return {
    searchTerm,
    setSearchTerm,
    dateRange,
    setDateRange,
    selectedCategory,
    setSelectedCategory,
    amountRange,
    setAmountRange,
    sortField,
    sortDirection,
    handleSortChange,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedExpenses,
  };
}
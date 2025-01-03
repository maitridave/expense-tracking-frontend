import React from 'react';
import { format } from 'date-fns';
import type { Category } from '../../lib/types';

interface FiltersProps {
  categories: Category[];
  dateRange: { start: string; end: string };
  selectedCategory: string;
  amountRange: { min: string; max: string };
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onCategoryChange: (categoryId: string) => void;
  onAmountRangeChange: (range: { min: string; max: string }) => void;
}

export default function Filters({
  categories,
  dateRange,
  selectedCategory,
  amountRange,
  onDateRangeChange,
  onCategoryChange,
  onAmountRangeChange,
}: FiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date Range</label>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <input
            type="date"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            value={dateRange.start}
            onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
          />
          <input
            type="date"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm rounded-md"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount Range</label>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            value={amountRange.min}
            onChange={(e) => onAmountRangeChange({ ...amountRange, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
            value={amountRange.max}
            onChange={(e) => onAmountRangeChange({ ...amountRange, max: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
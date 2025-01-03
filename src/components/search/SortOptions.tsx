import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortField = 'date' | 'amount' | 'category';
export type SortDirection = 'asc' | 'desc';

interface SortOptionsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

export default function SortOptions({ sortField, sortDirection, onSortChange }: SortOptionsProps) {
  const handleSortChange = (field: SortField) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newDirection);
  };

  return (
    <div className="flex space-x-4">
      {(['date', 'amount', 'category'] as const).map((field) => (
        <button
          key={field}
          onClick={() => handleSortChange(field)}
          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
            sortField === field
              ? 'bg-gray-900 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="capitalize">{field}</span>
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
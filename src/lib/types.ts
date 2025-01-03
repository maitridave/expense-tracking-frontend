export interface Expense {
  id: string;
  user_id: string;
  categoryid: string;
  amount: number;
  description: string;
  categoryName:string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface ExpenseWithCategory extends Expense {
  category: Category;
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Summary from './pages/Summary';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="expenses/add" element={<AddExpense />} />
            <Route path="expenses/:id/edit" element={<EditExpense />} />
            <Route path="summary" element={<Summary />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
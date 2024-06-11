import React, { useEffect, useState } from 'react';
import {
  Box, Button, Grid, Table, TableBody, TableCell, TableContainer,
  TableFooter, TableHead, TableRow, Tabs, Tab, Typography, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useIncomesContext } from '../hooks/useIncomeContext';
import { useExpensesContext } from '../hooks/useExpenseContext';
import { NavBar } from '../components/navbar';
import Incomedetails from '../components/IncomeDetails';
import Expensedetails from '../components/ExpenseDetails';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { incomes, dispatch } = useIncomesContext();
  const { expenses, dispatch: dispatchexpense } = useExpensesContext();
  const [IncomeExpenseActive, setIncomeExpenseActive] = useState('Income');

  const handleIncomeExpenseClick = (event, newValue) => {
    setIncomeExpenseActive(newValue);
  };

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch('https://expense-tracker-server-b3fc.onrender.com/api/income/incomeget', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_INCOMES', payload: json });
      }
    };

    const fetchExpense = async () => {
      const response = await fetch('https://expense-tracker-server-b3fc.onrender.com/api/expense/expenseget', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        dispatchexpense({ type: 'SET_EXPENSES', payload: json });
      }
    };

    if (user) {
      fetchExpense();
      fetchIncome();
    }
  }, [dispatch, dispatchexpense, user]);

  // Calculate total incomes and expenses
  const totalIncome = incomes?.reduce((sum, income) => sum + income.iamount, 0);
  const totalExpense = expenses?.reduce((sum, expense) => sum + expense.eamount, 0);
  const currentBalance = totalIncome - totalExpense;

  return (
    <div>
      <style>
        {`
          body {
            background-color: #001C30;
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
          }
          .balance {
            color: #fff;
            font-size: 1.5rem;
            font-weight: bold;
          }
        `}
      </style>
      <NavBar />

      <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h4" className="balance">Current Balance: ₹{currentBalance}</Typography>
        </Box>

        <Button
          onClick={() => navigate('/add')}
          sx={{
            margin: '10px',
            backgroundColor: "#176B87",
            color: '#fff',
            '&:hover': {
              backgroundColor: '#144e66',
            }
          }}
          variant="contained"
        >
          ADD Income/Expense
        </Button>
      </div>

      <Tabs
        value={IncomeExpenseActive}
        onChange={handleIncomeExpenseClick}
        centered
        sx={{
          backgroundColor: '#f5f5f5',
          '.MuiTabs-indicator': { backgroundColor: '#176B87' }
        }}
      >
        <Tab
          label="Income"
          value="Income"
          sx={{
            color: IncomeExpenseActive === 'Income' ? '#FF3434' : '#176B87',
            backgroundColor: IncomeExpenseActive === 'Income' ? '#AAE0FF' : 'transparent'
          }}
        />
        <Tab
          label="Expense"
          value="Expense"
          sx={{
            color: IncomeExpenseActive === 'Expense' ? '#FFFFFF' : '#176B87',
            backgroundColor: IncomeExpenseActive === 'Expense' ? '#AAE0FF' : 'transparent'
          }}
        />
      </Tabs>

      {IncomeExpenseActive === 'Income' && (
        <TableContainer component={Paper} sx={{ marginTop: '20px', padding: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Income</Typography></TableCell>
                <TableCell><Typography variant="h6">Category</Typography></TableCell>
                <TableCell><Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomes && incomes.map((income) => (
                <Incomedetails key={income._id} incomes={income} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} align="right"><Typography variant="h6">TOTAL INCOME: ₹{totalIncome}</Typography></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}

      {IncomeExpenseActive === 'Expense' && (
        <TableContainer component={Paper} sx={{ marginTop: '20px', padding: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Expense</Typography></TableCell>
                <TableCell><Typography variant="h6">Category</Typography></TableCell>
                <TableCell><Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses && expenses.map((expense) => (
                <Expensedetails key={expense._id} expenses={expense} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} align="right"><Typography variant="h6">TOTAL EXPENSE: ₹{totalExpense}</Typography></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

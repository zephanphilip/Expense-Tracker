import './add.css';
import React, { useState } from 'react';
import { useIncomesContext } from '../hooks/useIncomeContext';
import { useExpensesContext } from '../hooks/useExpenseContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { NavBar } from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { Button, Tabs, Tab, TextField, Box, InputAdornment } from '@mui/material';

export const Add = () => {
  const { user } = useAuthContext();
  const { dispatch } = useIncomesContext();
  const { dispatch: dispatchexpense } = useExpensesContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Income');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [incomeinfo, setIncomeinfo] = useState({
    iamount: '',
    idescription: '',
  });

  const [expenseinfo, setExpenseinfo] = useState({
    eamount: '',
    edescription: '',
  });

  const handleIncomeChange = (value) => {
    setIncomeinfo((state) => ({
      ...state,
      ...value,
    }));
  };

  const handleExpenseChange = (value) => {
    setExpenseinfo((state) => ({
      ...state,
      ...value,
    }));
  };

  const handleIncomeSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const income = { ...incomeinfo };

    const response = await fetch('https://expense-tracker-server-b3fc.onrender.com/api/income/incomeadd', {
      method: 'POST',
      body: JSON.stringify(income),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      setError(null);
      console.log('New income added', json);
      dispatch({ type: 'CREATE_INCOME', payload: json });
      navigate('/home');
    }
  };

  const handleExpenseSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const expense = { ...expenseinfo };

    const response = await fetch('https://expense-tracker-server-b3fc.onrender.com/api/expense/expenseadd', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      setError(null);
      console.log('New expense added', json);
      dispatchexpense({ type: 'CREATE_EXPENSE', payload: json });
      navigate('/home');
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            background-color: #001C30;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <NavBar />
      <div style={{ marginTop: '100px' }}>
        <div className='add'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Income" value="Income" />
              <Tab label="Expense" value="Expense" />
            </Tabs>
          </Box>
          <Box sx={{ padding: '10px' }}>
            {activeTab === 'Income' && (
              <form method='post' onSubmit={handleIncomeSubmit}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  variant="filled"
                  onChange={(e) => handleIncomeChange({ iamount: e.target.value })}
                  value={incomeinfo.iamount}
                  name='iamount'
                  label='Amount'
                  className='mb-3'
                  type='number'
                  id='form7Example1'
                />
                <TextField
                  fullWidth
                  className='mb-3'
                  onChange={(e) => handleIncomeChange({ idescription: e.target.value })}
                  value={incomeinfo.idescription}
                  type='text'
                  label='Category'
                  name='idescription'
                  id='form7Example2'
                />
                <Button variant="contained" type='submit' className='mb-3' sx={{ backgroundColor: '#176B87', color: 'white' }}>
                  Add
                </Button>
                {error && <div className='error'>{error}</div>}
              </form>
            )}
            {activeTab === 'Expense' && (
              <form method='post' onSubmit={handleExpenseSubmit}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  variant="filled"
                  label="Amount"
                  onChange={(e) => handleExpenseChange({ eamount: e.target.value })}
                  value={expenseinfo.eamount}
                  name='eamount'
                  className='mb-3'
                  type='number'
                  id='form7Example1'
                />
                <TextField
                  fullWidth
                  label="Category"
                  className='mb-3'
                  onChange={(e) => handleExpenseChange({ edescription: e.target.value })}
                  value={expenseinfo.edescription}
                  type='text'
                  name='edescription'
                  id='form7Example2'
                />
                <Button variant="contained" type='submit' className='mb-3' sx={{ backgroundColor: '#176B87', color: 'white' }}>
                  Add
                </Button>
                {error && <div className='error'>{error}</div>}
              </form>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

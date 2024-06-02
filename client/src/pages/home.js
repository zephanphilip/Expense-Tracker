import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { useAuthContext } from '../hooks/useAuthContext';
import { useIncomesContext } from '../hooks/useIncomeContext';
import { useExpensesContext } from '../hooks/useExpenseContext';
import { NavBar } from '../components/navbar';
import Incomedetails from '../components/IncomeDetails';
import Expensedetails from '../components/ExpenseDetails';


export  const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { incomes, dispatch } = useIncomesContext();
  const { expenses, dispatch: dispatchexpense } = useExpensesContext();
  const [IncomeExpenseActive, setIncomeExpenseActive] = useState('Income');
  console.log(incomes)
  const handleIncomeExpenseClick = (tab) => {
    setIncomeExpenseActive(tab);
  };

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch('http://localhost:3001/api/income/incomeget', {
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
      const response = await fetch('http://localhost:3001/api/expense/expenseget', {
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
  }, []);
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
          }
        `}
      </style>
      <NavBar />
      
      <div style={{ display: "flex", justifyContent: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ justifyContent: "start", paddingLeft: "30px" }}>
            <Grid item sx={{ justifyContent: "start" }}>
                <h2></h2>
               {/* <Item sx={{backgroundColor:"#64CCC5",color:"#001C30"}}>Current Balance : {currentBalance}</Item>  */}
            </Grid>
          </Grid>
        </Box>
       
        <Button onClick={() => navigate('/add')} style={{ display: "flex",justifyContent: "center", margin: "10px",  transform: 'scale(1)', transition: 'none', backgroundColor: "#176B87" }} type="submit" variant="contained">
          ADD Income/Expense
        </Button>
      </div>
      <MDBTabs pills justify className='mb-3' style={{ padding: "10px" }}>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleIncomeExpenseClick('Income')} active={IncomeExpenseActive === 'Income'} style={{
              color: IncomeExpenseActive === 'Income' ? 'white' : '#176B87',
              backgroundColor: IncomeExpenseActive === 'Income' ? '#176B87' : 'transparent'
            }}>
            Income
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleIncomeExpenseClick('Expense')} active={IncomeExpenseActive === 'Expense'}  style={{
              color: IncomeExpenseActive === 'Expense' ? 'white' : '#176B87',
              backgroundColor: IncomeExpenseActive === 'Expense' ? '#176B87' : 'transparent'
            }}>
            Expense
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent style={{ padding: "10px" }}>
        <MDBTabsPane show={IncomeExpenseActive === 'Income'}>
          <TableContainer style={{ display: "flex", background: "white", borderRadius: "5px", padding: "10px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><h5>Income</h5></TableCell>
                  <TableCell><h5>Category</h5></TableCell>
                  <TableCell><h5>Actions</h5></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ verticalAlign: 'middle' }}>
                {
                  incomes && incomes.map((incomes) => (
                    <Incomedetails key={incomes._id} incomes={incomes} />
                  ))
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>CURRENT BALANCE: {currentBalance}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </MDBTabsPane>
        <MDBTabsPane show={IncomeExpenseActive === 'Expense'}>
          <TableContainer style={{ display: "flex", background: "white", borderRadius: "5px", padding: "10px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><h5>Expense</h5></TableCell>
                  <TableCell><h5>Category</h5></TableCell>
                  <TableCell><h5>Actions</h5></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ verticalAlign: 'middle' }}>
                {
                  expenses && expenses.map((expenses) => (
                    <Expensedetails key={expenses._id} expenses={expenses} />
                  ))
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>CURRENT BALANCE: {currentBalance}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
};



import './add.css';
import React,{ useState } from 'react'
import { useIncomesContext } from '../hooks/useIncomeContext';
import { useExpensesContext } from '../hooks/useExpenseContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { NavBar } from '../components/navbar';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export const Add = () => {

  const {user } = useAuthContext()
  
  const {dispatch} = useIncomesContext()
  const {dispatch:dispatchexpense} = useExpensesContext()

  const [error, setError]= useState(null);
  

    const navigate = useNavigate();


    const [loginRegisterActive, setLoginRegisterActive] = React.useState('Income');
    const handleLoginRegisterClick = (tab) => {
        setLoginRegisterActive(tab);
    };



        const [incomeinfo, setIncomeinfo] = useState({
          iamount: '',
          idescription: "",
  
        });
        const [expenseinfo, setExpenseinfo] = useState({
            eamount: '',
            edescription: "",
            
          });

        const handleChange = React.useCallback((value) => {
            setIncomeinfo(state => ({
                ...state,
                ...value,
            }));
        }, [setIncomeinfo]);
        const handleChange2 = React.useCallback((value) => {
            setExpenseinfo(state => ({
                ...state,
                ...value,
            }));
        }, [setExpenseinfo]);

          const handleSubmit = async (event) => {
            event.preventDefault();

            if(!user){
              setError('you must be logged in')
              return
          }

          const income = {...incomeinfo}

            const response = await fetch("http://localhost:3001/api/income/incomeadd",
                {
                  method: 'POST',
                  body: JSON.stringify(income),
                  headers : {'Content-Type': 'application/json',
                  'Authorization':`Bearer ${user.token}`
                 }
                 }
              );

              const json = await response.json();
              if (response.ok){
                  setError(null)
                  console.log("new income added",json);
                  dispatch({type: 'CREATE_INCOME', payload: json})
                  navigate('/home');
                }

          };
          const handleSubmit2 = async (event) => {
            event.preventDefault();
            if(!user){
              setError('you must be logged in')
              return
          }


            const response = await fetch("http://localhost:3001/api/expense/expenseadd",
                {
                  method: 'POST',
                  body: JSON.stringify(expenseinfo),
                  headers : {'Content-Type': 'application/json',
                  'Authorization':`Bearer ${user.token}`
                 }
                 }
              );

              const json = await response.json();
              if (response.ok){
                  setError(null)
                  console.log("new expense added",json);
                  dispatchexpense({type: 'CREATE_EXPENSE', payload: json})
                  navigate('/home');
                }

          };

    return (
        <div >
           <style>
      {`
        body {
          background-color: #001C30;
          margin: 0;
          padding: 0;
        }
      `}
    </style>
        <NavBar/>
        {/* <p style={{marginLeft:"5px",marginTop:"15px",fontSize:"40px",color:"#5A96E3", fontFamily:"sans-serif", fontWeight: "bold" }}>Add Your Income/Expenditure</p> */}
       <div style={{marginTop:"100px"}}>
        <div className='add' >
        <MDBTabs pills justify className='mb-3' style={{padding:"10px"}}>
            <MDBTabsItem>
            <MDBTabsLink
                onClick={() => handleLoginRegisterClick('Income')}
                active={loginRegisterActive === 'Income'}
            >
                Income
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink
                onClick={() => handleLoginRegisterClick('Expense')}
                active={loginRegisterActive === 'Expense'}
            >
                Expense
            </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent style={{padding:"10px"}}>
            <MDBTabsPane show={loginRegisterActive === 'Income'}>
            <form method='Post' onSubmit={handleSubmit}>
                {/* Income */}
                <div>
                <TextField fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                variant="filled"
                onChange={e => handleChange({ iamount: e.target.value })} 
                value={incomeinfo.iamount}
                name='iamount' 
                label='AMOUNT'  
                className='mb-3' 
                type='number' 
                id='form7Example1'
                />
                </div>
                <div>
                
                <TextField fullWidth={true}
                className='mb-3' 
                onChange={e => handleChange({ idescription: e.target.value })}  
                value={incomeinfo.idescription} 
                type='text' 
                label='CATEGORY' 
                name='idescription' 
                id='form7Example2'  />
                </div>
                <Button variant="contained"  type='submit' className='mb-3'  sx={{backgroundColor:"#176B87",color:"white"}}>
                ADD
                </Button>
                {error && <div className='error'>{error}</div>}
            </form>
            </MDBTabsPane>
            <MDBTabsPane show={loginRegisterActive === 'Expense'}>
            <form method='Post' onSubmit={handleSubmit2}>
                {/* Income */}
                <TextField fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                variant="filled"
                label="AMOUNT"
                onChange={e => handleChange2({ eamount: e.target.value })} 
                value={expenseinfo.iamount}
                name='eamount' 
                className='mb-3' 
                type='number' 
                id='form7Example1'/>
               <TextField fullWidth={true}
               label="CATEGORY"
                className='mb-3' 
                onChange={e => handleChange2({ edescription: e.target.value })}  
                value={expenseinfo.edescription} 
                type='text' 
                name='edescription' 
                id='form7Example2'  />
                <Button variant="contained"  type='submit' className='mb-3' sx={{backgroundColor:"#176B87",color:"white"}} >
                ADD
                </Button>
                {error && <div className='error'>{error}</div>}
            </form>
            </MDBTabsPane>
        </MDBTabsContent>
        
        </div>
        </div>
        </div>
    
    );

};


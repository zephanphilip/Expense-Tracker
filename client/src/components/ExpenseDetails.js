import React from 'react'
import { useExpensesContext } from '../hooks/useExpenseContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { TableCell, TableRow, Button } from '@mui/material';



function Expensedetails( {expenses} ) {

    const {user } = useAuthContext()
    const{dispatch:dispatchexpense}= useExpensesContext()
    const {_id} = expenses;

    const handleClick = async () =>{
        if(!user){
          console.log("no user defined")
          return
        }
    
        const response = await fetch('https://expense-tracker-server-b8lj.onrender.com/api/expense/expensedel/'+expenses._id,{
          method: 'DELETE',
          headers: {
            'Authorization':`Bearer ${user.token}`
          }
    
        })
        const json= await response.json()
        if(response.ok) {
          console.log("Success")
        dispatchexpense({type: 'DELETE_EXPENSE', payload: {_id}})
        }
        else{
          console.log("error")
        }
      }





  return (
    <TableRow>
        <TableCell>
            <h6>{expenses.eamount}</h6>
        </TableCell>
        
        <TableCell>
            <h6>{expenses.edescription}</h6>
        </TableCell>
       
        <TableCell>
            <Button variant="outlined" color="error" onClick={handleClick}>Delete</Button>
        </TableCell>

    </TableRow>

  )
}

export default Expensedetails


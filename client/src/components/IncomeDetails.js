import React from 'react'
import { useIncomesContext } from '../hooks/useIncomeContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { TableCell, TableRow, Button } from '@mui/material';



function Incomedetails( {incomes} ) {

    const {user } = useAuthContext()
    const{dispatch}= useIncomesContext()
    const {_id} = incomes;

    const handleClick = async () =>{
        if(!user){
          return
        }
    
        const response = await fetch('http://localhost:3001/api/income/incomedel/'+incomes._id,{
          method: 'DELETE',
          headers: {
            'Authorization':`Bearer ${user.token}`
          }
    
        })
        const json= await response.json()
        if(response.ok) {
          console.log("Success")
        dispatch({type: 'DELETE_INCOME', payload: {_id}})
        }
      }





  return (
    <TableRow>
        <TableCell>
          <h6>{incomes.iamount}</h6></TableCell>
          <TableCell><h6>{incomes.idescription}</h6></TableCell>
          <TableCell>
          <Button variant="outlined" color="error" onClick={handleClick}>Delete</Button>
          </TableCell>
          </TableRow>

  )
}

export default Incomedetails


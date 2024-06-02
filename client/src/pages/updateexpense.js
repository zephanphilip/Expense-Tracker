import React, { useEffect, useState } from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import { useGetUserID } from "../hooks/useGetUserID";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from '../components/navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export const Updateexpense = () => {
  const { id } = useParams();
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [eamount, setEamount] = useState();
  const [edescription, setEdescription] = useState();

  useEffect(() => {
    // axios.get(`http://localhost:3001/add/expense/${id}`)
    axios.get(`/api/add/expense/${id}`)
      .then(result => {
        console.log(result);
        setEamount(result.data.eamount);
        setEdescription(result.data.edescription);
      })
      .catch(error => console.log(error));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    // axios.put(`http://localhost:3001/add/expenseupdate/${id}`, { eamount, edescription })
    axios.put(`/api/add/expenseupdate/${id}`, { eamount, edescription })
      .then(result => {
        console.log(result);
        navigate('/home');
      })
      .catch(err => console.log(err));
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
      <NavBar/>
      <p style={{marginLeft:"5px",marginTop:"15px",fontSize:"40px", color:"#5A96E3", fontFamily:"sans-serif", fontWeight: "bold" }}> </p>
     <div style={{marginTop:"100px"}}>
      <div className="add" style={{padding:"20px"}}>
      <Form  onSubmit={Update}>
      <p style={{fontSize:"40px", color:"#001C30", fontFamily:"sans-serif", fontWeight: "bold" }}>UPDATE YOUR EXPENSE </p>
        <div>
          <TextField 
           
          fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                className="mb-3"
                variant="filled"
                 label="AMOUNT"
                  type="number" 
                  value={eamount}
                   onChange={(e) => setEamount(e.target.value)} />
      
      
        <TextField
         
        fullWidth={true}
                 label="DESCRIPTION" 
                 InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
                 value={edescription} onChange={(e) => setEdescription(e.target.value)} rows={3} />
       </div>
       <div style={{paddingTop:"10px"}}>
        <Button type='submit' className="mb-3" variant="contained"  sx={{backgroundColor:"#176B87",color:"white"}}>
          Update Expense
        </Button>
        </div>
      </Form>
      </div>
      </div>
      </div>
    
  );
};



import React, { useState, useEffect } from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import { useGetUserID } from "../hooks/useGetUserID";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from '../components/navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export const Updateincome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userID = useGetUserID();
  const [iamount, setIamount] = useState();
  const [idescription, setIdescription] = useState();

  useEffect(() => {
    // axios.get(`http://localhost:3001/add/income/${id}`)
    axios.get(`/api/add/income/${id}`)
      .then(result => {
        console.log(result);
        setIamount(result.data.iamount);
        setIdescription(result.data.idescription);
      })
      .catch(error => console.log(error));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    // axios.put(`http://localhost:3001/add/incomeupdate/${id}`, { iamount, idescription })
    axios.put(`/api/add/incomeupdate/${id}`, { iamount, idescription })
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
      <p style={{marginLeft:"5px",marginTop:"15px",fontSize:"40px", color:"#001C30", fontFamily:"sans-serif", fontWeight: "bold" }}> </p>
     <div style={{marginTop:"100px"}}>
      <div className="add" style={{padding:"20px"}}>
      <Form  onSubmit={Update}>
      <p style={{fontSize:"40px", color:"#001C30", fontFamily:"sans-serif", fontWeight: "bold" }}>UPDATE YOUR INCOME </p>
        <div>
          <TextField  fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                className="mb-3"
                variant="filled"
                 label="AMOUNT"
                  type="number"  value={iamount} onChange={(e) => setIamount(e.target.value)} />
          <TextField fullWidth={true}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
                 label="DESCRIPTION"  value={idescription} onChange={(e) => setIdescription(e.target.value)} rows={3} />
      </div>
       <div style={{paddingTop:"10px"}}>
        <Button type='submit' className="mb-3" variant="contained"  sx={{backgroundColor:"#176B87",color:"white"}}>
          Update Income
        </Button>
        </div>
      </Form>
    </div>
    </div>
    </div>
  );
};

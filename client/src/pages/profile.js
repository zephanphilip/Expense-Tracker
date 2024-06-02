import React, { useState, useEffect } from "react";
import { MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import './profile.css'
import { NavBar } from '../components/navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';

export const Profile = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phoneno: "",
    education: "",
    age: "",
    place: ""
  });

  useEffect(() => {
    axios
      // .get("http://localhost:3001/auth/profile")
      .get("/api/auth/profile")
      .then(result => {
        // Filter income information by comparing the user ID
        const filteredInfo = result.data.filter(info => info._id === userID);
        setInfo(filteredInfo[0]); // Assuming there will be only one matching info object
        console.log(filteredInfo);
      })
      .catch(error => console.error(error));
  }, []);

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
      {/* <p style={{marginLeft:"5px",marginTop:"15px",fontSize:"40px", color:"#176B87", fontFamily:"sans-serif", fontWeight: "bold" }}>Welcome to Your Profile</p> */}
      <div style={{marginTop:"50px"}}>
      <div className="profileform add1" >
     
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >  
      <form className="form" >
        <div>
          <div style={{display:"flex"}}>
      <TextField
          id="outlined-read-only-input"
          label="Name"
          value={info.name}
          
        />
         <TextField
          id="outlined-read-only-input"
          label="Email"
          type="email"
          value={info.email}
          
        />
               
            </div>
            <div style={{display:"flex"}}>
        <TextField
          id="outlined-read-only-input"
          label="Age"
          type="number"
          value={info.age}
          
        />
       
        <TextField
          id="outlined-read-only-input"
          label="Contact Number"
          type="number"
          value={info.phoneno}
          
        />
        </div>
        <div style={{display:"flex"}}>
        <p style={{fontSize:"40px", color:"#001C30", fontFamily:"sans-serif", fontWeight: "bold" ,marginTop:"10px",textAlign:"right"}}>WELCOME TO  </p>
         <TextField
          id="outlined-multiline-static"
          label="Address"
          multiline
          rows={4}
          value={info.place}
        />
        </div>
        <div style={{display:"flex"}}>
        <p style={{fontSize:"40px", color:"#001C30", fontFamily:"sans-serif", fontWeight: "bold" ,textAlign:"right"}}>YOUR PROFILE  </p>
          <TextField
          id="outlined-multiline-static"
          label="Education"
          multiline
          rows={4}
          value={info.education}
        />
        </div>
        </div>
                
          <Button type="submit" variant="contained" component={Link} to={`/profupdate/${info._id}`} style={{ backgroundColor:"#176B87"}}block>
            Edit
          </Button>
        
      </form>
      </Box>
      </div>
    </div>
    </div>
  );
};

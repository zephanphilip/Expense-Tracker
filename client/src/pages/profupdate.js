import React, { useState, useEffect } from "react";
import { MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { NavBar } from '../components/navbar';
import { Button } from '@mui/material';
import './profile.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Profupdate = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const { id } = useParams();

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
  const handleChange = React.useCallback((value) => {
    setInfo(state => ({
        ...state,
        ...value
    }));
}, [setInfo]);

const Update = (e) => {
  e.preventDefault();
  
  const updatedFields = {
    name: info.name,
    email: info.email,
    phoneno: info.phoneno,
    education: info.education,
    age: info.age,
    place: info.place,
  };

  // axios.put(`http://localhost:3001/auth/profileupdate/${id}`, updatedFields)
  axios.put(`/api/auth/profileupdate/${id}`, updatedFields)
    .then(result => {
      console.log(result);
      navigate('/profile');
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
      <NavBar />
      
     <div style={{marginTop:"50px"}}>
      <div className="profileform add1" > 
      
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}

    >
      <form className="form" >
        <div>
        <div style={{display:"flex"}}>
      <TextField
          id="outlined-read-only-input"
          label="Name"
          value={info.name}
          
         onChange={(e) => handleChange({ name: e.target.value })} />
           <TextField
          id="outlined-read-only-input"
          label="Email"
          type="email"
          value={info.email}
          onChange={(e) => handleChange({ email: e.target.value })}
           />
           </div>
           <div style={{display:"flex"}}>
       <TextField
          id="outlined-read-only-input"
          label="Age"
          type="number"
          value={info.age} 
          onChange={(e) => handleChange({ age: e.target.value })} 
           />
        

        <TextField
          id="outlined-read-only-input"
          label="Contact Number"
          type="number"
          value={info.phoneno}
          onChange={(e) => handleChange({ phoneno: e.target.value })}
          />
          </div>
          <div style={{display:"flex"}}>
        <p style={{fontSize:"40px", color:"#001C30", fontFamily:"sans-serif", fontWeight: "bold" ,marginTop:"10px",textAlign:"LEFT"}}>UPDATE YOUR </p>
          <TextField
          id="outlined-multiline-static"
          label="Address"
          multiline
          rows={4}
          value={info.place} onChange={(e) => handleChange({ place: e.target.value })}
           />
           </div>
        <div style={{display:"flex"}}>
        <p style={{fontSize:"40px", color:"#001C30", fontFamily:"sans-serif", fontWeight: "bold",textAlign:"LEFT" }}>PROFILE INFO  </p>
         <TextField
          id="outlined-multiline-static"
          label="Education"
          multiline
          rows={4}
          value={info.education} 
          onChange={(e) => handleChange({ education: e.target.value })} 
           />
           </div>
            </div>
          <Button  variant="contained" style={{backgroundColor:"#176B87"}} onClick={Update}>
            Save
          </Button>
      </form>
      </Box>
    </div>
    </div>
    </div>
   
  );
};

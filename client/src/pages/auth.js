import { NavBar } from '../components/navbar';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import './auth.css';
import { useLogin } from '../hooks/useLogin'
import { useSignup } from '../hooks/useSignup'

export const Auth = () => {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const{login, isLoading, error} = useLogin()
    const{signup, isLoading: isLoadingforSignup, error: errorforSignup} = useSignup();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    
    const navigate = useNavigate();
  
    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
  
      setJustifyActive(value);
    }
  


    const onSubmitLogin = async (event) => {
      if (username === "admin" && password === "admin") {
        navigate("/admin");
      } else {
        event.preventDefault();
        await login(username, password); 
      }
    }
    
    
  
    const onSubmitRegister = async (event) => {
      event.preventDefault();
      await signup(
          username,
          password,
          email,
          name
        );
        if(errorforSignup){
          console.log("Error: " + errorforSignup);
        }
        
    }
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
    <div className="formcss" >
    <form onSubmit={justifyActive === "tab1" ? onSubmitLogin : onSubmitRegister}>
        <div style={{ width: '360' }}>
                <MDBContainer className="p-3 my-5 d-flex flex-column w-600">
                <MDBTabs
                pills
                justify
                className="mb-3 d-flex flex-row justify-content-between"
                >
                <MDBTabsItem>
                    <MDBTabsLink
                    onClick={() => handleJustifyClick("tab1")}
                    active={justifyActive === "tab1"}
                    >
                    Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}
                    >
                    Register
                    </MDBTabsLink>
                </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                <MDBTabsPane show={justifyActive === "tab1"}>
                    <MDBInput
                    wrapperClass="mb-4"
                    id="username"
                    value={username}
                    placeholder="Username"
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    id="password"
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    />


                    <Button className="mb-4 w-100" type="submit" variant="outlined" disabled={isLoading}>
                    Login
                    </Button>
                    {error && <div className='error'>{error}</div>}
                    <p className="text-center" >
                    Not a member? <a href="#!"  onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}>Register</a>
                    </p>
                </MDBTabsPane>

                <MDBTabsPane show={justifyActive === "tab2"}>
                <MDBInput
                    wrapperClass="mb-4"
                    value={name}
                    placeholder="Name"
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value )}
                    />
                    
                    <MDBInput
                    wrapperClass="mb-4"
                    value={email}
                    placeholder="Email id"
                    id="emailid"
                    type="email"
                    onChange={(e) => setEmail(e.target.value )}
                    />  
                    <MDBInput
                    wrapperClass="mb-4"
                    value={username}
                    placeholder="Username"
                    id="username"
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    id="password"
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button className="mb-4 w-100" type="submit" variant="outlined" disabled={isLoadingforSignup}>Sign up</Button>
                    {errorforSignup && <div className='error'>{errorforSignup}</div>}

                </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
        </div>
        </form>
    </div>
</div>
  )
}

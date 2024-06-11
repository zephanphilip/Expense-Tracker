import { NavBar } from '../components/navbar';
import { Button, TextField, Container, Tabs, Tab, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import './auth.css';
import { useLogin } from '../hooks/useLogin';
import { useSignup } from '../hooks/useSignup';

export const Auth = () => {
  const [justifyActive, setJustifyActive] = useState('login');
  const handleJustifyClick = (event, newValue) => {
    setJustifyActive(newValue);
  };

  const { login, isLoading, error } = useLogin();
  const { signup, isLoading: isLoadingforSignup, error: errorforSignup } = useSignup();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      navigate("/admin");
    } else {
      await login(username, password);
    }
  };

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    await signup(username, password, email, name);
    if (errorforSignup) {
      console.log("Error: " + errorforSignup);
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
      <Container maxWidth={{sm:"sm"}} className="formcss" sx={{margin:'20'}}>
        <form onSubmit={justifyActive === "login" ? onSubmitLogin : onSubmitRegister}>
          <Tabs
            value={justifyActive}
            onChange={handleJustifyClick}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="login and register tabs"
          >
            <Tab label="Login" value="login" />
            <Tab label="Register" value="register" />
          </Tabs>
          {justifyActive === 'login' && (
            <Box p={3}>
              <TextField
                fullWidth
                margin="normal"
                id="username"
                value={username}
                placeholder="Username"
                type="text"
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                id="password"
                value={password}
                placeholder="Password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                fullWidth
                variant="outlined"
                type="submit"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                Login
              </Button>
              {error && <div className="error">{error}</div>}
              <p className="text-center">
                Not a member? <a href="#!" onClick={() => handleJustifyClick(null, 'register')}>Register</a>
              </p>
            </Box>
          )}
          {justifyActive === 'register' && (
            <Box p={3}>
              <TextField
                fullWidth
                margin="normal"
                value={name}
                placeholder="Name"
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                value={email}
                placeholder="Email id"
                id="emailid"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                value={username}
                placeholder="Username"
                id="username1"
                type="text"
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                id="password1"
                value={password}
                placeholder="Password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                fullWidth
                variant="outlined"
                type="submit"
                disabled={isLoadingforSignup}
                sx={{ mt: 2 }}
              >
                Sign up
              </Button>
              {errorforSignup && <div className="error">{errorforSignup}</div>}
            </Box>
          )}
        </form>
      </Container>
    </div>
  );
};

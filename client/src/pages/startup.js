import React, { useState } from 'react';

import './startup.css';

import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';


const pages = ['Home'];

export const Startup = () => {

    return(
        <div className='startup-page'>
            <div>
            <AppBar position="static" sx={{backgroundColor:"#001C30"}} >
            <Toolbar disableGutters>
        
                    <Typography
                      variant="h6"
                      noWrap
                      component={Link}
                      to="/"
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'arial',
                        fontWeight: 700,

                        color: 'inherit',
                        textDecoration: 'none',
                        paddingLeft:"12px",
                      }}
                    >
                      EXPENSE TRACKER
                    </Typography>
        <Typography
          variant="h9"
          noWrap
          component={Link}
          to=""
          margin={2}
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'arial',
            fontWeight: 700,

            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          EXPENSE TRACKER
        </Typography>


        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={'/' + page.toLowerCase()}
            >
              
            </Button>
          ))}
        </Box>

        <Box style={{paddingRight:"10px"}} sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
          <Button
              
              sx={{ my: 2, color: 'white',fontWeight:"semi-bold", display: 'block' }}
              component={Link}
              to={'/auth'}
            >
              Login/Register
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
                </div>        
                <section class="header">
  <div class="title-wrapper">
    <h1 class="sweet-title">
      <span >Expense Tracker</span>
    </h1>
   
    <span class="bottom-title" >Track your Expense!</span>
    <span class="bottom-title"><Button variant="outlined" component={Link} to={'/auth'} sx={{color:"#64CCC5",display: { xs: 'none'}, borderColor: "#64CCC5",'&:hover': {
      borderColor: "#64CCC5"}}} disableElevation
  disableRipple>Get in!</Button></span>
    </div>
</section>
        </div>
        
        
    )
}
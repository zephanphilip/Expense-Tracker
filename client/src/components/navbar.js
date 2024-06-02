import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const pages = ['Home'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const NavBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['access_token']);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user } = useAuthContext()

  const {logout} = useLogout()
  
  const handleClick = () => {
    logout()
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const profile = () => {
    navigate('/profile');
  };

  return (
    <AppBar position="static" sx={{backgroundColor:"#176B87",color:"white"}}>
      <Toolbar disableGutters>
        
      <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/home"
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
          EXPENSIFY
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to="/home"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          EXPENSIFY
        </Typography>


        {!cookies.access_token ? (<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={'/' + page.toLowerCase()}
            >
              
            </Button>
          ))}</Box>): (<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={'/' + page.toLowerCase()}
            >
              {page}
            </Button>
          ))}
        </Box>)}

        <Box style={{paddingRight:"10px"}} sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" url="https://cdn-icons-png.flaticon.com/512/6386/6386976.png" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user && (
              <div>
                <MenuItem onClick={handleClick}><Typography textAlign="center">Logout</Typography></MenuItem>
                </div> )}
              
            {/* {!cookies.access_token ? (
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/auth">
                <Typography textAlign="center">Logidgfn/Register</Typography>
              </MenuItem>
            ) : (
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            )}
            {!cookies.access_token ? (
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/">
                <Typography textAlign="center"></Typography>
              </MenuItem>
            ) : (
              <MenuItem onClick={profile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            )} */}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}



















// import { Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import './navbar.css'
// import {useCookies} from 'react-cookie';
// import {useNavigate} from 'react-router-dom';
// import PersonIcon from '@mui/icons-material/Person';


// export const NavBar = () => {
//   const navigate = useNavigate();

//   const [cookies, setCookies] = useCookies(['access_token']);

//     const logout = () => {
//         setCookies("access_token","");
//         navigate("/");
//         window.localStorage.removeItem('userID');
//         window.location.reload();
//     }
//     // const login = () => {
//     //     navigate("/auth");
//     //     window.location.reload();
//     // }
//     // const profile = () => {
//     //     navigate("/profile");
//     //     window.location.reload();
//     // }
//     // const home = () => {
//     //     navigate("/home");
//     //     window.location.reload();}
//     return (

//         <div className="navbarr">
//              <p style={{marginLeft:"10px",marginTop:"9px", color: "white",fontSize:"large", fontFamily:"sans-serif", fontWeight: "bold" }}>TRACKIFY</p>
//              {!cookies.access_token ? (<p><Link to='/' style={{marginLeft:"30px" }}></Link></p>):(<Link to='/home' style={{marginTop:"9px",marginLeft:"15px",textDecoration: 'none', color: 'inherit',fontFamily:"sans-serif", fontWeight: "bold"}}>Home</Link>)}
//             <Link style={{marginTop:"9px",}} to='/profile'> <PersonIcon style={{textDecoration: 'none', color: 'black',fontFamily:"sans-serif", fontWeight: "bold"}}/></Link>
//              {!cookies.access_token ? (<Link  style={{backgroundColor:"none", marginRight: '26' ,marginTop:"9px",textDecoration: 'none', color: 'inherit',fontFamily:"sans-serif", fontWeight: "bold"}} to="/auth">Login/Register</Link>) : (<Link style={{marginTop:"9px",marginLeft:"15px",textDecoration: 'none', color: 'inherit',fontFamily:"sans-serif", fontWeight: "bold"}} className="mb-3" onClick={logout}>Logout</Link>)}
//          </div>
//             );
//         };
 
    //     <Box sx={{ flexGrow: 1 }}>
    //     <AppBar position="static">
    //       <Toolbar>
    //         <IconButton
    //           size="medium"
    //           edge="start"
    //           color="inherit"
    //           aria-label="menu"
    //           sx={{ mr: 2 }}
    //         >
    //           <p style={{marginLeft:"10px",marginTop:"9px", color: "white", fontFamily:"sans-serif", fontWeight: "bold" }}>TRACKIFY</p>
    //         </IconButton>
    //         {!cookies.access_token ?(<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
    //         </Typography>):(<Button onClick={home} color="inherit">Home</Button>)}
    //         <Button onClick={profile} color="inherit">Profile</Button>
    //         {!cookies.access_token ?(<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> 
    //         </Typography>):(<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //           Home
    //         </Typography>)}
    //         {!cookies.access_token ? (<Button onClick={login} color="inherit">Login/Register</Button>) : (<Button color="inherit" onClick={logout}>Logout</Button>)}
    //       </Toolbar>
    //     </AppBar>
    //   </Box>
 

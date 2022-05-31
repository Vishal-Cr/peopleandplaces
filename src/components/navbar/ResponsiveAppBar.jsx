import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import './styles/ResponsiveAppBar.css';



const pages = ['All Users', 'My Places', 'Add Places','Authenticate'];

const buttonStyle={ my: 2, color: 'white', display: 'block' };
const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  const menuItemStyle={background:'#333'};
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoAwesomeTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'underline overline',
            }}
          >
             Peoples & Places 
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
             
                <MenuItem  onClick={handleCloseNavMenu} style={menuItemStyle} >
                  <Button><NavLink to='/' className='navlinks' >All Users</NavLink></Button>
                </MenuItem>
                
                <MenuItem  onClick={handleCloseNavMenu}  style={menuItemStyle}>
               <Button sx={buttonStyle}>
                  <NavLink to='/u1/places'  className='navlinks'>My Places</NavLink>
              </Button>
                </MenuItem>
                
                <MenuItem  onClick={handleCloseNavMenu} style={menuItemStyle}>
              <Button sx={buttonStyle}>
                  <NavLink to='/places/new'  className='navlinks'>Add Places</NavLink>
              </Button>
                </MenuItem>
                
                <MenuItem  onClick={handleCloseNavMenu} style={menuItemStyle}>
              <Button sx={buttonStyle}>
                  <NavLink to='/auth'  className='navlinks'>Authenticate</NavLink>
              </Button>
                </MenuItem>
              
            </Menu>
          </Box>
          <AutoAwesomeTwoToneIcon/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'underline overline',
            }}
          >
            Peoples & Places
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button sx={buttonStyle}>
                  <NavLink to='/' className='navlinks'>All Users</NavLink>
              </Button>
              <Button sx={buttonStyle}>
                  <NavLink to='/u1/places'  className='navlinks'>My Places</NavLink>
              </Button>
              <Button sx={buttonStyle}>
                  <NavLink to='/places/new'  className='navlinks'>Add Places</NavLink>
              </Button>
              <Button sx={buttonStyle}>
                  <NavLink to='/auth'  className='navlinks'>Authenticate</NavLink>
              </Button>
                
            
            
          </Box>

         
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

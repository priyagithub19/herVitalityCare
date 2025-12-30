import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Stack from '@mui/material/Stack';
import { House, Compass, Plus, Info, CircleUser, LogIn } from 'lucide-react';

const navItems = [
  { id: 1, title: 'Home', icon: <House />, link: '/' },
  { id: 2, title: 'Explore', icon: <Compass />, link: '/explore' },
  { id: 3, title: 'Start Tracking', icon: <Plus />, link: '/login' },
  { id: 4, title: 'About Us', icon: <Info />, link: '#about-us' },
  { id: 5, title: 'Profile', icon: <CircleUser />, link: '/dashboard' },
  { id: 6, title: 'Login', icon: <LogIn />, link: '/login' },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
  position="fixed"
  sx={{
    top: "10%",
    width: 'min-content',
    paddingInline: '9px',
    zIndex: 1200,
    backgroundColor: 'transparent',
    boxShadow: "none",
  }}
>
        <Toolbar className='navbar' disableGutters >
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } , position: 'absolute', bottom: 0, right: 0}}>
            <IconButton
              size="medium"
              aria-label="menu"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{color: '#700D3F'}} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navItems.map((item) => (
                <MenuItem className='navItems' key={item.id} onClick={handleCloseNavMenu}>
                  <span style={{color: '#700D3F'}}>{item.icon}</span>
                  <Typography sx={{ ml: 1 }}>{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box className="desktop-nav" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', width: 'fit-content', margin: 'auto' }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                href={item.link}
                sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center', gap: 1, mx: 1, }}
              >
                <Stack spacing={0} alignItems="center">
                    {item.id !== 3 ?(
                    <div style={{ display: 'flex', flexDirection:'column' , alignItems: 'center', gap: '8px', padding:'auto', margin:'auto' }}>
                      <span style={{fontSize: '8px', color: '#700D3F'}}>{item.icon}</span>
                      <span className='navitemName'>{item.title}</span>
                    </div>) : (
                    <div style={{ display: 'flex', flexDirection:'column' , alignItems: 'center', gap: '8px', padding:'auto', margin:'auto' }}>
                        <div style={{width: '24px', height: '24px', display: 'flex', alignItems: 'center', borderRadius: '50%', backgroundColor: 'white', color: '#700D3F', justifyContent: 'center'}}>                      
                            {item.icon}
                        </div>
                      <span className='navitemName'>{item.title}</span>
                    </div>)}
                </Stack>
              </Button>
            ))}
          </Box>
        </Toolbar>
        </AppBar>
      );
}

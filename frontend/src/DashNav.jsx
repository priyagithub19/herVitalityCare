import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import fullLogo from '/images/mainLogo.png';
import logo from '/images/logo.png';
import DashHome from './DashHome';
import { useState, useRef  } from 'react';




const drawerWidth = 240;
const iconArray = [{
  icon : <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 20 20"><g fill="none"><path fill="url(#SVGkyU6WdPR)" d="M7 11h6v6H7z"></path><path fill="url(#SVGd0sMQeoI)" d="M11.003 3.384a1.5 1.5 0 0 0-2.005 0l-5.5 4.942A1.5 1.5 0 0 0 3 9.442v6.054a1.5 1.5 0 0 0 1.5 1.5H6V17h2v-5.504a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V17h3v-.004h.5a1.5 1.5 0 0 0 1.5-1.5V9.442a1.5 1.5 0 0 0-.497-1.116z"></path><path fill="url(#SVGKYJ5Go9C)" fillRule="evenodd" d="M10.644 2.239a.986.986 0 0 0-1.288 0l-7.03 6.103a.934.934 0 0 0-.082 1.34a.985.985 0 0 0 1.369.079L10 4.216l6.387 5.545a.985.985 0 0 0 1.369-.08a.934.934 0 0 0-.082-1.339z" clipRule="evenodd"></path><path fill="url(#SVGKYJ5Go9C)" fillRule="evenodd" d="M9.356 2.239a.986.986 0 0 1 1.287 0l7.031 6.103c.4.348.437.947.082 1.34a.985.985 0 0 1-1.369.079L10 4.216L3.613 9.761a.985.985 0 0 1-1.369-.08a.934.934 0 0 1 .082-1.339z" clipRule="evenodd"></path><defs><linearGradient id="SVGkyU6WdPR" x1={10} x2={6.633} y1={11} y2={18.485} gradientUnits="userSpaceOnUse"><stop stopColor="#94004b"></stop><stop offset={1} stopColor="#cd028b"></stop></linearGradient><linearGradient id="SVGd0sMQeoI" x1={4.336} x2={18.074} y1={2.315} y2={13.481} gradientUnits="userSpaceOnUse"><stop stopColor="#ff94d9"></stop><stop offset={1} stopColor="#ff57bd"></stop></linearGradient><linearGradient id="SVGKYJ5Go9C" x1={7.415} x2={10.929} y1={0.1} y2={9.604} gradientUnits="userSpaceOnUse"><stop stopColor="#ff1fa7"></stop><stop offset={1} stopColor="#eb2489"></stop></linearGradient></defs></g></svg>,
  label: 'Home'
  },{
    icon : <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48"><g fill="none" stroke="#c52873" strokeLinejoin="round" strokeWidth={4}><path strokeLinecap="round" d="M43.7756 20.9938C42.4735 12.3555 35.6463 5.5277 27.0084 4.22461M20.9757 4.22702C11.3651 5.68478 4 13.9822 4 23.9998C4 34.0212 11.3705 42.321 20.9863 43.7743C21.9692 43.9228 22.9756 43.9998 24 43.9998C25.0209 43.9998 26.024 43.9233 27.0038 43.7758C35.6458 42.4741 42.4762 35.6427 43.7764 27.0003"></path><path fill="#FF90BB" d="M24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16Z"></path></g></svg>,
    label: 'Tracker'
  },{
    icon : <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 16 16"><g fill="none"><path fill="url(#SVGrwuGtcVh)" d="M13 4a2 2 0 0 1 2 2v4.5a2.5 2.5 0 0 1-2.5 2.5l-.023-9z"></path><path fill="url(#SVGJdWhObSs)" d="M1 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8.95q-.243.05-.5.05h-9A2.5 2.5 0 0 1 1 10.5z"></path><path fill="url(#SVGeS4wFbmj)" d="M1 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8.95q-.243.05-.5.05h-9A2.5 2.5 0 0 1 1 10.5z"></path><path fill="url(#SVGeDF8iboa)" d="M1 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8.95q-.243.05-.5.05h-9A2.5 2.5 0 0 1 1 10.5z"></path><path fill="url(#SVG68RIee3f)" d="M3.5 7a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"></path><path fill="url(#SVGdCTsBbav)" d="M3.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm4 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"></path><defs><linearGradient id="SVGJdWhObSs" x1={4.429} x2={13.346} y1={0.308} y2={12.311} gradientUnits="userSpaceOnUse"><stop stopColor="#ff3ba0"></stop><stop offset={1} stopColor="#f236a9"></stop></linearGradient><linearGradient id="SVGeS4wFbmj" x1={7.857} x2={7.857} y1={10.885} y2={13} gradientUnits="userSpaceOnUse"><stop offset={0.181} stopColor="#e7278f" stopOpacity={0}></stop><stop offset={1} stopColor="#e7278f"></stop></linearGradient><linearGradient id="SVGeDF8iboa" x1={7.429} x2={11.535} y1={5.385} y2={16.126} gradientUnits="userSpaceOnUse"><stop stopColor="#ffdcef" stopOpacity={0}></stop><stop offset={1} stopColor="#ff6ce8" stopOpacity={0.7}></stop></linearGradient><linearGradient id="SVG68RIee3f" x1={3.286} x2={4.787} y1={6.853} y2={9.857} gradientUnits="userSpaceOnUse"><stop stopColor="#ffdef0"></stop><stop offset={1} stopColor="#f99fd6"></stop></linearGradient><linearGradient id="SVGdCTsBbav" x1={3.7} x2={4.227} y1={5.088} y2={10.525} gradientUnits="userSpaceOnUse"><stop stopColor="#fdfdfd"></stop><stop offset={1} stopColor="#ffccea"></stop></linearGradient><radialGradient id="SVGrwuGtcVh" cx={0} cy={0} r={1} gradientTransform="rotate(129.203 6.987 6.595)scale(6.38779 9.53604)" gradientUnits="userSpaceOnUse"><stop stopColor="#eb0692"></stop><stop offset={0.617} stopColor="#cf007f"></stop><stop offset={0.974} stopColor="#e51a84"></stop></radialGradient></defs></g></svg>,
    label: 'Digital Report'
  },  // const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#FF90BB" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"></path></g></svg>
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 14 14"><g fill="none"><path fill="#c52873" fillRule="evenodd" d="M7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0" clipRule="evenodd"></path><path fill="#fa8fc6" d="m10.135 5.25l-1.52.673v-.808a.54.54 0 0 0-.538-.539h-4.04a.54.54 0 0 0-.538.539v3.77a.54.54 0 0 0 .539.539h4.04a.54.54 0 0 0 .538-.539v-.808l1.519.674a.27.27 0 0 0 .366-.254V5.503a.27.27 0 0 0-.366-.253"></path></g></svg>,
    label: 'Video Counseling'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><g fill="none"><path fill="url(#SVGwq5esEmc)" d="M11 6a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2h-9a1 1 0 0 1-1-1"></path><path fill="url(#SVGwq5esEmc)" d="M11 9a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"></path><path fill="url(#SVGwq5esEmc)" d="M11 15a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2h-9a1 1 0 0 1-1-1"></path><path fill="url(#SVGwq5esEmc)" d="M11 18a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"></path><path fill="url(#SVGqhQTjbCf)" d="M4.25 4A2.25 2.25 0 0 0 2 6.25v2.5A2.25 2.25 0 0 0 4.25 11h2.5A2.25 2.25 0 0 0 9 8.75v-2.5A2.25 2.25 0 0 0 6.75 4zm0 9A2.25 2.25 0 0 0 2 15.25v2.5A2.25 2.25 0 0 0 4.25 20h2.5A2.25 2.25 0 0 0 9 17.75v-2.5A2.25 2.25 0 0 0 6.75 13z"></path><defs><linearGradient id="SVGwq5esEmc" x1={9.35} x2={20.9} y1={3} y2={19} gradientUnits="userSpaceOnUse"><stop stopColor="#f136a2"></stop><stop offset={1} stopColor="#f0008a"></stop></linearGradient><linearGradient id="SVGqhQTjbCf" x1={3.665} x2={7.232} y1={6.127} y2={19.147} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#fe6cbb"></stop><stop offset={1} stopColor="#dc41b4"></stop></linearGradient></defs></g></svg>,
    label: 'Tips'
  }
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    // width: `calc(${theme.spacing(12)} + 1px)`,
    width: 130,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);


export default function DashNav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [calOpn, setcalOpn] = React.useState(false);
  const [openDraw, setOpenDraw] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


// const pieData = daysArray.map((day, index) => ({
//   id: index,
//   value: 1,
//   label: day,
//   color: colors[index % colors.length],
// }));


  return (
    <>
      {/* <CssBaseline /> */}
      {/* <AppBar position="fixed" open={open} > */}
        {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar> */}
      {/* </AppBar> */}
      <Drawer variant="permanent" open={open} sx={{
    '& .MuiDrawer-paper': {
      backgroundColor: '#FFDBE9',  
      color: '#e0327d',
      borderRadius: '0 20px 20px 0',
      fontWeight: '900'
    },
  }}
>
        <DrawerHeader sx={{ justifyContent: 'center'}}>
        {/* <Box className="logo" sx={{  display: 'flex', justifyContent: 'center', height: '8vh', alignItems: 'center', backgroundColor: '#fffff7', padding: '0.2rem', borderRadius: '10px', }} > */}
          <img src={open ? fullLogo : logo} alt="Logo" style={{ maxHeight: 50, maxWidth: 200, transform: open ? 'scale(0.7)' : 'scale(0.8)', transition: 'left 0.4s ease-in-out' }} />
        {/* </Box> */}
        </DrawerHeader>
        {/* <Divider /> */}
        <List >
          {iconArray.map((icon, index) => (
            <ListItem key={index} sx={{fontFamily: 'Roboto Slab, serif'}}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 40,
                    px: open ? '1rem' : '2rem',
                    backgroundColor: '#fcb3d9',
                    borderRadius: 25,
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: 'inset 0 0 5px rgba(255, 255 , 255, 1)',
                    minWidth: open ? 'max-content' : '100%',
                    fontWeight: '900',
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      // color: '#e0327d',
                      fontSize: 50
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {icon.icon}
                </ListItemIcon>
                <ListItemText
                  primary={icon.label}
                  primaryTypographyProps={{
    fontFamily: 'Roboto Slab, serif',
    fontWeight: 700,
    fontSize: '0.8rem',
    letterSpacing: '0.5px',
  }}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        {/* <Box sx={{justifyContent: 'end'}}> */}
                  <IconButton sx={{background: 'rgba(255, 255, 255, 0.07)',
borderRadius: '16px',
boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
backdropFilter: 'blur(5px)',
WebkitBackdropFilter: 'blur(5px)',
border: '2px solid rgba(255, 255, 255, 0.3)',
width: 'fit-content',
position: 'absolute',
bottom: '2rem',
left: open ? '11rem' : '4rem',
transition: 'left 0.3s ease-in-out',
}}>
          {open ? <ChevronLeftIcon onClick={handleDrawerClose} /> : <ChevronRightIcon onClick={handleDrawerOpen}/>}
          </IconButton>
{/* </Box> */}
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      {/* <Box sx={{m: 0, backgroundColor: '#f5b5d4'}}> */}
      </>
  );
}

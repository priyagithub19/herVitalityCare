import React from 'react';
import welcomeImg from '/images/welcomeCal.svg';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/material/Tooltip';
import { PieChart } from '@mui/x-charts/PieChart';
import Calendar from './calendar';
import { useState, useRef  } from 'react';
import Popover from '@mui/material/Popover';
import Accordion from './Accordion';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DashNav from './DashNav';


export default function DashHome(){
      const [hasCycleData, setHasCycleData] = useState(false);
const [cycleStartDate, setCycleStartDate] = useState(null);
const CYCLE_LENGTH = 28;
  const drawerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);


const btnIcon = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 48 48"><g fill="none" strokeWidth={3}><path fill="#fff" d="M3.859 39.973c.315 2.196 1.993 3.851 4.192 4.144c3.13.418 8.38.899 15.949.899s12.818-.481 15.949-.899c2.199-.293 3.877-1.948 4.192-4.144c.408-2.844.859-7.368.859-13.457s-.451-10.614-.859-13.458c-.315-2.196-1.993-3.85-4.192-4.144c-3.13-.417-8.38-.898-15.949-.898s-12.818.48-15.949.898c-2.199.293-3.877 1.948-4.192 4.144C3.451 15.902 3 20.426 3 26.516s.451 10.613.859 13.457"></path><path stroke="#c52875" strokeLinecap="round" strokeLinejoin="round" d="M24 21v14m7-7H17m7-8v16m8-8H16M11.003 8.578c-1.137.11-2.12.225-2.952.336c-2.199.293-3.877 1.948-4.192 4.144C3.451 15.902 3 20.426 3 26.515s.451 10.614.859 13.458c.315 2.196 1.993 3.851 4.192 4.144c3.13.417 8.38.899 15.949.899s12.818-.482 15.949-.899c2.199-.293 3.877-1.948 4.192-4.144c.408-2.844.859-7.368.859-13.457s-.451-10.614-.859-13.458c-.315-2.196-1.993-3.851-4.192-4.144a82 82 0 0 0-2.952-.336M29 8.09a164 164 0 0 0-5-.074q-2.693.002-5 .074"></path><path fill="#fa8fd2" d="M11.013 9.27c.043 2.08 1.409 3.694 3.489 3.726a33 33 0 0 0 .996 0c2.08-.032 3.446-1.646 3.489-3.726a61 61 0 0 0 0-2.54c-.043-2.08-1.409-3.694-3.489-3.726a32 32 0 0 0-.996 0c-2.08.032-3.446 1.646-3.489 3.726a61 61 0 0 0 0 2.54m18 0c.043 2.08 1.409 3.694 3.489 3.726a33 33 0 0 0 .996 0c2.08-.032 3.446-1.646 3.489-3.726a61 61 0 0 0 0-2.54c-.043-2.08-1.409-3.694-3.489-3.726a32 32 0 0 0-.996 0c-2.08.032-3.446 1.646-3.489 3.726a61 61 0 0 0 0 2.54"></path><path stroke="#c52875" strokeLinecap="round" strokeLinejoin="round" d="M11.013 9.27c.043 2.08 1.409 3.694 3.489 3.726a33 33 0 0 0 .996 0c2.08-.032 3.446-1.646 3.489-3.726a61 61 0 0 0 0-2.54c-.043-2.08-1.409-3.694-3.489-3.726a32 32 0 0 0-.996 0c-2.08.032-3.446 1.646-3.489 3.726a61 61 0 0 0 0 2.54m18 0c.043 2.08 1.409 3.694 3.489 3.726a33 33 0 0 0 .996 0c2.08-.032 3.446-1.646 3.489-3.726a61 61 0 0 0 0-2.54c-.043-2.08-1.409-3.694-3.489-3.726a32 32 0 0 0-.996 0c-2.08.032-3.446 1.646-3.489 3.726a61 61 0 0 0 0 2.54"></path></g></svg>
const newtrack = <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 14 14"><g fill="none"><path fill="#ffd7f8" d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13"></path><path stroke="#d54195ff" strokeLinecap="round" strokeLinejoin="round" d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13M7 4v6M4 7h6" strokeWidth={1}></path></g></svg>
const bellnot = <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><g fill="none"><path fill="url(#SVGZlGEh56m)" d="M20 24a4 4 0 1 1-8 0a4 4 0 0 1 8 0"></path><path fill="url(#SVGUPAv2aTZ)" d="M7 13a9 9 0 0 1 18 0v3.807l1.928 4.822A1 1 0 0 1 26 23H6a1 1 0 0 1-.928-1.371L7 16.807z"></path><path fill="url(#SVGf8htIdXJ)" fillOpacity={0.2} d="M7 13a9 9 0 0 1 18 0v3.807l1.928 4.822A1 1 0 0 1 26 23H6a1 1 0 0 1-.928-1.371L7 16.807z"></path><path fill="#212121" d="M27 9a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path><path fill="url(#SVGqy2OcbGo)" d="M27 9a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path><defs><linearGradient id="SVGZlGEh56m" x1={16} x2={16.026} y1={22.857} y2={27.999} gradientUnits="userSpaceOnUse"><stop stopColor="#eb4824"></stop><stop offset={1} stopColor="#ffcd0f" stopOpacity={0.988}></stop></linearGradient><linearGradient id="SVGUPAv2aTZ" x1={24.243} x2={8.48} y1={20.889} y2={5.769} gradientUnits="userSpaceOnUse"><stop stopColor="#ff6f47"></stop><stop offset={1} stopColor="#ffcd0f"></stop></linearGradient><linearGradient id="SVGqy2OcbGo" x1={21.214} x2={25.929} y1={7.125} y2={10.875} gradientUnits="userSpaceOnUse"><stop stopColor="#f83f54"></stop><stop offset={1} stopColor="#b91d6b"></stop></linearGradient><radialGradient id="SVGf8htIdXJ" cx={0} cy={0} r={1} gradientTransform="rotate(132.806 9.931 9.9)scale(8.09417 8.84338)" gradientUnits="userSpaceOnUse"><stop offset={0.253} stopColor="#ffe994"></stop><stop offset={0.648} stopColor="#ffe994" stopOpacity={0}></stop></radialGradient></defs></g></svg>
const plus = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 48 48"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path d="M24.0605 10L24.0239 38"></path><path d="M10 24L38 24"></path></g></svg>

  

  let today = new Date();
  let date = today.getDate() + '/' + (today.toLocaleString('default', { month: 'short' })) + '/' + today.getFullYear();
  let month = today.toLocaleString('default', { month: 'long' });
  let year = today.getFullYear();

  function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

  const days = getDaysInMonth(today.getFullYear(), today.getMonth()); 
  const daysArray = Array.from(
  { length: days },
  (_, i) => i + 1
);

const colors = 
  "#FADADD" // blush
  // "#FBCFE8", // rose
  // "#DDD6FE", // lavender
  // "#CFFAFE", // aqua
  // "#DCFCE7", // mint
  // "#FEF3C7", // soft yellow


  const todayIndex = hasCycleData
  ? Math.floor(
      (Date.now() - new Date(cycleStartDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) % CYCLE_LENGTH
  : null;


 
const pieData = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  value: 1,
  color:
    !hasCycleData
      ? "#ECC1DB"
      : i < todayIndex
      ? "#E86A9A"
      : i === todayIndex
      ? "#C2185B"
      : "#F7C9DA",
}));

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;



    return(
            <Box sx={{ display: 'flex', backgroundColor: 'rgba(245, 181, 212, 0.3)', height: '100vh', overflow: 'hidden' }}>
<DashNav />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mx: 2, pr: 0, overflow: 'scroll', overflowX: 'hidden', scrollbarWidth: 'none'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
        <Box sx={{display: 'flex',  flexDirection: 'row', width: '100%', height: '10rem', backgroundColor: 'rgba(235, 143, 188, 0.5)', p: 5, borderRadius: 5, boxShadow: 'inset 0 0 17px rgba(255, 255, 255, 0.7)', border: '1px solid rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', gap: 10}}>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '50%'}}>
          <Typography variant="h6" gutterBottom sx={{fontSize: '2.3rem', fontFamily: 'Merienda, cursive', color: '#a45b77',filter: 'drop-shadow(3px 4px 4px rgba(164, 91, 119, 0.5))', fontWeight: '800'}}>
            Welcome Back! <span className="wave">👋</span>
          </Typography>
          <Typography sx={{ mt: 0, fontFamily: 'Inria Serif, serif', fontSize: '1.1rem', textAlign: 'justify', color: '#a53e76', fontWeight: '600' }}>
            {/* We're glad to see you again! Explore your dashboard to track your progress, access personalized tips, and connect with our experts. Let's continue your journey to better health together! */}
            Your wellbeing matters. Let’s continue caring for it together.
          </Typography>
          <IconButton sx={{ mt: 2, backgroundColor: 'rgba(250, 227, 239, 0.8)', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', borderRadius: '12px', padding: '0.2rem 1rem', fontWeight: '700', color: '#e0327d', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }, fontSize: '0.8rem', ml: -0.5 }} >
            Start period tracking
                        <Box sx={{ ml: 1 }}>
              {btnIcon}
            </Box>
          </IconButton>
          </Box>
          <Box sx={{height: '23rem', position: 'relative',  top: '-5.2rem'}}>
          <img src={welcomeImg} alt="Dashboard Illustration" style={{ width: '100%', height: '100%', filter: 'drop-shadow(3px 4px 8px rgba(164, 91, 119, 0.5))' }} />
          </Box>
        </Box>
        <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderRadius: 5, }}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,}}>
        <Box sx={{backgroundColor: 'rgba(245, 181, 212, 0.3)', borderRadius: 5,  height: 'max-content',  backdropFilter: 'blur(10px)', paddingX: 2, alignItems: 'center', justifyContent: 'center', width: 'max-content', paddingY: 1}}>
          {/* <Typography sx={{ fontFamily: 'Merienda, cursive',fontSize: '0.7rem', color: '#a45b77', fontWeight: '800', filter: 'drop-shadow(2px 3px 3px rgba(164, 91, 119, 0.4))' }}>
            New track
          </Typography> */}
<Tooltip title="Start period tracking" arrow placement="top">
  <IconButton
    className="nbtn"
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(250, 227, 239, 0.8)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    }}
  >
    {newtrack}
  </IconButton>
</Tooltip>        </Box>
        <Box sx={{backgroundColor: 'rgba(245, 181, 212, 0.3)', borderRadius: 5,  height: 'max-content',  backdropFilter: 'blur(10px)', paddingX: 2, alignItems: 'center', justifyContent: 'center', width: 'max-content', paddingY: 1}}>
          {/* <Typography sx={{ fontFamily: 'Merienda, cursive', color: '#a45b77', fontWeight: '800', filter: 'drop-shadow(2px 3px 3px rgba(164, 91, 119, 0.4))', fontSize: '0.7rem' }}>
            Notification (Reminder)
          </Typography> */}
<Tooltip title="Notification (Reminder)" arrow placement="top">
  <IconButton
    className="nbtn"
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(250, 227, 239, 0.8)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    }}
  >
    {bellnot}
  </IconButton>
</Tooltip>        
</Box>
</Box>
<Box sx={{  alignItems: 'right', justifyContent: 'space-between',mb: 2, mx: 'auto',width: 'max-content', mt: 2,fontFamily: 'Saira, sans-serif', fontWeight: 600, color: '#cd4d7e' }}>
  <Typography>Date: </Typography>
          <Typography sx={{fontWeight: 700}}>{date}</Typography>
  </Box>
</Box>
</Box>
      <Grid container spacing={4} sx={{mt: 5}}>
        <Grid item xs={12} md={6} >
          <Box
            sx={{
              background: "rgba(236, 193, 219, 0.2)",
              border: '1px solid #ECC1DB',
              borderRadius: 5,
              p: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: 'column',
              height: '25.5rem',
              
            }}
          >
        <PieChart
  width={360}
  height={350}
  series={[
    {
      data: pieData,
      innerRadius: 105,
      outerRadius: 170,
      paddingAngle: 2,
      cornerRadius: 4,
      arcLabel: () => "",
      arcLabelsRadius: 0,
      startAngle: -105,
      endAngle: 105,
    },
  ]}
                slots={{ legend: () => null }}
              sx={{
                "& path:hover": {
                  filter: "drop-shadow(0 0 3px rgba(233,30,99,0.6))",
                  cursor: "pointer",
                },
              }}

>
  {/* CENTER TEXT */}
  <text
    x="50%"
    y="46%"
    textAnchor="middle"
    dominantBaseline="middle"
    style={{
      fontSize: 18,
      fontWeight: 700,
      fill: "#9C3A64",
    }}
  >
    {hasCycleData ? `Day ${todayIndex + 1}` : "No cycle data"}
  </text>

  <text
    x="50%"
    y="54%"
    textAnchor="middle"
    dominantBaseline="middle"
    style={{
      fontSize: 13,
      fill: "#777",
    }}
  >
    {hasCycleData ? "Follicular Phase" : "Start tracking"}
  </text>
</PieChart>
<Box sx={{display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', position: 'relative', bottom: 0, zIndex: 9999, mt: 0}}>
<Typography sx={{color: '#c60066ff'}}>
  There is no previous data found!
</Typography>
<Button sx={{backgroundColor: '#E18AAA', '&:hover':{backgroundColor: '#f078a4ff'}, cursor: 'pointer' }} onClick={handleClick} aria-describedby={id} variant="contained" >
  {plus}
</Button>
      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{overflow: 'scroll', scrollbarWidth: 'none', backgroundColor: 'transparent'}}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <Calendar />
      </Popover>
</Box>


          </Box>
        </Grid>

        {/* -------- RIGHT : SETTINGS -------- */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background: "rgba(236, 193, 219, 0.2)",
              border: '1px solid #ECC1DB',
              borderRadius: 5,
              mt: { xs: 2, md: 0 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
              overflowY: "auto",
              height: '25.5rem',
              scrollbarWidth: 'none',
            }}
          >
            <Accordion />
          </Box>
        </Grid>
      </Grid>

      </Box>
      </Box>
      )

}
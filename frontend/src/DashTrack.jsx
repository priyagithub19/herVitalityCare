import { Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';
import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useRef  } from 'react';
import Calendar from './calendar';
import Popover from '@mui/material/Popover';
import Accordion from './Accordion';
import DashNav from "./DashNav";


export default function DashTrack(){
    const [hasCycleData, setHasCycleData] = useState(false);
    const [cycleStartDate, setCycleStartDate] = useState(null);
    const CYCLE_LENGTH = 28;
    const [anchorEl, setAnchorEl] = React.useState(null);


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

  const plus = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 48 48"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path d="M24.0605 10L24.0239 38"></path><path d="M10 24L38 24"></path></g></svg>


    return(
            <Box sx={{ display: 'flex', backgroundColor: 'rgba(245, 181, 212, 0.3)', height: '100vh', overflow: 'hidden' }}>
        <DashNav />
    <Box component="main" sx={{ flexGrow: 1, p: 3, mx: 2, pr: 0, overflow: 'scroll', overflowX: 'hidden', scrollbarWidth: 'none'}}>
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
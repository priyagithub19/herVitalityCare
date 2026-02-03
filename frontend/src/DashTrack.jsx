import React, { useState, useMemo } from "react";
import { Box, Grid, Typography, Popover, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Chip } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import Button from "@mui/joy/Button";
import PainEntry from './PainComponent';

import DashNav from "./DashNav";
import PeriodCalendar from "./periodCalndar";
import MoodTrack from "./MoodTrackButton";
import ToDo from "./To-Do";
import Notes from "./Notes";
import IconRadio from "./IconRadio";
import MonthlyCycleSummary from "./MonthlyCycleSummary";
import "./DashTrack.css";

import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const crampsIcon = <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><path fill="currentColor" d="M14.69 2.21L4.33 11.49c-.64.58-.28 1.65.58 1.73L13 14l-4.85 6.76c-.22.31-.19.74.08 1.01c.3.3.77.31 1.08.02l10.36-9.28c.64-.58.28-1.65-.58-1.73L11 10l4.85-6.76c.22-.31.19-.74-.08-1.01a.77.77 0 0 0-1.08-.02"></path></svg>
const CYCLE_LENGTH = 28;

const PHASES = [
  { name: "Period", from: 1, to: 5, color: "#f06292" },
  { name: "Follicular", from: 6, to: 13, color: "#81c784" },
  { name: "Ovulation", from: 14, to: 16, color: "#ffd54f" },
  { name: "Luteal", from: 17, to: 28, color: "#ffb74d" },
];


export default function DashTrack() {
  const [hasCycleData, setHasCycleData] = useState(false);
  const [cycleStartDate, setCycleStartDate] = useState(null);
  const [cramp, setCramp] = useState(false);
  const [crampType, setCrampType] = useState(null);


  const [anchorEl, setAnchorEl] = useState(null);

  const today = new Date();


  const formatDate = (d) =>
    `${d.getDate()} ${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;


  const currentDay = useMemo(() => {
    if (!hasCycleData || !cycleStartDate) return null;

    const diffDays = Math.floor(
      (Date.now() - new Date(cycleStartDate).getTime()) /
      (1000 * 60 * 60 * 24)
    );

    return (diffDays % CYCLE_LENGTH) + 1;
  }, [hasCycleData, cycleStartDate]);


  const activePhase = useMemo(() => {
    if (!currentDay) return null;
    return PHASES.find(
      (p) => currentDay >= p.from && currentDay <= p.to
    );
  }, [currentDay]);


  const nextPeriodDate = useMemo(() => {
    if (!cycleStartDate) return null;

    const next = new Date(cycleStartDate);
    next.setDate(next.getDate() + CYCLE_LENGTH);
    return next;
  }, [cycleStartDate]);


  const pieData = useMemo(() => {
    return Array.from({ length: CYCLE_LENGTH }, (_, i) => {
      const day = i + 1;

      const phase =
        PHASES.find((p) => day >= p.from && day <= p.to) ||
        PHASES[PHASES.length - 1];

      return {
        id: i,
        value: 1,
        // label: `Day ${day} – ${phase.name}`,
        color:
          day === currentDay
            ? phase.color
            : `${phase.color}55`,
      };
    });
  }, [hasCycleData, currentDay]);

  const crampBtnStyle = (type) => ({
    backgroundColor: cramp && crampType === type ? "#f2909d" : "#f8b1c1",
    "&:hover": { backgroundColor: "#f1bcd0" },
    color: cramp && crampType === type ? "#0B0937" : "#002650",
    fontWeight: cramp && crampType === type ? 700 : 500,
    fontFamily: "Roboto Mono, monospace",
    display: 'flex', alignItems: 'center', gap: 0.7
  });



  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleConfirmStartDate = () => {
  
    setCycleStartDate(new Date(). getDate() - 0);
    setHasCycleData(true);
    setAnchorEl(null);
};

const logDayData = async (dayNumber, flow, painLevel, mood, symptoms=[]) => {
  try {
    const cycle = await axios.get(`${API_BASE}/cycle/USER_ID_HERE`);
    const latestCycle = cycle.data[0]; // get latest cycle

    await axios.post(`${API_BASE}/day`, {
      userId: "USER_ID_HERE",
      cycleId: latestCycle._id,
      date: new Date(),
      dayNumber,
      flow,
      painLevel,
      mood,
      symptoms,
      notes: ""
    });

    console.log("Day data saved!");
  } catch (err) {
    console.error("Error saving day log", err);
  }
};



  return (
    <Box sx={{ display: "flex", height: "100%", backgroundColor: "rgba(245,181,212,0.3)" }}>
      <DashNav />

      <Box component="main" sx={{ flexGrow: 1, px: 3, overflowY: "auto" }}>
        <Typography
          variant="h5"
          sx={{ my: 3, color: "#DE6186", fontWeight: 600 }}
        >
          Start / Continue Tracking Your Periods
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                background: "rgba(236,193,219,0.2)",
                border: "1px solid #ECC1DB",
                borderRadius: 5,
                p: 3,
                minHeight: 420,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >

              <Button
                sx={{ mt: 1, backgroundColor: "#e18aaac7", position: 'relative', left: '45%', justifyContent: 'end', top: -20, width: 50, height: 70, textAlign: 'center', border: '2px solid #7c626bc7', '&:hover': { backgroundColor: '#f078a4ff' } }}
                onClick={handleOpen}
              >
                <span style={{ margin: 'auto' }}>+</span>
              </Button>

              <Box
                sx={{
                  position: "relative",
                  width: 360,
                  height: '100%',
                }}
              >
                <PieChart
                  sx={{ mt: 5 }}
                  width={360}
                  height={340}
                  series={[
                    {
                      data: pieData,
                      innerRadius: 105,
                      outerRadius: 170,
                      paddingAngle: 2,
                      cornerRadius: 4,
                      startAngle: -105,
                      endAngle: 105,
                    },
                  ]}
                  slotProps={{
                    legend: { hidden: true },
                    tooltip: { trigger: "none" },
                  }}
                />
                <Box className="phase-legend" sx={{ mb: 7, mx: 2 }}>
                  {PHASES.map((phase) => (
                    <Box key={phase.name} className="legend-item">
                      <Box
                        className="legend-dot"
                        sx={{ backgroundColor: phase.color }}
                      />
                      <Typography variant="body2">
                        {phase.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>




                <Box className="center-info">
                  <Typography variant="h5" className="day-text" sx={{ fontWeight: 600, }}>
                    {hasCycleData ? `Day ${currentDay}` : "No cycle data"}
                  </Typography>

                  <Chip
                    label={hasCycleData ? activePhase?.name : "Start tracking"}
                    className="phase-chip"
                    sx={{
                      backgroundColor: activePhase?.color + "33",
                      border: `1px solid ${activePhase?.color}`,
                      fontWeight: 500,
                      color: activePhase?.color + "FF" || "#777",
                    }}
                  />
                </Box>
              </Box>


              <IconRadio />
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body1"
                  sx={{ color: "#DE6186", fontWeight: 600, mb: 1 }}
                >
                  Having cramps?
                </Typography>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button
                    disabled={!hasCycleData}
                    onClick={() => {
                      setCramp(true);
                      setCrampType("mild");
                    }}
                    sx={crampBtnStyle("mild")}
                    variant={crampType === "mild" ? "solid" : "outlined"}
                  >
                    {crampsIcon} Mild
                  </Button>

                  <Button
                    disabled={!hasCycleData}
                    onClick={() => {
                      setCramp(true);
                      setCrampType("moderate");
                    }}
                    sx={crampBtnStyle("moderate")}
                    variant={crampType === "moderate" ? "solid" : "outlined"}
                  >
                    {crampsIcon} Moderate
                  </Button>

                  <Button
                    disabled={!hasCycleData}
                    onClick={() => {
                      setCramp(true);
                      setCrampType("severe");
                    }}
                    sx={crampBtnStyle("severe")}
                    variant={crampType === "severe" ? "solid" : "outlined"}
                  >
                    {crampsIcon} Severe
                  </Button>
                </Box>

                {crampType && (
                  <Typography sx={{ mt: 1, fontSize: 13, color: "#9C3A64" }}>
                    Logged cramps: <b>{crampType}</b>
                  </Typography>
                )}
              </Box>


              {hasCycleData ? (
                <Typography sx={{ color: "#c60066", textAlign: "center" }}>
                  🌸 Period logged<br />
                  Start: {formatDate(cycleStartDate)} <br />
                  Next prediction: {formatDate(nextPeriodDate)}
                </Typography>
              ) : (
                <Typography sx={{ color: "#c60066", textAlign: "center", mt: 3 }}>
                  No cycle data yet 🌸
                </Typography>
              )}

              <Button
                sx={{ mt: 1, backgroundColor: "#E18AAA" }}
                onClick={handleOpen}
              >
                + Add
              </Button>

              <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
                <Dialog open onClose={handleClose}>
                  <DialogTitle>Confirm First Day of Period</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Starting day: {formatDate(today)}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmStartDate}>Confirm</Button>
                  </DialogActions>
                </Dialog>
              </Popover>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", gap: 5 }}>
              {/* <PeriodCalendar
                cycleStartDate={cycleStartDate}
                currentDay={currentDay}
                activePhase={activePhase}
              /> */}
              <PeriodCalendar cycleStartDate={cycleStartDate} />
              <MoodTrack />
            </Box>
            <PainEntry />

          </Grid>
          <Box
            sx={{
              background: "rgba(236, 193, 219, 0.2)",
              border: "1px solid #F4CAD6",
              borderRadius: 5,
              width: '100%',
              mx: 'auto',
              mt: 1
            }}
          >
            <ToDo />
          </Box>

          <Box
            sx={{
              background: "rgba(236, 193, 219, 0.2)",
              border: "1px solid #F4CAD6",
              borderRadius: 5,
              width: '100%',
              mx: 'auto',
              mt: 1
            }}
          >
            <Notes    userId={"USER_ID_HERE"}
  cycleId={cycleStartDate ? "CURRENT_CYCLE_ID" : null}
/>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

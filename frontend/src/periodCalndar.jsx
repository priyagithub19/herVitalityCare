import React, { useState } from "react";
import "./periodCalendar.css";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

/* ---------------- HELPERS ---------------- */

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const generateCyclePhases = (startDate) => [
  { name: "menstrual", start: startDate, end: addDays(startDate, 4) },
  { name: "follicular", start: addDays(startDate, 5), end: addDays(startDate, 12) },
  { name: "ovulation", start: addDays(startDate, 13), end: addDays(startDate, 13) },
  { name: "luteal", start: addDays(startDate, 14), end: addDays(startDate, 27) },
];

const isDateInRange = (date, start, end) =>
  date >= start && date <= end;

/* ---------------- COMPONENT ---------------- */

export default function PeriodCalendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [cyclePhases, setCyclePhases] = useState([]);
  const [open, setOpen] = useState(false);

  /* -------- Calendar calculations -------- */

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  /* -------- Phase color detection -------- */

  const getPhaseClass = (dateObj) => {
    for (let phase of cyclePhases) {
      if (isDateInRange(dateObj, phase.start, phase.end)) {
        return `phase-${phase.name}`;
      }
    }
    return "";
  };

  /* -------- Handlers -------- */

  const handleDateClick = (day) => {
    if (!day) return;
    setSelectedDate(new Date(year, month, day));
    setOpen(true);
  };

  const confirmCycle = () => {
    const phases = generateCyclePhases(selectedDate);
    setCyclePhases(phases);
    setOpen(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="calendar">

      {/* HEADER */}
      <div className="calendar-header">
        <Button onClick={() => setMonth(m => (m === 0 ? (setYear(y => y - 1), 11) : m - 1))}>
          ◀
        </Button>

        <Box>
          {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
        </Box>

        <Button onClick={() => setMonth(m => (m === 11 ? (setYear(y => y + 1), 0) : m + 1))}>
          ▶
        </Button>
      </div>

      {/* DAYS */}
      <div className="calendar-days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* DATES */}
      <div className="calendar-grid">
        {calendarDays.map((day, i) => {
          const dateObj = day ? new Date(year, month, day) : null;
          const phaseClass = dateObj ? getPhaseClass(dateObj) : "";

          return (
            <div
              key={i}
              className={`calendar-cell ${phaseClass}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* CONFIRM DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Period Start</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Set <b>{selectedDate?.toDateString()}</b> as the first day of your period?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={confirmCycle} variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

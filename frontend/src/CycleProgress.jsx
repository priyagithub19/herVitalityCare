import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import "./CycleProgress.css";

const DEFAULT_PHASES = [
  { name: "Period", from: 1, to: 5, color: "#f06292" },
  { name: "Follicular", from: 6, to: 13, color: "#81c784" },
  { name: "Ovulation", from: 14, to: 16, color: "#ffd54f" },
  { name: "Luteal", from: 17, to: 28, color: "#ffb74d" },
];

export default function CycleProgress({
  title = "Cycle Phase",
  cycleStartDate,        // 👈 coming from parent
  cycleLength = 28,
  phases = DEFAULT_PHASES,
}) {
  // Guard: if no date yet (user hasn’t selected)
  if (!cycleStartDate) {
    return (
      <Box className="cycle-container">
        <Typography>Select cycle start date</Typography>
      </Box>
    );
  }

  const start = new Date(cycleStartDate);
  const today = new Date();

  // Normalize time to avoid timezone bugs
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (today - start) / (1000 * 60 * 60 * 24)
  );

  // Prevent negative or overflow values
  const currentDay =
    diffDays < 0
      ? 1
      : (diffDays % cycleLength) + 1;

  const progress = currentDay / cycleLength;

  const activePhase =
    phases.find(
      (p) => currentDay >= p.from && currentDay <= p.to
    ) || phases[phases.length - 1];

  return (
    <Box className="cycle-container" sx={{mx: 'auto'}}>
      <Typography variant="h6" className="title">
        {title}
      </Typography>

      <Box
        className="gauge"
        style={{
          "--progress": progress,
          "--color": activePhase.color,
        }}
      />

      <Box className="center-info">
        <Typography variant="h4">
          Day {currentDay}
        </Typography>

        <Chip
          label={activePhase.name}
          sx={{
            backgroundColor: activePhase.color + "33",
            border: `1px solid ${activePhase.color}`,
            fontWeight: 500,
          }}
        />
      </Box>
      <Box className="phase-legend">
  {phases.map((phase) => (
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

    </Box>
    
  );
}

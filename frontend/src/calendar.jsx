import { Box, Typography, Divider } from "@mui/material";
import { useState } from "react";

export default function Calendar() {
    const date = new Date();
    const todayDate = date.getDate();
    const today = date.toLocaleDateString('en-US', { weekday: 'long' });
    const year = date.getFullYear();
    const month = date.getMonth();
    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const [selectedDate, setSelectedDate] = useState(todayDate);
    const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];


    const firstDay = new Date(year, month, 1).getDay();

const daysInMonth = new Date(year, month + 1, 0).getDate();

const calendarDays = [];

for (let i = 0; i < firstDay; i++) {
  calendarDays.push(null);
}

for (let day = 1; day <= daysInMonth; day++) {
  calendarDays.push(day);
}




  return (
    <Box
      sx={{
        width: '50rem',
        height: "30rem",
        position: "relative",
        margin: "auto",
        display: "flex",
        borderRadius: "20px",
        fontFamily: "Kanit, sans-serif",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        overflow: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <Box
        sx={{
          width: 300,
          height: "100%",
          backgroundColor: "#cc2e7aff",
          borderRadius: "20px 0 0 20px",
          color: "#fff",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 25, left: 25 }}>
          {[1, 2, 3].map(i => (
            <Box
              key={i}
              sx={{
                width: 25,
                height: 3,
                backgroundColor: "#fff",
                borderRadius: 1,
                mb: 0.5,
                "&:hover": { backgroundColor: "#e8277eff" },
              }}
            />
          ))}
        </Box>

        <Typography
          sx={{
            fontSize: 150,
            fontWeight: 700,
            textAlign: "center",
            mt: 8,
          }}
        >
          {todayDate}
        </Typography>

        <Typography
          sx={{
            fontSize: 30,
            textAlign: "center",
            mt: -6,
          }}
        >
          {today}
        </Typography>

        <Box sx={{ mt: 4, px: 3 }}>
          <Typography fontSize={15}>Next Period Prediction</Typography>
          <Typography fontSize={14}>• Date: 20-Jan</Typography>
        </Box>

        <Box sx={{ mt: 8, px: 4 }}>
          <Typography
            sx={{
              cursor: "pointer",
              "&:hover": { color: "#ffb3deff" },
            }}
          >
            Start new Tracking
          </Typography>
          <Divider sx={{ my: 1, backgroundColor: "#fff", width: "80%" }} />
        </Box>

        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "2px solid #fff",
            position: "absolute",
            bottom: 40,
            right: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              borderColor: "#fcadd1ff",
              color: "#fcadd1ff",
            },
          }}
        >
          +
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 4, position: "relative" }}>
        <Typography
          sx={{
            position: "absolute",
            top: 20,
            right: 60,
            fontSize: 30,
            fontWeight: "bold",
            color: "#f992ddff",
          }}
        >
          {months[month]} - {year}
        </Typography>
        <Divider sx={{ my: 5 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
            color: "#AAA",
            fontWeight: 600,
          }}
        >
          {weekDays.map(day => (
            <Typography key={day}>{day}</Typography>
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
            mt: 3,
          }}
        >
          {calendarDays.map((day, index) => {
            const isToday =
  day === todayDate && month === month;

const isSelected = day === selectedDate;

            return (
<Box
  key={index}
  onClick={() => day && setSelectedDate(day)}
  sx={{
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25%",
    cursor: day ? "pointer" : "default",

    backgroundColor: isSelected
      ? "#cc2e859c"
      : isToday
      ? "#e75eb090"
      : "transparent",

    color: isSelected || isToday ? "#fff" : "#000",

    border: isSelected ? "3px solid #841e65ff" : "none",

    "&:hover": {
      backgroundColor: day ? "#e82788ff" : "transparent",
      color: "#fff",
    },
  }}
>
  {day || ""}
</Box>
                );
          })}
</Box>
      </Box>
    </Box>
  );
}

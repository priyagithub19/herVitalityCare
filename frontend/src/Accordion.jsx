import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import NotificationsIcon from "@mui/icons-material/Notifications";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import LanguageIcon from "@mui/icons-material/Language";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';


const iconMap = {
  water: <WaterDropIcon color="primary" />,
  drink: <LocalDrinkIcon color="primary" />,
  health: <HealthAndSafetyIcon color="primary" />
};

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState([]);
  const [data, setData] = useState([]);


const accdata = [
  {
    title: "Common Period Symptoms",
    emoji: "🌸",
    tip: `
      <h2>Emotional and Behavioral Signs & Symptoms</h2>
      <ul>
        <li>Tension or anxiety</li>
        <li>Depressed mood</li>
        <li>Crying spells</li>
        <li>Mood swings, irritability, or anger</li>
        <li>Appetite changes and food cravings</li>
        <li>Trouble falling asleep (insomnia)</li>
        <li>Social withdrawal</li>
        <li>Poor concentration</li>
        <li>Changes in libido</li>
      </ul>

      <h2>Physical Signs & Symptoms</h2>
      <ul>
        <li>Joint or muscle pain</li>
        <li>Headache</li>
        <li>Fatigue</li>
        <li>Weight gain related to fluid retention</li>
        <li>Abdominal bloating</li>
        <li>Breast tenderness</li>
        <li>Acne flare-ups</li>
        <li>Constipation or diarrhea</li>
        <li>Alcohol intolerance</li>
      </ul>

      <p>
        For some women, the physical pain and emotional stress can be severe enough
        to affect daily life.
      </p>

      <h2>PMDD Signs & Symptoms</h2>
      <ul>
        <li>Severe depression</li>
        <li>Extreme mood swings</li>
        <li>Anger or irritability</li>
        <li>Anxiety</li>
        <li>Feeling overwhelmed</li>
        <li>Difficulty concentrating</li>
        <li>Tension</li>
      </ul>

      <h2>When to See a Doctor</h2>
      <p>
        If lifestyle changes have not helped manage PMS symptoms,
        consult a doctor.
      </p>
    `
  },

  {
    title: "Period Cramps (Dysmenorrhea)",
    emoji: "🔥",
    tip: `
      <h2>What Are Period Cramps?</h2>
      <ul>
        <li>Lower abdominal pain</li>
        <li>Lower back pain</li>
        <li>Nausea</li>
        <li>Headache</li>
        <li>Dizziness</li>
      </ul>

      <h3>Home Care</h3>
      <ul>
        <li>Heating pad</li>
        <li>Light stretching</li>
        <li>Warm fluids</li>
        <li>Rest</li>
      </ul>
    `
  },

  {
    title: "Heavy Periods (Menorrhagia)",
    emoji: "🩸",
    tip: `
      <h2>Signs of Heavy Flow</h2>
      <ul>
        <li>Soaking pads/tampons frequently</li>
        <li>Passing large clots</li>
        <li>Fatigue or weakness</li>
      </ul>

      <h3>When to See a Doctor</h3>
      <p>
        Seek medical advice if bleeding is excessive.
      </p>
    `
  },

  {
    title: "Irregular Periods",
    emoji: "📅",
    tip: `
      <h2>Possible Causes</h2>
      <ul>
        <li>Stress</li>
        <li>Hormonal imbalance</li>
        <li>PCOS</li>
        <li>Sudden weight changes</li>
      </ul>

      <h3>What Can Help</h3>
      <ul>
        <li>Cycle tracking</li>
        <li>Healthy routine</li>
        <li>Stress management</li>
      </ul>
    `
  },

  {
    title: "Period Hygiene & Self-Care",
    emoji: "🧼",
    tip: `
      <ul>
        <li>Change pads/tampons every 4–6 hours</li>
        <li>Wash hands before and after</li>
        <li>Use breathable underwear</li>
        <li>Avoid scented products</li>
      </ul>
    `
  },

  {
    title: "Daily Water Intake",
    emoji: "💧",
    tip: `
      <h2>Why Water Matters</h2>
      <ul>
        <li>Regulates body temperature</li>
        <li>Improves energy</li>
        <li>Supports digestion</li>
      </ul>

      <h3>Daily Intake</h3>
      <ul>
        <li>Women: ~2.7 liters</li>
        <li>Men: ~3.7 liters</li>
      </ul>
    `
  },

  {
    title: "Common Illnesses & Home Care",
    emoji: "🏥",
    tip: `
      <h3>Fever</h3>
      <ul>
        <li>Rest</li>
        <li>Hydration</li>
        <li>Light meals</li>
      </ul>

      <h3>Cold & Headache</h3>
      <ul>
        <li>Steam inhalation</li>
        <li>Warm fluids</li>
        <li>Screen breaks</li>
      </ul>

      <h3>When to See a Doctor</h3>
      <p>
        If symptoms worsen or persist.
      </p>
    `
  }
];


//   useEffect(() => {
//   fetch('http://localhost:5000/cmntips')
//     .then(res => res.json())
//     .then(data => setData(data));
// }, []);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Box
      sx={{
        minHeight: "max-content",
        width: 800,
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "40px auto",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, fontFamily: 'Edu SA Beginner, cursive', color: '#6d9f71' }}>
        Get Some common healthy Information Here
      </Typography>

      <Box sx={{ width: 500, maxWidth: "90%" }}>
        {accdata.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <Box
              key={index}
              onClick={() => handleClick(index)}
              sx={{
                borderRadius: "20px",
                bgcolor: "#eeeeee",
                height: isActive ? 'max-content' : 48,
                padding: isActive ? 2 : 0,
                my: 1.5,
                px: 5,
                cursor: "pointer",
                transition: "all 0.4s ease",
                overflow: "hidden",
                boxShadow:
                  "-5px -5px 15px rgba(255,255,255,0.8), 5px 5px 15px rgba(0,0,0,0.1)"
              }}
            >
              {/* Title */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1.5,
                  color: isActive ? "rgb(185, 52, 134)" : "#6c6c75",
                  fontWeight: 600
                }}
              >
                {item.emoji}
                <Typography sx={{ ml: 1, fontWeight: 600 }}>
                  {item.title}
                </Typography>
              </Box>

              {/* Content */}
              <Box
  sx={{
    mt: 2,
    lineHeight: "28px",
    opacity: isActive ? 1 : 0,
    transition: "opacity 0.2s ease",
    transitionDelay: isActive ? "0.25s" : "0s"
  }}
  dangerouslySetInnerHTML={{ __html: item.tip }}
/>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

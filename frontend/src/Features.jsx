import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ChatIcon from "@mui/icons-material/Chat";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MedicationIcon from "@mui/icons-material/Medication";
import ArticleIcon from "@mui/icons-material/Article";

const features = [
  {
    title: "Period Tracker & Predictions",
    icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
    desc: "Track cycles, ovulation, symptoms and receive accurate predictions.",
  },
//   {
//     title: "Diet & Water Intake Reminders",
//     icon: <WaterDropIcon sx={{ fontSize: 40 }} />,
//     desc: "Stay hydrated and maintain healthy eating with personalized reminders.",
//   },
//   {
//     title: "Mental Wellness Support",
//     icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
//     desc: "Mood tracking and a supportive stress-relief chatbot.",
//   },
  {
    title: "Secure Digital Health Records",
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
    desc: "Store prescriptions, lab reports, and health notes safely.",
  },
  {
    title: "Anonymous Chat With Counselors",
    icon: <ChatIcon sx={{ fontSize: 40 }} />,
    desc: "Talk to wellness counselors anonymously anytime.",
  },
  {
    title: "Daily Self-Care Checklist",
    icon: <ChecklistIcon sx={{ fontSize: 40 }} />,
    desc: "Build positive habits with a customizable daily checklist.",
  },
//   {
//     title: "Medicine & Appointment Reminders",
//     icon: <MedicationIcon sx={{ fontSize: 40 }} />,
//     desc: "Never miss important medications or doctor visits.",
//   },
  {
    title: "Health Articles & Podcasts",
    icon: <ArticleIcon sx={{ fontSize: 40 }} />,
    desc: "Explore curated content on women’s health and wellness.",
  },
];

export default function Features() {
  return (
    <Container sx={{ py: 6, height: '100vh'}}>
      <Typography
      data-aos="zoom-in"
        variant="h4"
        align="center"
        fontWeight={700}
        gutterBottom
        sx={{ mb: 4 , color: 'rgba(146, 71, 89)' }}
      >
        🌸 Our Features & Services
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} data-aos="fade-down">
            <Card
              sx={{
                p: 2,
                width: "22rem",
                borderRadius: "20px",
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                },
                backgroundColor: 'rgb(196, 54, 113, 0.1)'
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    color: "#d81b60",
                  }}
                >
                  {item.icon}
                </Box>

                <Typography variant="h6" fontWeight={600}>
                  {item.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useTheme } from "@mui/material";
import Carousel from './carousel'
import './embla.css'
import AOS from 'aos';
import 'aos/dist/aos.css';


const OPTIONS = { loop: true }


export default function AboutUs() {
  const theme = useTheme();
    useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const sections = [
    {
        id: 1,
      title: "Introduction",
      icon: '🏠',
      content:
        "<b>HerVitalityCare </b>is a holistic wellness platform empowering women to nurture their physical, emotional, and mental well-being.<br/><br/>Blending technology, science, and empathy, we offer personalized care — from menstrual tracking and nutrition tips to stress and mental health support — creating a safe, inclusive space for every woman’s journey to thrive.",
      image: "/images/intro.png",
    },
    {
        id: 2,
        icon: '🎯',
      title: "Our Mission",
      content:
        "To empower women to take charge of their health and well-being through smart, accessible, and personalized digital tools.<br/><br/>We bridge the gap between healthcare and daily life with solutions that promote preventive care, emotional balance, and self-awareness.",
      image: "/images/ourGoal.png",
    },
    {
        id: 3,
        icon: '🌍',
      title: "Our Vision",
      content:
        "To create a world where every woman feels informed, supported, and confident in her wellness journey.<br/><br/>We aspire to make self-care a universal right — free from stigma and full of strength, balance, and growth.",
      image: "/images/intro.png",
    },
    {
        id: 4,
        icon: '💫',
      title: "Our Goals",
      content:"We aim to create an inclusive, accessible, and empowering digital health space for women — promoting preventive care, emotional balance, and health awareness through smart, connected tools and supportive communities.<br/><br/>Together, these goals drive HerVitalityCare’s mission to create a healthier, more empowered future for every woman — where wellness is accessible, personalized, and stigma-free.",
      image: "/images/ourGoal.png",
    },
  ];

  const srcList = sections.map((section) => ({
    url: section.image,
    title: section.title,
    content: section.content,
    icon: section.icon,
  }));

  return (
    <Box
      className="abt"
      sx={{
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        data-aos="fade-up"
        sx={{
          fontWeight: "bold",
          color: "#A70550",
          fontSize: '3rem',
          fontFamily: "Inria Serif, serif",
        }}
      >
       || About Us ||
      </Typography>
        <Carousel slides={srcList} options={OPTIONS} />
    </Box>
  );
}

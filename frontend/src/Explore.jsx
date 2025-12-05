import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ArrowUpRight, Bold } from "lucide-react";
import Navbar from "./Navbar";
import AspectRatio from '@mui/joy/AspectRatio';
import Dock from './reactbits/Dock';
import { BiSolidCategoryAlt } from "react-icons/bi";
import TopicIcon from '@mui/icons-material/Topic';
import AnimatedList from "./reactbits/ANimatedList";
import { Cross as Hamburger } from 'hamburger-react'
import { AnimatePresence, motion } from "motion/react"
import './ListAnim.css'




export default function Explore() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState(false);
  const [selectedCat, setSelectedCat] = useState("Cancer");
  const [category, setCategory] = useState("15");
  const [isOpen, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);



  const categories = [
  { id: 15, label: "Cancer" },
  { id: 16, label: "Diabetes" },
  { id: 18, label: "Heart Health" },
  { id: 19, label: "HIV and Other STIs" },
  { id: 20, label: "Mental Health and Relationships" },
  { id: 21, label: "Nutrition" },
  { id: 23, label: "Obesity" },
  { id: 24, label: "Physical Activity" },
  { id: 25, label: "Regular Checkups" },
  { id: 26, label: "Safety" },
  { id: 27, label: "Screening Tests" },
  { id: 28, label: "Sexual Health" },
  { id: 29, label: "Vaccines (Shots)" },
  { id: 56, label: "Nutrition and Physical Activity" },
  { id: 91, label: "Breast and Ovarian Cancer" },
  { id: 92, label: "Cervical Cancer" },
  { id: 93, label: "Skin Cancer" },
  { id: 94, label: "Prostate Cancer" },
  { id: 95, label: "Lung Cancer" },
  { id: 96, label: "Colorectal Cancer" },
  { id: 110, label: "Healthy Relationships" },
  { id: 126, label: "Healthy Living" },
];

const items = [
    { icon: <BiSolidCategoryAlt />, label: 'Categories', onClick: () => alert('Categories!') },
    { icon: <TopicIcon />, label: 'Topics', onClick: () => alert('Topics!') },
  ];

useEffect(() => {
  if (!category) return;

  setIsLoading(true);
  setError("");

  fetch(`http://localhost:5000/topicsearch?categoryId=${category}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("FROM BACKEND:", data);

      if (data.error) {
        setError(data.error);
        setApiData([]);
      } else {
        setApiData(data.items || []);
      }

      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to fetch data");
      setIsLoading(false);
    });
}, [category]);



  return (
    <Box sx={{ width: "100%", background: "rgba(246, 218, 226, 0.8)", minHeight: "100vh", py: 4, textAlign: "center" }}>
      <Navbar />

      <Box sx={{ width: "90%", margin: "auto", mb: 4 }}>
        <Typography variant="h3" sx={{ color: "rgba(227,4,110,1)", mb: 2 }}>
          || Articles ||
        </Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
          <Box>
          <Box sx={{marginBottom: '1rem', gap: 2, display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
            <Typography variant="h6" sx={{ fontWeight: '600', fontFamily: 'Texturina, serif' }}>
              Selected Category: <span style={{color: "#BF3853"}}>"{selectedCat}"</span>
            </Typography>
            </Box>
          </Box>
          <Box sx={{width: '70%'}}>
          </Box>   
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {apiData.map(info => (
  <Grid item xs={12} sm={6} md={4} key={info.id}>
   <Box className="infoBoxes" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                  <Card
                    className="info1"
                    sx={{
                      borderWidth: 0,
                      borderRadius: '2rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
                      height: '100%',
                    }}
                  >
                    <AspectRatio variant="outlined" ratio="16/9">
                    <CardMedia
                      className="img"
                      component="img"
                      image={info.image}
                      alt={info.title}
                      sx={{
                        borderRadius: '1.7rem',
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        transition: 'transform 0.4s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.01)',
                        },
                        cursor: 'pointer',
                      }}
                    />
                    </AspectRatio>
                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(148, 135, 135, 0.8)',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(6px)',
                        transition: 'transform 0.2s ease',
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.5) , inset 2px 2px 6px rgba(255, 255, 255, 1)',
                        backgroundClip: 'padding-box',
                        
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(15deg) scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1)')}
                    >
                      <a href={info.url} target="_blank" rel="noopener noreferrer" >
                      <ArrowUpRight size={18} color=" #000000ff" />
                      </a>
                    </span>

                    <CardContent>
                      <Typography
                        variant="body2"
                        className="typo"
                        sx={{
                          fontFamily: 'Texturina, serif',
                          fontSize: '1rem',
                          textAlign: 'justify',
                          fontWeight: '600'
                        }}
                      >
                        {info.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
          </Grid>
        ))}

<Box
  sx={{
    position: "fixed",
    bottom: "0.5rem",
    left: "40%",    
    gap: "1.5rem",
    zIndex: 2000,
  }}
>

      <AnimatePresence>
      {isOpen && (
        <Box
          sx={{
            marginRight: "0.75rem",
            display: "flex",
            flexDirection: "column",
            transformOrigin: "left center",
            backgroundColor: "rgba(249,206,231)",
            padding: '0.6rem',
            borderRadius: '1rem'
          }}
        >
          <h6 style={{marginBottom: '0.5rem'}}>Categories</h6>
          <AnimatedList
            items={categories.map(c => c.label)}
            onItemSelect={(label, index) => {
                const selected = categories[index].id;
                console.log("Selected category:", selected);
                setCategory(selected);
                setSelectedCat(label)
              }}
            showGradients={false}
            enableArrowNavigation={true}
            displayScrollbar={true}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ maxWidth: 320 }}
          />
        </Box>
      )}
    </AnimatePresence>

      <Box
      sx={{
        backgroundColor: !isOpen ? "#ffcfe7" : "",
        borderRadius: "1.3rem",
        padding: "0.4rem",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        marginRight: "1rem",
        height: '4rem'
      }}
    >

  <Hamburger
        rounded
        direction="left"
        toggled={isOpen}
        toggle={setOpen}
        duration={0.5}
      />
      </Box>

</Box>
       <Dock
    items={items}
    panelHeight={70}
    baseItemSize={50}
    magnification={80}
  />

        </Grid>
      </Box>
    </Box>
  );
}



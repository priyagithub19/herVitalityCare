import React from "react";
import Navbar from "./Navbar";
import logo from '/images/mainLogo.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import heroImg from '/images/heroImg.png';
import Grid from '@mui/material/Grid';
import { ChevronRight } from 'lucide-react';
import cycle from '/images/cycle.png';
import podcast from '/images/podcast.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ArrowUpRight } from 'lucide-react';
import TextType from './reactbits/TextType.jsx';
import ShinyText from './reactbits/ShinyText';
import AboutUs from "./Aboutus.jsx";
import { useNavigate } from "react-router-dom";
import Features from "./Features.jsx";

export default function Home() {

  const navigate = useNavigate();

  const infobox = [
    {id: 1, title: 'Menstrual Cycle (Normal Menstruation): Overview & Phases', image: cycle, link: 'https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/menstrual-cycle#what-is-the-menstrual-cycle'},
    {id: 2, title: 'All About Women’s Health| What to Eat & Drink to Stay Fit |Wellness assentials', image: podcast, link: "https://www.youtube.com/watch?v=Nh7NaAan5MQ"},
]
  const healthTips = [
    {id: 1, title: '🥗  Eat Balanced Meals — ', det: 'Include fruits, veggies, and protein daily.'},
    {id: 2, title: '🩸  Track Your Cycle — ', det: 'Understand your body’s natural rhythm.'},
    {id: 3, title: '🧘‍♀️  Manage Stress — ', det: 'Try deep breathing or short mindfulness breaks.'},
    {id: 4, title: '😴  Get Enough Sleep —', det: '7–8 hours of rest helps your body recover.'},
  ];

  return (
    <div className="main" id="home">
      <Box sx={{paddingTop: '20px'}}>
        <Box className="logo" sx={{  display: 'flex', justifyContent: 'center', height: '8vh', alignItems: 'center'  }} >
          <img src={logo} alt="Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        </Box>
      </Box>
        {/* <Container className="container" sx={{ width: '100%', margin: 0 }}>
              <Box className="herodiv">
                <Box sx={{ width: '100%', height:'40vh' }} className="hero-section">
                  <img src={heroImg} alt="Hero" style={{ width: '90%', height: '100%', objectFit: 'fill', marginLeft: 'auto', display: 'block' }} />
                </Box>
              </Box>
              <Box className="div2">
                <Navbar/>
              </Box>
      </Container> */}
      <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid size={11}>
           <Box className="herodiv">
                <Box sx={{ width: '100%', height:'50vh' }} className="hero-section">
                  <img src={heroImg} alt="Hero" style={{ width: '68%', height: '100%', objectFit: 'fill', marginLeft: 'auto', display: 'block' }} />
                  <Box className="div2">
                  <TextType 
                  className="h1"
                  text={["Your Wellness Journey Starts Here 🌷"]}
                  typingSpeed={100}
                  pauseDuration={2000}
                  showCursor={true}
                  cursorCharacter="_"
                />
                <ShinyText 
                    text="Stay ahead of your cycle with accurate predictions and daily guidance." 
                    disabled={false} 
                    speed={3} 
                    className='custom-class h3' />
                  {/* <h3 className="h3">Stay ahead of your cycle with accurate predictions and daily guidance.</h3> */}
                  <Button className="getStarted" sx={{ color: 'black', borderRadius: '30em',marginTop: '1.5rem', width: 'fit-content', fontFamily: "BioRhyme, serif", fontWeight: 'bold'}}><span style={{fontSize: '0.5rem'}} onClick={()=> navigate('/login')}>Get Started</span> <ChevronRight style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(132deg, rgba(237, 217, 217, 1) 0%, rgba(224, 204, 204, 1) 22%, rgba(179, 159, 159, 1) 100%)', marginLeft: '2%' }} /></Button>
                </Box>  
                </Box>
                <Box className="infoBoxes" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                {infobox.map((info) => (
                  <Card
                    key={info.id}
                    className="info1"
                    sx={{
                      borderRadius: '1.7rem',
                      backgroundColor: '#E5D8DA',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <CardMedia
                      className="img"
                      component="img"
                      image={info.image}
                      alt={info.title}
                      sx={{
                        borderRadius: '1.7rem',
                        width: '100%',
                        height: '10rem',
                        display: 'block',
                        transition: 'transform 0.4s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.01)',
                        },
                        cursor: 'pointer',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(148, 135, 135, 0.3)',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(6px)',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(15deg) scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1)')}
                    >
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight size={18} color="#CD4662" />
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
                        }}
                      >
                        {info.title}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                  <Box sx={{backgroundColor: '#E5D8DA', padding: '0.3rem 1rem 1rem 1rem', borderRadius: '1.7rem', height: 'max-content', width: '100%', position: 'relative', '&:hover': { boxShadow: 'inset 0 0 8px #BD7689' }, cursor: 'pointer', marginBottom: '0.7rem',  }}>
                    <h6 style={{textAlign: 'center', fontSize: '1.6rem', marginBottom: '0.2rem', color: '#DD487B'}}>Health Tips</h6>
                    {healthTips.map((tip) => (
                      <Typography key={tip.id} sx={{ fontFamily: 'Alumni Sans, sans-serif', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
                        <span style={{color: '#4E001D', fontWeight: '500' }}>{tip.title}</span>{tip.det}
                      </Typography>
                    ))}
                    <Button className="rdmr" sx={{backgroundColor: '#F8EDED', color: '#000000', borderRadius: '0.5rem', fontSize: '0.4rem', position: 'absolute', bottom: '0.rem', right: '0rem', marginTop: '0.1rem'}} href="https://lifelinehospitalkerala.com/top-10-health-tips-for-women/">{'Read More >'}</Button>
                  </Box>
                  <Box sx={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}>
                  <Button className="infobtn"
                    sx={{
                      background: 'linear-gradient(-66deg, rgba(202, 161, 167, 0.5) 0%, rgba(242, 171, 180, 0.5) 50%, rgba(202, 161, 167, 0.7) 100%)',
                      color: '#000',
                      width: '49%',
                      borderRadius: '0.5rem',
                      fontSize: '0.7rem',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                      gap: '0.25rem',
                      padding: '0.45rem 1.2rem',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    {'Explore More >>'}
                  </Button>
                  <Button className="infobtn"
                    sx={{
                      background: 'linear-gradient(-66deg, rgba(202, 161, 167, 0.5) 0%, rgba(242, 171, 180, 0.5) 50%, rgba(202, 161, 167, 0.7) 100%)',
                      color: '#000',
                      width: '49%',
                      borderRadius: '0.5rem',
                      fontSize: '0.7rem',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                      gap: '0.25rem',
                      padding: '0.45rem 1.2rem',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    {'Explore More >>'}
                  </Button>
                  </Box>
                </Box>
                </Box>
              </Box>
        </Grid>
        <Grid size={1}>
          <Navbar/>
        </Grid>
      </Grid>
    </Box>
    <section id="about-us">
    <AboutUs />
    </section>
    <section id="features">
    <Features />
    </section>
    </div>
  );
}
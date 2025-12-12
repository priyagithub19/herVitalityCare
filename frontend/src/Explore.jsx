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
import { ThreeDot } from 'react-loading-indicators';
import { Podcast } from 'lucide-react';
import { categories, topics } from "./dataArray";



export default function Explore() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCat, setSelectedCat] = useState("Cancer");
  const [category, setCategory] = useState("15");
  const [isOpen, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [podcast, setPodcast] = useState(false);
  const [topic, setTopic] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("25");





const items = [
    { icon: <BiSolidCategoryAlt />, label: 'Categories', onClick: () => {setTopic(false); setPodcast(false); alert('Categories!'); setSelectedCat("Cancer")} },
    { icon: <TopicIcon />, label: 'Topics', onClick: () => {setTopic(true); setPodcast(false); alert('Topics!'); setSelectedCat("Keep Your Heart Healthy")} },
    { icon: <Podcast />, label: 'Podcasts', onClick: () => {setTopic(false); setPodcast(true); alert('Podcasts!'); setSelectedCat("")} },
  ];

useEffect(() => {
  setError("");


  if (!topic && !podcast) {
    if (!category) return;

    setIsLoading(true);

    fetch(`http://localhost:5000/topicsearch?categoryId=${category}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("CATEGORY FROM BACKEND:", data);

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
        setError("Failed to fetch category data");
        setIsLoading(false);
      });

    return;
  }
  if (topic === true) {
    if (!selectedTopic) return;

    setIsLoading(true);

    fetch(`http://localhost:5000/topicsearch?topicId=${selectedTopic}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("TOPIC DETAILS FROM BACKEND:", data);

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
        setError("Failed to fetch topic details");
        setIsLoading(false);
      });
  }

  if (podcast === true) {

    setIsLoading(true);

    fetch(`http://localhost:5000/podcast`)
      .then((res) => res.json())
      .then((data) => {
        console.log("TOPIC DETAILS FROM BACKEND:", data);

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
        setError("Failed to fetch topic details");
        setIsLoading(false);
      });
  }

}, [category, selectedTopic, topic, podcast]);

const topicItems = () =>{
  if (!topic && !podcast) {
    return categories.map(c => c.label);
  }

  if (topic && !podcast) {
    return topics.map(t => t.title);
  }

  return [];
}

const slctTopic = (index) => {
  if (!topic && !podcast) {
    if (!categories[index]) return null;
    return categories[index].id;
  }

  if (topic && !podcast) {
    if (!topics[index]) return null;
    return topics[index].id;
  }

  if (!topic && podcast) {
    if (!podcast[index]) return null;
    return podcast[index].id;
  }

  return null;
};


  return (
    <Box sx={{ width: "100%", background: "rgba(246, 218, 226, 0.8)", minHeight: "100vh", py: 4, textAlign: "center" }}>
      <Navbar />

      <Box sx={{ width: "90%", margin: "auto", mb: 4 }}>
        <Typography variant="h3" sx={{ color: "rgba(227,4,110,1)", mb: 2 }}>
          || {podcast === false ? "Articles" : "Podcasts"} ||
        </Typography>
        {isLoading && <ThreeDot variant="pulsate" color={["#B66681", "#C48197", "#DFC1CB"]} size="large" text="" textColor="" />}
        {error && <Typography color="error">Error: {error}</Typography>}
          <Box>
          <Box sx={{marginBottom: '1rem', gap: 2, display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
            <Typography variant="h6" sx={{ fontWeight: '600', fontFamily: 'Texturina, serif' }}>
               {!topics === true && !podcast === true && "Category" || !topics === true && !podcast === false && "" || !topics === false && !podcast === true && "Topic"}Selected: <span style={{color: "#BF3853"}}> "{selectedCat}"</span>
            </Typography>
            </Box>
          </Box>
          <Box sx={{width: '70%'}}>
          </Box>   
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {apiData.map(info => (
  <Grid item xs={12} sm={6} md={4} key={info.id}>
            {topic ? (   <Box className="infoBoxes" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                  <Card
                    className="infoTopic"
                    sx={{
                      borderWidth: 0,
                      borderRadius: '2rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
                      height: '100%',
                      marginBottom: '1rem'
                    }}
                  >
                    {/* <AspectRatio variant="outlined" ratio="24/9"> */}
                    <Typography
                        variant="body2"
                        className="typo"
                        sx={{
                          fontFamily: 'Texturina, serif',
                          fontSize: '2.02rem',
                          textAlign: 'justify',
                          fontWeight: '700',
                          marginY: '1rem',
                          marginX: '2rem'
                        }}
                      >
                        {info.title}
                      </Typography>
                    <CardMedia
                      className="img"
                      component="img"
                      image={info.image}
                      alt={info.title}
                      sx={{
                        borderRadius: '1.7rem',
                        width: '100%',
                        height: '30rem',
                        display: 'block',
                        transition: 'transform 0.4s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.01)',
                        },
                        cursor: 'pointer',
                        marginX: '0.3rem'
                      }}
                    />
                    {/* </AspectRatio> */}
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
                      {info.sections && info.sections.map((section, index) => (
          <div key={index}>
            <Typography variant="h4" sx={{color: '#E56D85', fontWeight: 700}}>{section.title}</Typography>
            <Typography variant="h6"  component="div">
              <div dangerouslySetInnerHTML={{ __html: section.content }} style={{textAlign: 'justify', margin: '2rem'}} />
            </Typography>
          </div>
        ))}
               </CardContent>
                  </Card>
                </Box>
) : podcast ? (<Box className="infoBoxes" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', marginBottom: '0.5rem'}}>
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
                    <AspectRatio ratio="16/9">
                    <CardMedia
                      className="img"
                      component="img"
                      image={info.thumbnail}
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
                      <a href={`https://www.youtube.com/watch?v=${info.videoId}`} target="_blank" rel="noopener noreferrer" >
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
                      <Typography
                        variant="body2"
                        className="typo"
                        sx={{
                          fontFamily: 'Texturina, serif',
                          fontSize: '0.8rem',
                          textAlign: 'justify',
                          fontWeight: '600',
                          marginTop: '0.3rem',
                          color: 'rgba(112, 13, 63, 0.7)'
                        }}
                      >
                        {info.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
) : (<Box className="infoBoxes" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', marginBottom: '0.5rem'}}>
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
                    <AspectRatio variant="outlined" ratio="10/9">
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
)  
   /* <Box className="infoBoxes" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', marginBottom: '0.5rem'}}>
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
                    <AspectRatio variant="outlined" ratio="10/9">
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
                </Box> */}
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
          items={topicItems()}
            onItemSelect={(label, index) => {
                const selected = slctTopic(index);
                console.log("Selected :", selected);
                if(!topic && !podcast){
                  setCategory(selected);
                  setSelectedCat(label)
                }
                if(topic && !podcast){
                  setSelectedTopic(selected);
                  setSelectedCat(label)
                }
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
        height: '4rem',
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



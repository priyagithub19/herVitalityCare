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
import { PlusCircle } from "lucide-react";
import Dock from './reactbits/Dock';
import { BiSolidCategoryAlt } from "react-icons/bi";
import TopicIcon from '@mui/icons-material/Topic';
import { Carousel } from 'primereact/carousel';
import AnimatedList from "./reactbits/ANimatedList";
import { Cross as Hamburger } from 'hamburger-react'
import { AnimatePresence, motion } from "motion/react"
import './ListAnim.css'




export default function Explore() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [category, setCategory] = useState([]);
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
  fetch("http://localhost:5000/api/")
    .then((res) => res.json())
    .then((data) => {
      console.log("FROM BACKEND:", data);
      setApiData(Array.isArray(data.items) ? data.items : []);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to fetch data");
      setIsLoading(false);
    });
}, []);


const template = (catbtn) => {
  return (
    <Box sx={{display: 'flex', margin: 0}}>
      <Typography key={catbtn.id}>{catbtn.label}</Typography>
    </Box>
    // <Button
    //   icon={<PlusCircle style={{ marginRight: "0.5rem" }} />}
    //   style={{
    //     width: "max-content",
    //     backgroundColor: "rgba(158, 41, 74, 0.5)",
    //     color: "rgba(246, 218, 226, 0.8)",
    //     borderRadius: "1rem",
    //     fontFamily: "Delius, cursive",
    //     fontWeight: "700",
    //     marginRight: "1rem",
    //     // padding: "0.8rem 1.2rem",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "space-around",
    //     gap: "0.6rem",
    //     whiteSpace: "nowrap"
    //    }}>
    //   {catbtn.label}
    //   </Button>
  );
};



  return (
    <Box sx={{ width: "100%", background: "rgba(246, 218, 226, 0.8)", minHeight: "100vh", py: 4, textAlign: "center" }}>
      <Navbar />

      <Box sx={{ width: "90%", margin: "auto", mb: 4 }}>
        <Typography variant="h3" sx={{ color: "rgba(227,4,110,1)", mb: 2 }}>
          || Articles ||
        </Typography>

        {/* Search Input */}
        {/* <TextField
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 4, width: "50%" }}
        /> */}

        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        {/* {!isLoading && !error && apiData.length === 0 && (
          <Typography>No articles found.</Typography>
        )} */}
          {/* <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: '600', fontFamily: 'Texturina, serif' }}>
              Explore articles curated to empower your health journey.
            </Typography>
          </Box> */}
          <Box>
          <Box sx={{marginBottom: '1rem', gap: 2, display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
      
            {/* <Button className="expbtn" sx={{color: '#fbd9e5', height: '2.5rem', backgroundColor: !topics == true ?  'rgba(196, 54, 112, 0.8)': 'rgba(196, 54, 112, 0.5)', width: '10rem', fontSize: '0.8rem', borderRadius: '0.2rem 0.2rem 1rem 1rem', fontFamily: 'Delius, cursive', fontWeight: '600', letterSpacing: '0.2rem'}} onClick={() => setTopics(false)}>
              Categories
            </Button>
            <Button className="expbtn" sx={{color: '#fbd9e5', height: '2.5rem', backgroundColor: topics == true ?  'rgba(196, 54, 112, 0.8)': 'rgba(196, 54, 112, 0.5)', width: '10rem', fontSize: '0.8rem', borderRadius: '0.2rem 0.2rem 1rem 1rem', fontFamily: 'Delius, cursive', fontWeight: '600', letterSpacing: '0.2rem'}} onClick={()=> setTopics(true)}>
              Topics
            </Button> */}
            </Box>
          </Box>
          <Box sx={{width: '70%'}}>
          </Box>   
             {/* <Box><Button sx={{width: 'max-content', backgroundColor: 'rgba(158, 41, 74, 0.5)', color: 'rgba(246, 218, 226, 0.8)', gap: 1.2, borderRadius: '1rem', fontFamily: 'Delius, cursive', fontWeight: '700'}}><PlusCircle />Mental Health</Button></Box>
          <Box><Button sx={{width: 'max-content', backgroundColor: 'rgba(158, 41, 74, 0.5)', color: 'rgba(246, 218, 226, 0.8)', gap: 1.2, borderRadius: '1rem', fontFamily: 'Delius, cursive', fontWeight: '700'}}><PlusCircle />Periods</Button></Box>
          <Box><Button sx={{width: 'max-content', backgroundColor: 'rgba(158, 41, 74, 0.5)', color: 'rgba(246, 218, 226, 0.8)', gap: 1.2, borderRadius: '1rem', fontFamily: 'Delius, cursive', fontWeight: '700'}}><PlusCircle />Wellness</Button></Box>
          <Box><Button sx={{width: 'max-content', backgroundColor: 'rgba(158, 41, 74, 0.5)', color: 'rgba(246, 218, 226, 0.8)', gap: 1.2, borderRadius: '1rem', fontFamily: 'Delius, cursive', fontWeight: '700'}}><PlusCircle />Nutrition</Button></Box> */}
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>

          {apiData.map(info => (
  <Grid item xs={12} sm={6} md={4}>
   <Box className="infoBoxes" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                  <Card
                    key={info.id}
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
                      <a href={info.link} target="_blank" rel="noopener noreferrer" >
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

  {/* LEFT SIDE MENU + HAMBURGER (opens leftward) */}
  {/* <Box sx={{ display: "flex", alignItems: "center" }}>
    
    <AnimatePresence>
      {isOpen && (
        <Box
          sx={{
            marginRight: "0.75rem",
            display: "flex",
            flexDirection: "row",
            transformOrigin: "left center",
          }}
        >
          <AnimatedList
            items={categories.map(c => c.label)}
            onItemSelect={(item, index) => console.log(item, index)}
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
        backgroundColor: "rgba(85, 7, 29, 0.5)",
        borderRadius: "1rem",
        padding: "0.4rem",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        marginRight: "1rem",
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
  </Box> */}
  

      <AnimatePresence>
      {isOpen && (
        <Box
          sx={{
            marginRight: "0.75rem",
            display: "flex",
            flexDirection: "column",
            transformOrigin: "left center",
          }}
        >
          <h6>Categories</h6>
          <AnimatedList
            items={categories.map(c => c.label)}
            onItemSelect={(item, index) => console.log(item, index)}
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






// import React, { useEffect, useState } from "react";
// import { Box, Button, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
// import { PlusCircle, ArrowUpRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar"; 
// import AspectRatio from "@mui/joy/AspectRatio";

// export default function Explore() {
//   const [all, setAll] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:5000/api/all")
//       .then((r) => r.json())
//       .then((data) => {
//         setAll(Array.isArray(data) ? data : []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const categories = [
//     { id: 16, label: "Diabetes" },
//     { id: 20, label: "Mental Health" },
//     { id: 126, label: "Wellness" },
//     { id: 21, label: "Nutrition" },
//     // Add any other category IDs you want visible as pills
//   ];

//   return (
//     <Box sx={{ width: "100%", background: "rgba(246, 218, 226, 0.8)", minHeight: "100vh", py: 4 }}>
//       <Navbar />
//       <Box sx={{ width: "90%", margin: "auto", mb: 4, textAlign: "center" }}>
//         <Typography variant="h3" sx={{ color: "rgba(227,4,110,1)", mb: 2 }}>
//           || Articles ||
//         </Typography>

//         {/* Category pills */}
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//           <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//             {categories.map((c) => (
//               <Button
//                 key={c.id}
//                 onClick={() => navigate(`/topics/${c.id}`)}
//                 sx={{
//                   backgroundColor: "rgba(158, 41, 74, 0.5)",
//                   color: "rgba(246, 218, 226, 0.9)",
//                   borderRadius: "1rem",
//                   fontWeight: 700,
//                 }}
//                 startIcon={<PlusCircle />}
//               >
//                 {c.label}
//               </Button>
//             ))}
//           </Box>
//         </Box>

//         {/* Grid preview of fetched items (optional) */}
//         {loading ? (
//           <Typography sx={{ mt: 3 }}>Loading...</Typography>
//         ) : (
//           <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
//             {all.slice(0, 9).map((info, i) => (
//               <Grid item xs={12} sm={6} md={4} key={i}>
//                 <Card sx={{ borderRadius: "2rem", position: "relative", overflow: "hidden" }}>
//                   <AspectRatio ratio="16/9">
//                     <CardMedia component="img" image={info.image} alt={info.title} />
//                   </AspectRatio>

//                   <a
//                     href={info.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ position: "absolute", top: 14, right: 14, background: "rgba(148,135,135,0.8)", padding: 8, borderRadius: "50%" }}
//                   >
//                     <ArrowUpRight size={18} />
//                   </a>

//                   <CardContent>
//                     <Typography sx={{ fontWeight: 600 }}>{info.title}</Typography>
//                     <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
//                       {info.category}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Box>
//     </Box>
//   );
// }

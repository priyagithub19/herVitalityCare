import { useState } from "react";
import { Box, Paper, Typography, Tabs, Tab } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";
import cycle from '/images/cycle.png';


const InfoDiv = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <Box
      sx={{
        borderRadius: 4,
        height: '100%',
        p: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: '70vh',
          maxWidth: 1300,
          width: "100%",
          mx: "auto",
          overflow: "hidden",
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          backgroundColor: '#F6C8D1'
        }}
      >
        <Tabs
          value={open}
          onChange={(e, v) => setOpen(v)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            bgcolor: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
            borderBottom: "2px solid rgba(255,255,255,0.6)",
            ".MuiTab-root": {
              minWidth: 160,
              color: "#F18CB5",
              fontWeight: 600,
              letterSpacing: 0.3,
            },
            ".Mui-selected": {
              color: "#D55D8D !important",
            },
            ".MuiTabs-indicator": {
              backgroundColor: "#EC4899",
              height: 4,
              borderRadius: 2,
            },
          }}
        >
          {items.map((item) => (
            <Tab
              key={item.id}
              value={item.id}
              iconPosition="start"
              label={item.title}
            />
          ))}
        </Tabs>

        {items.map((item) => (
          <Panel key={item.id} item={item} open={open} />
        ))}
      </Paper>
    </Box>
  );
};

const Panel = ({ open, item }) => {
  const isOpen = open === item.id;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={item.id}
          initial="closed"
          animate="open"
          exit="closed"
            variants={panelVariants}
  style={{
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${item.imgSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
 >
<Box
  sx={{
    position: "absolute",
    inset: 0,
    bgcolor: "rgba(0,0,0,0.3)", 
  }}
/>


          <motion.div
            variants={textVariants}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "1rem 1.5rem",
              color: "white",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(6px)",
              textWrap: 'wrap',
              paddingBlock: '1.5rem',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {item.title}
            </Typography>
            <Typography sx={{marginInline: 5, fontSize: 20, marginY: 1}}>{item.description}</Typography>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const panelVariants = {
  open: {
    height: "100%",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const textVariants = {
  open: { opacity: 1, y: "0%" },
  closed: { opacity: 0, y: "20%" },
};

const items = [
  {
    id: 1,
    title: "About Menstrual Cycle",
    imgSrc: cycle,
    description:
      "A menstrual cycle begins when you get your period or menstruate. This is when you shed the lining of your uterus. This cycle is part of your reproductive system and prepares your body for a possible pregnancy. A typical cycle lasts between 24 and 38 days.",
  },
  {
    id: 2,
    title: "Sleep & Mood Health",
    imgSrc:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=688&q=80",
    description:
      "Learn about the four phases of the menstrual cycle — menstruation, follicular, ovulation, and luteal phase.",
  },
  {
    id: 3,
    title: "Healthy vs Unhealthy Period Symptoms",
    imgSrc:
      "https://images.unsplash.com/photo-1578450671530-5b6a7c9f32a8?auto=format&fit=crop&w=870&q=80",
    description:
      "Identify common symptoms and know when period pain, flow, or changes may need medical attention.",
  },
  {
    id: 4,
    title: "Why Self-Care Matters for Women",
    imgSrc:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1740&q=80",
    description:
      "Explore the importance of emotional, physical, and mental self-care throughout your menstrual and wellness journey.",
  },
];

export default InfoDiv;

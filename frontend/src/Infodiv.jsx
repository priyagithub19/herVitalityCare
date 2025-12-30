import { useState } from "react";
import { Box, Paper, Typography, Tabs, Tab } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";
import cycle from '/images/cycle.png';
import sleeo from '/images/sleepMood.png';
import healthy from '/images/healthyvsunhealthy.png';
import self from '/images/selfcare.png';

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
            <Typography sx={{marginInline: 5, fontSize: 20, marginY: 1}} dangerouslySetInnerHTML={{ __html: item.description }}></Typography>
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
    imgSrc: sleeo,
    description:
      "Good sleep can be a step toward better mood and mental health. Without enough sleep, you’re more likely to feel irritable, frustrated, anxious, or sad. Research has found that people who get inadequate sleep are at higher risk of experiencing mental distress that detracts from their emotional and mental health.",
  },
  {
    id: 3,
    title: "Healthy vs Unhealthy Period Symptoms",
    imgSrc:healthy,
    description:

      `<div style="display: flex; gap: 5rem;"><div><p class="infohead" style="color: #ffe7f1ff;">📌 Healthy Period Symptoms</p>
<ul>
  <li>Regular cycle (21–35 days)</li>
  <li>Lasts 2–7 days</li>
  <li>Light to moderate bleeding</li>
  <li>Mild cramps or back pain</li>
  <li>Slight bloating</li>
  <li>Mild mood changes</li>
</ul>
</div>
<div>

<p class="infohead" style="color: #ffe7f1ff;">📌 Unhealthy Period Symptoms</p>
<ul>
  <li>Irregular or missed periods</li>
  <li>Very heavy bleeding</li>
  <li>Lasts more than 7 days</li>
  <li>Severe cramps or pelvic pain</li>
  <li>Large blood clots</li>
  <li>Bleeding between periods</li>
  <li>Extreme fatigue or dizziness</li>
</ul></div>`,
  },
  {
    id: 4,
    title: "Why Self-Care Matters for Women",
    imgSrc: self,
    description:
      "Self-care helps women stay healthy, calm, and emotionally balanced. It reduces stress, improves mood, and prevents burnout caused by daily responsibilities and pressure. When women take time to care for themselves, they gain more energy, confidence, and patience to handle everyday life. Self-care is not selfish—it is an essential part of overall well-being.",
  },
];

export default InfoDiv;

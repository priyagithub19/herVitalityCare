import { Box, Typography, Container, Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";
import './EdCard.css'

export default function EdCard() {
  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState(null);


  const menstrualHealthGuide = [
  {
    id: 1,
    img: '/images/phlevel.webp',
    title: "Understanding Vaginal pH Level",
    content: [
      {
        heading: "What is vaginal pH?",
        text: "Vaginal pH is a measure of how acidic or alkaline the vagina is. A healthy vagina is naturally slightly acidic, which helps protect against infections and supports good bacteria."
      },
      {
        heading: "What is normal?",
        list: [
          "Normal vaginal pH: 3.8 – 4.5",
          "This acidity helps prevent harmful bacteria from growing."
        ]
      },
      {
        heading: "What can affect pH?",
        list: [
          "Menstrual periods",
          "Sexual activity",
          "Stress and poor sleep",
          "Antibiotics",
          "Scented soaps or vaginal washes"
        ]
      },
      {
        heading: "Signs of imbalance",
        list: [
          "Unusual odor",
          "Itching or irritation",
          "Changes in discharge"
        ]
      },
      {
        heading: "How to maintain balance",
        list: [
          "Clean only the external area",
          "Avoid douching",
          "Wear breathable cotton underwear",
          "Change pads or tampons regularly"
        ]
      },
      {
        tip: "✨ Small changes are normal — your body constantly adjusts."
      }
    ]
  },
  {
    id: 2,
    img: '/images/cycle.png',
    title: "What Is a Normal Menstrual Cycle?",
    content: [
      {
        heading: "Cycle length",
        list: [
          "Normal cycle length: 21 to 35 days",
          "The cycle starts on the first day of your period"
        ]
      },
      {
        heading: "Period duration",
        list: [
          "Normal bleeding lasts 3 to 7 days"
        ]
      },
      {
        heading: "Is variation normal?",
        text: "Yes. Cycles can change due to:",
        list: [
          "Stress",
          "Travel",
          "Lifestyle changes",
          "Hormonal shifts"
        ]
      },
      {
        heading: "When to pay attention",
        list: [
          "Very heavy bleeding",
          "Periods lasting longer than 8 days",
          "Severe pain affecting daily life"
        ]
      },
      {
        tip: "Tracking your cycle helps you understand what’s normal for you."
      }
    ]
  },
  {
    id: 3,
    img: '/images/flow.jpg',
    title: "Types of Menstrual Flow (What’s Normal?)",
    content: [
      {
        heading: "Light flow",
        list: [
          "Few pad or liner changes",
          "Often seen at the start or end of periods"
        ]
      },
      {
        heading: "Medium flow",
        list: [
          "Regular pad changes every 4–6 hours",
          "Most common and considered normal"
        ]
      },
      {
        heading: "Heavy flow",
        list: [
          "Frequent pad changes",
          "Clots may appear occasionally"
        ]
      },
      {
        heading: "Is clotting normal?",
        text: "Small clots can be normal, especially during heavy flow days."
      },
      {
        alert: "🚩 If bleeding feels excessive or exhausting, it’s okay to seek advice."
      }
    ]
  },
  {
    id: 4,
    img: '/images/cramps.png',
    title: "Common Period Symptoms & What They Mean",
    content: [
      {
        heading: "Cramps",
        list: [
          "Caused by uterus contractions",
          "Mild to moderate cramps are common"
        ]
      },
      {
        heading: "Headache",
        list: [
          "Often linked to hormone changes",
          "Rest and hydration can help"
        ]
      },
      {
        heading: "Leg or lower back pain",
        list: [
          "Pain can radiate from pelvic muscles",
          "Gentle stretching may help"
        ]
      },
      {
        heading: "Stomach discomfort",
        list: [
          "Bloating is common before or during periods"
        ]
      },
      {
        tip: "🌷 Every cycle is different — symptoms may change month to month."
      }
    ]
  },
  {
    id: 5,
    img: '/images/pad.jpeg',
    title: "Choosing the Right Sanitary Pad (Material & Brands)",
    content: [
      {
        heading: "Pad materials",
        list: [
          "Cotton pads: Soft, breathable, skin-friendly",
          "Organic cotton: No added chemicals, ideal for sensitive skin",
          "Gel-based pads: Higher absorption but less breathable"
        ]
      },
      {
        heading: "Which should you choose?",
        list: [
          "Sensitive skin → cotton or organic cotton",
          "Heavy flow → high-absorbency pads",
          "Long hours → breathable + absorbent pads"
        ]
      },
      {
        heading: "Popular trusted brands (India)",
        list: [
          "Whisper",
          "Stayfree",
          "Sofy",
          "Nua (organic cotton)",
          "Sirona (chemical-free options)"
        ]
      },
      {
        tip: "💡 Comfort and hygiene matter more than brand name."
      }
    ]
  }
];

  return (
    <Container maxWidth="md" sx={{p: 0}} >
        <Typography variant="h4" sx={{fontWeight: 600, textAlign: 'center', my: 2, color: '#c957b8ff'}}>Know Your Body, Know Your Cycle 🌸</Typography>
<Box>
            {menstrualHealthGuide.map((section) => (
  <Box key={section.id} component="article" mb={3}>

    {/* TITLE */}
    <Typography
      variant="h3"
      component="h1"
      className="head"
      sx={{ px: 2, fontSize: "2rem", width: "100%" }}
    >
      {section.title}
    </Typography>

    {/* FEATURED IMAGE */}
    <Box className="featured-image" sx={{backgroundImage: `url(${section.img})`}}>
      <Box
        className={`expand ${
              expandedId === section.id ? "close" : ""
            }`}
            onClick={() =>
              setExpandedId(
                expandedId === section.id ? null : section.id
              )
            }
      />
    </Box>

    {/* CONTENT */}
    <Box className="content" sx={{ mx: 2, mt: 2 }}>
      {section.content.map((item, index) => (
        <Box key={index} mb={3}>

          {/* SUB-HEADING */}
          {item.heading && (
            <Typography variant="h6" gutterBottom>
              {item.heading}
            </Typography>
          )}

          {/* TEXT */}
          {item.text && (
            <Typography paragraph>
              {item.text}
            </Typography>
          )}

          {/* LIST */}
          {item.list && (
            <Box component="ul" sx={{ pl: 3 }}>
              {item.list.map((li, i) => (
                <Typography component="li" key={i} mb={0.5}>
                  {li}
                </Typography>
              ))}
            </Box>
          )}

          {/* TIP */}
          {item.tip && (
            <Box className="tip">
              <Typography>{item.tip}</Typography>
            </Box>
          )}

          {/* ALERT */}
          {item.alert && (
            <Box className="alert">
              <Typography>{item.alert}</Typography>
            </Box>
          )}

        </Box>
      ))}
    </Box>

  </Box>
))}
</Box>

    </Container>
  );
}






import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

export const WellnessJourneySection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "557px",
        backgroundColor: "#e5d8da",
        borderRadius: "80px",
        overflow: "hidden",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}
    >
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1098&h=557&fit=crop"
        alt="Wellness Journey Illustration"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "1098px",
          height: "557px",
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "40px",
          left: "42px",
          width: "838px",
          height: "464px",
          borderRadius: "50px",
          overflow: "hidden",
          boxShadow:
            "5px 7px 4px 5px rgba(153, 97, 97, 0.5), inset 0px 0px 5px 7px rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(5px) brightness(100%)",
          background:
            "linear-gradient(180deg, rgba(237, 217, 217, 0.7) 0%, rgba(179, 159, 159, 0.7) 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "88px 71px 0 71px",
        }}
      >
        <Typography
          sx={{
            width: "766px",
            height: "154px",
            fontFamily: "'BioRhyme-Bold', Helvetica",
            fontWeight: 700,
            color: "#996161",
            fontSize: "50px",
            letterSpacing: "0",
            lineHeight: "normal",
            textShadow: "2px 3px 4px rgba(111, 13, 13, 0.7)",
            marginBottom: "50px",
          }}
        >
          Your Wellness Journey Starts Here 🌷
        </Typography>

        <Typography
          sx={{
            width: "754px",
            height: "86px",
            fontFamily: "'Merienda-Bold', Helvetica",
            fontWeight: 700,
            color: "#6f0d3e",
            fontSize: "30px",
            letterSpacing: "0",
            lineHeight: "normal",
            marginBottom: "auto",
          }}
        >
          Stay ahead of your cycle with accurate predictions and daily guidance.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "27px",
            paddingBottom: "14px",
          }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: "211px",
              height: "72px",
              borderRadius: "80px",
              boxShadow:
                "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.40), inset 1px 0 0 rgba(255, 255, 255, 0.32), inset 0 -1px 1px rgba(0, 0, 0, 0.13), inset -1px 0 1px rgba(0, 0, 0, 0.11)",
              backdropFilter: "blur(2px) brightness(100%) saturate(100%)",
              background:
                "linear-gradient(98deg, rgba(230, 216, 218, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(230, 216, 218, 1) 30%)",
              fontFamily: "'BioRhyme-Bold', Helvetica",
              fontWeight: 700,
              color: "#000000",
              fontSize: "16px",
              letterSpacing: "0",
              lineHeight: "normal",
              textTransform: "none",
              "&:hover": {
                background:
                  "linear-gradient(98deg, rgba(230, 216, 218, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(230, 216, 218, 1) 30%)",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

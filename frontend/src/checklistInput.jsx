import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";

const CheckInput = () => {
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const Add = <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="#eec8dc" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"></path></svg>

  return (
    <Box
      sx={{
        position: "relative",
        width: 300,
        height: 64,
        margin: "150px auto",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 25,
          top: 14,
          width: 2,
          height: 36,
          backgroundColor: "rgb(71,136,135)",
          transform: focused ? "scale(0)" : active ? "scale(1)" : "scale(0)",
          transition: "all 0.5s cubic-bezier(.87,-.41,.19,1.44)",
          animation:
            active && !focused
              ? "focusBlink 0.6s cubic-bezier(.87,-.41,.19,1.44) 0.5s infinite"
              : "none",
        },
        "@keyframes focusBlink": {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      }}
    >
      {/* Input */}
      <TextField
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value.length > 0)}
        placeholder="Search..."
        sx={{
          position: "absolute",
          width: active ? "100%" : 64,
          height: 64,
          borderRadius: "36px",
          transition: "all 0.5s cubic-bezier(.87,-.41,.19,1.44)",
          "& .MuiOutlinedInput-root": {
            height: 64,
            borderRadius: "36px",
            paddingLeft: active ? "25px" : "0",
          },
          "& fieldset": {
            border: "none",
          },
          // backgroundColor: "rgba(25, 83, 101, 0.63)",
          backgroundColor: 'rgb(219, 158, 184, 0.8)',
        }}
      />

      {/* Button */}
      <IconButton
        onClick={() => setActive(!active)}
        sx={{
          position: "absolute",
          width: 64,
          height: 64,
          borderRadius: "50%",
          backgroundColor: "#B66681",
          transform: active ? "translateX(236px)" : "translateX(0)",
          transition: "all 0.5s cubic-bezier(.87,-.41,.19,1.44)",
          "&:hover": {
            backgroundColor: "#C48197",
          },
        }}
      >
        {/* <AddIcon sx={{ color: "rgb(203, 35, 122)", fontSize: 30 }} /> */}
        {Add}
      </IconButton>
    </Box>
  );
};

export default CheckInput;

import React, { useState } from "react";
import { Typography, Box, TextField, IconButton } from "@mui/material";
import "./To-Do.css";

const initialList = [
  { text: "Drink 8 glasses of water", checked: false },
  { text: "Log today’s mood", checked: false },
  { text: "Eat at least 1 fruit or vegetable", checked: false },
  { text: "Have one balanced meal today", checked: false },
  { text: "Practice 5 minutes of deep breathing", checked: false },
  { text: "Sit quietly for 5 minutes without phone", checked: false },
  { text: "Sleep 7–8 hours", checked: false },
  { text: "Go to bed before 11:30 PM", checked: false },
];

const Add = (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24">
    <path
      fill="#eec8dc"
      d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
    />
  </svg>
);

const Reset = (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="#eec8dc"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 16H5v5m9-13h5V3M4.583 9.003a8 8 0 0 1 14.331-1.027m.504 7.021a8 8 0 0 1-14.332 1.027"
    />
  </svg>
);

export default function TodoCheckList() {
  const [list, setList] = useState(initialList);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);

  const toggleCheck = (index) => {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  /* Add new todo */
  const handleAdd = () => {
    if (!value.trim()) return;

    setList((prev) => [
      ...prev,
      { text: value.trim(), checked: false },
    ]);

    setValue("");
    setActive(false);
  };

const handleReset = () => {
  setList([]);        
  setValue("");
  setActive(true);    
};

  return (
    <div className="todoBoddy">
      <div className="content">
        <Typography
          variant="h1"
          sx={{ textAlign: "center", fontWeight: 600, mb: 3 }}
        >
          Today's Checklist
        </Typography>

        {list.map((item, index) => (
          <label key={index} className="todoItem">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleCheck(index)}
            />
            <span className={item.checked ? "checked" : ""}>
              {item.text}
            </span>
          </label>
        ))}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
            mt: 4,
            width: "100%",
          }}
        >
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setActive(true)}
            placeholder="Type here..."
            sx={{
              width: active ? 260 : 0,
              height: 64,
              borderRadius: "36px",
              transition: "width 0.4s cubic-bezier(.87,-.41,.19,1.44)",
              "& .MuiOutlinedInput-root": {
                height: 64,
                borderRadius: "36px",
                paddingLeft: active ? "1rem" : "0",
              },
              "& fieldset": { border: "none" },
              backgroundColor: "rgba(219, 158, 184, 0.8)",
            }}
          />

          <IconButton
            onClick={handleAdd}
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#B66681",
              "&:hover": { backgroundColor: "#C48197" },
            }}
          >
            {Add}
          </IconButton>

          <IconButton
            onClick={handleReset}
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(219, 80, 121, 0.7)",
              "&:hover": { backgroundColor: "rgba(219, 80, 121, 0.85)" },
            }}
          >
            {Reset}
          </IconButton>
        </Box>
      </div>
    </div>
  );
}

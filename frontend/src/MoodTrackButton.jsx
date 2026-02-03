import React, { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export default function MoodTrack({ currentDay, cycleId, userId }) {
  const MOODS = [
    { id: "happy", emoji: "😊", label: "Happy" },
    { id: "calm", emoji: "😌", label: "Calm" },
    { id: "neutral", emoji: "😐", label: "Neutral" },
    { id: "tired", emoji: "😴", label: "Tired" },
    { id: "sad", emoji: "😢", label: "Sad" },
    { id: "angry", emoji: "😡", label: "Angry" },
  ];

  const [selected, setSelected] = useState(0);

  const handleMoodSelect = async (index) => {
    setSelected(index);

    try {
      await axios.post(`${API_BASE}/day`, {
        userId: userId,
        cycleId: cycleId,
        date: new Date(),
        dayNumber: currentDay,
        flow: null,
        painLevel: null,
        mood: MOODS[index].id,
        symptoms: [],
        notes: "",
      });
      console.log("Mood logged:", MOODS[index].label);
    } catch (err) {
      console.error("Error logging mood:", err);
    }
  };

  return (
    <>
      <Box className="trackBody">
        <main>
          {MOODS.map((mood, index) => (
            <React.Fragment key={mood.id}>
              <input
                className="track-item"
                id={mood.id}
                type="radio"
                name="mood"
                value={mood.id}
                checked={selected === index}
                onChange={() => handleMoodSelect(index)}
              />
              <label className="track-label" htmlFor={mood.id}>
                {mood.emoji}
              </label>
            </React.Fragment>
          ))}

          <div className="track">
            <div className="track__inner">
              {MOODS.map((_, index) => (
                <div key={index} className="track__ball-hole">
                  <div
                    className="track__ball"
                    style={{
                      transform: index === selected ? "translateY(0)" : "translateY(3em)",
                    }}
                  />
                </div>
              ))}
              <div
                className="track__ball"
                style={{ transform: `translateY(${selected * 4.1}em)` }}
              />
            </div>
          </div>
        </main>
      </Box>
      <Box
        sx={{
          width: "max-content",
          position: "fixed",
          bottom: 0,
          p: 3,
          right: 2,
          backgroundColor: "#F7D3E0",
          mb: 2,
          mr: 2,
          borderRadius: 5,
          border: "1px solid #DB5079",
          boxShadow: "inset 0px 0px 8px #ffffffff",
          zIndex: 999,
        }}
      >
        <p style={{ fontSize: "1.02rem", fontWeight: "570", color: "#DB5079" }}>
          How you feel Today? - <span> {MOODS[selected].label} {MOODS[selected].emoji}</span>
        </p>
      </Box>
    </>
  );
}

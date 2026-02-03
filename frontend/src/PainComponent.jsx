import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const painTypes = [
  "lowerBack",
  "headache",
  "breastTenderness",
  "fatigue",
  "nausea",
  "jointMuscle",
];

const severityLevels = ["mild", "moderate", "severe"];

export default function PainEntry({ onSubmit }) {
  const theme = useTheme();
  const [pains, setPains] = useState([{ type: "", severity: "" }]);

  const handlePainChange = (index, field, value) => {
    const newPains = [...pains];
    newPains[index][field] = value;
    setPains(newPains);
  };

  const addPain = () => setPains([...pains, { type: "", severity: "" }]);
  const removePain = (index) => setPains(pains.filter((_, i) => i !== index));

  const handleSubmit = () => {
    const validPains = pains.filter((p) => p.type && p.severity);
    onSubmit(validPains);
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        mt: 2,
        maxWidth: "80%",
        borderRadius: 3,        
        boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.8)",
        backgroundColor: 'rgba(236, 193, 219, 0.5)',
        border: "1px solid #F4CAD6",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: '#e45d8f', fontWeight: 600 }}
      >
        Daily Pain Tracker
      </Typography>

      {pains.map((pain, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            alignItems: "center",
            backgroundColor: '#fcddeee4',
            p: 2,
            borderRadius: 2,
            boxShadow: theme.shadows[1],
            "&:hover": { boxShadow: theme.shadows[4] },
          }}
        >
          <TextField
            select
            label="Pain Type"
            value={pain.type}
            onChange={(e) => handlePainChange(idx, "type", e.target.value)}
            fullWidth
            size="small"
          >
            {painTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Severity"
            value={pain.severity}
            onChange={(e) => handlePainChange(idx, "severity", e.target.value)}
            fullWidth
            size="small"
          >
            {severityLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>

          <IconButton
            onClick={() => removePain(idx)}
            color="error"
            sx={{
              "&:hover": { backgroundColor: theme.palette.error.light + "33" },
            }}
          >
            <RemoveCircleOutline />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={addPain}
        fullWidth
        sx={{
          mb: 2,
          borderRadius: 2,
          color: "#E04582",
          borderColor: "#E04582",
          "&:hover": {
            backgroundColor: "#e68bbe32",
            borderColor: "#b52f7a",
          },
        }}
      >
        Add Pain
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{
          borderRadius: 2,
          backgroundColor: '#e68bbe',
          py: 1.5,
          fontWeight: 600,
          boxShadow: theme.shadows[2],
          "&:hover": { boxShadow: theme.shadows[4] },
        }}
      >
        Save Pain Entry
      </Button>
    </Box>
  );
}

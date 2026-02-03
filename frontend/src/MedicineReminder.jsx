import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";

export default function MedicineReminder() {
  const [medicine, setMedicine] = useState("");

  return (
    <Box mb={3}>
      <TextField
        fullWidth
        label="Medicine Name"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
        sx={{ mb: 1 }}
      />

      <Button variant="contained">
        Save Reminder
      </Button>
    </Box>
  );
}

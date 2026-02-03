import { TextField, Box } from "@mui/material";

export default function VitalInfo({ data, setData }) {
  return (
    <Box mb={3}>
      <TextField
        fullWidth
        label="Blood Group"
        value={data.bloodGroup}
        onChange={(e) =>
          setData({ ...data, bloodGroup: e.target.value })
        }
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Blood Pressure"
        placeholder="120/80"
        value={data.bp}
        onChange={(e) => setData({ ...data, bp: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Heart Rate"
        value={data.heartRate}
        onChange={(e) =>
          setData({ ...data, heartRate: e.target.value })
        }
      />
    </Box>
  );
}

import { TextField, Box } from "@mui/material";

export default function PersonalDetails({ data, setData }) {
  return (
    <Box mb={3}>
      <TextField
        fullWidth
        label="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Age"
        type="number"
        value={data.age}
        onChange={(e) => setData({ ...data, age: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Weight (kg)"
        type="number"
        value={data.weight}
        onChange={(e) => setData({ ...data, weight: e.target.value })}
      />
    </Box>
  );
}

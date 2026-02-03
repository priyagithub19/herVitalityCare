import { Card, CardContent, Typography, Avatar, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const cardStyle = { borderRadius: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" };

export default function HeaderProfile({ onAddReminder }) {
  return (
    <Card sx={{ ...cardStyle, mb: 3 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>P</Avatar>
        <Box flex={1}>
          <Typography variant="h6">Priya Chauhan</Typography>
          <Typography color="text.secondary">Age: 22 | Blood Group: O+</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onAddReminder}>
          Add Reminder
        </Button>
      </CardContent>
    </Card>
  );
}

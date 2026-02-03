import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  Chip,
  Drawer,
  TextField,
  MenuItem,
  Modal,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import AlarmIcon from "@mui/icons-material/Alarm";
import TimelineIcon from "@mui/icons-material/Timeline";
import { LineChart } from "@mui/x-charts/LineChart";
import DashNav from "./DashNav";

/* ---------- COMMON CARD STYLE ---------- */
const cardStyle = {
  borderRadius: 4,
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
  },
};

/* ---------- VITAL CHECK LOGIC ---------- */

function checkHeartRate(hr) {
  if (!hr) return "—";
  if (hr < 60) return "Low";
  if (hr <= 100) return "Normal";
  return "High";
}

function checkBP(sys, dia) {
  if (!sys || !dia) return "—";

  if (sys < 90 || dia < 60) return "Low";
  if (sys <= 120 && dia <= 80) return "Normal";
  if (sys <= 139 || dia <= 89) return "Elevated";
  return "High";
}


/* ---------- MAIN COMPONENT ---------- */
export default function DigitalHealthRecord() {
  const [tab, setTab] = useState(0);

  const [openReminder, setOpenReminder] = useState(false);
  const [openTimelineModal, setOpenTimelineModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [reminders, setReminders] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [disease, setDisease] = useState("");

  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bpSys, setBpSys] = useState("");
  const [bpDia, setBpDia] = useState("");

  const hrStatus = checkHeartRate(heartRate);
  const bpStatus = checkBP(bpSys, bpDia);

  const bmi =
    weight && height ? (weight / (height / 100) ** 2).toFixed(1) : "--";
  const water = weight ? (weight * 0.033).toFixed(1) : "--";

  const suggestion = getSuggestion(disease);

  return (
    <Box sx={{ display: "flex", height: "100%", backgroundColor: "rgba(245,181,212,0.3)" }}>
      <DashNav />

      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          p: { xs: 2, md: 4 },
          background: "linear-gradient(180deg,#F6F9FC,#EEF3F9)",
        }}
      >
        <HeaderProfile onAddReminder={() => setOpenReminder(true)} />

        <SummaryCards bmi={bmi} water={water} disease={disease} />

        <HealthInputs
          weight={weight}
          height={height}
          disease={disease}
          setWeight={setWeight}
          setHeight={setHeight}
          setDisease={setDisease}
        />

        {disease && <SmartSuggestions suggestion={suggestion} />}

        <ReminderSection
          reminders={reminders}
          onAddReminder={() => setOpenReminder(true)}
        />

        <HealthTimeline onOpen={() => setOpenTimelineModal(true)} />

        <Card sx={{ ...cardStyle, mt: 3 }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="scrollable">
            {/* <Tab label="Vitals" /> */}
            <Tab label="Cycle" />
            <Tab label="Lab Reports" />
            <Tab label="Mental Health" />
          </Tabs>
          <Divider />
          <CardContent>
            {tab === 0 && <CycleTab />}
            {tab === 1 && <LabTab />}
            {tab === 2 && <MentalTab />}
          </CardContent>
        </Card>

        <RecordDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />

        <AddReminderModal
          open={openReminder}
          onClose={() => setOpenReminder(false)}
          onSave={(data) => setReminders([...reminders, data])}
        />

        <TimelineModal
          open={openTimelineModal}
          onClose={() => setOpenTimelineModal(false)}
          timeline={timeline}
          onSave={(data) => setTimeline([...timeline, data])}
        />
      </Box>
    </Box>
  );
}

/* ---------- ADD REMINDER MODAL ---------- */
function AddReminderModal({ open, onClose, onSave }) {
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [disease, setDisease] = useState("");

  const handleSave = () => {
    if (!medicine || !time) return;

    onSave({
      medicine,
      time,
      disease,
    });

    // reset
    setMedicine("");
    setTime("");
    setDisease("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "#fff",
          p: 3,
          borderRadius: 3,
          width: 380,
          mx: "auto",
          mt: 6,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6">Add Medicine Reminder</Typography>

        <TextField
          label="Medicine Name"
          fullWidth
          sx={{ mt: 2 }}
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
        />

        <TextField
          type="time"
          label="Time"
          fullWidth
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <TextField
          label="Related Disease (optional)"
          fullWidth
          sx={{ mt: 2 }}
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          startIcon={<AlarmIcon />}
          onClick={handleSave}
        >
          Set Reminder
        </Button>
      </Box>
    </Modal>
  );
}


/* ---------- HEADER ---------- */
function HeaderProfile({ onAddReminder }) {
  return (
    <Card sx={{ ...cardStyle, mb: 3 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
          P
        </Avatar>
        <Box flex={1}>
          <Typography variant="h6">Priya Chauhan</Typography>
          <Typography color="text.secondary">
            Age: 22 | Blood Group: O+
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddReminder}
        >
          Add Reminder
        </Button>
      </CardContent>
    </Card>
  );
}

/* ---------- SUMMARY ---------- */
function SummaryCards({ bmi, water, disease }) {
  return (
    <Grid container spacing={2}>
      <Summary title="BMI" value={bmi} />
      <Summary title="Water / day" value={`${water} L`} />
      <Summary title="Condition" value={disease || "None"} />
    </Grid>
  );
}

function Summary({ title, value }) {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={cardStyle}>
        <CardContent>
          <Typography color="text.secondary">{title}</Typography>
          <Typography variant="h6">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

/* ---------- INPUTS ---------- */
function HealthInputs({
  weight,
  height,
  disease,
  setWeight,
  setHeight,
  setDisease,
}) {
  return (
    <Card sx={{ ...cardStyle, mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Health Inputs</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Weight (kg)"
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Height (cm)"
              fullWidth
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Disease / Condition"
              fullWidth
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Diabetes">Diabetes</MenuItem>
              <MenuItem value="Pregnancy">Pregnancy</MenuItem>
              <MenuItem value="PCOS">PCOS</MenuItem>
              <MenuItem value="Hypertension">Hypertension</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

/* ---------- SMART SUGGESTIONS ---------- */
function SmartSuggestions({ suggestion }) {
  return (
    <Card sx={{ ...cardStyle, mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Smart Care Suggestions</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography>🥗 Diet: {suggestion.diet}</Typography>
        <Typography>💧 Water: {suggestion.water}</Typography>
        <Typography>🧠 Care: {suggestion.care}</Typography>
      </CardContent>
    </Card>
  );
}

/* ---------- REMINDERS ---------- */
function ReminderSection({ reminders, onAddReminder }) {
  return (
    <Card sx={{ ...cardStyle, mt: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Medicine Reminders</Typography>
          <IconButton color="primary" onClick={onAddReminder}>
            <AlarmIcon />
          </IconButton>
        </Box>

        {reminders.length === 0 && (
          <Typography color="text.secondary" mt={1}>
            No reminders added
          </Typography>
        )}

        {reminders.map((r, i) => (
          <Box key={i} mt={2} display="flex" gap={1} flexWrap="wrap">
            <Chip label={r.medicine} color="primary" />
            <Chip label={r.time} />
            <Chip label={r.disease} color="warning" />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

/* ---------- HEALTH TIMELINE ---------- */
function HealthTimeline({ onOpen }) {
  return (
    <Card sx={{ ...cardStyle, mt: 3 }}>
      <CardContent
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h6">Health Timeline</Typography>
        <IconButton color="primary" onClick={onOpen}>
          <TimelineIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

/* ---------- TIMELINE MODAL ---------- */
function TimelineModal({ open, onClose, onSave, timeline }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "#fff",
          p: 3,
          borderRadius: 3,
          width: 420,
          mx: "auto",
          mt: 5,
        }}
      >
        <Typography variant="h6">Add Health Report</Typography>

        <TextField
          label="Title"
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          type="date"
          fullWidth
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          type="time"
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextField
          label="Notes"
          fullWidth
          multiline
          rows={2}
          sx={{ mt: 2 }}
          onChange={(e) => setNote(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => {
            onSave({ title, date, time, note });
            onClose();
          }}
        >
          Save
        </Button>

        <Divider sx={{ my: 2 }} />

        {timeline.map((t, i) => (
          <Card key={i} sx={{ mt: 1, p: 1.5 }}>
            <Typography fontWeight={600}>{t.title}</Typography>
            <Typography variant="body2">
              📅 {t.date} ⏰ {t.time}
            </Typography>
            {t.note && <Typography variant="body2">📝 {t.note}</Typography>}
          </Card>
        ))}
      </Box>
    </Modal>
  );
}

/* ---------- TABS ---------- */
function VitalsTab() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5] }]}
      series={[{ data: [120, 118, 125, 122, 119] }]}
      height={250}
    />
  );
}
function CycleTab() {
  return <Typography>Cycle: 28 days | Flow: Moderate</Typography>;
}
function LabTab() {
  return <Typography>Hemoglobin: 10.2 g/dL</Typography>;
}
function MentalTab() {
  return <Typography>Mood: Anxious | Stress: Medium</Typography>;
}

/* ---------- DRAWER ---------- */
function RecordDrawer({ open, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 3 }}>
        <Typography variant="h6">Doctor Notes</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography>Iron supplements advised.</Typography>
      </Box>
    </Drawer>
  );
}

/* ---------- LOGIC ---------- */
function getSuggestion(disease) {
  switch (disease) {
    case "Diabetes":
      return {
        diet: "Low sugar, high fiber foods",
        water: "3+ liters/day",
        care: "Daily walking & glucose monitoring",
      };
    case "Pregnancy":
      return {
        diet: "Iron & calcium rich food",
        water: "3–3.5 liters/day",
        care: "Rest & regular checkups",
      };
    case "PCOS":
      return {
        diet: "Low carb, high protein",
        water: "2.5–3 liters/day",
        care: "Exercise & stress control",
      };
    case "Hypertension":
      return {
        diet: "Low salt diet",
        water: "2.5 liters/day",
        care: "BP monitoring & yoga",
      };
    default:
      return {};
  }
}

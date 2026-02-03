import React from "react";
import { Card, CardContent, Typography, Box, Chip, Divider } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";

export default function MonthlySummaryCard({ summary }) {
  return (
    <Card sx={{ borderRadius: 4, p: 1 }}>
      <CardContent>
        {/* HEADER */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          📊 {summary.month} Summary
        </Typography>

        {/* CYCLE OVERVIEW */}
        <Section title="🩸 Cycle Overview">
          <Typography>Length: <b>{summary.cycle.length} days</b></Typography>
          <Typography>{summary.cycle.start} → {summary.cycle.end}</Typography>
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* FLOW SUMMARY */}
        <Section title="💧 Flow Distribution">
          <PieChart
            height={180}
            series={[{
              data: Object.entries(summary.flow).map(([k, v], i) => ({ id: i, label: k, value: v })),
              innerRadius: 40
            }]}
          />
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* MOOD SUMMARY */}
        <Section title="🙂 Mood Summary">
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {Object.entries(summary.moods).map(([mood, count]) => (
              <Chip key={mood} label={`${mood} • ${count}d`} />
            ))}
          </Box>
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* PAIN SUMMARY */}
        <Section title="🔥 Pain Trend">
          <Typography sx={{ mb: 1 }}>
            Pain days: <b>{summary.painStats.painDays}</b> • Avg severity: <b>{summary.painStats.avgSeverity}</b>
          </Typography>
          <LineChart
            height={180}
            series={[{ data: summary.painTrend, label: "Pain Level" }]}
            xAxis={[{ data: summary.painTrend.map((_, i) => `Day ${i + 1}`), scaleType: "point" }]}
          />
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* HEALTH INDICATORS */}
        <Section title="🤒 Health Indicators">
          {Object.keys(summary.healthIndicators).length === 0 ? (
            <Typography>No indicators logged</Typography>
          ) : (
            Object.entries(summary.healthIndicators).map(([symptom, count]) => (
              <Typography key={symptom}>{symptom} – {count} days</Typography>
            ))
          )}
          <Typography variant="caption" sx={{ mt: 1, display: "block", opacity: 0.7 }}>
            This information is for tracking only and is not a medical diagnosis.
          </Typography>
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* SMART INSIGHTS */}
        <Section title="✨ Insights">
          <Typography>• Pain levels were higher on heavy-flow days.</Typography>
          <Typography>• Mood fluctuations appeared mid-cycle.</Typography>
          <Typography>• Cycle length stayed consistent.</Typography>
        </Section>
      </CardContent>
    </Card>
  );
}

function Section({ title, children }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

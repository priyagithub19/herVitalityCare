import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography, Card, CardContent } from "@mui/material";
import Navbar from "./Navbar";
import { PlusCircle } from "lucide-react";

export default function Topics() {
  const { categoryId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/topics/${categoryId}`)
      .then((r) => r.json())
      .then((data) => {
        setTopics(data.topics || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryId]);

  return (
    <Box sx={{ background: "rgba(246,218,226,0.8)", minHeight: "100vh", py: 4 }}>
      <Navbar />
      <Box sx={{ width: "90%", mx: "auto", textAlign: "center" }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Topics
        </Typography>
        {loading ? <Typography>Loading...</Typography> : null}

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {topics.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <Card sx={{ p: 2, borderRadius: "1rem" }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 700 }}>{t.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "center", flexWrap: "wrap" }}>
                    <Button
                      onClick={() => navigate(`/topic/${t.id}`)}
                      sx={{ borderRadius: "1rem" }}
                      startIcon={<PlusCircle />}
                    >
                      {t.cta || "View Details"}
                    </Button>

                    {/* open official resource in new tab */}
                    <Button
                      component="a"
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderRadius: "1rem" }}
                    >
                      Open Guide
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

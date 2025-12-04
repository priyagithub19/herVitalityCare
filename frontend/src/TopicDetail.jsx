import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "./Navbar";

export default function TopicDetail() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/topic/${topicId}`)
      .then((r) => r.json())
      .then((data) => {
        setTopic(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [topicId]);

  if (loading) return <Typography sx={{ mt: 4 }}>Loading...</Typography>;
  if (!topic) return <Typography sx={{ mt: 4 }}>Topic not found.</Typography>;

  return (
    <Box sx={{ background: "rgba(246,218,226,0.8)", minHeight: "100vh", py: 4 }}>
      <Navbar />
      <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>{topic.title}</Typography>
        <Typography variant="subtitle2" sx={{ mt: 1, color: "text.secondary" }}>
          {topic.categories?.map(c => c.Name).join(", ")}
        </Typography>

        {/* If accessibleVersion is provided, we render link */}
        <Box sx={{ mt: 3 }}>
          {topic.image && <img src={topic.image} alt={topic.title} style={{ maxWidth: "100%", borderRadius: 12 }} />}
        </Box>

        <Box sx={{ mt: 3 }}>
          {/* If accessibleVersion is an external page, show link */}
          {topic.link && (
            <Button href={topic.link} target="_blank" rel="noopener noreferrer" sx={{ mr: 2 }}>
              Open Official Guide
            </Button>
          )}

          {/* Primary CTA - topic.cta */}
          <Button variant="contained" sx={{ backgroundColor: "rgba(158,41,74,0.9)" }}>
            {topic.cta || "Learn More"}
          </Button>
        </Box>

        {/* If API returned full HTML or accessibleVersion, show a short excerpt (safe render) */}
        <Box sx={{ mt: 3 }}>
          {topic.accessibleVersion ? (
            <Typography variant="body2">
              <a href={topic.accessibleVersion} target="_blank" rel="noopener noreferrer">Open accessible version / full content</a>
            </Typography>
          ) : (
            <Typography sx={{ mt: 2 }}>{topic.raw?.Summary || ""}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

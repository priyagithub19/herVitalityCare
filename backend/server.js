import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_URL =
  "https://odphp.health.gov/myhealthfinder/api/v4/topicsearch.json?CategoryId=527&Lang=en";

app.get("/api/", async (req, res) => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const resources = data?.Result?.Resources?.Resource || [];

    // MAP CLEAN FRONTEND-FRIENDLY RESULT
    const mapped = resources.map(item => ({
      id: item.Id,
      title: item.Title,
      category: item.Categories,
      image: item.ImageUrl,
      imageAlt: item.ImageAlt,
      url: item.AccessibleVersion,
      lastUpdate: item.LastUpdate,
    }));

    res.json({
      total: data?.Result?.Total || mapped.length,
      items: mapped,
    });
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

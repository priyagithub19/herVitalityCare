// import express from "express";
// import cors from "cors";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MyHealthFinder API base
// const BASE_URL = "https://odphp.health.gov/myhealthfinder/api/v4/topicsearch.json";

// // Example mapping of category IDs
// const categories = {
//   15: "Cancer",
//   16: "Diabetes",
//   18: "Heart Health",
//   19: "HIV and Other STIs",
//   20: "Mental Health and Relationships",
//   21: "Nutrition",
//   23: "Obesity",
//   24: "Physical Activity",
//   25: "Regular Checkups",
//   26: "Safety",
//   27: "Screening Tests",
//   28: "Sexual Health",
//   29: "Vaccines (Shots)",
//   56: "Nuteition and Physical Activity",
//   91: "Breast and Ovarian Cancer",
//   92: "Cervical Cancer",
//   93: "Skin Cancer",
//   94: "Prostate Cancer",
//   95: "Lung Cancer",
//   96: "Colorectal Cancer",
//   110: "Healthy Relationshps",
//   126: "Healthy Living",
// };

// // Endpoint to get topics by category ID
// app.get("/topics/:categoryId", async (req, res) => {
//   const { categoryId } = req.params;

//   if (!categories[categoryId]) {
//     return res.status(400).json({ error: "Invalid category ID" });
//   }

//   try {
//     const response = await axios.get(`${BASE_URL}?categoryId=${categoryId}`);
//     // API returns JSON with topics
//     const topics = response.data.Result.Resources || []; 
//     res.json({ category: categories[categoryId], topics });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Failed to fetch topics" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const cache = new NodeCache({ stdTTL: 60 * 60 }); // cache for 1 hour

const BASE_URL = "https://odphp.health.gov/myhealthfinder/api/v4/topicsearch.json";

// Your category mapping (keeps existing)
const categories = {
  15: "Cancer",
  16: "Diabetes",
  18: "Heart Health",
  19: "HIV and Other STIs",
  20: "Mental Health and Relationships",
  21: "Nutrition",
  23: "Obesity",
  24: "Physical Activity",
  25: "Regular Checkups",
  26: "Safety",
  27: "Screening Tests",
  28: "Sexual Health",
  29: "Vaccines (Shots)",
  56: "Nutrition and Physical Activity",
  91: "Breast and Ovarian Cancer",
  92: "Cervical Cancer",
  93: "Skin Cancer",
  94: "Prostate Cancer",
  95: "Lung Cancer",
  96: "Colorectal Cancer",
  110: "Healthy Relationships",
  126: "Healthy Living",
};

// A small CTA generator tailored to topic title
function generateCTA(title = "") {
  const lower = title.toLowerCase();
  if (lower.includes("testing") || lower.includes("test")) return "Get Tested";
  if (lower.includes("questions") || lower.includes("question")) return "Prepare Questions";
  if (lower.includes("conversation") || lower.includes("conversation starters")) return "View Guide";
  if (lower.includes("active") || lower.includes("stay active")) return "See Tips";
  if (lower.includes("quit") || lower.includes("smoking")) return "Start Quitting";
  if (lower.includes("anxiety") || lower.includes("mental")) return "Learn More";
  if (lower.includes("prevent") || lower.includes("preventing")) return "Prevention Tips";
  if (lower.includes("find and access")) return "Find Services";
  if (lower.includes("drug") || lower.includes("substance")) return "Get Help";
  return "Learn More";
}

function mapApiItem(item) {
  return {
    id: item.Id || item.TopicId || item.Topic1Id || null,
    title: item.Title || item.Heading || "Untitled",
    link: item.Url || item.AccessibleVersion || item.WebUrl || null,
    image: item.ImageUrl || item.Image || null,
    categories: item.Categories || [],
    cta: generateCTA(item.Title || ""),
  };
}

// GET /api/categories -> list available categories
app.get("/api/categories", (req, res) => {
  const arr = Object.entries(categories).map(([id, name]) => ({ id, name }));
  res.json(arr);
});

// GET /api/topics/:categoryId -> list topics for a category (mapped)
app.get("/api/topics/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  if (!categories[categoryId]) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  const cacheKey = `category_${categoryId}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json({ category: categories[categoryId], topics: cached });

  try {
    const response = await axios.get(`${BASE_URL}?categoryId=${categoryId}`);
    // API returns Result.Resources.all (array)
    const raw = response.data?.Result?.Resources?.all || [];
    const topics = raw.map(mapApiItem);
    cache.set(cacheKey, topics);
    res.json({ category: categories[categoryId], topics });
  } catch (error) {
    console.error("ERROR /api/topics:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

// GET /api/topic/:topicId -> fetch details for a single topic (mapped)
app.get("/api/topic/:topicId", async (req, res) => {
  const { topicId } = req.params;

  const cacheKey = `topic_${topicId}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    // Use the same endpoint but with topicId parameter (API supports topicId)
    const response = await axios.get(`${BASE_URL}?topicId=${topicId}`);
    // The response may include Result.Resources.all or Result.Resources (single)
    const rawArray = response.data?.Result?.Resources?.all || response.data?.Result?.Resources || [];
    // sometimes it's object, so pick first item if array-like
    const item = Array.isArray(rawArray) ? rawArray[0] : rawArray;
    if (!item) return res.status(404).json({ error: "Topic not found" });

    const mapped = {
      ...mapApiItem(item),
      // include full content if available (AccessibleVersion or Content fields)
      accessibleVersion: item.AccessibleVersion || item.Html || null,
      content: item.Content || null,
      raw: item,
    };

    cache.set(cacheKey, mapped);
    res.json(mapped);
  } catch (error) {
    console.error("ERROR /api/topic:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch topic details" });
  }
});

// Optional: /api/all (all categories combined) — useful for Explore grid
app.get("/api/all", async (req, res) => {
  const cacheKey = "all_topics_combined";
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const ids = Object.keys(categories);
    // fetch in parallel
    const calls = ids.map((id) => axios.get(`${BASE_URL}?categoryId=${id}`).catch(() => null));
    const responses = await Promise.all(calls);
    const all = [];
    responses.forEach((r, idx) => {
      if (!r || !r.data) return;
      const raw = r.data?.Result?.Resources?.all || [];
      raw.forEach((it) => {
        const mapped = mapApiItem(it);
        mapped.category = categories[ids[idx]];
        all.push(mapped);
      });
    });
    cache.set(cacheKey, all);
    res.json(all);
  } catch (error) {
    console.error("ERROR /api/all:", error?.message || error);
    res.status(500).json({ error: "Failed to fetch all topics" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

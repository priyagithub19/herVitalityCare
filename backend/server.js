import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import UserReg from "./model/userReg.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/herVitalityCare');

app.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    UserReg.findOne({email: email})
    .then(user => {
      if(user){
        if(user.password === password){
          res.status(200).json({message: "Login Successful", user});
        }
        else{
          res.status(401).json({message: "Password didn't match"});
        }
      } else {
        res.status(404).json({message: "User not found"});
      }
    })
.catch(error => {
  console.error("Login error:", error.response?.data || error);
  alert(error.response?.data?.message || "Login failed");
});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }});



app.post("/register", async (req, res) => {
  try {
    const data = await UserReg.create(req.body);

    res.status(201).json({
      message: "User registered successfully",
      data,
    });

  } catch (error) {
    res.status(400).json({
      message: "Registration failed",
      error: error.message
    });
  }
});




const API_BASE = "https://odphp.health.gov/myhealthfinder/api/v4/topicsearch.json";

function validateCategory(id) {
  switch (id) {
    case "15":
    case "16":
    case "18":
    case "19":
    case "20":
    case "21":
    case "23":
    case "24":
    case "25":
    case "26":
    case "27":
    case "28":
    case "29":
    case "56":
    case "91":
    case "92":
    case "93":
    case "94":
    case "95":
    case "96":
    case "110":
    case "126":
      return id; 
    default:
      return null; 
  }
}
function validateTopic(id) {
switch (id) {
  case "25":
  case "327":
  case "329":
  case "350":
  case "510":
  case "512":
  case "514":
  case "527":
  case "528":
  case "529":
  case "530":
  case "531":
  case "532":
  case "533":
  case "534":
  case "536":
  case "537":
  case "538":
  case "539":
  case "540":
  case "541":
  case "542":
  case "543":
  case "544":
  case "546":
  case "547":
  case "549":
  case "551":
  case "552":
  case "553":
  case "30530":
  case "30531":
  case "30532":
  case "30533":
  case "30534":
  case "30535":
  case "30536":
  case "30537":
  case "30538":
  case "30539":
  case "30540":
  case "30541":
  case "30542":
  case "30543":
  case "30544":
  case "30545":
  case "30546":
  case "30547":
  case "30548":
  case "30549":
  case "30550":
  case "30551":
  case "30558":
  case "30559":
  case "30560":
  case "30561":
  case "30562":
  case "30564":
  case "30565":
  case "30566":
  case "30567":
  case "30574":
  case "30575":
  case "30582":
  case "30583":
  case "30584":
  case "30586":
  case "30588":
  case "30589":
  case "30590":
  case "30591":
  case "30592":
  case "30593":
  case "30594":
  case "30595":
  case "30596":
  case "30597":
  case "30598":
  case "30599":
  case "30600":
  case "30601":
  case "30604":
  case "30605":
  case "30606":
  case "30607":
  case "30608":
  case "30609":
  case "30610":
  case "30612":
  case "30613":
  case "30614":
  case "30615":
  case "30616":
  case "30617":
  case "30618":
  case "30759":
  case "30760":
  case "33303":
  case "33304":
  case "34321":
  case "34691":
  case "34692":
  case "34799":
    return id;

  default:
    return null;
}
}
app.get("/topicsearch", async (req, res) => {
  try {
    const { categoryId, topicId } = req.query;

    let apiUrl = "";
    let validId = null;

    if (categoryId) {
      validId = validateCategory(categoryId);
      if (!validId) {
        return res.status(400).json({ error: "Invalid or missing categoryId" });
      }

      apiUrl = `${API_BASE}?CategoryId=${validId}&Lang=en`;
      console.log("➡ CATEGORY URL:", apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data?.Result?.Resources) {
        return res.status(404).json({ error: "No resources found" });
      }

      const resources = data.Result.Resources.Resource || [];

      const mapped = resources.map((item) => ({
        id: item.Id,
        title: item.Title,
        category: item.Categories,
        image: item.ImageUrl,
        imageAlt: item.ImageAlt,
        url: item.AccessibleVersion,
        lastUpdate: item.LastUpdate,
      }));

      return res.json({
        type: "category",
        total: data.Result.Total || mapped.length,
        items: mapped,
      });
    }
    if (topicId) {
      validId = validateTopic(topicId);
      if (!validId) {
        return res.status(400).json({ error: "Invalid or missing topicId" });
      }

      apiUrl = `${API_BASE}?TopicId=${validId}&Lang=en`;
      console.log("➡ TOPIC URL:", apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data?.Result?.Resources) {
        return res.status(404).json({ error: "No topic data found" });
      }


const resources = data.Result.Resources.Resource || [];

const mapped = resources.map((item) => {
    const sectionsSource = item.Sections?.section;
    
    let sectionsArray;

    if (!sectionsSource) {
        sectionsArray = [];
    } else if (Array.isArray(sectionsSource)) {
        sectionsArray = sectionsSource;
    } else {
        sectionsArray = [sectionsSource];
    }
    
    const sections = sectionsArray.map(sec => ({
      title: sec.Title,
      content: sec.Content, 
    }));
    
    return {
      id: item.Id,
      title: item.Title,
      description: item.Description,
      categories: item.Categories?.Category,
      image: item.ImageUrl,
      imageAlt: item.ImageAlt,
      url: item.AccessibleVersion,
      sections: sections, 
      lastUpdate: item.LastUpdate,
    };
});

return res.json({
    type: "topic",
    total: data.Result.Total || mapped.length,
    items: mapped,
});

    }

    return res.status(400).json({
      error: "categoryId or topicId MUST be provided",
    });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Server error fetching data" });
  }
});

const podcastApi =
  "https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=podcast%20for%20women%27s%20health&type=video&key=AIzaSyBpHvfrhRa8caZF99PYpSfWTjz--4TiEFs";

app.get("/podcast", async (req, res) => {
  try {
    const apiRes = await fetch(podcastApi);
    console.log("➡ PODCAST URL:", podcastApi);
    const data = await apiRes.json();

    if (!data?.items) {
      return res.status(404).json({ error: "No data found" });
    }

    const mapped = data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.high?.url,
      channel: item.snippet.channelTitle,
      publishedAt: item.snippet.publishTime,
      url : `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    return res.json({
      total: mapped.length,
      items: mapped,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));

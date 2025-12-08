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

app.get("/topicsearch", async (req, res) => {
  try {
    const { categoryId } = req.query;

    const validId = validateCategory(categoryId);
    if (!validId) {
      return res.status(400).json({ error: "Invalid or missing categoryId" });
    }

    const url = `${API_BASE}?CategoryId=${validId}&Lang=en`;

    console.log("➡ Fetching URL:", url);

    const response = await fetch(url);
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
      total: data.Result.Total || mapped.length,
      items: mapped,
    });

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Server error fetching MyHealthFinder API" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

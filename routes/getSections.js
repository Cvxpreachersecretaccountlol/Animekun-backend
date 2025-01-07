import express from "express";
import fs from "fs/promises"; // For handling file operations


const GetSections = express.Router();


GetSections.get("/sections", async (req, res) => {
  try {
    // Read the data from "sections.json"
    const data = await fs.readFile("sections.json", "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error("Error reading sections.json:", err);
    res.status(500).json({ error: "Failed to read sections data" });
  }
});

export default GetSections;
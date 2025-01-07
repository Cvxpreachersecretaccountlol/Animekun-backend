import express from "express";
import fs from "fs/promises";
import path from "path";

const GetSections = express.Router();

GetSections.get("/sections", async (req, res) => {
  try {
    const filePath = path.resolve("sections.json");
    const data = await fs.readFile(filePath, "utf8");
    try {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    } catch (parseError) {
      console.error("Error parsing sections.json:", parseError);
      res.status(500).json({ error: "Failed to parse sections data" });
    }
  } catch (err) {
    console.error("Error reading sections.json:", err);
    if (err.code === "ENOENT") {
      res.status(404).json({ error: "sections.json file not found" });
    } else {
      res.status(500).json({ error: "Failed to read sections data" });
    }
  }
});

export default GetSections;
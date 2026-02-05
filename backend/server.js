const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
require('dotenv').config();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve static files from datasets folder
app.use('/files', express.static(path.join(__dirname, 'datasets')));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "VidyutAI Backend API Server",
    status: "Running",
    endpoints: {
      datasets: "GET /datasets - Get all dataset metadata",
      download: "GET /download/:filename - Download dataset file"
    }
  });
});

app.get("/datasets", (req, res) => {
  const sql = `
    SELECT dataset_name, dataset_description, dataset_source, dataset_url
    FROM datasets
    ORDER BY added_at DESC
  `;

  db.query(sql, (err, result) => {
    // Define fallback data (The actual datasets you want to show)
    const fallbackData = [
      {
        dataset_name: "LG 18650HG2 Li-ion Battery Data",
        dataset_description: "High-precision lithium-ion battery testing data from McMaster University. Includes charge-discharge cycles, voltage-current measurements, and thermal data.",
        dataset_source: "Kollmeyer et al. (2020), Mendeley Data",
        dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQCbLn73osAxTa6EEObs0vZZAZEyqG5wS7hWUHYot4FTBFs?e=AvoJbM"
      },
      {
        dataset_name: "Mechanically Induced Thermal Runaway",
        dataset_description: "Comprehensive safety testing data examining thermal runaway behavior in Li-ion batteries across various applications.",
        dataset_source: "Lin et al. (2024), Mendeley Data",
        dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQDYgt8MArzSSY2rACKpK9iiAdHRgEu1NSN0AthSKGtm5Po?e=63d8Gk"
      },
      {
          dataset_name: "Mechanically Induced Thermal Runaway (V1)",
          dataset_description: "Initial version of comprehensive safety testing data examining thermal runaway behavior in Li-ion batteries.",
          dataset_source: "Lin et al. (2023), Mendeley Data",
          dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQCuwiOmg5aeSrNIe8QtB0AtAdFcaNu5WgH99RuorGLMm8Y?e=1ATFId"
      },
      {
          dataset_name: "CALCE Battery Data",
          dataset_description: "Battery testing datasets and related resources from the CALCE (Center for Advanced Life Cycle Engineering) Battery Data repository.",
          dataset_source: "CALCE, University of Maryland",
          dataset_url: "https://calce.umd.edu/battery-data"
      }
    ];

    if (err) {
      console.log("⚠️ Database error, serving fallback data:", err.message);
      res.json(fallbackData);
    } else if (result.length === 0) {
      console.log("⚠️ Database empty, serving fallback data");
      res.json(fallbackData);
    } else {
      console.log("✅ Serving data from database");
      res.json(result);
    }
  });
});

// Download endpoint for local files
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'datasets', filename);
  
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).json({ error: "File not found" });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

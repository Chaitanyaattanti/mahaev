const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
require('dotenv').config();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve static files from datasets folder
app.use('/files', express.static(path.join(__dirname, 'datasets')));

// Hardcoded datasets
const datasets = [
  {
    dataset_name: "LG 18650HG2 Li-ion Battery Data",
    dataset_description: "Comprehensive lithium-ion battery testing dataset from McMaster University featuring the LG HG2 3Ah cell tested under controlled thermal conditions. The dataset includes detailed charge-discharge cycles at various C-rates, high-precision voltage-current measurements with 0.1% accuracy, thermal behavior analysis, and complete data acquisition scripts. Ideal for battery management system (BMS) development, state-of-charge (SOC) estimation using deep neural networks, capacity fade analysis, and electric vehicle battery research.",
    dataset_source: "Kollmeyer et al. (2020), Mendeley Data",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQCbLn73osAxTa6EEObs0vZZAZEyqG5wS7hWUHYot4FTBFs?e=AvoJbM"
  },
  {
    dataset_name: "Mechanically Induced Thermal Runaway",
    dataset_description: "Extensive safety testing dataset examining thermal runaway behavior in lithium-ion batteries across diverse applications including mobile phones, electric vehicles, and energy storage systems. Features standardized single-side indentation test protocols with high-resolution time-series measurements of cell voltage, compressive load, indenter stroke displacement, and multi-point temperature readings. Includes 100+ battery test records with quantitative thermal runaway severity scores (0-100 scale), complete cell specifications (dimensions, mass, chemistry, SOC, rated capacity), failure mode analysis, and comprehensive calculation schemes for battery safety assessment and risk prediction modeling.",
    dataset_source: "Lin et al. (2024), Mendeley Data",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQDYgt8MArzSSY2rACKpK9iiAdHRgEu1NSN0AthSKGtm5Po?e=63d8Gk"
  },
  {
    dataset_name: "Mechanically Induced Thermal Runaway (V1)",
    dataset_description: "Initial release of comprehensive safety testing data for thermal runaway characterization in lithium-ion batteries. This foundational dataset covers mechanical abuse testing across various battery formats and applications. Includes detailed experimental protocols, standardized indentation methodology, time-resolved measurements of electrical and thermal parameters, severity scoring framework, and complete metadata for battery cells tested. Particularly valuable for comparing evolution of battery safety characteristics and establishing baseline safety metrics for newer battery technologies.",
    dataset_source: "Lin et al. (2023), Mendeley Data",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQCuwiOmg5aeSrNIe8QtB0AtAdFcaNu5WgH99RuorGLMm8Y?e=1ATFId"
  },
  {
    dataset_name: "CALCE Battery Data",
    dataset_description: "Extensive collection of battery testing datasets and research resources from the Center for Advanced Life Cycle Engineering (CALCE) at the University of Maryland. Includes aging studies, capacity fade analysis, impedance spectroscopy data, accelerated life testing results, thermal characterization, and battery prognostics research. Features multiple battery chemistries (Li-ion, LFP, NMC, etc.), various stress conditions, long-term cycling data, and comprehensive documentation. Essential resource for battery lifetime prediction, health monitoring algorithm development, and reliability engineering research.",
    dataset_source: "CALCE, University of Maryland",
    dataset_url: "https://calce.umd.edu/battery-data"
  }
];

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
  console.log("✅ Serving hardcoded datasets");
  res.json(datasets);
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

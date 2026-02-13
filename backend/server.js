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
  },
  {
    dataset_name: "SOC Estimation Using OCV Methods - INR 18650-20R",
    dataset_description: "Comprehensive study comparing Low-Current OCV and Incremental-Current OCV methods for State-of-Charge estimation in Battery Management Systems using cylindrical INR 18650-20R cells (2000 mAh, NMC chemistry). Dataset includes OCV tests at 0°C, 25°C, and 45°C, dynamic drive cycle evaluations (DST, FUDS, US06, BJDST) at multiple SOC levels (80%, 50%), tracking accuracy analysis, convergence time measurements, and robustness assessments under varying temperature and loading conditions. Key finding demonstrates Incremental-OCV provides superior SOC estimation reliability. Essential for BMS algorithm development and validation.",
    dataset_source: "Zheng et al. (2016), Applied Energy; Xing et al. (2014), Applied Energy",
    dataset_url: "https://example.com/dataset-placeholder"
  },
  {
    dataset_name: "Temperature-Dependent SOC Modeling - A123 LiFePO₄",
    dataset_description: "Detailed investigation of ambient temperature effects on State-of-Charge estimation accuracy using A123 LiFePO₄ cells (1100 mAh). Dataset encompasses Low-Current OCV characterization across eight temperature points (-10°C, 0°C, 10°C, 20°C, 25°C, 30°C, 40°C, 50°C) and dynamic profile testing including DST, US06, and FUDS drive cycles at each temperature. Model identified using DST data and validated with FUDS profiles. Critical for developing temperature-compensated SOC estimation algorithms and understanding LiFePO₄ behavior across operational temperature ranges.",
    dataset_source: "Xing et al. (2014), Applied Energy",
    dataset_url: "https://example.com/dataset-placeholder"
  },
  {
    dataset_name: "Cycle-Life Degradation Study - CS2 Prismatic Cells",
    dataset_description: "Extensive degradation analysis dataset from CS2 Prismatic LiCoO₂ cells (1100 mAh) cycled under six distinct discharge behaviors for Remaining Useful Life (RUL) prediction. Includes constant 0.5C cycling (CS2-8, 21, 33, 34), constant 1C cycling (CS2-35-38), variable discharge currents (CS2-3, 9), random cut-off voltage simulation (CS2-7), low-regime partial cycling 3.77-2.7V (CS2-5, 6), and high-regime partial cycling 4.2-3.77V (CS2-24, 25). Each dataset provides detailed cycle logs, voltage-current profiles, capacity fade tracking, and aging progression data. Invaluable for prognostics model development and understanding degradation mechanisms under diverse operating conditions.",
    dataset_source: "He et al. (2011), Journal of Power Sources",
    dataset_url: "https://example.com/dataset-placeholder"
  },
  {
    dataset_name: "Pulsed-Load and Temperature-Stress Aging - CX2 Prismatic Cells",
    dataset_description: "Comprehensive aging study examining effects of pulse loading, high-rate discharge, and temperature cycling on CX2 Prismatic LiCoO₂ cells (1350 mAh). Dataset includes constant 0.5C cycling baseline (CX2-16, 31, 33-38), aggressive 3C high-rate discharge (CX2-8), alternating pulse discharge patterns (CX2-3), temperature cycling stress tests 25-55°C with thermocouple measurements (CX2-4), and multi-rate pulsed load profiles (CX2-32). Provides insights into accelerated degradation mechanisms, thermal stress impacts, and capacity fade under realistic dynamic loading scenarios. Critical for lifetime prediction under demanding operational conditions.",
    dataset_source: "Xing et al. (2013), Microelectronics Reliability",
    dataset_url: "https://example.com/dataset-placeholder"
  },
  {
    dataset_name: "Partial-Charge Cycling Impact - PL Graphite/LiCoO₂ Pouch Cells",
    dataset_description: "Systematic investigation quantifying how partial State-of-Charge cycling accelerates capacity fade in Graphite/LiCoO₂ pouch cells (1500 mAh). Study variables include mean SOC, SOC swing amplitude (ΔSOC), and discharge rate effects. Dataset organized by SOC windows: 0-60% (PL 3, 10), 40-60% (PL 4, 5), 40-60% at 2C (PL 9, 25), full 0-100% (PL 11, 13), 0-100% at 2C (PL 12, 14), 20-80% (PL 17, 18, 21, 23), and 40-100% (PL 19, 24). Capacity re-characterized every 50-100 cycles. Essential for understanding degradation in partial SOC operation and optimizing charging strategies for extended battery life.",
    dataset_source: "Saxena et al. (2016), Journal of Power Sources",
    dataset_url: "https://example.com/dataset-placeholder"
  },
  {
    dataset_name: "Long-Term Calendar Aging Study - Storage Conditions",
    dataset_description: "Extensive calendar aging investigation of 144 lithium-ion cells stored under controlled SOC and temperature conditions. Comprehensive matrix includes three SOC levels (0%, 50%, 100%) and four temperature points (-40°C, -5°C, 25°C, 50°C) with periodic measurements at 3-week, 3-month, and 6-month intervals. Dataset features baseline initialization data, capacity degradation tracking, electrochemical impedance spectroscopy (EIS) characterization, and long-term aging progression analysis. Provides critical insights into calendar life prediction, storage recommendations, and temperature-SOC dependent degradation mechanisms for battery lifetime modeling and management.",
    dataset_source: "CALCE Battery Group, University of Maryland",
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

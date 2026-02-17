const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
require('dotenv').config();

app.use(cors({
  origin: ['https://chaitanyaattanti.github.io', 'http://localhost:5173'],
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
    dataset_source: "Kollmeyer, Philip; Vidal, Carlos; Naguib, Mina; Skells, Michael  (2020), “LG 18650HG2 Li-ion Battery Data and Example Deep Neural Network xEV SOC Estimator Script”, Mendeley Data, V3, doi: 10.17632/cp3473x7xv.3",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQCbLn73osAxTa6EEObs0vZZAZEyqG5wS7hWUHYot4FTBFs?e=AvoJbM"
  },
  {
    dataset_name: "Mechanically Induced Thermal Runaway",
    dataset_description: "Extensive safety testing dataset examining thermal runaway behavior in lithium-ion batteries across diverse applications including mobile phones, electric vehicles, and energy storage systems. Features standardized single-side indentation test protocols with high-resolution time-series measurements of cell voltage, compressive load, indenter stroke displacement, and multi-point temperature readings. Includes 100+ battery test records with quantitative thermal runaway severity scores (0-100 scale), complete cell specifications (dimensions, mass, chemistry, SOC, rated capacity), failure mode analysis, and comprehensive calculation schemes for battery safety assessment and risk prediction modeling.",
    dataset_source: "Lin, Lianshan; Wang, Hsin; Li, Jianlin; Torres-Castro, Loraine; Preger, Yuliya; De Angelis, Valerio (2024), “Mechanically Induced Thermal Runaway for Li-ion Batteries”, Mendeley Data, V2, doi: 10.17632/sn2kv34r4h.2",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQDYgt8MArzSSY2rACKpK9iiAdHRgEu1NSN0AthSKGtm5Po?e=63d8Gk"
  },
  {
    dataset_name: "Mechanically Induced Thermal Runaway (V1)",
    dataset_description: "Initial release of comprehensive safety testing data for thermal runaway characterization in lithium-ion batteries. This foundational dataset covers mechanical abuse testing across various battery formats and applications. Includes detailed experimental protocols, standardized indentation methodology, time-resolved measurements of electrical and thermal parameters, severity scoring framework, and complete metadata for battery cells tested. Particularly valuable for comparing evolution of battery safety characteristics and establishing baseline safety metrics for newer battery technologies.",
    dataset_source: "Lin, Lianshan; Wang, Hsin; Li, Jianlin; Torres-Castro, Loraine; Preger, Yuliya; De Angelis, Valerio (2023), “Mechanically Induced Thermal Runaway for Li-ion Batteries”, Mendeley Data, V1, doi: 10.17632/sn2kv34r4h.1",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQCuwiOmg5aeSrNIe8QtB0AtAdFcaNu5WgH99RuorGLMm8Y?e=1ATFId"
  },

  {
  dataset_name: "SOC Estimation Using OCV Methods",

  dataset_description: "Comprehensive study comparing Low-Current OCV and Incremental-Current OCV methods for State-of-Charge estimation in Battery Management Systems using cylindrical INR 18650-20R cells (2000 mAh, NMC chemistry). Dataset includes OCV tests at 0°C, 25°C, and 45°C, dynamic drive cycle evaluations (DST, FUDS, US06, BJDST) at multiple SOC levels (80%, 50%), tracking accuracy analysis, convergence time measurements, and robustness assessments under varying temperature and loading conditions. Key finding demonstrates Incremental-OCV provides superior SOC estimation reliability. Essential for BMS algorithm development and validation.",

  dataset_source: "[1] F. Zheng, Y. Xing, J. Jiang, B. Sun, J. Kim, and M. Pecht, \"Influence of different open circuit voltage tests on state of charge online estimation for lithium-ion batteries,\" Applied Energy, vol. 183, pp. 513–525, 2016.\n\n[2] Y. Xing, W. He, M. Pecht, and K. L. Tsui, \"State of charge estimation of lithium-ion batteries using the open-circuit voltage at various ambient temperatures,\" Applied Energy, vol. 113, pp. 106–115, 2014.\n\n[3] W. He, N. Williard, C. Chen, and M. Pecht, \"State of charge estimation for Li-ion batteries using neural network modeling and unscented Kalman filter-based error cancellation,\" International Journal of Electrical Power & Energy Systems, vol. 62, pp. 783–791, 2014.",
  dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQC8qjZ0-CRQQ5o4jFRESU9HAfGazQ83npJrDnCgoN12NXo?e=8IVN3P"
},
  {
    dataset_name: "Temperature-Dependent SOC Modeling",
    dataset_description: "Detailed investigation of ambient temperature effects on State-of-Charge estimation accuracy using A123 LiFePO₄ cells (1100 mAh). Dataset encompasses Low-Current OCV characterization across eight temperature points (-10°C, 0°C, 10°C, 20°C, 25°C, 30°C, 40°C, 50°C) and dynamic profile testing including DST, US06, and FUDS drive cycles at each temperature. Model identified using DST data and validated with FUDS profiles. Critical for developing temperature-compensated SOC estimation algorithms and understanding LiFePO₄ behavior across operational temperature ranges.",
    dataset_source: "[1] Y. Xing, W. He, M. Pecht, and K. L. Tsui, \"State of charge estimation of lithium-ion batteries using the open-circuit voltage at various ambient temperatures,\" Applied Energy, vol. 113, pp. 106–115, 2014.",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQCwZ0iGsIziQrfbfvx3SPHyAbTlMqc2SzW2e0cY3D6KXD0?e=p1bsWD"
  },
  {
    dataset_name: "Cycle-Life Degradation Study",
    dataset_description: "Extensive degradation analysis dataset from CS2 Prismatic LiCoO₂ cells (1100 mAh) cycled under six distinct discharge behaviors for Remaining Useful Life (RUL) prediction. Includes constant 0.5C cycling (CS2-8, 21, 33, 34), constant 1C cycling (CS2-35-38), variable discharge currents (CS2-3, 9), random cut-off voltage simulation (CS2-7), low-regime partial cycling 3.77-2.7V (CS2-5, 6), and high-regime partial cycling 4.2-3.77V (CS2-24, 25). Each dataset provides detailed cycle logs, voltage-current profiles, capacity fade tracking, and aging progression data. Invaluable for prognostics model development and understanding degradation mechanisms under diverse operating conditions.",
   dataset_source: "[1] W. He, N. Williard, M. Osterman, and M. Pecht, \"Prognostics of lithium-ion batteries based on Dempster–Shafer theory and the Bayesian Monte Carlo method,\" Journal of Power Sources, vol. 196, no. 23, pp. 10314–10321, 2011.\n\n[2] Y. Xing, E. W. Ma, K. L. Tsui, and M. Pecht, \"An ensemble model for predicting the remaining useful performance of lithium-ion batteries,\" Microelectronics Reliability, vol. 53, no. 6, pp. 811–820, 2013.\n\n[3] N. Williard, W. He, M. Osterman, and M. Pecht, \"Comparative analysis of features for determining state of health in lithium-ion batteries,\" International Journal of Prognostics and Health Management, vol. 4, no. 1, 2013.",

    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQAcfs5_GU3_QY0MNiz9887QARHXNkG3wCrDnKT3DtQjvVE?e=gsjeaJ"
  },
  {
    dataset_name: "Pulsed-Load and Temperature-Stress Aging ",
    dataset_description: "Comprehensive aging study examining effects of pulse loading, high-rate discharge, and temperature cycling on CX2 Prismatic LiCoO₂ cells (1350 mAh). Dataset includes constant 0.5C cycling baseline (CX2-16, 31, 33-38), aggressive 3C high-rate discharge (CX2-8), alternating pulse discharge patterns (CX2-3), temperature cycling stress tests 25-55°C with thermocouple measurements (CX2-4), and multi-rate pulsed load profiles (CX2-32). Provides insights into accelerated degradation mechanisms, thermal stress impacts, and capacity fade under realistic dynamic loading scenarios. Critical for lifetime prediction under demanding operational conditions.",
    dataset_source: "[1] W. He, N. Williard, M. Osterman, and M. Pecht, \"Prognostics of lithium-ion batteries based on Dempster–Shafer theory and the Bayesian Monte Carlo method,\" Journal of Power Sources, vol. 196, no. 23, pp. 10314–10321, 2011.\n\n[2] Y. Xing, E. Ma, K. L. Tsui, and M. Pecht, \"An ensemble model for predicting the remaining useful performance of lithium-ion batteries,\" Microelectronics Reliability, vol. 53, no. 6, pp. 811–820, 2013.",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQDffbpgdSeWTrRiZLNYfP5XAUNU5Ok6L8Zst2W3-IHTmRQ?e=t2qJF6"
  },
  {
    dataset_name: "Partial-Charge Cycling Impact ",
    dataset_description: "Systematic investigation quantifying how partial State-of-Charge cycling accelerates capacity fade in Graphite/LiCoO₂ pouch cells (1500 mAh). Study variables include mean SOC, SOC swing amplitude (ΔSOC), and discharge rate effects. Dataset organized by SOC windows: 0-60% (PL 3, 10), 40-60% (PL 4, 5), 40-60% at 2C (PL 9, 25), full 0-100% (PL 11, 13), 0-100% at 2C (PL 12, 14), 20-80% (PL 17, 18, 21, 23), and 40-100% (PL 19, 24). Capacity re-characterized every 50-100 cycles. Essential for understanding degradation in partial SOC operation and optimizing charging strategies for extended battery life.",
    dataset_source: "[1] S. Saxena, C. Hendricks, and M. Pecht, \"Cycle life testing and modeling of graphite/LiCoO2 cells under different state of charge ranges,\" Journal of Power Sources, vol. 327, pp. 394–400, 2016.",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQC_FrePzl9oQ67WRcOwSQecAcT3bMTJxz2_CeBDrA-bcB0?e=8rMf7L"
  },
  {
    dataset_name: "Long-Term Calendar Aging Study ",
    dataset_description: "Extensive calendar aging investigation of 144 lithium-ion cells stored under controlled SOC and temperature conditions. Comprehensive matrix includes three SOC levels (0%, 50%, 100%) and four temperature points (-40°C, -5°C, 25°C, 50°C) with periodic measurements at 3-week, 3-month, and 6-month intervals. Dataset features baseline initialization data, capacity degradation tracking, electrochemical impedance spectroscopy (EIS) characterization, and long-term aging progression analysis. Provides critical insights into calendar life prediction, storage recommendations, and temperature-SOC dependent degradation mechanisms for battery lifetime modeling and management.",
    dataset_source: "CALCE Battery Group, University of Maryland",
    dataset_url: "https://iitgnacin-my.sharepoint.com/:u:/g/personal/23110052_iitgn_ac_in/IQBDRchgmnchQrwf68zu8DAnAfIzsNT94axvjYwzdFSozm4?e=PqrGD9"
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

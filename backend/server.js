const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { spawn, spawnSync } = require("child_process");
const multer = require("multer");

const PREDICT_PY = path.join(__dirname, '..', 'ML', 'predict.py');
const VENV_PY = path.join(__dirname, '.venv', 'bin', 'python');
const ROOT_VENV_PY = path.join(__dirname, '..', '.venv', 'bin', 'python');

function canImportPythonDeps(pythonBin) {
  const check = spawnSync(pythonBin, ['-c', 'import numpy, sklearn, pandas, joblib'], {
    encoding: 'utf8',
    timeout: 7000,
  });
  return check.status === 0;
}

function resolvePythonBin() {
  const candidates = [
    process.env.PYTHON_BIN,
    VENV_PY,
    ROOT_VENV_PY,
    'python3',
  ].filter(Boolean);

  for (const bin of candidates) {
    try {
      if (!bin.includes('python3') && !fs.existsSync(bin)) continue;
      if (canImportPythonDeps(bin)) return bin;
    } catch (err) {
      // try next candidate
    }
  }
  return candidates[candidates.length - 1];
}

const PYTHON_BIN = resolvePythonBin();

const app = express();
require('dotenv').config();

let pythonDepsPromise = null;

// Load any previously uploaded datasets from disk so they persist across restarts
const uploadedDatasetsPath = path.join(__dirname, "uploadedDatasets.json");
// Simple log file to record each dataset submission (one JSON per line)
const submissionsLogPath = path.join(__dirname, "datasetSubmissions.log");
let uploadedDatasets = [];
try {
  if (fs.existsSync(uploadedDatasetsPath)) {
    const raw = fs.readFileSync(uploadedDatasetsPath, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      uploadedDatasets = parsed;
      console.log("Uploaded datasets loaded:", uploadedDatasets.length);
    }
  }
} catch (err) {
  console.error("Failed to load uploadedDatasets.json; starting with empty uploaded dataset list:", err.message);
}

app.use(cors({
  origin: ['https://chaitanyaattanti.github.io', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// File upload configuration - store uploads in the datasets folder
// Use diskStorage so we can preserve the original filename (and extension)
// while adding a timestamp prefix to avoid collisions.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "datasets"));
  },
  filename: (req, file, cb) => {
    const safeOriginal = file.originalname.replace(/\s+/g, "_");
    const uniqueName = `${Date.now()}-${safeOriginal}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200 MB limit
  },
});

// Serve static files from datasets folder
app.use('/files', express.static(path.join(__dirname, 'datasets')));

const datasets = [
  {
    dataset_name: "LG 18650HG2 Li-ion Battery Data",
    dataset_description: "Comprehensive lithium-ion battery testing dataset from McMaster University featuring the LG HG2 3Ah cell tested under controlled thermal conditions. The dataset includes detailed charge-discharge cycles at various C-rates, high-precision voltage-current measurements with 0.1% accuracy, thermal behavior analysis, and complete data acquisition scripts. Ideal for battery management system (BMS) development, state-of-charge (SOC) estimation using deep neural networks, capacity fade analysis, and electric vehicle battery research.",
    dataset_source: "Kollmeyer, Philip; Vidal, Carlos; Naguib, Mina; Skells, Michael (2020), \"LG 18650HG2 Li-ion Battery Data and Example Deep Neural Network xEV SOC Estimator Script\", Mendeley Data, V3, doi: 10.17632/cp3473x7xv.3",
    dataset_url: "https://zenodo.org/records/18944534/files/dataset1.zip?download=1"
  },
  {
    dataset_name: "Mechanically Induced Thermal Runaway",
    dataset_description: "Extensive safety testing dataset examining thermal runaway behavior in lithium-ion batteries across diverse applications including mobile phones, electric vehicles, and energy storage systems. Features standardized single-side indentation test protocols with high-resolution time-series measurements of cell voltage, compressive load, indenter stroke displacement, and multi-point temperature readings. Includes 100+ battery test records with quantitative thermal runaway severity scores (0-100 scale), complete cell specifications (dimensions, mass, chemistry, SOC, rated capacity), failure mode analysis, and comprehensive calculation schemes for battery safety assessment and risk prediction modeling.",
    dataset_source: "Lin, Lianshan; Wang, Hsin; Li, Jianlin; Torres-Castro, Loraine; Preger, Yuliya; De Angelis, Valerio (2024), \"Mechanically Induced Thermal Runaway for Li-ion Batteries\", Mendeley Data, V2, doi: 10.17632/sn2kv34r4h.2",
    dataset_url: "https://zenodo.org/records/18944534/files/dataset2.zip?download=1"
  },
  {
    dataset_name: "Mechanically Induced Thermal Runaway (V1)",
    dataset_description: "Initial release of comprehensive safety testing data for thermal runaway characterization in lithium-ion batteries. This foundational dataset covers mechanical abuse testing across various battery formats and applications. Includes detailed experimental protocols, standardized indentation methodology, time-resolved measurements of electrical and thermal parameters, severity scoring framework, and complete metadata for battery cells tested. Particularly valuable for comparing evolution of battery safety characteristics and establishing baseline safety metrics for newer battery technologies.",
    dataset_source: "Lin, Lianshan; Wang, Hsin; Li, Jianlin; Torres-Castro, Loraine; Preger, Yuliya; De Angelis, Valerio (2023), \"Mechanically Induced Thermal Runaway for Li-ion Batteries\", Mendeley Data, V1, doi: 10.17632/sn2kv34r4h.1",
    dataset_url: "https://zenodo.org/records/18944534/files/dataset3.zip?download=1"
  },
  {
    dataset_name: "SOC Estimation Using OCV Methods",
    dataset_description: "Comprehensive study comparing Low-Current OCV and Incremental-Current OCV methods for State-of-Charge estimation in Battery Management Systems using cylindrical INR 18650-20R cells (2000 mAh, NMC chemistry). Dataset includes OCV tests at 0\u00b0C, 25\u00b0C, and 45\u00b0C, dynamic drive cycle evaluations (DST, FUDS, US06, BJDST) at multiple SOC levels (80%, 50%), tracking accuracy analysis, convergence time measurements, and robustness assessments under varying temperature and loading conditions. Key finding demonstrates Incremental-OCV provides superior SOC estimation reliability. Essential for BMS algorithm development and validation.",
    dataset_source: "F. Zheng et al., Applied Energy, vol. 183, pp. 513-525, 2016.",
    dataset_url: "https://zenodo.org/records/18944534/files/experiment-1.zip?download=1"
  },
  {
    dataset_name: "Temperature-Dependent SOC Modeling",
    dataset_description: "Detailed investigation of ambient temperature effects on State-of-Charge estimation accuracy using A123 LiFePO\u2084 cells (1100 mAh). Dataset encompasses Low-Current OCV characterization across eight temperature points and dynamic profile testing including DST, US06, and FUDS drive cycles at each temperature. Critical for developing temperature-compensated SOC estimation algorithms.",
    dataset_source: "Y. Xing, W. He, M. Pecht, and K. L. Tsui, Applied Energy, vol. 113, pp. 106-115, 2014.",
    dataset_url: "https://zenodo.org/records/18944534/files/experiment-2.zip?download=1"
  },
  {
    dataset_name: "Cycle-Life Degradation Study",
    dataset_description: "Extensive degradation analysis dataset from CS2 Prismatic LiCoO\u2082 cells (1100 mAh) cycled under six distinct discharge behaviors for Remaining Useful Life (RUL) prediction. Each dataset provides detailed cycle logs, voltage-current profiles, capacity fade tracking, and aging progression data. Invaluable for prognostics model development.",
    dataset_source: "W. He, N. Williard, M. Osterman, and M. Pecht, Journal of Power Sources, vol. 196, no. 23, pp. 10314-10321, 2011.",
    dataset_url: "https://zenodo.org/records/18944534/files/Experiment-3.zip?download=1"
  },
  {
    dataset_name: "Pulsed-Load and Temperature-Stress Aging",
    dataset_description: "Comprehensive aging study examining effects of pulse loading, high-rate discharge, and temperature cycling on CX2 Prismatic LiCoO\u2082 cells (1350 mAh). Provides insights into accelerated degradation mechanisms, thermal stress impacts, and capacity fade under realistic dynamic loading scenarios.",
    dataset_source: "W. He, N. Williard, M. Osterman, and M. Pecht, Journal of Power Sources, vol. 196, no. 23, pp. 10314-10321, 2011.",
    dataset_url: "https://zenodo.org/records/18944534/files/Experiment-4.zip?download=1"
  },
  {
    dataset_name: "Partial-Charge Cycling Impact",
    dataset_description: "Systematic investigation quantifying how partial State-of-Charge cycling accelerates capacity fade in Graphite/LiCoO\u2082 pouch cells (1500 mAh). Essential for understanding degradation in partial SOC operation and optimizing charging strategies for extended battery life.",
    dataset_source: "S. Saxena, C. Hendricks, and M. Pecht, Journal of Power Sources, vol. 327, pp. 394-400, 2016.",
    dataset_url: "https://zenodo.org/records/18944534/files/Experiment-5.zip?download=1"
  },
  {
    dataset_name: "Long-Term Calendar Aging Study",
    dataset_description: "Extensive calendar aging investigation of 144 lithium-ion cells stored under controlled SOC and temperature conditions across three SOC levels and four temperature points with periodic measurements. Provides critical insights into calendar life prediction and temperature-SOC dependent degradation mechanisms.",
    dataset_source: "CALCE Battery Group, University of Maryland",
    dataset_url: "https://zenodo.org/records/18944534/files/Experiment-6.zip?download=1"
  },
  {
    dataset_name: "Li-ion Battery Aging and EIS Impedance Dataset (NASA)",
    dataset_description: "NASA Prognostics Center of Excellence benchmark dataset featuring Li-ion batteries subjected to charge, discharge, and impedance operational profiles. Impedance characterization is performed using EIS at multiple frequency points capturing the evolution of internal battery parameters as aging progresses. Suitable for Remaining Useful Life (RUL) estimation using prognostic algorithms.",
    dataset_source: "NASA Prognostics Center of Excellence (PCoE). B. Saha and K. Goebel (2007). Battery Data Set, NASA Prognostics Data Repository.",
    dataset_url: "https://zenodo.org/records/18944534/files/archive.zip?download=1"
  }
];

// Merge any previously uploaded datasets, avoiding exact duplicates.
// Currently disabled so that only the curated static datasets appear.
// If you want to re-enable persistence later, restore the logic below.
// if (Array.isArray(uploadedDatasets) && uploadedDatasets.length > 0) {
//   const seen = new Set(
//     datasets.map((d) => `${d.dataset_name}:::${d.dataset_url}`)
//   );
//   uploadedDatasets.forEach((d) => {
//     const key = `${d.dataset_name}:::${d.dataset_url}`;
//     if (!seen.has(key)) {
//       datasets.push(d);
//       seen.add(key);
//     }
//   });
// }

// ── Sub-score helpers (breakdown display & recommendations — generic Li-ion) ──
function computeSubScores(voltage, temperature, cycle_count, soc, c_rate) {
  // Capacity fade: generic Li-ion EOL ~1000 cycles
  const EOL = 1000;
  const fade = Math.min(0.2, (cycle_count / EOL) * 0.2);
  const capacityRetention = 1 - fade;
  const capacityScore = Math.max(0, Math.min(100, capacityRetention * 100));

  // Voltage score: generic Li-ion range 2.5–4.25 V, ideal 3.2–4.1 V
  const VOLT_MIN = 2.5, VOLT_MAX = 4.25, IDEAL_MIN = 3.2, IDEAL_MAX = 4.1;
  let voltageScore;
  if (voltage >= IDEAL_MIN && voltage <= IDEAL_MAX) {
    voltageScore = 100;
  } else if (voltage < VOLT_MIN || voltage > VOLT_MAX + 0.1) {
    voltageScore = 10;
  } else if (voltage < IDEAL_MIN) {
    voltageScore = 20 + ((voltage - VOLT_MIN) / (IDEAL_MIN - VOLT_MIN)) * 80;
  } else {
    voltageScore = 20 + ((VOLT_MAX - voltage) / (VOLT_MAX - IDEAL_MAX)) * 80;
  }
  voltageScore = Math.max(0, Math.min(100, voltageScore));

  // Temperature score
  let temperatureScore;
  if (temperature >= 15 && temperature <= 35) {
    temperatureScore = 100;
  } else if (temperature > 35 && temperature <= 45) {
    temperatureScore = 100 - ((temperature - 35) / 10) * 30;
  } else if (temperature > 45 && temperature <= 60) {
    temperatureScore = 70 - ((temperature - 45) / 15) * 40;
  } else if (temperature > 60) {
    temperatureScore = Math.max(0, 30 - (temperature - 60) * 2);
  } else if (temperature >= 0 && temperature < 15) {
    temperatureScore = 70 + (temperature / 15) * 30;
  } else if (temperature >= -10 && temperature < 0) {
    temperatureScore = 40 + ((temperature + 10) / 10) * 30;
  } else {
    temperatureScore = Math.max(0, 40 + temperature * 2);
  }
  temperatureScore = Math.max(0, Math.min(100, temperatureScore));

  // SOC score
  let socScore;
  if (soc >= 20 && soc <= 80) {
    socScore = 100;
  } else if (soc < 20) {
    socScore = 50 + (soc / 20) * 50;
  } else {
    socScore = 50 + ((100 - soc) / 20) * 50;
  }
  socScore = Math.max(0, Math.min(100, socScore));

  // C-rate score
  let crateScore;
  if (c_rate <= 0.5) crateScore = 100;
  else if (c_rate <= 1) crateScore = 100 - ((c_rate - 0.5) / 0.5) * 15;
  else if (c_rate <= 2) crateScore = 85 - ((c_rate - 1) / 1) * 20;
  else if (c_rate <= 3) crateScore = 65 - ((c_rate - 2) / 1) * 25;
  else crateScore = Math.max(0, 40 - (c_rate - 3) * 10);
  crateScore = Math.max(0, Math.min(100, crateScore));

  return { capacityScore, voltageScore, temperatureScore, socScore, crateScore, capacityRetention };
}

// ── ML model prediction via Python subprocess ──
function mlPredict(payload) {
  return ensurePythonDeps().then((ready) => {
    if (!ready) {
      throw new Error('Python dependencies unavailable after bootstrap attempt');
    }

    return new Promise((resolve, reject) => {
      const py = spawn(PYTHON_BIN, [PREDICT_PY]);
      let stdout = '', stderr = '';

      // Allow cold starts/model load in production and local first request
      const timeout = setTimeout(() => {
        py.kill();
        reject(new Error('ML model prediction timed out (>15s)'));
      }, 15000);

      py.stdout.on('data', (d) => { stdout += d.toString(); });
      py.stderr.on('data', (d) => { stderr += d.toString(); });
      py.on('close', (code) => {
        clearTimeout(timeout);
        if (code !== 0) return reject(new Error(`Python process exited with code ${code}: ${stderr}`));
        try {
          const parsed = JSON.parse(stdout.trim());
          if (parsed.error) return reject(new Error(parsed.error));
          resolve(parsed.safety_score);
        } catch (e) {
          reject(new Error(`Failed to parse ML output: ${e.message}`));
        }
      });
      py.on('error', (err) => {
        clearTimeout(timeout);
        reject(new Error(`Failed to spawn Python: ${err.message}`));
      });
      py.stdin.write(JSON.stringify(payload));
      py.stdin.end();
    });
  });
}

function ensurePythonDeps() {
  if (pythonDepsPromise) return pythonDepsPromise;

  pythonDepsPromise = new Promise((resolve) => {
    if (canImportPythonDeps(PYTHON_BIN)) {
      return resolve(true);
    }

    console.error('❌ Python dependencies unavailable for ML. Checked python bin:', PYTHON_BIN);
    resolve(false);
  });

  return pythonDepsPromise;
}

// Battery health prediction endpoint
app.post("/predict", async (req, res) => {
  try {
    let {
      voltage = 3.7,
      temperature = 25,
      cycle_count = 0,
      soc = 60,
      c_rate = 1.0,
    } = req.body;

    // Input validation
    voltage     = Math.max(1.0,  Math.min(5.0,   parseFloat(voltage)     || 3.7));
    temperature = Math.max(-50,  Math.min(100,   parseFloat(temperature) || 25));
    cycle_count = Math.max(0,    Math.min(10000, parseInt(cycle_count)   || 0));
    soc         = Math.max(0,    Math.min(100,   parseFloat(soc)         || 60));
    c_rate      = Math.max(0.01, Math.min(20,    parseFloat(c_rate)      || 1.0));

    // === Breakdown sub-scores (for display & recommendations) ===
    const { capacityScore, voltageScore, temperatureScore, socScore, crateScore, capacityRetention } =
      computeSubScores(voltage, temperature, cycle_count, soc, c_rate);

    // === Calculate Manual/Formula Score (always) ===
    // Weighted formula: capacity 35%, voltage 25%, thermal 20%, soc 10%, c-rate 10%
    const manualWeightedScore = capacityScore * 0.35 + voltageScore * 0.25 +
                                temperatureScore * 0.20 + socScore * 0.10 + crateScore * 0.10;
    const manualOverall = Math.round(manualWeightedScore);
    console.log(`📊 MANUAL WEIGHTED SCORE: ${manualOverall}/100 (capacity:${Math.round(capacityScore)}*0.35 + voltage:${Math.round(voltageScore)}*0.25 + temp:${Math.round(temperatureScore)}*0.20 + soc:${Math.round(socScore)}*0.10 + c_rate:${Math.round(crateScore)}*0.10 = ${manualWeightedScore.toFixed(2)})`);
    
    // === Try ML Model (RandomForest, R²=0.961) ===
    let mlScore = null;
    let mlUsed = false;
    try {
      mlScore = await mlPredict({ voltage, temperature, cycle_count, soc, c_rate });
      mlUsed = true;
      const mlOverall = Math.round(mlScore);
      console.log(`✅ ML PREDICTION: ${mlOverall}/100 (raw: ${mlScore.toFixed(2)})`);
    } catch (mlErr) {
      console.error(`❌ ML MODEL FAILED: ${mlErr.message}`);
      mlScore = null;
    }
    
    // Use ML if available, otherwise use manual weighted score
    const overall = mlUsed ? Math.round(mlScore) : manualOverall;

    // === Grade ===
    let grade, status, color;
    if (overall >= 90)      { grade = "A"; status = "Excellent"; color = "#10b981"; }
    else if (overall >= 75) { grade = "B"; status = "Good";      color = "#22c55e"; }
    else if (overall >= 60) { grade = "C"; status = "Fair";      color = "#f59e0b"; }
    else if (overall >= 45) { grade = "D"; status = "Poor";      color = "#f97316"; }
    else                    { grade = "F"; status = "Critical";  color = "#ef4444"; }

    // === Recommendations ===
    const recommendations = [];
    if (capacityScore < 75)
      recommendations.push(`Battery has experienced significant capacity fade after ${cycle_count} cycles. Consider replacing if measured capacity is below 80% of rated.`);
    if (voltageScore < 70)
      recommendations.push(`Voltage (${voltage}V) is outside the optimal range for Li-ion cells (3.2–4.1V). Avoid deep discharge below 2.5V or overcharge above 4.25V.`);
    if (temperatureScore < 70)
      recommendations.push(`Operating temperature (${temperature}°C) is stressful. Ideal thermal window is 15–35°C. Consider active thermal management.`);
    if (socScore < 70)
      recommendations.push(`SOC at ${soc}% is near an extreme. For long-term storage, keep SOC at 40–60% to minimise calendar aging.`);
    if (crateScore < 70)
      recommendations.push(`Discharge C-rate of ${c_rate}C generates unnecessary heat. Reduce to ≤1C where possible to extend cycle life.`);
    if (recommendations.length === 0)
      recommendations.push("All parameters are within healthy ranges. Continue current usage patterns to maintain optimal battery life.");

    res.json({
      overall,
      ml_score: mlScore ? Math.round(mlScore) : null,  // ML model prediction (if available)
      manual_score: manualOverall,                      // Manual weighted formula score
      ml_model_used: mlUsed,                           // Which method was used
      grade,
      status,
      color,
      breakdown: {
        capacity:    Math.round(capacityScore),
        voltage:     Math.round(voltageScore),
        temperature: Math.round(temperatureScore),
        soc:         Math.round(socScore),
        c_rate:      Math.round(crateScore),
      },
      capacity_retention_pct: Math.round(capacityRetention * 100),
      recommendations,
    });
  } catch (err) {
    console.error("Predict error:", err);
    res.status(400).json({ error: "Invalid input parameters" });
  }
});

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

app.get("/status", (req, res) => {
  const py = spawnSync(PYTHON_BIN, [
    "-c",
    "import numpy, sklearn, pandas, joblib; print('ok')"
  ], { encoding: "utf8", timeout: 5000 });

  let pythonWorking = py.status === 0 && String(py.stdout || "").trim() === "ok";

  res.json({
    status: "ok",
    deploy_marker: "venv-resolver-v3",
    python_working: pythonWorking,
    python_bin: PYTHON_BIN,
    venv_exists: fs.existsSync(VENV_PY) || fs.existsSync(ROOT_VENV_PY),
    python_error: pythonWorking ? null : String(py.stderr || "python check failed").trim(),
    install_attempted: false,
    install_error: null,
    commit_hint: "venv-resolver-v3"
  });
});

app.get("/datasets", (req, res) => {
  const blockedNames = new Set(["Test", "cs", "wert"]);

  const filtered = datasets.filter((d) => {
    if (!d || !d.dataset_name) return false;
    return !blockedNames.has(String(d.dataset_name).trim());
  });

  res.json(filtered);
});

// Internal-only endpoint to view all submitted datasets
// Not linked from the public site; use for review
app.get("/admin/dataset-submissions", (req, res) => {
  try {
    // Always read latest from disk to include any external edits
    let data = uploadedDatasets;
    if (fs.existsSync(uploadedDatasetsPath)) {
      const raw = fs.readFileSync(uploadedDatasetsPath, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        data = parsed;
      }
    }
    res.json(data || []);
  } catch (err) {
    console.error("Failed to read dataset submissions:", err.message);
    res.status(500).json({ error: "Failed to read dataset submissions" });
  }
});

// Public endpoint to register a new dataset (metadata + URL)
// Users are expected to host the dataset elsewhere (e.g., Drive)
// and provide a shareable URL along with the metadata.
app.post("/admin/upload-dataset", upload.single("file"), (req, res) => {
  try {
    const { dataset_name, dataset_description, dataset_source, input_features, dataset_url } = req.body;

    if (!dataset_name || !dataset_description || !dataset_url) {
      return res.status(400).json({ error: "dataset_name, dataset_description and dataset_url are required" });
    }

    const newDataset = {
      dataset_name,
      dataset_description,
      dataset_source: dataset_source || "",
      dataset_url,
      input_features: input_features || "",
    };

    // Append a simple log entry for this submission
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        ...newDataset,
      };
      fs.appendFileSync(submissionsLogPath, JSON.stringify(logEntry) + "\n");
    } catch (logErr) {
      console.error("Failed to write dataset submission log:", logErr);
    }

    // Persist to uploadedDatasets.json, removing any older duplicates.
    // These submitted datasets are kept for internal review only and
    // are not included in the public /datasets listing.
    try {
      const base = Array.isArray(uploadedDatasets) ? uploadedDatasets : [];
      const key = `${newDataset.dataset_name}:::${newDataset.dataset_url}`;
      const withoutDupes = base.filter(
        (d) => `${d.dataset_name}:::${d.dataset_url}` !== key
      );
      uploadedDatasets = [...withoutDupes, newDataset];
      fs.writeFileSync(uploadedDatasetsPath, JSON.stringify(uploadedDatasets, null, 2));
    } catch (persistErr) {
      console.error("Failed to persist uploaded dataset:", persistErr);
    }

    res.status(201).json(newDataset);
  } catch (err) {
    console.error("Upload dataset error:", err);
    res.status(500).json({ error: "Failed to upload dataset" });
  }
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
  try {
    const routes = [];
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        const methods = Object.keys(middleware.route.methods).join(',');
        routes.push(`${methods.toUpperCase()} ${middleware.route.path}`);
      }
    });
    console.log("Registered routes:", routes);
  } catch (e) {
    console.log("(Debug) Unable to list routes", e.message);
  }
});

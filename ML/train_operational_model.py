"""
Trains an operational battery health model from CALCE cycle-degradation data.

Each CALCE txt file = one test session for a specific battery cell (e.g. CS2_21).
Capacity fade is measured across sessions (files) for the same battery ID.

Features:
  cycle_count     – cumulative discharge cycle number across all sessions
  voltage_mean    – mean discharge voltage (V)
  voltage_min     – min discharge voltage (V)
  voltage_std     – voltage standard deviation (V)
  temperature_mean – mean temperature (°C)
  temperature_max  – max temperature (°C)
  c_rate          – discharge C-rate (1C = 1 * nominal capacity)
  soc_proxy       – SOC estimate from voltage (0–100 %)

Target:
  health_score – capacity retention relative to first session (0–100 %)

Saves: ML/ml_output/operational_health_model.pkl
"""

import os, re, glob, warnings
import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.metrics import r2_score, mean_absolute_error
from collections import defaultdict

warnings.filterwarnings('ignore')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CYCLE_DIR  = os.path.join(SCRIPT_DIR, 'ml_training_data', 'cycle_degradation')
OUT_DIR    = os.path.join(SCRIPT_DIR, 'ml_output')
os.makedirs(OUT_DIR, exist_ok=True)

FEAT_COLS = ['cycle_count', 'voltage_mean', 'voltage_min', 'voltage_std',
             'temperature_mean', 'temperature_max', 'c_rate', 'soc_proxy']

NOM_CAPACITY_MA = 1100.0   # CALCE CS2/CS4 cells ≈ 1.1 Ah


def session_stats(path):
    """Return per-session aggregate stats from one CALCE discharge session file."""
    try:
        df = pd.read_csv(path, sep='\t', low_memory=False)
    except Exception:
        return None

    df.columns = [str(c).strip() for c in df.columns]
    required = {'mV', 'mA', 'Temperature', 'Capacity', 'Discharge count'}
    if not required.issubset(df.columns):
        return None

    # Discharge phase: current is negative in CALCE
    dis = df[df['mA'] < 0].copy()
    if len(dis) < 20:
        return None

    v = dis['mV'] / 1000.0          # convert mV → V
    t = dis['Temperature'].astype(float)
    i = dis['mA'].abs().astype(float)   # mA discharge current
    c = dis.groupby('Discharge count')['Capacity'].max()

    avg_cap = float(c.mean()) if len(c) > 0 else np.nan
    if np.isnan(avg_cap) or avg_cap <= 0:
        return None

    c_rate = float(i.mean()) / NOM_CAPACITY_MA    # fraction of 1C

    soc_proxy = float(np.clip((v.mean() - 2.5) / (4.25 - 2.5) * 100, 0, 100))

    return {
        'avg_cap'     : avg_cap,
        'voltage_mean': float(v.mean()),
        'voltage_min' : float(v.min()),
        'voltage_std' : float(v.std()),
        'temp_mean'   : float(t.mean()),
        'temp_max'    : float(t.max()),
        'c_rate'      : c_rate,
        'soc_proxy'   : soc_proxy,
    }


# ── Group files by battery ID ───────────────────────────────────────────────
# Filename pattern: CS2_CS2_21_1_19_10.txt  →  battery_id = CS2_21
files = sorted(glob.glob(os.path.join(CYCLE_DIR, '*.txt')) +
               glob.glob(os.path.join(CYCLE_DIR, '*.csv')))

id_pattern = re.compile(r'CS[24]_CS[24]_(\d+)_')
battery_files = defaultdict(list)
for f in files:
    m = id_pattern.search(os.path.basename(f))
    if m:
        battery_files[m.group(1)].append(f)

print(f"Battery IDs found: {len(battery_files)}, total files: {len(files)}")

# ── Build training rows per battery ────────────────────────────────────────
all_rows = []
batt_processed = 0

for batt_id, bfiles in sorted(battery_files.items()):
    bfiles = sorted(bfiles)   # chronological order (filename encodes date)
    sessions = []
    for fp in bfiles:
        st = session_stats(fp)
        if st:
            sessions.append(st)

    if len(sessions) < 2:
        continue

    initial_cap = sessions[0]['avg_cap']
    if initial_cap <= 0:
        continue

    cumulative_cycles = 0
    for idx, sess in enumerate(sessions):
        health = float(np.clip(sess['avg_cap'] / initial_cap * 100, 0, 100))
        # Estimate cumulative cycles: ~11 discharge cycles per session file
        cumulative_cycles = idx * 11

        all_rows.append({
            'cycle_count'      : cumulative_cycles,
            'voltage_mean'     : sess['voltage_mean'],
            'voltage_min'      : sess['voltage_min'],
            'voltage_std'      : sess['voltage_std'],
            'temperature_mean' : sess['temp_mean'],
            'temperature_max'  : sess['temp_max'],
            'c_rate'           : sess['c_rate'],
            'soc_proxy'        : sess['soc_proxy'],
            'health_score'     : health,
        })
    batt_processed += 1

print(f"Processed {batt_processed} batteries, {len(all_rows)} training rows")

if not all_rows:
    print("ERROR: No training rows extracted.")
    raise SystemExit(1)

data = pd.DataFrame(all_rows)
print(f"health_score: mean={data['health_score'].mean():.1f} "
      f"min={data['health_score'].min():.1f} max={data['health_score'].max():.1f}")

# ── Synthetic augmentation to cover extreme inputs (voltage, temp, high cycles)
rng = np.random.RandomState(42)
n_syn = 800

syn_cycles  = rng.randint(0, 3000, n_syn).astype(float)
syn_v       = rng.uniform(2.5, 4.25, n_syn)
syn_temp    = rng.uniform(-20, 80, n_syn)
syn_crate   = rng.uniform(0.05, 5.0, n_syn)
syn_soc     = rng.uniform(0, 100, n_syn)

# Health from physics: capacity fade 0–20%, voltage penalty, temperature penalty
cap_h = np.clip(1.0 - 0.20 * (syn_cycles / 1000.0), 0.0, 1.0) * 100
v_h   = np.where((syn_v >= 3.2) & (syn_v <= 4.1), 100,
        np.where((syn_v < 2.5) | (syn_v > 4.35), 10,
                 20 + 80 * np.minimum(syn_v - 2.5, 4.25 - syn_v) / 0.8))
t_h   = np.where((syn_temp >= 15) & (syn_temp <= 35), 100,
        np.where((syn_temp > 60) | (syn_temp < -10), 30, 65))
syn_hs = np.clip(cap_h * 0.60 + v_h * 0.20 + t_h * 0.20, 0, 100)

syn_df = pd.DataFrame({
    'cycle_count'      : syn_cycles,
    'voltage_mean'     : syn_v,
    'voltage_min'      : np.clip(syn_v - rng.uniform(0.05, 0.4, n_syn), 2.0, 4.3),
    'voltage_std'      : rng.uniform(0.01, 0.2, n_syn),
    'temperature_mean' : syn_temp,
    'temperature_max'  : syn_temp + rng.uniform(0, 8, n_syn),
    'c_rate'           : syn_crate / NOM_CAPACITY_MA * 1000,   # same normalisation
    'soc_proxy'        : syn_soc,
    'health_score'     : syn_hs,
})
data = pd.concat([data, syn_df], ignore_index=True)
print(f"After augmentation: {len(data)} rows")

# ── Train ─────────────────────────────────────────────────────────────────
X = data[FEAT_COLS].copy()
y = data['health_score'].copy()

imputer = SimpleImputer(strategy='median')
scaler  = StandardScaler()

X_imp = imputer.fit_transform(X)
X_sc  = scaler.fit_transform(X_imp)

model = RandomForestRegressor(
    n_estimators=150, max_depth=10, min_samples_leaf=3,
    random_state=42, n_jobs=-1
)
model.fit(X_sc, y)

# ── Evaluate ──────────────────────────────────────────────────────────────
cv_scores = cross_val_score(model, X_sc, y, cv=5, scoring='r2')
y_pred    = model.predict(X_sc)
print(f"\n  R²  (train): {r2_score(y, y_pred):.4f}")
print(f"  MAE (train): {mean_absolute_error(y, y_pred):.2f}")
print(f"  R²  (5-fold CV): {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Spot-check
test_cases = [
    {'cycle_count':    0, 'voltage_mean': 3.7, 'voltage_min': 3.5, 'voltage_std': 0.05,
     'temperature_mean': 25, 'temperature_max': 27, 'c_rate': 1.0,  'soc_proxy': 60},
    {'cycle_count':  500, 'voltage_mean': 3.5, 'voltage_min': 3.2, 'voltage_std': 0.10,
     'temperature_mean': 35, 'temperature_max': 40, 'c_rate': 2.0,  'soc_proxy': 50},
    {'cycle_count': 2000, 'voltage_mean': 3.0, 'voltage_min': 2.8, 'voltage_std': 0.20,
     'temperature_mean': 45, 'temperature_max': 55, 'c_rate': 3.0,  'soc_proxy': 30},
]
print("\n  Spot-checks:")
for tc in test_cases:
    X_tc = imputer.transform(pd.DataFrame([tc])[FEAT_COLS])
    X_tc = scaler.transform(X_tc)
    p = model.predict(X_tc)[0]
    print(f"    cycles={tc['cycle_count']:4d} V={tc['voltage_mean']} T={tc['temperature_mean']}°C → {p:.1f}/100")

# ── Save ──────────────────────────────────────────────────────────────────
out_path = os.path.join(OUT_DIR, 'operational_health_model.pkl')
joblib.dump({
    'model'      : model,
    'imputer'    : imputer,
    'scaler'     : scaler,
    'feature_cols': FEAT_COLS,
    'model_name' : 'RandomForest (operational)',
    'r2_score'   : round(float(cv_scores.mean()), 4),
}, out_path)
print(f"\n  ✅ Saved → {out_path}")

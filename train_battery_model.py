"""
Full ML Pipeline:
  1. Feature extraction from all datasets
  2. Combine into master_training_data.csv
  3. Train RandomForest + GradientBoosting + XGBoost
  4. Save best model
"""

import os, glob, warnings, joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, HistGradientBoostingRegressor
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
try:
    import xgboost as xgb
    HAS_XGB = True
except Exception:
    HAS_XGB = False
    print("  ⚠️  XGBoost unavailable — using HistGradientBoosting instead")
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

warnings.filterwarnings('ignore')

TRAIN = "/Users/chaitanyaattanti/version-2/ml_training_data"
OUT   = "/Users/chaitanyaattanti/version-2/ml_output"
os.makedirs(OUT, exist_ok=True)

# ══════════════════════════════════════════════════════════════════════════════
# HELPERS
# ══════════════════════════════════════════════════════════════════════════════
def safe_read_xlsx(path, **kw):
    try:
        return pd.read_excel(path, engine='openpyxl', **kw)
    except:
        return None

def safe_read_csv(path, **kw):
    for enc in ('utf-8', 'latin-1', 'cp1252'):
        try:
            return pd.read_csv(path, encoding=enc, **kw)
        except:
            continue
    return None

def find_voltage_col(df):
    for c in df.columns:
        cl = c.lower()
        if 'vcell' in cl or ('volt' in cl and 'unnamed' not in cl):
            return c
    return None

def find_temp_col(df):
    for c in df.columns:
        cl = c.lower()
        if ('tc1' in cl or ('temp' in cl and 'ambient' not in cl)) and 'unnamed' not in cl:
            return c
    return None

def find_force_col(df):
    for c in df.columns:
        cl = c.lower()
        if 'force' in cl or 'load' in cl and 'unnamed' not in cl:
            return c
    return None

def find_disp_col(df):
    for c in df.columns:
        cl = c.lower()
        if 'displace' in cl or 'stroke' in cl:
            return c
    return None

# ══════════════════════════════════════════════════════════════════════════════
# MODULE 1 — THERMAL RUNAWAY SUMMARY (pre-labeled rows)
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + "═"*65)
print("  MODULE 1: Thermal Runaway Summary (labeled)")
print("═"*65)

tr_summaries = []
for tag, fname in [("TR_V1", "TR_V1_summary_labeled.csv"),
                   ("TR_V2", "TR_V2_summary_labeled.csv")]:
    path = f"{TRAIN}/thermal_runaway_summary/{fname}"
    df = pd.read_csv(path)
    df['source'] = tag
    tr_summaries.append(df)

tr_df = pd.concat(tr_summaries, ignore_index=True)
tr_df.dropna(subset=['CalculatedScore'], inplace=True)
print(f"  ✅ Summary rows: {len(tr_df)}")
print(f"     Features: {[c for c in tr_df.columns if c not in ('FileName','ObservedScore_Label','source')]}")

# ══════════════════════════════════════════════════════════════════════════════
# MODULE 2 — THERMAL RUNAWAY TIME-SERIES (extract aggregate features per cell)
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + "═"*65)
print("  MODULE 2: Thermal Runaway Time-Series Feature Extraction")
print("═"*65)

ts_dir   = f"{TRAIN}/thermal_runaway_timeseries"
ts_files = glob.glob(f"{ts_dir}/*.xlsx")[:150]   # cap at 150 for speed

ts_features = []
errors = 0
for fpath in ts_files:
    fname     = os.path.basename(fpath)
    # strip TR_V1_ / TR_V2_ prefix to get original cell name (no extension)
    cell_name = fname.replace("TR_V1_", "").replace("TR_V2_", "").replace(".xlsx", "")
    df = safe_read_xlsx(fpath)
    if df is None or df.empty:
        errors += 1
        continue

    # Ensure all column names are strings
    df.columns = [str(c) for c in df.columns]

    row = {'ts_FileName': cell_name}

    # ── Voltage ──
    vc = find_voltage_col(df)
    if vc:
        v = df[vc].dropna()
        row['ts_voltage_initial']  = float(v.iloc[0])  if len(v) > 0 else np.nan
        row['ts_voltage_final']    = float(v.iloc[-1]) if len(v) > 0 else np.nan
        row['ts_voltage_drop']     = row['ts_voltage_initial'] - row['ts_voltage_final']
        row['ts_voltage_min']      = float(v.min())
        row['ts_voltage_mean']     = float(v.mean())
        row['ts_voltage_std']      = float(v.std())
        row['ts_voltage_collapse'] = float(v[v < 0.5 * v.iloc[0]].count()) if len(v) > 0 else 0

    # ── Temperature ──
    tc = find_temp_col(df)
    # also try all TC columns and take max
    temp_cols = [c for c in df.columns if 'tc' in c.lower() or 'temp' in c.lower() and 'ambient' not in c.lower()]
    if temp_cols:
        temps = df[temp_cols].select_dtypes(include=[np.number])
        if not temps.empty:
            flat = temps.values.flatten()
            flat = flat[~np.isnan(flat)]
            if len(flat) > 0:
                row['ts_temp_max']      = float(flat.max())
                row['ts_temp_initial']  = float(temps.iloc[0].dropna().mean())
                row['ts_temp_rise']     = row['ts_temp_max'] - row['ts_temp_initial']
                # Temperature rate: max per-step rise
                row['ts_temp_rate_max'] = float(temps.diff().abs().max().max())

    # ── Force / Load ──
    fc = find_force_col(df)
    if fc:
        f_vals = df[fc].dropna()
        row['ts_force_max']   = float(f_vals.max())
        row['ts_force_mean']  = float(f_vals.mean())
        row['ts_force_final'] = float(f_vals.iloc[-1]) if len(f_vals) > 0 else np.nan

    # ── Displacement ──
    dc = find_disp_col(df)
    if dc:
        d_vals = df[dc].dropna()
        row['ts_disp_max']  = float(d_vals.max())
        row['ts_disp_final']= float(d_vals.iloc[-1]) if len(d_vals) > 0 else np.nan

    # ── Test duration ──
    time_col = None
    for c in df.columns:
        if 'time' in c.lower() and 'unnamed' not in c.lower():
            time_col = c; break
    if time_col:
        t = df[time_col].dropna()
        row['ts_test_duration'] = float(t.iloc[-1]) if len(t) > 0 else np.nan

    ts_features.append(row)

ts_feat_df = pd.DataFrame(ts_features)
print(f"  ✅ Time-series features extracted: {len(ts_feat_df)} files")
print(f"     Errors: {errors}")
print(f"     Columns: {list(ts_feat_df.columns)}")

# ── Merge time-series features into summary via filename matching ──
# Summary has 'FileName', ts has 'ts_FileName'
tr_df['_key'] = tr_df['FileName'].str.strip().str.lower()
ts_feat_df['_key'] = ts_feat_df['ts_FileName'].str.strip().str.lower()
merged = tr_df.merge(ts_feat_df.drop(columns=['ts_FileName']), on='_key', how='left')
merged.drop(columns=['_key'], inplace=True)
merged_hit = merged['ts_voltage_initial'].notna().sum()
print(f"  ✅ Merged time-series into summary: {merged_hit}/{len(merged)} rows enriched")

# ══════════════════════════════════════════════════════════════════════════════
# MODULE 3 — LG 18650 CSVs (extract per-session aggregate features)
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + "═"*65)
print("  MODULE 3: LG 18650 Drive Cycle CSVs")
print("═"*65)

lg_dir  = f"{TRAIN}/lg18650"
lg_csvs = glob.glob(f"{lg_dir}/*.csv")[:60]    # cap at 60 for speed

lg_rows = []
errors_lg = 0
for fpath in lg_csvs:
    # LG CSVs: first ~30 rows metadata, then tabular data
    for skip in (30, 25, 20):
        df = safe_read_csv(fpath, skiprows=skip)
        if df is not None and df.shape[1] >= 5:
            break
    if df is None or df.shape[1] < 5:
        errors_lg += 1
        continue

    # Standardise column detection
    df.columns = [str(c).strip() for c in df.columns]

    # find voltage, current, temp columns by position/pattern
    volt_col = next((c for c in df.columns if '.' in str(c) and
                     df[c].dtype == float and
                     df[c].between(2.5, 5.0).sum() > 10), None)
    # fallback: pick column index 8 (common position in LG format)
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    if len(numeric_cols) < 3:
        errors_lg += 1
        continue

    row = {'source': 'LG18650', 'session': os.path.basename(fpath)}

    # Voltage likely col index 8, current 9, temp 10 in LG format
    try:
        v = df.iloc[:, 8].dropna().astype(float)
        i = df.iloc[:, 9].dropna().astype(float)
        t = df.iloc[:, 10].dropna().astype(float)

        if v.between(2.5, 5.0).sum() > 10:
            row['ts_voltage_initial'] = float(v.iloc[0])
            row['ts_voltage_final']   = float(v.iloc[-1])
            row['ts_voltage_drop']    = row['ts_voltage_initial'] - row['ts_voltage_final']
            row['ts_voltage_min']     = float(v.min())
            row['ts_voltage_mean']    = float(v.mean())
            row['ts_voltage_std']     = float(v.std())

        if t.between(-30, 100).sum() > 10:
            row['ts_temp_max']     = float(t.max())
            row['ts_temp_initial'] = float(t.iloc[0])
            row['ts_temp_rise']    = row['ts_temp_max'] - row['ts_temp_initial']

        if len(i) > 0:
            row['ts_force_mean'] = float(i.abs().mean())   # reuse force as current proxy
            row['ts_force_max']  = float(i.abs().max())
    except:
        errors_lg += 1
        continue

    # SOC proxy from filename (e.g. "US06", "Charge", "Dis")
    fname_l = os.path.basename(fpath).lower()
    if 'charge' in fname_l:
        row['session_type'] = 1
    elif 'dis' in fname_l or 'discharge' in fname_l:
        row['session_type'] = -1
    else:
        row['session_type'] = 0

    # Capacity_mAh proxy from LG cells — known 3000 mAh
    row['Capacity_mAh'] = 3000

    lg_rows.append(row)

lg_df = pd.DataFrame(lg_rows)
print(f"  ✅ LG18650 sessions loaded: {len(lg_df)}  |  errors: {errors_lg}")

# ══════════════════════════════════════════════════════════════════════════════
# MODULE 4 — Experiment-1 Drive Cycles (NMC 18650 SOC data)
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + "═"*65)
print("  MODULE 4: Experiment-1 SOC Drive Cycle XLS")
print("═"*65)

exp1_dir  = f"{TRAIN}/soc_drive_cycles"
exp1_xls  = [f for f in glob.glob(f"{exp1_dir}/*.xls*")
             if not os.path.basename(f).startswith('~$')][:20]   # cap at 20
exp1_rows = []
errors_e1 = 0
for fpath in exp1_xls:
    for engine in ('openpyxl',):
        try:
            meta = pd.read_excel(fpath, engine=engine, header=None, nrows=5)
            # Find the actual data starting row (look for 'Channel' marker)
            for skip in range(0, 8):
                df = pd.read_excel(fpath, engine=engine, skiprows=skip, nrows=200)
                numeric = df.select_dtypes(include=[np.number])
                if numeric.shape[1] >= 4:
                    break

            df.columns = [str(c) for c in df.columns]
            volt_col = next((c for c in df.columns
                            if 'volt' in str(c).lower()), None)
            curr_col = next((c for c in df.columns
                            if 'curr' in str(c).lower() or 'amp' in str(c).lower()), None)
            temp_col = next((c for c in df.columns
                            if 'temp' in str(c).lower()), None)

            if volt_col is None:
                errors_e1 += 1
                continue

            v = df[volt_col].dropna().astype(float)
            row = {
                'source'           : 'Exp1_NMC',
                'session'          : os.path.basename(fpath),
                'ts_voltage_initial': float(v.iloc[0])  if len(v) > 0 else np.nan,
                'ts_voltage_final'  : float(v.iloc[-1]) if len(v) > 0 else np.nan,
                'ts_voltage_drop'   : float(v.iloc[0] - v.iloc[-1]) if len(v) > 1 else np.nan,
                'ts_voltage_min'    : float(v.min()),
                'ts_voltage_mean'   : float(v.mean()),
                'ts_voltage_std'    : float(v.std()),
                'Capacity_mAh'      : 2000,
            }
            if temp_col:
                t = df[temp_col].dropna().astype(float)
                row['ts_temp_max']     = float(t.max())
                row['ts_temp_initial'] = float(t.iloc[0])
                row['ts_temp_rise']    = row['ts_temp_max'] - row['ts_temp_initial']
            exp1_rows.append(row)
            break
        except:
            errors_e1 += 1

exp1_df = pd.DataFrame(exp1_rows)
print(f"  ✅ Exp-1 sessions: {len(exp1_df)}  |  errors: {errors_e1}")

# ══════════════════════════════════════════════════════════════════════════════
# MODULE 5 — COMBINE ALL into master_training_data.csv
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + "═"*65)
print("  MODULE 5: Combining All Datasets")
print("═"*65)

# Common feature columns across all sources
FEATURE_COLS = [
    'Capacity_mAh', 'SOC_pct',
    'MaxDisplacement', 'ForceRate', 'VoltageAtCollapse',
    'MaxTemperature', 'TempRateOfRise', 'VoltageDifference',
    'ts_voltage_initial', 'ts_voltage_final', 'ts_voltage_drop',
    'ts_voltage_min', 'ts_voltage_mean', 'ts_voltage_std',
    'ts_voltage_collapse',
    'ts_temp_max', 'ts_temp_initial', 'ts_temp_rise', 'ts_temp_rate_max',
    'ts_force_max', 'ts_force_mean', 'ts_force_final',
    'ts_disp_max', 'ts_disp_final',
    'ts_test_duration',
]

TARGET_COLS = ['CalculatedScore', 'ObservedScore']

# ── Thermal runaway combined (labeled) ──
# These are the only rows with ground-truth targets
tr_combined = merged.copy()
tr_combined['dataset_type'] = 'thermal_runaway'

# ── Add all feature cols that don't exist ──
for col in FEATURE_COLS + TARGET_COLS:
    if col not in tr_combined.columns:
        tr_combined[col] = np.nan

# Only keep rows that have a valid CalculatedScore (the target)
tr_combined = tr_combined[tr_combined['CalculatedScore'].notna()].copy()

# ── Also add LG18650 and Exp1 as unlabeled enrichment rows ──
# (no CalculatedScore hence won't be used in supervised training but saved for reference)
for df_extra, dtype in [(lg_df, 'LG18650'), (exp1_df, 'Exp1_NMC')]:
    if df_extra.empty:
        continue
    df_extra = df_extra.copy()
    df_extra['dataset_type'] = dtype
    for col in FEATURE_COLS + TARGET_COLS + ['FileName', 'ObservedScore_Label', 'source']:
        if col not in df_extra.columns:
            df_extra[col] = np.nan
    tr_combined = pd.concat([tr_combined, df_extra], ignore_index=True)

# Save master CSV
master_path = f"{OUT}/master_training_data.csv"
tr_combined.to_csv(master_path, index=False)
print(f"  ✅ Master CSV saved: {master_path}")
print(f"     Total rows     : {len(tr_combined)}")
print(f"     Labeled rows   : {tr_combined['CalculatedScore'].notna().sum()}")
print(f"     All columns    : {list(tr_combined.columns)}")

# ══════════════════════════════════════════════════════════════════════════════
# MODULE 6 — TRAIN ML MODEL (on labeled TR rows only)
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + "═"*65)
print("  MODULE 6: Training ML Models")
print("═"*65)

labeled = tr_combined[tr_combined['CalculatedScore'].notna()].copy()
print(f"  Total labeled rows: {len(labeled)}")

# ── Subsample for fast training (stratified by ObservedScore bucket) ──
SUBSAMPLE = 300  # max rows to train on
if len(labeled) > SUBSAMPLE:
    labeled = labeled.sample(n=SUBSAMPLE, random_state=42).reset_index(drop=True)
    print(f"  Subsampled to {SUBSAMPLE} rows for fast training")
else:
    print(f"  Using all {len(labeled)} rows")

# Feature matrix — only keep cols that exist and are not all-NaN
ACTUAL_FEAT_COLS = [c for c in FEATURE_COLS if c in labeled.columns]
X_df  = labeled[ACTUAL_FEAT_COLS].copy()
# Drop columns that are entirely NaN (imputer can't fill them)
X_df  = X_df.dropna(axis=1, how='all')
ACTUAL_FEAT_COLS = list(X_df.columns)
y_reg = labeled['CalculatedScore'].values        # 0-100 safety score
y_cls = pd.to_numeric(labeled['ObservedScore'], errors='coerce').fillna(0).values.astype(int)  # 1-7 severity

imputer = SimpleImputer(strategy='median')
scaler  = StandardScaler()

X      = imputer.fit_transform(X_df)
X_s    = scaler.fit_transform(X)

X_tr, X_te, yr_tr, yr_te, yc_tr, yc_te = train_test_split(
    X_s, y_reg, y_cls, test_size=0.2, random_state=42
)

print(f"  Train: {X_tr.shape}  |  Test: {X_te.shape}")

# ── Regression models (lighter hyperparams for speed) ──
regressors = {
    'RandomForest'        : RandomForestRegressor(n_estimators=100, max_depth=8, random_state=42, n_jobs=-1),
    'GradientBoosting'    : GradientBoostingRegressor(n_estimators=100, max_depth=4, learning_rate=0.1, random_state=42),
    'HistGradientBoosting': HistGradientBoostingRegressor(max_iter=100, max_depth=5, learning_rate=0.1, random_state=42),
    'Ridge'               : Ridge(alpha=1.0),
}
if HAS_XGB:
    regressors['XGBoost'] = xgb.XGBRegressor(n_estimators=300, max_depth=6, learning_rate=0.05, random_state=42, verbosity=0)

results = {}
best_r2    = -np.inf
best_model = None
best_name  = None

print(f"\n  {'Model':<22} {'MAE':>8} {'RMSE':>8} {'R²':>8}")
print(f"  {'-'*50}")

for name, model in regressors.items():
    model.fit(X_tr, yr_tr)
    pred = model.predict(X_te)
    mae  = mean_absolute_error(yr_te, pred)
    rmse = np.sqrt(mean_squared_error(yr_te, pred))
    r2   = r2_score(yr_te, pred)
    results[name] = {'MAE': mae, 'RMSE': rmse, 'R2': r2, 'model': model}
    print(f"  {name:<22} {mae:>8.3f} {rmse:>8.3f} {r2:>8.4f}")
    if r2 > best_r2:
        best_r2    = r2
        best_model = model
        best_name  = name

print(f"\n  🏆 Best model: {best_name}  (R²={best_r2:.4f})")

# ══════════════════════════════════════════════════════════════════════════════
# MODULE 7 — PLOTS + SAVE
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + "═"*65)
print("  MODULE 7: Saving Outputs")
print("═"*65)

# -- Feature importance --
if hasattr(best_model, 'feature_importances_'):
    fi = pd.Series(best_model.feature_importances_, index=ACTUAL_FEAT_COLS).sort_values(ascending=False)
    fig, ax = plt.subplots(figsize=(10, 6))
    fi.head(15).plot(kind='barh', ax=ax, color='steelblue')
    ax.set_title(f'Feature Importances — {best_name}', fontsize=13)
    ax.set_xlabel('Importance')
    ax.invert_yaxis()
    plt.tight_layout()
    plt.savefig(f"{OUT}/feature_importance.png", dpi=150)
    plt.close()
    print(f"  ✅ feature_importance.png saved")
    print(f"     Top-5: {list(fi.head(5).index)}")

# -- Actual vs Predicted --
pred_te = best_model.predict(X_te)
fig, ax = plt.subplots(figsize=(7, 6))
ax.scatter(yr_te, pred_te, alpha=0.6, edgecolors='k', color='steelblue', s=40)
lims = [min(yr_te.min(), pred_te.min()) - 2, max(yr_te.max(), pred_te.max()) + 2]
ax.plot(lims, lims, 'r--', lw=2, label='Perfect prediction')
ax.set_xlabel('Actual Safety Score (0-100)')
ax.set_ylabel('Predicted Safety Score')
ax.set_title(f'Actual vs Predicted — {best_name}\nR²={best_r2:.4f}')
ax.legend()
plt.tight_layout()
plt.savefig(f"{OUT}/actual_vs_predicted.png", dpi=150)
plt.close()
print(f"  ✅ actual_vs_predicted.png saved")

# -- Model comparison bar chart --
names_  = list(results.keys())
r2s_    = [results[n]['R2']   for n in names_]
maes_   = [results[n]['MAE']  for n in names_]
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].bar(names_, r2s_, color=['#2196F3','#4CAF50','#FF9800','#9C27B0'])
axes[0].set_title('R² Score (higher = better)')
axes[0].set_ylim(0, 1)
axes[0].axhline(0, color='grey', lw=0.5)
axes[1].bar(names_, maes_, color=['#2196F3','#4CAF50','#FF9800','#9C27B0'])
axes[1].set_title('MAE (lower = better)')
for ax in axes:
    ax.set_xticklabels(names_, rotation=15, ha='right')
plt.suptitle('Battery Safety Prediction — Model Comparison', fontsize=13, fontweight='bold')
plt.tight_layout()
plt.savefig(f"{OUT}/model_comparison.png", dpi=150)
plt.close()
print(f"  ✅ model_comparison.png saved")

# -- Save best model --
model_path = f"{OUT}/battery_safety_model.pkl"
joblib.dump({
    'model'          : best_model,
    'imputer'        : imputer,
    'scaler'         : scaler,
    'feature_cols'   : ACTUAL_FEAT_COLS,
    'model_name'     : best_name,
    'r2_score'       : best_r2,
    'description'    : 'Battery thermal safety score prediction (0-100). Higher = safer.',
}, model_path)
print(f"  ✅ Model saved: {model_path}")

# -- Results summary --
results_df = pd.DataFrame([
    {'Model': n, 'MAE': results[n]['MAE'], 'RMSE': results[n]['RMSE'], 'R2': results[n]['R2']}
    for n in results
]).sort_values('R2', ascending=False)
results_df.to_csv(f"{OUT}/model_results.csv", index=False)
print(f"  ✅ model_results.csv saved")

# ══════════════════════════════════════════════════════════════════════════════
# EXAMPLE PREDICTION
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + "═"*65)
print("  EXAMPLE PREDICTIONS")
print("═"*65)

def predict_safety(input_dict):
    row = pd.DataFrame([{col: input_dict.get(col, np.nan) for col in ACTUAL_FEAT_COLS}])
    x   = imputer.transform(row)
    x   = scaler.transform(x)
    score = float(best_model.predict(x)[0])
    score = np.clip(score, 0, 100)
    if score >= 70: status = "✅ SAFE"
    elif score >= 40: status = "⚠️  WARNING"
    else: status = "🔴 CRITICAL"
    return {'safety_score': round(score, 2), 'status': status}

scenarios = [
    {'label': 'Low SOC, low temp',   'SOC_pct': 20,  'Capacity_mAh': 3000, 'ts_temp_max': 35,  'ts_voltage_drop': 0.5},
    {'label': 'High SOC, high temp', 'SOC_pct': 100, 'Capacity_mAh': 6400, 'ts_temp_max': 150, 'ts_voltage_drop': 4.0, 'ts_temp_rise': 120},
    {'label': 'EV cell at 60% SOC',  'SOC_pct': 60,  'Capacity_mAh': 26000,'ts_temp_max': 85,  'ts_voltage_drop': 2.0, 'ts_temp_rise': 60},
]
for s in scenarios:
    label = s.pop('label')
    result = predict_safety(s)
    print(f"  {label:<30}  →  score={result['safety_score']:6.2f}  {result['status']}")

print("\n" + "═"*65)
print(f"  PIPELINE COMPLETE")
print(f"  Output folder: {OUT}")
print("═"*65)

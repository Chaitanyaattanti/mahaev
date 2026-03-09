#!/usr/bin/env python3
"""
Bridge script: maps user-facing API inputs → operational health model predictions.
Called by backend/server.js via child_process.spawn.
Reads JSON from stdin, writes JSON to stdout.

Model: RandomForest trained on CALCE cycle-degradation data (R²≈0.93)
Features: cycle_count, voltage_mean, voltage_min, voltage_std,
          temperature_mean, temperature_max, c_rate, soc_proxy
Target: capacity-retention health score (0–100)
"""

import sys, json, os
import numpy as np
import pandas as pd
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'ml_output', 'operational_health_model.pkl')

# Feature columns (must match training order exactly)
FEAT_COLS = ['cycle_count', 'voltage_mean', 'voltage_min', 'voltage_std',
             'temperature_mean', 'temperature_max', 'c_rate', 'soc_proxy']


def map_inputs_to_features(inp: dict) -> dict:
    """
    Map 5 user-facing operational inputs → 8 model features.
    All computations are physically grounded for normal EV operation.
    """
    voltage     = float(inp.get('voltage', 3.7))
    temperature = float(inp.get('temperature', 25.0))
    cycle_count = int(inp.get('cycle_count', 0))
    soc         = float(inp.get('soc', 60.0))
    c_rate      = float(inp.get('c_rate', 1.0))

    # Voltage spread during a discharge pulse at this C-rate and SOC
    ir_drop     = c_rate * 0.06          # internal resistance drop (V)
    volt_min    = max(2.4, voltage - ir_drop - 0.05)
    volt_std    = ir_drop / 3.0          # voltage variation ≈ IR spread
    volt_mean   = (voltage + volt_min) / 2.0

    # Temperature rise from discharge current
    temp_max    = temperature + c_rate * 3.5   # ~3.5°C per C-rate unit

    # SOC proxy: linear scale of resting voltage within Li-ion range
    soc_proxy   = float(np.clip((voltage - 2.5) / (4.25 - 2.5) * 100.0, 0.0, 100.0))

    # C-rate normalised to match training data scale (CALCE 1C = 1.0)
    c_rate_feat = float(c_rate)

    return {
        'cycle_count'      : float(cycle_count),
        'voltage_mean'     : volt_mean,
        'voltage_min'      : volt_min,
        'voltage_std'      : volt_std,
        'temperature_mean' : float(temperature),
        'temperature_max'  : float(temp_max),
        'c_rate'           : c_rate_feat,
        'soc_proxy'        : soc_proxy,
    }


def main():
    try:
        inp = json.loads(sys.stdin.read())

        bundle    = joblib.load(MODEL_PATH)
        model     = bundle['model']
        imputer   = bundle['imputer']
        scaler    = bundle['scaler']
        feat_cols = bundle['feature_cols']   # stored FEAT_COLS from training

        features = map_inputs_to_features(inp)
        row = pd.DataFrame([{col: features.get(col, np.nan) for col in feat_cols}])

        X = imputer.transform(row)
        X = scaler.transform(X)

        score = float(np.clip(model.predict(X)[0], 0.0, 100.0))
        print(json.dumps({'safety_score': round(score, 2)}))
        sys.exit(0)

    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()

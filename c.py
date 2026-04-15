"""Model comparison plot using real metrics from model_results.csv.

Run:
    python c.py

Output:
    ml_stats_placeholder.png
"""

import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams["figure.dpi"] = 300

# Path where train_battery_model.py saves results
ROOT = "/Users/chaitanyaattanti/version-2/MAHA-EV-DASHBOARD/ML"
RESULTS_CSV = os.path.join(ROOT, "ml_output", "model_results.csv")

results = pd.read_csv(RESULTS_CSV)

models = results["Model"].tolist()
mae = results["MAE"].to_numpy()

x = np.arange(len(models))

fig, ax = plt.subplots(figsize=(6, 3))

bars = ax.bar(
    x,
    mae,
    color=["#d0e4ff", "#ffd6e8", "#ffe4b5", "#e0ffe0", "#c8e6c9"][: len(models)],
    edgecolor="black",
)

ax.set_ylabel("Mean Absolute Error", fontsize=9)
ax.set_xticks(x)
ax.set_xticklabels(models, fontsize=8, rotation=15, ha="right")
ax.set_ylim(0, max(mae) * 1.15)

# Highlight best (lowest MAE)
best_idx = int(np.argmin(mae))
bars[best_idx].set_edgecolor("red")
bars[best_idx].set_linewidth(2)

for rect, val in zip(bars, mae):
    ax.text(
        rect.get_x() + rect.get_width() / 2,
        val + 0.02 * max(mae),
        f"{val:.3f}",
        ha="center",
        va="bottom",
        fontsize=7,
    )

fig.suptitle("Battery safety model comparison (MAE)", fontsize=9)
fig.tight_layout()
plt.savefig("ml_stats_placeholder.png", bbox_inches="tight", transparent=False)
plt.close()

print("Saved ml_stats_placeholder.png using real values from", RESULTS_CSV)
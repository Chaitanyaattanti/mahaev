# ml_pipeline_diagram_simple.py
# run: python ml_pipeline_diagram_simple.py

import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyArrowPatch

plt.rcParams["figure.dpi"] = 300

fig, ax = plt.subplots(figsize=(7.5, 2.8))
ax.set_xlim(0, 8)
ax.set_ylim(0, 3)
ax.axis("off")

def box_centered(cx, cy, w, h, color, label):
    x = cx - w/2
    y = cy - h/2
    rect = Rectangle((x, y), w, h, linewidth=1.5,
                     edgecolor="black", facecolor=color)
    ax.add_patch(rect)
    ax.text(cx, cy, label, ha="center", va="center", fontsize=9)

def arrow(p1, p2):
    (x1, y1), (x2, y2) = p1, p2
    arr = FancyArrowPatch((x1, y1), (x2, y2),
                          arrowstyle="->", mutation_scale=14,
                          linewidth=1.1, color="black")
    ax.add_patch(arr)

# Colors
c1 = "#e0ffe0"
c2 = "#d0e4ff"
c3 = "#ffd6e8"
c4 = "#ffe4b5"

w, h = 1.8, 1.1
y  = 1.7

x1, x2, x3, x4 = 1.0, 3.0, 5.0, 7.0

box_centered(x1, y, w, h, c1, "Datasets")
box_centered(x2, y, w, h, c2, "Preprocessing\n+ features")
box_centered(x3, y, w, h, c3, "Model\ntraining")
box_centered(x4, y, w, h, c4, "Deployed\nmodel API")

arrow((x1 + w/2, y), (x2 - w/2, y))
arrow((x2 + w/2, y), (x3 - w/2, y))
arrow((x3 + w/2, y), (x4 - w/2, y))

ax.text(1.0, 0.6, "Thermal runaway, SOC cycles",
        ha="center", va="center", fontsize=7)
ax.text(3.0, 0.6, "Data preprocessing\n& feature extraction\n→ master_training_data",
        ha="center", va="center", fontsize=7)
ax.text(5.0, 0.6, "RF, GradBoost,\nXGBoost / HistGB,\nRidge baseline",
        ha="center", va="center", fontsize=7)
ax.text(7.0, 0.6, "Used by live\nprediction service",
        ha="center", va="center", fontsize=7)

fig.suptitle("ML pipeline: from datasets to live model", fontsize=9)
plt.tight_layout()
plt.savefig("ml_pipeline_placeholder.png", bbox_inches="tight", transparent=False)
plt.close()

print("Saved ml_pipeline_placeholder.png")
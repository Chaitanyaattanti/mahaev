# save as generate_architecture_diagram_clean.py
# run: python generate_architecture_diagram_clean.py
# output: architecture_with_db.png

import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyArrowPatch

plt.rcParams["figure.dpi"] = 300

fig, ax = plt.subplots(figsize=(8, 4))
ax.set_xlim(0, 8.5)
ax.set_ylim(0, 4)
ax.axis("off")

def box_centered(cx, cy, w, h, color, label):
    x = cx - w/2
    y = cy - h/2
    rect = Rectangle((x, y), w, h, linewidth=1.5,
                     edgecolor="black", facecolor=color)
    ax.add_patch(rect)
    ax.text(cx, cy, label, ha="center", va="center", fontsize=9)

def arrow(p1, p2, text="", text_offset=(0, 0.2)):
    (x1, y1), (x2, y2) = p1, p2
    arr = FancyArrowPatch((x1, y1), (x2, y2),
                          arrowstyle="->", mutation_scale=14,
                          linewidth=1.2, color="black")
    ax.add_patch(arr)
    if text:
        tx = (x1 + x2) / 2 + text_offset[0]
        ty = (y1 + y2) / 2 + text_offset[1]
        ax.text(tx, ty, text, ha="center", va="center", fontsize=8)

# Colors
frontend_color = "#d0e4ff"
backend_color  = "#ffe4b5"
db_color       = "#e0ffe0"
ml_color       = "#ffd6e8"

w, h = 2.0, 1.0

# Slightly more spacing between boxes
xf, yf = 1.2, 2.5   # Frontend (left)
xb, yb = 4.3, 2.5   # Backend (center)
xm, ym = 7.5, 2.5   # ML Service (right)
xd, yd = 4.5, 0.6   # Dataset DB (a bit lower for more space)

# Nodes
box_centered(xf, yf, w, h, frontend_color, "Frontend")
box_centered(xb, yb, w, h, backend_color,  "Backend APIs")
box_centered(xm, ym, w, h, ml_color,       "ML Service")
box_centered(xd, yd, w, h, db_color,       "Dataset DB")

# Frontend <-> Backend
arrow((xf + w/2, yf), (xb - w/2, yb),
      text="REST API request", text_offset=(0, 0.25))
arrow((xb - w/2, yb - 0.1), (xf + w/2, yf - 0.1),
      text="JSON response", text_offset=(0, -0.25))

# Backend <-> Dataset DB
# slightly offset left/right so lines and labels don't merge
arrow((xb - 0.3, yb - h/2), (xd - 0.3, yd + h/2),
      text="DB query", text_offset=(-0.4, 0.15))
arrow((xd + 0.3, yd + h/2 - 0.1), (xb + 0.3, yb - h/2 - 0.1),
      text="Dataset metadata", text_offset=(0.4, -0.2))

# Backend <-> ML Service
arrow((xb + w/2, yb), (xm - w/2, ym),
      text="Prediction request", text_offset=(0, 0.25))
arrow((xm - w/2, ym - 0.1), (xb + w/2, yb - 0.1),
      text="Prediction result", text_offset=(0, -0.25))

plt.tight_layout()
plt.savefig("architecture_with_db.png", bbox_inches="tight", transparent=False)
plt.close()

print("Saved architecture_with_db.png")
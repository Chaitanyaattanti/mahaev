# HOME PAGE RESPONSIVE REFACTORING EXAMPLE

This file shows how to convert Home.jsx to be fully responsive using the patterns from RESPONSIVE_GUIDE.md.

## Current Issues in Home.jsx
- ❌ Fixed `padding: "5rem 4rem"` - doesn't scale
- ❌ Fixed `minHeight: "550px"` - wastes space on mobile
- ❌ Fixed `fontSize: "3.5rem"` - too large on mobile
- ❌ Decorative circles always visible - wastes mobile space
- ❌ Search bar fixed width - too wide on mobile
- ❌ Grid layouts hardcoded to 2 columns - no mobile support

---

## REFACTORING EXAMPLE

### Hero Section - BEFORE ❌

```javascript
const heroSectionStyle = {
  background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #f9fafb 100%)",
  padding: "5rem 4rem",          // Fixed - bad for mobile
  position: "relative",
  overflow: "hidden",
  minHeight: "550px",            // Fixed - wastes mobile space
  borderBottom: "1px solid #e2e8f0",
};

const mainTitleStyle = {
  fontSize: "3.5rem",            // Fixed - too big on mobile
  fontWeight: "800",
  color: "#1e293b",
  margin: "0 0 1.5rem 0",        // Fixed
  lineHeight: "1.1",
  letterSpacing: "-0.02em",
};

const descriptionStyle = {
  fontSize: "1.15rem",           // Fixed
  color: "#475569",
  lineHeight: "1.7",
  marginBottom: "2rem",          // Fixed
  maxWidth: "580px",
};

const decorativeCirclesStyle = {
  position: "absolute",
  right: "3%",
  top: "50%",
  transform: "translateY(-50%)",
  width: "600px",                // Fixed - huge on mobile
  height: "500px",               // Fixed
  pointerEvents: "none",
  zIndex: 1,
};
```

### Hero Section - AFTER ✅

```javascript
const heroSectionStyle = {
  background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #f9fafb 100%)",
  // Now responsive:
  padding: "clamp(2rem, 5vw, 5rem) clamp(1rem, 4vw, 4rem)",
  position: "relative",
  overflow: "hidden",
  minHeight: "clamp(400px, 80vh, 550px)",  // Scales with viewport
  borderBottom: "1px solid #e2e8f0",
  display: "grid",
  gridTemplateColumns: "1fr",
  alignItems: "center",
};

// Add media query for desktop grid layout
if (typeof window !== 'undefined' && window.innerWidth >= 1025) {
  heroSectionStyle.gridTemplateColumns = "1fr 1fr";
}

const mainTitleStyle = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",   // Scales 2rem up to 3.5rem
  fontWeight: "800",
  color: "#1e293b",
  margin: "0 0 clamp(0.75rem, 2vw, 1.5rem) 0",
  lineHeight: "1.1",
  letterSpacing: "-0.02em",
};

const descriptionStyle = {
  fontSize: "clamp(1rem, 2vw, 1.15rem)",
  color: "#475569",
  lineHeight: "1.7",
  marginBottom: "clamp(1.5rem, 3vw, 2rem)",
  maxWidth: "580px",
};

const decorativeCirclesStyle = {
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  width: "clamp(200px, 50vw, 600px)",  // Scales with viewport
  height: "clamp(300px, 60vw, 500px)",
  pointerEvents: "none",
  zIndex: 1,
  display: "none",  // Hide on mobile/tablet
};

// Show circles only on desktop
if (typeof window !== 'undefined' && window.innerWidth >= 1025) {
  decorativeCirclesStyle.display = "block";
}
```

---

## Card Grid - BEFORE ❌

```javascript
// Hardcoded 2-column grid - doesn't adapt to screen size
const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",   // Always 2 columns!
  gap: "2rem",
  marginBottom: "1.5rem",
};
```

### Card Grid - AFTER ✅

```javascript
// Auto-adjusting grid - stacks on mobile, multiple columns on larger screens
const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",  // Auto-scales
  gap: "clamp(1rem, 3vw, 2rem)",  // Responsive gap
  marginBottom: "clamp(1rem, 3vw, 1.5rem)",
};

// This automatically:
// - 1 column on mobile (< 250px width)
// - 2 columns on tablet (250px-500px)
// - 3+ columns on desktop (500px+)
```

---

## Search Bar - BEFORE ❌

```javascript
const searchBarContainerStyle = {
  display: "flex",
  maxWidth: "600px",             // Fixed - too wide on mobile
  marginBottom: "1rem",          // Fixed
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
};

const searchInputStyle = {
  flex: 1,
  padding: "1rem 1.5rem",        // Fixed
  border: "none",
  fontSize: "1rem",              // Fixed
  outline: "none",
  background: "white",
  color: "#334155",
};

const searchButtonStyle = {
  background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
  color: "white",
  border: "none",
  padding: "1rem 3rem",          // Fixed
  fontSize: "1rem",              // Fixed
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.3s",
  letterSpacing: "0.05em",
};
```

### Search Bar - AFTER ✅

```javascript
const searchBarContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "clamp(0.5rem, 1vw, 1rem)",
  maxWidth: "100%",              // Full width on mobile
  marginBottom: "clamp(0.75rem, 2vw, 1rem)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
};

// Stack vertically on mobile, horizontally on tablet+
if (typeof window !== 'undefined' && window.innerWidth >= 769) {
  searchBarContainerStyle.flexDirection = "row";
  searchBarContainerStyle.maxWidth = "600px";
}

const searchInputStyle = {
  flex: 1,
  padding: "clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem)",
  border: "none",
  fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
  outline: "none",
  background: "white",
  color: "#334155",
  borderRadius: "8px",
};

const searchButtonStyle = {
  background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
  color: "white",
  border: "none",
  padding: "clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem)",
  fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.3s",
  letterSpacing: "0.05em",
  minHeight: "44px",             // Touch target
  borderRadius: "8px",
};
```

---

## Section Padding - BEFORE ❌

```javascript
const categorySectionStyle = {
  padding: "4rem 3rem",          // Fixed - too much on mobile
  maxWidth: "1400px",
  margin: "0 auto",
};

const sectionTitleStyle = {
  fontSize: "2rem",              // Fixed
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: "1rem",          // Fixed
  textAlign: "center",
};
```

### Section Padding - AFTER ✅

```javascript
const categorySectionStyle = {
  padding: "clamp(1.5rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem)",
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
};

const sectionTitleStyle = {
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: "clamp(0.75rem, 2vw, 1rem)",
  textAlign: "center",
};
```

---

## Complete Responsive Component Example

```javascript
import { useEffect, useState } from 'react';

function Home() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize < 769;
  const isTablet = screenSize >= 769 && screenSize < 1025;
  const isDesktop = screenSize >= 1025;

  // ===== HERO SECTION =====
  const heroSectionStyle = {
    background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #f9fafb 100%)",
    padding: "clamp(2rem, 5vw, 5rem) clamp(1rem, 4vw, 4rem)",
    position: "relative",
    overflow: "hidden",
    minHeight: "clamp(400px, 80vh, 550px)",
    borderBottom: "1px solid #e2e8f0",
    display: "grid",
    gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
    alignItems: "center",
    gap: "clamp(2rem, 4vw, 3rem)",
  };

  const heroContentStyle = {
    maxWidth: "650px",
    position: "relative",
    zIndex: 2,
  };

  const mainTitleStyle = {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 clamp(0.75rem, 2vw, 1.5rem) 0",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
  };

  // ===== SEARCH BAR =====
  const searchBarContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "clamp(0.5rem, 1vw, 1rem)",
    maxWidth: isMobile ? "100%" : "600px",
    marginBottom: "clamp(1.5rem, 3vw, 2rem)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  };

  // ===== CARD GRID =====
  const categoryCardGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "clamp(1rem, 3vw, 2rem)",
    marginBottom: "clamp(2rem, 5vw, 3rem)",
  };

  // ===== SECTION =====
  const sectionStyle = {
    padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem)",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
  };

  const sectionTitleStyle = {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "clamp(1.5rem, 3vw, 2rem)",
    textAlign: "center",
  };

  // ===== DECORATIVE ELEMENTS =====
  const decorativeCirclesStyle = {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "clamp(200px, 50vw, 600px)",
    height: "clamp(300px, 60vw, 500px)",
    pointerEvents: "none",
    zIndex: 1,
    display: isDesktop ? "block" : "none",
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={mainTitleStyle}>
            Battery Safety for Indian EVs
          </h1>
          {/* Search bar */}
          <div style={searchBarContainerStyle}>
            {/* Search inputs */}
          </div>
        </div>
        {/* Decorative circles - hidden on mobile */}
        <div style={decorativeCirclesStyle}>
          {/* Circles here */}
        </div>
      </div>

      {/* Category Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Our Focus Areas</h2>
        <div style={categoryCardGridStyle}>
          {/* Cards automatically stack and adapt */}
        </div>
      </div>
    </div>
  );
}

export default Home;
```

---

## KEY CONVERSIONS SUMMARY

| Property     | Before        | After (Responsive)                    |
|-------------|---------------|---------------------------------------|
| padding     | `"5rem 4rem"` | `"clamp(2rem, 5vw, 5rem) clamp(1rem, 4vw, 4rem)"` |
| fontSize    | `"3.5rem"`    | `"clamp(2rem, 5vw, 3.5rem)"`          |
| minHeight   | `"550px"`     | `"clamp(400px, 80vh, 550px)"`         |
| gap         | `"2rem"`      | `"clamp(1rem, 3vw, 2rem)"`            |
| grid-cols   | `"repeat(2, 1fr)"` | `"repeat(auto-fit, minmax(250px, 1fr))"` |
| maxWidth    | `"650px"`     | `"100%"` or use container pattern |

---

## Testing the Responsive Design

Open your site and test:
- **Mobile (375px)**: All content readable, no scrolling needed for key elements
- **Tablet (768px)**: 2-column grid works, better spacing
- **Desktop (1920px)**: 3-column grid visible, decorative elements show, full width

Use Chrome DevTools → Toggle device toolbar → Test different sizes.

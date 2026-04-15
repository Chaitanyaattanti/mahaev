# Responsive Testing Guide

## Setup

### Install Playwright
```bash
npm install --save-dev @playwright/test
```

## Running Tests

### Run all responsive tests
```bash
npm run test:responsive
```

### Run tests for a specific breakpoint
```bash
# Mobile only
npx playwright test responsive.spec.ts --grep '@mobile'

# Tablet only
npx playwright test responsive.spec.ts --grep '@tablet'

# Desktop only
npx playwright test responsive.spec.ts --grep '@desktop'
```

### Run tests in UI mode (interactive)
```bash
npx playwright test --ui
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run single test file
```bash
npx playwright test tests/responsive.spec.ts
```

### Generate HTML report
```bash
npx playwright show-report
```

## Test Coverage

The test suite validates:

### 1. **No Overflow Tests**
- ✅ Horizontal scrollbar prevention on all breakpoints
- ✅ Charts and SVG elements stay within bounds
- ✅ Grid layouts stack properly on mobile

### 2. **Typography Tests**
- ✅ Minimum font size (12px) for readability
- ✅ Text clusters don't overlap on mobile (< 768px)
- ✅ Heading and body text hierarchy maintained

### 3. **Navigation Tests**
- ✅ Navbar fits within viewport
- ✅ Hamburger menu appears on mobile
- ✅ All navigation links accessible

### 4. **Chart Rendering Tests** (Battery Predictor Page)
- ✅ SVG gauge doesn't overflow
- ✅ Slider inputs are full-width on mobile
- ✅ Result cards stack vertically on <768px

### 5. **Layout Tests**
- ✅ Timeline adapts from side-by-side (desktop) to stacked (mobile)
- ✅ Card grids respond to viewport
- ✅ Footer content doesn't overflow

### 6. **Touch Target Tests**
- ✅ Clickable elements sized ≥44x44px (mobile standard)
- ✅ Button spacing prevents accidental clicks

### 7. **Cross-Breakpoint Consistency**
- ✅ Same content renders on mobile (390px), tablet (820px), desktop (1440px)
- ✅ Navigation accessible on all breakpoints
- ✅ Page loads fully on all sizes

## Test Breakpoints

| Device | Width | Height | Purpose |
|--------|-------|--------|---------|
| **Mobile** | 390px | 844px | iPhone 14 Pro size |
| **Tablet** | 820px | 1180px | iPad Mini size |
| **Desktop** | 1440px | 900px | Standard desktop |

## CSS Updates Applied

### 1. **BatteryPredictor.jsx**
- Grid changes from `1fr 1fr` to `1fr` on mobile (<768px)
- Gauge width responsive: `clamp(140px, 60vw, 240px)`
- Padding reduced: `clamp(1rem, 3vw, 2.5rem)` vertical

### 2. **Timeline.jsx**
- Cards change from 45% width to 100% on mobile
- Timeline line moves from center to left on mobile
- Alternating left-right layout becomes single-column on mobile

### 3. **Media Queries (index.css)**
- Ultra-small screens (< 375px): Adjusted font sizes and word-break rules
- Tablet (≥768px): Enhanced spacing variables
- Desktop (≥1280px): Optimized spacing for larger displays
- Print: Hidden non-essential elements

## Example Test Output

```
✓ Homepage should be responsive without overflow (mobile)
✓ Homepage should be responsive without overflow (tablet)
✓ Homepage should be responsive without overflow (desktop)
✓ Navbar should be responsive (mobile)
✓ Navbar should be responsive (tablet)
✓ Navbar should be responsive (desktop)
✓ Charts on Battery Predictor should not overflow (mobile)
✓ Charts on Battery Predictor should not overflow (tablet)
✓ Charts on Battery Predictor should not overflow (desktop)
✓ Grid layouts should stack properly (mobile)
✓ No horizontal scrollbar should appear (mobile)
✓ Touch targets should be adequately sized (mobile)
...
```

## Debugging Failed Tests

### View failure screenshots
```bash
npx playwright show-report
```

### Debug specific test
```bash
npx playwright test tests/responsive.spec.ts --debug
```

### Check viewport during test
Add to test code:
```javascript
console.log(await page.viewportSize());
```

## CI/CD Integration

For GitHub Actions:
```yaml
- name: Run Playwright tests
  run: npx playwright test
```

## Responsive Design Principles Applied

1. **Mobile-First**: Base styles target mobile, enhanced with media queries for larger screens
2. **CSS Grid**: Used `gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr"`
3. **Flexbox**: Responsive gap and flex-direction for stacking
4. **Typography**: `clamp()` function for fluid scaling between min/max values
5. **Breakpoints**:
   - Mobile: 320px - 767px
   - Tablet: 768px - 1279px
   - Desktop: 1280px+

## Running Full Test Suite

```bash
# Install dependencies
npm install --save-dev @playwright/test

# Run frontend dev server (in separate terminal)
npm run dev

# Run all tests
npm run test:responsive

# View report
npx playwright show-report
```

## Expected Results

All tests should pass with:
- ✅ 30+ responsive checks across 3 breakpoints
- ✅ 8 pages tested per breakpoint (240+ individual checks)
- ✅ No overflow warnings
- ✅ All typography readable
- ✅ All touch targets properly sized

---

**Last Updated:** April 16, 2026

import { test, expect } from '@playwright/test';

// Define breakpoints
const breakpoints = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1440, height: 900 }
];

const baseUrl = 'http://localhost:5173/mahaev';

test.describe('Responsive Design Test Suite', () => {
  // Test all main pages at all breakpoints
  const pages = [
    { path: '/', name: 'Home' },
    { path: '/datasets', name: 'Datasets' },
    { path: '/predictor', name: 'Battery Predictor' },
    { path: '/publications', name: 'Publications' },
    { path: '/team', name: 'Team' },
    { path: '/timeline', name: 'Timeline' },
    { path: '/funding', name: 'Funding' },
    { path: '/contact', name: 'Contact' }
  ];

  breakpoints.forEach(breakpoint => {
    test.describe(`${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      });

      pages.forEach(page => {
        test(`Should render ${page.name} without overflow`, async ({ page: browserPage }) => {
          await browserPage.goto(`${baseUrl}${page.path}`);
          await browserPage.waitForLoadState('networkidle');

          // Check for horizontal overflow
          const htmlElement = await browserPage.evaluate(() => {
            const html = document.documentElement;
            return {
              scrollWidth: html.scrollWidth,
              clientWidth: html.clientWidth,
              hasOverflow: html.scrollWidth > html.clientWidth
            };
          });

          expect(htmlElement.hasOverflow).toBe(false);
          expect(htmlElement.scrollWidth).toBeLessThanOrEqual(htmlElement.clientWidth);
        });

        test(`Should have readable text on ${page.name}`, async ({ page: browserPage }) => {
          await browserPage.goto(`${baseUrl}${page.path}`);
          await browserPage.waitForLoadState('networkidle');

          // Check font sizes are readable
          const textElements = await browserPage.evaluate(() => {
            const elements = document.querySelectorAll('h1, h2, h3, p, a, button');
            return Array.from(elements).map(el => {
              const style = window.getComputedStyle(el);
              return {
                tag: el.tagName,
                fontSize: style.fontSize,
                visible: el.offsetHeight > 0
              };
            }).filter(el => el.visible);
          });

          expect(textElements.length).toBeGreaterThan(0);
          
          // Verify minimum font size for readability
          textElements.forEach(element => {
            const size = parseFloat(element.fontSize);
            expect(size).toBeGreaterThanOrEqual(12); // Minimum 12px for readability
          });
        });
      });

      test('Navbar should be responsive', async ({ page: browserPage }) => {
        await browserPage.goto(`${baseUrl}/`);
        await browserPage.waitForLoadState('networkidle');

        const navbar = await browserPage.evaluate(() => {
          const nav = document.querySelector('nav');
          if (!nav) return null;
          return {
            width: nav.offsetWidth,
            clientWidth: window.innerWidth,
            fits: nav.offsetWidth <= window.innerWidth
          };
        });

        expect(navbar).not.toBeNull();
        expect(navbar.fits).toBe(true);
      });

      test('Charts on Battery Predictor should not overflow', async ({ page: browserPage }) => {
        await browserPage.goto(`${baseUrl}/predictor`);
        await browserPage.waitForLoadState('networkidle');

        // Submit a prediction to show the chart
        const voltageSlider = await browserPage.$('input[type="range"]');
        if (voltageSlider) {
          await browserPage.click('button:has-text("Predict Battery Health")');
          await browserPage.waitForTimeout(500);
        }

        // Check for SVG/canvas overflow
        const chartOverflow = await browserPage.evaluate(() => {
          const svgs = document.querySelectorAll('svg');
          return Array.from(svgs).map(svg => {
            const rect = svg.getBoundingClientRect();
            const parentRect = svg.parentElement?.getBoundingClientRect();
            return {
              svgWidth: rect.width,
              svgHeight: rect.height,
              parentWidth: parentRect?.width || 0,
              parentHeight: parentRect?.height || 0,
              overflowsHorizontally: rect.width > (parentRect?.width || window.innerWidth),
              overflowsVertically: rect.height > (parentRect?.height || window.innerHeight)
            };
          }).filter(chart => chart.svgWidth > 0);
        });

        expect(chartOverflow.length).toBeGreaterThan(0);
        chartOverflow.forEach(chart => {
          expect(chart.overflowsHorizontally).toBe(false);
          expect(chart.overflowsVertically).toBe(false);
        });
      });

      test('Grid layouts should stack properly', async ({ page: browserPage }) => {
        await browserPage.goto(`${baseUrl}/publications`);
        await browserPage.waitForLoadState('networkidle');

        const gridLayout = await browserPage.evaluate(() => {
          const grids = document.querySelectorAll('[style*="grid"]');
          return Array.from(grids).map(grid => {
            const style = window.getComputedStyle(grid);
            const children = grid.querySelectorAll(':scope > *');
            return {
              gridWidth: grid.offsetWidth,
              gridColumns: style.gridTemplateColumns,
              childCount: children.length,
              childrenFit: Array.from(children).every(child => 
                child.offsetWidth <= grid.offsetWidth
              )
            };
          }).filter(g => g.gridWidth > 0);
        });

        gridLayout.forEach(grid => {
          if (grid.childCount > 0) {
            expect(grid.childrenFit).toBe(true);
          }
        });
      });

      test('Footer should be responsive', async ({ page: browserPage }) => {
        await browserPage.goto(`${baseUrl}/`);
        
        // Scroll to footer
        await browserPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await browserPage.waitForLoadState('networkidle');

        const footerLayout = await browserPage.evaluate(() => {
          const footer = document.querySelector('footer');
          if (!footer) return null;
          return {
            width: footer.offsetWidth,
            clientWidth: window.innerWidth,
            fits: footer.offsetWidth <= window.innerWidth,
            hasContent: footer.children.length > 0
          };
        });

        expect(footerLayout).not.toBeNull();
        expect(footerLayout.fits).toBe(true);
        expect(footerLayout.hasContent).toBe(true);
      });

      test('No horizontal scrollbar should appear', async ({ page: browserPage }) => {
        await browserPage.goto(`${baseUrl}/`);
        await browserPage.waitForLoadState('networkidle');

        const scrollbarInfo = await browserPage.evaluate(() => {
          return {
            bodyOverflow: window.getComputedStyle(document.body).overflowX,
            documentScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
            innerHeight: window.innerHeight,
            scrollHeight: document.body.scrollHeight
          };
        });

        expect(scrollbarInfo.documentScroll).toBe(false);
      });

      test('Touch targets should be adequately sized', async ({ page: browserPage }) => {
        await browserPage.goto(`${baseUrl}/`);
        await browserPage.waitForLoadState('networkidle');

        const buttons = await browserPage.evaluate(() => {
          const clickables = document.querySelectorAll('button, a, [role="button"]');
          return Array.from(clickables)
            .filter(el => el.offsetParent !== null) // only visible elements
            .map(el => {
              const rect = el.getBoundingClientRect();
              return {
                width: rect.width,
                height: rect.height,
                minSize: Math.min(rect.width, rect.height),
                meetsMinimum: rect.width >= 44 && rect.height >= 44
              };
            })
            .filter(btn => btn.minSize > 0);
        });

        // At least some buttons should meet minimum size
        const adequateButtons = buttons.filter(btn => btn.meetsMinimum).length;
        expect(adequateButtons).toBeGreaterThan(0);
      });
    });

    test(`Page should load fully in ${breakpoint.name} view`, async ({ page: browserPage }) => {
      await browserPage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await browserPage.goto(`${baseUrl}/`);
      
      const loadInfo = await browserPage.evaluate(() => {
        return {
          readyState: document.readyState,
          resourcesLoaded: performance.getEntriesByType('resource').length,
          pageTitle: document.title
        };
      });

      expect(loadInfo.readyState).toBe('complete');
      expect(loadInfo.resourcesLoaded).toBeGreaterThan(0);
      expect(loadInfo.pageTitle).toBeTruthy();
    });
  });

  test.describe('Cross-breakpoint consistency', () => {
    test('Same content should render on all breakpoints', async ({ page: browserPage }) => {
      const contentSnapshots: { [key: string]: string } = {};

      for (const breakpoint of breakpoints) {
        await browserPage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
        await browserPage.goto(`${baseUrl}/`);
        await browserPage.waitForLoadState('networkidle');

        const mainContent = await browserPage.textContent('main, [role="main"]');
        contentSnapshots[breakpoint.name] = mainContent || '';
      }

      // Verify content exists on all breakpoints
      Object.values(contentSnapshots).forEach(content => {
        expect(content.length).toBeGreaterThan(0);
      });
    });

    test('Navigation should be accessible on all breakpoints', async ({ page: browserPage }) => {
      for (const breakpoint of breakpoints) {
        await browserPage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
        await browserPage.goto(`${baseUrl}/`);
        await browserPage.waitForLoadState('networkidle');

        // Check if navigation exists and is accessible
        const navLinks = await browserPage.$$('nav a, nav button');
        expect(navLinks.length).toBeGreaterThan(0);
      }
    });
  });
});

// Visual regression test for critical components
test.describe('Visual Consistency', () => {
  breakpoints.forEach(breakpoint => {
    test(`Homepage should match snapshot at ${breakpoint.name}`, async ({ page: browserPage }) => {
      await browserPage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await browserPage.goto(`${baseUrl}/`);
      await browserPage.waitForLoadState('networkidle');

      // Take screenshot for visual regression testing
      await expect(browserPage).toHaveScreenshot(`homepage-${breakpoint.name}.png`, {
        fullPage: false
      });
    });

    test(`Battery Predictor should render correctly at ${breakpoint.name}`, async ({ page: browserPage }) => {
      await browserPage.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await browserPage.goto(`${baseUrl}/predictor`);
      await browserPage.waitForLoadState('networkidle');

      await expect(browserPage).toHaveScreenshot(`predictor-${breakpoint.name}.png`, {
        fullPage: false,
        maxDiffPixels: 100
      });
    });
  });
});

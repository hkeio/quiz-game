import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false, devtools: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE size for mobile testing
  });
  const page = await context.newPage();

  // Listen for console messages
  page.on('console', (msg) => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  // Listen for page errors
  page.on('pageerror', (error) => {
    console.error('Page error:', error);
  });

  await page.goto('http://localhost:4200');

  console.log('Page loaded. Check the browser window.');
  console.log('Press Ctrl+C to close.');

  // Keep the browser open
  await new Promise(() => {});
})();

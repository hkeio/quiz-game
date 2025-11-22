import { test } from '@playwright/test';

test('capture screenshots', async ({ page }) => {
  // Desktop view
  await page.goto('/');
  await page.screenshot({ path: 'screenshots/desktop-question-1.png', fullPage: true });

  // Select an answer
  await page.locator('.answer-button').nth(1).click();
  await page.screenshot({ path: 'screenshots/desktop-answer-selected.png', fullPage: true });

  // Complete the quiz
  await page.locator('.btn-primary').click();
  await page.locator('.answer-button').first().click();
  await page.locator('.btn-primary').click();
  await page.locator('.answer-button').first().click();
  await page.locator('.btn-primary').click();
  await page.locator('.answer-button').first().click();
  await page.locator('.btn-primary').click();
  await page.locator('.answer-button').first().click();
  await page.locator('.btn-primary').click();

  // Summary screen
  await page.screenshot({ path: 'screenshots/desktop-summary.png', fullPage: true });

  // Mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.locator('text=Restart Quiz').click();
  await page.screenshot({ path: 'screenshots/mobile-question-1.png', fullPage: true });

  await page.locator('.answer-button').first().click();
  await page.screenshot({ path: 'screenshots/mobile-answer-selected.png', fullPage: true });
});

import { expect, test } from '@playwright/test';

test('check for console errors', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  await page.goto('/');

  // Wait a bit for any errors to surface
  await page.waitForTimeout(2000);

  // Test basic functionality
  await expect(page.locator('.question-text')).toBeVisible();
  await page.locator('.answer-button').first().click();
  await expect(page.locator('.answer-button').first()).toHaveClass(/selected/);

  console.log('Console errors:', errors.length > 0 ? errors : 'None');
  expect(errors).toHaveLength(0);
});

test('test on mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  await expect(page.locator('.quiz-container')).toBeVisible();
  await expect(page.locator('.question-text')).toBeVisible();

  // Test touch interaction
  await page.locator('.answer-button').nth(1).click();
  await expect(page.locator('.answer-button').nth(1)).toHaveClass(/selected/);

  await page.locator('.btn-primary').click();
  await expect(page.locator('.progress-text')).toContainText('Question 2');
});

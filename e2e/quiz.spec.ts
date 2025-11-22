import { expect, test } from '@playwright/test';

test.describe('Quiz App', () => {
  test('should load the app and show first question', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toContainText('Quiz App');
    await expect(page.locator('.question-text')).toBeVisible();
    await expect(page.locator('.progress-text')).toContainText('Question 1 of 5');
  });

  test('should allow answering questions and show summary', async ({ page }) => {
    await page.goto('/');

    // Answer first question
    await page.locator('.answer-button').first().click();
    await page.locator('.btn-primary').click();

    // Should move to second question
    await expect(page.locator('.progress-text')).toContainText('Question 2 of 5');

    // Answer remaining questions
    for (let i = 0; i < 4; i++) {
      await page.locator('.answer-button').first().click();
      await page.locator('.btn-primary').click();
    }

    // Should show summary
    await expect(page.locator('.summary-title')).toContainText('Quiz Complete');
    await expect(page.locator('.stat-label')).toHaveCount(3);
  });

  test('should allow navigating back to previous questions', async ({ page }) => {
    await page.goto('/');

    // Answer first question
    await page.locator('.answer-button').first().click();
    await page.locator('.btn-primary').click();

    // Go back
    await page.locator('.btn-secondary').click();

    // Should be back at question 1
    await expect(page.locator('.progress-text')).toContainText('Question 1 of 5');
  });

  test('should restart quiz from summary', async ({ page }) => {
    await page.goto('/');

    // Complete quiz
    for (let i = 0; i < 5; i++) {
      await page.locator('.answer-button').first().click();
      await page.locator('.btn-primary').click();
    }

    // Restart
    await page.locator('text=Restart Quiz').click();

    // Should be back at question 1
    await expect(page.locator('.progress-text')).toContainText('Question 1 of 5');
  });
});

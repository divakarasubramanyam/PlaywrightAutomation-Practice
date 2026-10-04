import { test, expect } from '@playwright/test';

test.describe('Playwright Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('should have the correct title',
    {tag : '@smokeTest'}, 
    async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get Started link is visible',
    {tag : '@smokeTest'}, 
    async ({ page }) => {
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await expect(getStartedLink).toBeVisible();
    await getStartedLink.click();
    await page.getByRole('heading', { name: 'Installation' }).waitFor();
    await expect(page).toHaveURL(/.*intro/);
  });

  test('should navigate to the documentation page',
    {tag : '@smokeTest'}, 
    async ({ page }) => {
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/.*docs/);
  });

  test.fixme('this title is still incorrect - tracked in JIRA-1234', async ({ page }) => {
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveTitle(/Nonexistent Title/);
  });
});






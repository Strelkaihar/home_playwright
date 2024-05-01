import { test, expect } from '@playwright/test'

test.describe('Interview', () => {
  test('Open browser', async ({ page }) => {
    await page.goto('https://www.santanderbank.com')
    // const logo = page.locator('.rnav-logo:nth-child(3) img')
    // await expect(logo).toBeVisible()
    const findBranch = page.locator('.rnav-xtra .nav-locator')
    await findBranch.click()
    const searchField = page.locator('#q')
    await expect(searchField).toBeVisible()
    await searchField.fill('new york city, NY, US')
    await page.getByTitle('Santander Bank | ATM - CVS #4996691').click()
    await expect(page.locator('.location-type > span').nth(2)).toHaveText('4996691')
  })
})

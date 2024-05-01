import { test as base } from '@playwright/test'
import { FormElementsPage } from '../pages/FormElementsPage'
import { LoginFunctionPage } from '../pages/LoginFunctionPage'

//Declare the types of your fixtures
type MyFixture = {
  formElementsPage: FormElementsPage
  loginFunctionPage: LoginFunctionPage
}

// Extend the base test to include your custom fixtures.
export const test = base.extend<MyFixture>({
  // Define the fixture name and provide the fixture function
  formElementsPage: async ({ page }, use) => {
    // Create the todoPage fixture instance
    // This is the Setup Phase (beforeEach)
    const formElementsPage = new FormElementsPage(page)
    // Test runner pauses the execution to allow your test to perform actions
    // Teardown logic is here to remove all items.
    await formElementsPage.goto()
    await use(formElementsPage)
    await page.close()
  },
  loginFunctionPage: async ({ page }, use) => {
    // Create the todoPage fixture instance
    // This is the Setup Phase (beforeEach)
    const loginFunctionPage = new LoginFunctionPage(page)
    // Test runner pauses the execution to allow your test to perform actions
    // Teardown logic is here to remove all items.(beforeeach)
    await loginFunctionPage.goto()
    await use(loginFunctionPage)
    await page.close()
    // after each logic
  },
})

export { expect } from '@playwright/test'

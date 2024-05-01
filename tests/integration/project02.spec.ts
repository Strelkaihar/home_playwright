import { expect, test } from '../../fixtures/page-object-fixture'

test.describe('Project 2 Login Form', () => {
  test('Test Case 01 - Validate the login form', async ({ loginFunctionPage, page }) => {
    await expect(loginFunctionPage.userName).toBeVisible()
    await expect(loginFunctionPage.userName).not.toHaveAttribute('required')
    await expect(loginFunctionPage.userNameLabel).toHaveText('Please enter your username')

    await expect(loginFunctionPage.password).toBeVisible()
    await expect(loginFunctionPage.password).not.toHaveAttribute('required')
    await expect(loginFunctionPage.passwordLabel).toHaveText('Please enter your password')

    await expect(loginFunctionPage.loginButton).toBeVisible()
    await expect(loginFunctionPage.loginButton).toBeEnabled()
    await expect(loginFunctionPage.loginButton).toHaveText('LOGIN')

    await expect(loginFunctionPage.forgotLink).toBeVisible()
    await expect(loginFunctionPage.forgotLink).toBeEnabled()
    await expect(loginFunctionPage.forgotLink).toHaveText('Forgot Password?')
  })
  test('Test Case 02 - Validate the valid login', async ({ loginFunctionPage, page }) => {
    await loginFunctionPage.fillForm('LOGIN')

    await expect(loginFunctionPage.successMessage).toHaveText('You are logged in')
    await expect(loginFunctionPage.successMessage).toBeVisible()
    await expect(loginFunctionPage.logoutButton).toBeVisible()
    await expect(loginFunctionPage.logoutButton).toBeEnabled()
  })
  test('Test Case 03 - Validate the logout', async ({ loginFunctionPage, page }) => {
    await loginFunctionPage.fillForm('LOGIN')
    await loginFunctionPage.clickButtonByName('LOGOUT')
    await expect(loginFunctionPage.logoutButton).not.toBeVisible()
    await expect(loginFunctionPage.loginForm).toHaveText('Login Form')
  })
})

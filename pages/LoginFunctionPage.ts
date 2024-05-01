import { type Page, type Locator } from '@playwright/test'

export class LoginFunctionPage {
  readonly page: Page
  readonly userName: Locator
  readonly password: Locator
  readonly userNameLabel: Locator
  readonly passwordLabel: Locator
  readonly loginButton: Locator
  readonly submitButton: Locator
  readonly closeButton: Locator
  readonly email: Locator
  readonly forgotLink: Locator
  readonly successMessage: Locator
  readonly logoutButton: Locator
  readonly loginForm: Locator

  constructor(page: Page) {
    this.page = page
    this.userName = page.locator('#username')
    this.password = page.locator('#password')
    this.userNameLabel = page.getByText('Please enter your username')
    this.passwordLabel = page.getByText('Please enter your password')
    this.loginButton = page.locator('#login_btn')
    this.submitButton = page.locator('#submit')
    this.closeButton = page.locator('.delete')
    this.email = page.locator('#email')
    this.forgotLink = page.locator('[href="/frontend/project-2"]')
    this.successMessage = page.locator('#success_lgn')
    this.logoutButton = page.locator('#logout')
    this.loginForm = page.locator('.is-size-3')
  }
  async goto() {
    await this.page.goto(process.env.PROJECT02_URL)
  }
  async clickLogin() {
    await this.loginButton.click()
  }
  async clickLogout() {
    await this.logoutButton.click()
  }
  async clickButtonByName(name: string) {
    await this.page.getByRole('button', { name: `${name}` }).click()
  }
  async fillForm(name: string) {
    await this.userName.fill(process.env.USERNAME)
    await this.password.fill(process.env.PASSWORD)
    await this.clickButtonByName(name)
  }
}

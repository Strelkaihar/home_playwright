import { type Locator, type Page } from '@playwright/test'

export class FormElementsPage {
  readonly page: Page
  readonly contactInfo: Locator
  readonly fullNameInput: Locator
  readonly label: Locator
  readonly radio: Locator
  readonly radioButton: Locator
  readonly input: Locator
  readonly checkBox: Locator
  readonly validateMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.contactInfo = page.locator('.mb-5 *')
    this.fullNameInput = page.getByPlaceholder('Enter your full name')
    this.label = page.locator('.label')
    this.radio = page.locator('.radio')
    this.radioButton = page.locator('.mr-1')
    this.input = page.locator('.control')
    this.checkBox = page.locator('[class="checkbox"] > input')
    this.validateMessage = page.locator('.mt-5')
  }
  async goto() {
    await this.page.goto(process.env.PROJECT01_URL)
  }
  async clickCheckBox(name: string) {
    await this.page.getByRole('checkbox', { name: `${name}` }).click()
  }
  async fillForm(name: string[], data: string[]) {
    for (let i = 0; i < name.length; i++) {
      await this.input.getByPlaceholder(`${name[i]}`).fill(data[i])
    }
  }
  async clickButton(name: string) {
    await this.page.getByRole('button', { name: `${name}` }).click()
  }
}

import { expect, test } from '../../fixtures/page-object-fixture'

test.describe('Project 1 Form Elements', () => {
  test('Test Case 01 - Validate the Contact Us information', async ({ formElementsPage, page }) => {
    await expect(page).toHaveURL('https://techglobal-training.com/frontend/project-1')

    const data = [
      'Contact Us',
      '2800 S River Rd Suite 310, Des Plaines, IL 60018',
      'info@techglobalschool.com',
      '(224) 580-2150',
    ]
    await expect(formElementsPage.contactInfo).toHaveText(data)
  })

  test('Test Case 02 - Validate the Full name input box', async ({ formElementsPage }) => {
    const fullName = formElementsPage.input.getByPlaceholder('Enter your full name')
    await expect(fullName).toBeVisible()
    await expect(fullName).toHaveAttribute('required')
    await expect(formElementsPage.label.filter({ hasText: 'Full name *' })).toHaveText('Full name *')
    await expect(fullName).toHaveAttribute('placeholder', 'Enter your full name')
  })

  test('Test Case 03 - Validate the Gender radio button', async ({ formElementsPage, page }) => {
    await expect(formElementsPage.label.filter({ hasText: 'Gender *' })).toHaveText('Gender *')
    await expect(formElementsPage.label.filter({ hasText: 'Gender *' })).not.toHaveAttribute('required')

    const radioInfo = ['Male', 'Female', 'Prefer not to disclose']
    await expect(formElementsPage.radio).toHaveText(radioInfo)

    const countEl = await formElementsPage.radioButton.count()
    for (let i = 0; i < countEl; i++) {
      await expect(formElementsPage.radioButton.nth(i)).not.toBeChecked()
    }
    const male = page.getByLabel('Male', { exact: true })
    const female = page.getByLabel('Female', { exact: true })
    const notDisclose = page.getByLabel('Prefer not to disclose', { exact: true })

    await male.check()
    if (await male.isChecked()) {
      await expect(female).not.toBeChecked()
      await expect(notDisclose).not.toBeChecked()
    }
    await female.check()
    if (await female.isChecked()) {
      await expect(male).not.toBeChecked()
      await expect(notDisclose).not.toBeChecked()
    }
  })
  test('Test Case 04 - Validate the Address input box', async ({ formElementsPage }) => {
    const address = formElementsPage.input.getByPlaceholder('Enter your address')
    await expect(address).toBeVisible()
    await expect(address).not.toHaveAttribute('required')
    await expect(formElementsPage.label.filter({ hasText: 'Address' })).toHaveText('Address')
    await expect(address).toHaveAttribute('placeholder', 'Enter your address')
  })
  test('Test Case 05 - Validate the Email input box', async ({ formElementsPage }) => {
    const email = formElementsPage.input.getByPlaceholder('Enter your email')
    await expect(email).toBeVisible()
    await expect(email).toHaveAttribute('required')
    await expect(formElementsPage.label.filter({ hasText: 'Email *' })).toHaveText('Email *')
    await expect(email).toHaveAttribute('placeholder', 'Enter your email')
  })
  test('Test Case 06 - Validate the Phone input box', async ({ formElementsPage }) => {
    const phone = formElementsPage.input.getByPlaceholder('Enter your phone number')
    await expect(phone).toBeVisible()
    await expect(phone).not.toHaveAttribute('required')
    await expect(formElementsPage.label.filter({ hasText: 'Phone' })).toHaveText('Phone')
    await expect(phone).toHaveAttribute('placeholder', 'Enter your phone number')
  })
  test('Test Case 07 - Validate the Message text area', async ({ formElementsPage }) => {
    const message = formElementsPage.input.getByPlaceholder('Type your message here...')
    await expect(message).toBeVisible()
    await expect(message).not.toHaveAttribute('required')
    await expect(formElementsPage.label.filter({ hasText: 'Message' })).toHaveText('Message')
    await expect(message).toHaveAttribute('placeholder', 'Type your message here...')
  })
  test('Test Case 08 - Validate the Consent checkbox', async ({ formElementsPage }) => {
    const check = formElementsPage.input.getByText('I give my consent to be contacted.')
    // await expect(check).toHaveText(' I give my consent to be contacted.')
    await expect(check).toHaveText('I give my consent to be contacted.')
    await expect(formElementsPage.checkBox).toHaveAttribute('required')
    await expect(formElementsPage.checkBox).toBeEnabled()
    await formElementsPage.clickCheckBox('I give my consent to be contacted.')
    await expect(formElementsPage.checkBox).toBeChecked()
    await formElementsPage.clickCheckBox('I give my consent to be contacted.')
    await expect(formElementsPage.checkBox).not.toBeChecked()
  })
  test('Test Case 09 - Validate the SUBMIT button', async ({ formElementsPage }) => {
    const submit = formElementsPage.input.getByText('SUBMIT')
    await expect(submit).toBeVisible()
    await expect(submit).toBeEnabled()
    await expect(submit).toHaveText('SUBMIT')
  })
  test('Test Case 10 - Validate the form submission', async ({ formElementsPage }) => {
    const name: string[] = [
      'Enter your full name',
      'Enter your address',
      'Enter your email',
      'Enter your phone number',
      'Type your message here...',
    ]
    const data: string[] = ['Igor', '1323 W Morse', 'Igor@ff', '312877', 'Hello Yuara']
    await formElementsPage.fillForm(name, data)
    await formElementsPage.clickCheckBox('I give my consent to be contacted.')
    await formElementsPage.input.getByText('Male', { exact: true }).check()
    await formElementsPage.clickButton('SUBMIT')
    await expect(formElementsPage.validateMessage).toHaveText('Thanks for submitting!')
  })
})

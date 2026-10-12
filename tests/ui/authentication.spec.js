import { test, expect } from '@playwright/test';
import { AccountPage } from '../../pages/AccountPage.js';

test('AUTH-005: login page exposes email, password and submit controls', async ({ page }) => {
  const accountPage = new AccountPage(page);

  await accountPage.gotoLogin();

  await expect(page).toHaveTitle('Account Login');
  await expect(accountPage.loginEmail).toBeVisible();
  await expect(accountPage.loginPassword).toBeVisible();
  await expect(accountPage.loginButton).toBeVisible();
});

test('AUTH-001: blank registration shows observed required-field errors', async ({ page }) => {
  const accountPage = new AccountPage(page);

  await accountPage.gotoRegistration();

  await expect(page).toHaveTitle('Register Account');
  await expect(accountPage.registrationFirstName).toBeVisible();
  await expect(accountPage.registrationLastName).toBeVisible();
  await expect(accountPage.registrationEmail).toBeVisible();
  await expect(accountPage.registrationTelephone).toBeVisible();
  await expect(accountPage.registrationPassword).toBeVisible();
  await expect(accountPage.registrationPasswordConfirm).toBeVisible();
  await expect(accountPage.registrationAgreement).toBeVisible();
  await expect(accountPage.registrationSubmit).toBeVisible();

  await accountPage.registrationSubmit.click();

  await expect(page.getByText('First Name must be between 1 and 32 characters!', { exact: true })).toBeVisible();
  await expect(page.getByText('Last Name must be between 1 and 32 characters!', { exact: true })).toBeVisible();
  await expect(page.getByText('E-Mail Address does not appear to be valid!', { exact: true })).toBeVisible();
  await expect(page.getByText('Telephone must be between 3 and 32 characters!', { exact: true })).toBeVisible();
  await expect(page.getByText('Password must be between 4 and 20 characters!', { exact: true })).toBeVisible();
  await expect(page.getByText('Warning: You must agree to the Privacy Policy!', { exact: false })).toBeVisible();
});

export class AccountPage {
  constructor(page) {
    this.page = page;
    this.loginEmail = page.getByLabel('E-Mail Address', { exact: true });
    this.loginPassword = page.getByLabel('Password', { exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });

    this.registrationFirstName = page.getByPlaceholder('First Name', { exact: true });
    this.registrationLastName = page.getByPlaceholder('Last Name', { exact: true });
    this.registrationEmail = page.getByPlaceholder('E-Mail', { exact: true });
    this.registrationTelephone = page.getByPlaceholder('Telephone', { exact: true });
    this.registrationPassword = page.getByPlaceholder('Password', { exact: true });
    this.registrationPasswordConfirm = page.getByPlaceholder('Password Confirm', { exact: true });
    this.registrationAgreement = page.getByRole('checkbox');
    this.registrationSubmit = page.getByRole('button', { name: 'Continue', exact: true });
  }

  async gotoLogin() {
    await this.page.goto('/index.php?route=account/login');
  }

  async gotoRegistration() {
    await this.page.goto('/index.php?route=account/register');
  }
}

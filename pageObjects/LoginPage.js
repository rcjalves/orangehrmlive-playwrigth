const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
    this.invalidCredentialsAlert = '.oxd-alert';
    this.forgotPasswordLink = '.orangehrm-login-forgot';
    this.companyBranding = '.orangehrm-login-branding';
  }

  async navigateToLoginPage() {
    await this.navigate('/web/index.php/auth/login');
    await this.waitForElement(this.usernameInput);
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getInvalidCredentialsMessage() {
    await this.waitForElement(this.invalidCredentialsAlert);
    return await this.getElementText(this.invalidCredentialsAlert);
  }

  async isLoggedIn() {
    return await this.page.waitForURL('**/dashboard/index', { timeout: 10000 })
      .then(() => true)
      .catch(() => false);
  }

  async clickForgotPassword() {
    await this.page.click(this.forgotPasswordLink);
  }
}

module.exports = LoginPage;
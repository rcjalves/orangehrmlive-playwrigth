const BasePage = require('./BasePage');

/**
 * Page object for the Login page
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
    this.invalidCredentialsAlert = '.oxd-alert';
    this.forgotPasswordLink = '.orangehrm-login-forgot';
    this.companyBranding = '.orangehrm-login-branding';
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage() {
    await this.navigate('/web/index.php/auth/login');
    await this.waitForElement(this.usernameInput);
  }

  /**
   * Login with username and password
   * @param {string} username - The username
   * @param {string} password - The password
   */
  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  /**
   * Get invalid credentials alert text
   * @returns {Promise<string>} Alert text
   */
  async getInvalidCredentialsMessage() {
    await this.waitForElement(this.invalidCredentialsAlert);
    return await this.getElementText(this.invalidCredentialsAlert);
  }

  /**
   * Check if user is logged in (by checking dashboard is loaded)
   * @returns {Promise<boolean>} True if logged in
   */
  async isLoggedIn() {
    return await this.page.waitForURL('**/dashboard/index', { timeout: 10000 })
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Click on Forgot Password link
   */
  async clickForgotPassword() {
    await this.page.click(this.forgotPasswordLink);
  }
}

module.exports = LoginPage;
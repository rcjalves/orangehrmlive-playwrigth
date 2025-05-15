const BasePage = require('./BasePage');

class AdminPage extends BasePage {
  constructor(page) {
    super(page);

    this.addButton = 'button:has-text("Add")';
    this.userRoleDropdown = '.oxd-select-wrapper';
    this.userRoleOptions = '.oxd-select-dropdown';
    this.employeeNameInput = 'input[placeholder="Type for hints..."]';
    this.statusDropdown = '.oxd-select-wrapper';
    this.usernameInput = 'input.oxd-input.oxd-input--active[autocomplete="off"]:nth-of-type(1)';
    this.passwordInput = '(//input[contains(@class, "oxd-input") and @type="password"])[1]';
    this.confirmPasswordInput = '(//input[contains(@class, "oxd-input") and @type="password"])[2]';

    this.saveButton = 'button[type="submit"]';
    this.successMessage = '.oxd-toast';
    this.userSearchInput = '.oxd-form .oxd-input';
    this.searchButton = '.oxd-form-actions button[type="submit"]';
    this.resetButton = '.oxd-form-actions button[type="reset"]';
    this.userTable = '.oxd-table-body';
    this.userRow = '.oxd-table-card';
    this.userCheckbox = '.oxd-table-row .oxd-checkbox-input';
    this.deleteButton = '.oxd-button--label-danger';
    this.deleteConfirmButton = '.oxd-button--label-danger';
    this.editButton = '.oxd-table-cell-actions .oxd-icon-button:nth-child(2)';
  }


  async navigateToAdminPage() {
    await this.navigate('/web/index.php/admin/viewSystemUsers');
    await this.waitForElement(this.addButton);
  }

  async clickAddButton() {
    await this.page.click(this.addButton);
    await this.waitForElement(this.userRoleDropdown);
  }

  async selectUserRole(role) {
    const dropdowns = await this.page.locator(this.userRoleDropdown).all();
    await dropdowns[0].click();
    await this.waitForElement(this.userRoleOptions);
    await this.page.getByRole('option', { name: role }).click();
  }

  async enterEmployeeName(name) {
    await this.page.fill(this.employeeNameInput, name);
    await this.page.waitForTimeout(4000); // Wait for autocomplete
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  async selectStatus(status) {
    const dropdowns = await this.page.locator(this.statusDropdown).all();
    await dropdowns[1].click();
    await this.waitForElement(this.userRoleOptions);
    await this.page.getByRole('option', { name: status }).click();
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.locator(`xpath=${this.passwordInput}`).fill(password);
  }

  async enterConfirmPassword(password) {
    await this.page.locator(`xpath=${this.confirmPasswordInput}`).fill(password);
  }

  async saveUser() {
    await this.page.click(this.saveButton);
  }

  async isSuccessMessageDisplayed() {
    await this.waitForElement(this.successMessage);
    return await this.isElementVisible(this.successMessage);
  }

  async searchUser(username) {
    const searchInputs = await this.page.locator(this.userSearchInput).all();
    await searchInputs[1].fill(username);
    await this.page.click(this.searchButton);
    await this.page.waitForTimeout(2000); // Wait for search results
  }

  async isUserExist(username) {
    const userText = await this.page.locator(this.userTable).textContent();
    return userText.includes(username);
  }

  async deleteUser(username) {
    await this.searchUser(username);
    const checkboxes = await this.page.locator(this.userCheckbox).all();
    await checkboxes[0].click();
    await this.page.click(this.deleteButton);
    await this.waitForElement(this.deleteConfirmButton);
    await this.page.click(this.deleteConfirmButton);
  }

  async editUser(username) {
    await this.searchUser(username);
    const editButtons = await this.page.locator(this.editButton).all();
    await editButtons[0].click();
  }
}

module.exports = AdminPage;
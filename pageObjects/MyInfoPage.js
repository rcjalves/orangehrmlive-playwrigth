const BasePage = require('./BasePage');

class MyInfoPage extends BasePage {
  constructor(page) {
    super(page);

    this.personalDetailsTab = '.orangehrm-tabs-wrapper .orangehrm-tabs-item';
    this.firstNameInput = 'input[name="firstName"]';
    this.middleNameInput = 'input[name="middleName"]';
    this.lastNameInput = 'input[name="lastName"]';
    this.employeeIdInput = '.oxd-input-field-bottom-space input:nth-child(2)';
    this.saveButton = 'button[type="submit"]';
    this.successMessage = '.oxd-toast';
    this.genderRadioInputs = '[type="radio"]';
    this.nationalityDropdown = '.oxd-select-wrapper';
    this.nationalityOptions = '.oxd-select-dropdown';
    this.maritalStatusDropdown = '.oxd-select-wrapper';
    this.dateOfBirthInput = 'input[placeholder="yyyy-mm-dd"]';
  }

  async navigateToMyInfoPage() {
    await this.navigate('/web/index.php/pim/viewMyDetails');
    await this.waitForElement(this.personalDetailsTab);
  }

  async updateFirstName(firstName) {
    await this.page.waitForSelector(this.firstNameInput);
    await this.page.fill(this.firstNameInput, firstName);
  }

  async updateMiddleName(middleName) {
    await this.page.waitForSelector(this.middleNameInput);
    await this.page.fill(this.middleNameInput, middleName);
  }

  async updateLastName(lastName) {
    await this.page.waitForSelector(this.lastNameInput);
    await this.page.fill(this.lastNameInput, lastName);
  }

  async selectGender(gender) {
    await this.page.waitForSelector(this.genderRadioInputs);
    const radioButtons = await this.page.locator(this.genderRadioInputs).all();
    if (gender.toLowerCase() === 'male') {
      await radioButtons[0].check();
    } else if (gender.toLowerCase() === 'female') {
      await radioButtons[1].check();
    }
  }

  async selectNationality(nationality) {
    const dropdowns = await this.page.locator(this.nationalityDropdown).all();
    await dropdowns[0].click();
    await this.waitForElement(this.nationalityOptions);
    await this.page.getByRole('option', { name: nationality }).click();
  }

  async selectMaritalStatus(status) {
    const dropdowns = await this.page.locator(this.maritalStatusDropdown).all();
    await dropdowns[1].click();
    await this.waitForElement(this.nationalityOptions);
    await this.page.getByRole('option', { name: status }).click();
  }

  async setDateOfBirth(date) {
    await this.page.waitForSelector(this.dateOfBirthInput);
    await this.page.fill(this.dateOfBirthInput, date);
  }

  async savePersonalDetails() {
    const saveButtons = await this.page.locator(this.saveButton).all();
    await saveButtons[0].click();
  }

  async isSuccessMessageDisplayed() {
    await this.waitForElement(this.successMessage);
    return await this.isElementVisible(this.successMessage);
  }
}

module.exports = MyInfoPage;
const BasePage = require('./BasePage');

/**
 * Page object for the My Info page
 */
class MyInfoPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
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

  /**
   * Navigate to My Info page
   */
  async navigateToMyInfoPage() {
    await this.navigate('/web/index.php/pim/viewMyDetails');
    await this.waitForElement(this.personalDetailsTab);
  }

  /**
   * Update first name
   * @param {string} firstName - First name
   */
  async updateFirstName(firstName) {
    await this.page.waitForSelector(this.firstNameInput);
    await this.page.fill(this.firstNameInput, firstName);
  }

  /**
   * Update middle name
   * @param {string} middleName - Middle name
   */
  async updateMiddleName(middleName) {
    await this.page.waitForSelector(this.middleNameInput);
    await this.page.fill(this.middleNameInput, middleName);
  }

  /**
   * Update last name
   * @param {string} lastName - Last name
   */
  async updateLastName(lastName) {
    await this.page.waitForSelector(this.lastNameInput);
    await this.page.fill(this.lastNameInput, lastName);
  }

  /**
   * Select gender
   * @param {string} gender - Gender (Male or Female)
   */
  async selectGender(gender) {
    await this.page.waitForSelector(this.genderRadioInputs);
    const radioButtons = await this.page.locator(this.genderRadioInputs).all();
    if (gender.toLowerCase() === 'male') {
      await radioButtons[0].check();
    } else if (gender.toLowerCase() === 'female') {
      await radioButtons[1].check();
    }
  }

  /**
   * Select nationality
   * @param {string} nationality - Nationality
   */
  async selectNationality(nationality) {
    const dropdowns = await this.page.locator(this.nationalityDropdown).all();
    await dropdowns[0].click();
    await this.waitForElement(this.nationalityOptions);
    await this.page.getByRole('option', { name: nationality }).click();
  }

  /**
   * Select marital status
   * @param {string} status - Marital status (Single, Married, Other)
   */
  async selectMaritalStatus(status) {
    const dropdowns = await this.page.locator(this.maritalStatusDropdown).all();
    await dropdowns[1].click();
    await this.waitForElement(this.nationalityOptions);
    await this.page.getByRole('option', { name: status }).click();
  }

  /**
   * Set date of birth
   * @param {string} date - Date in yyyy-mm-dd format
   */
  async setDateOfBirth(date) {
    await this.page.waitForSelector(this.dateOfBirthInput);
    await this.page.fill(this.dateOfBirthInput, date);
  }

  /**
   * Save personal details
   */
  async savePersonalDetails() {
    const saveButtons = await this.page.locator(this.saveButton).all();
    await saveButtons[0].click();
  }

  /**
   * Check if success message is displayed
   * @returns {Promise<boolean>} True if success message is displayed
   */
  async isSuccessMessageDisplayed() {
    await this.waitForElement(this.successMessage);
    return await this.isElementVisible(this.successMessage);
  }
}

module.exports = MyInfoPage;
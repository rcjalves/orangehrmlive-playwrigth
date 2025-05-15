/**
 * Base Page Object that provides common functionality for all page objects
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://opensource-demo.orangehrmlive.com';
  }

  /**
   * Navigate to a specific URL
   * @param {string} path - The path to navigate to
   */
  async navigate(path) {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get element text
   * @param {string} selector - The selector to get text from
   * @returns {Promise<string>} The text content
   */
  async getElementText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - The selector to check
   * @returns {Promise<boolean>} True if element is visible
   */
  async isElementVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - The selector to wait for
   */
  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Take a screenshot with timestamp
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
  }
}

module.exports = BasePage;
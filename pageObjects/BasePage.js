class BasePage {

  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://opensource-demo.orangehrmlive.com';
  }

  async navigate(path) {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getElementText(selector) {
    return await this.page.textContent(selector);
  }

  async isElementVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  async takeScreenshot(name) {
    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
  }
}

module.exports = BasePage;
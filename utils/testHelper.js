/**
 * Utility functions for tests
 */
class TestHelper {
  /**
   * Generate a random string
   * @param {number} length - Length of the string
   * @returns {string} Random string
   */
  static generateRandomString(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate a random username
   * @returns {string} Random username
   */
  static generateRandomUsername() {
    return `testuser_${this.generateRandomString(6)}`;
  }

  /**
   * Generate a random email
   * @returns {string} Random email
   */
  static generateRandomEmail() {
    return `test_${this.generateRandomString(6)}@example.com`;
  }

  /**
   * Generate a random password
   * @returns {string} Random password
   */
  static generateRandomPassword() {
    return `Password${this.generateRandomString(4)}!`;
  }

  /**
   * Get current date in yyyy-mm-dd format
   * @returns {string} Current date
   */
  static getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get admin credentials from environment variables
   * @returns {Object} Admin credentials
   */
  static getAdminCredentials() {
    return {
      username: process.env.ADMIN_USERNAME || 'Admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    };
  }

  /**
   * Wait for a specific time
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise<void>}
   */
  static async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = TestHelper;
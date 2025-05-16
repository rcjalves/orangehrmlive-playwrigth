const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const DashboardPage = require('../pageObjects/DashboardPage');
const AdminPage = require('../pageObjects/AdminPage');
const TestHelper = require('../utils/testHelper');
const { isMobile } = require('../utils/deviceHelper');

test.describe('User Management', () => {
  let loginPage;
  let dashboardPage;
  let adminPage;
  let testUsername;

  test.beforeEach(async ({ page }, testInfo) => {
    // Skip test on mobile devices
    if (isMobile(testInfo)) {
      test.skip();
      return;
    }

    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    adminPage = new AdminPage(page);

    testUsername = TestHelper.generateRandomUsername();
    await loginPage.navigateToLoginPage();
    const { username, password } = TestHelper.getAdminCredentials();
    await loginPage.login(username, password);

    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    const firstName = 'Joao Tester';
    const lastName = 'Silva';
    const randomId = Math.floor(1000 + Math.random() * 9000).toString();

    // Use DashboardPage methods for navigation
    await dashboardPage.navigateToPIM();
    await page.waitForSelector('button:has-text("Add")', { state: 'visible', timeout: 15000 });
    await page.click('button:has-text("Add")');
    await page.fill('input[name="firstName"]', firstName);
    await page.fill('input[name="lastName"]', lastName);
    const employeeIdInput = page.locator('input.oxd-input.oxd-input--active').nth(2);
    await employeeIdInput.fill('');
    await employeeIdInput.type(randomId);
    await page.click('button[type="submit"]');
    await page.waitForSelector('h6:has-text("Personal Details")', { state: 'visible', timeout: 10000 });
    
    await dashboardPage.navigateToAdmin();
  });

  test('Adicionar novo usuario', async ({ page }, testInfo) => {
    // Redundant mobile check for safety
    if (isMobile(testInfo)) {
      test.skip();
      return;
    }

    // Verify we're on the correct page before proceeding
    await expect(page).toHaveURL(/viewSystemUsers/);

    await adminPage.clickAddButton();
    await adminPage.selectUserRole('Admin');
    await adminPage.enterEmployeeName('Joao Tester');
    await page.waitForTimeout(2000);
    await adminPage.selectStatus('Enabled');
    await page.waitForTimeout(5000);
    await adminPage.enterUsername(testUsername);
    await adminPage.enterPassword('Test@123456');
    await page.waitForTimeout(2000); // Wait for input
    await adminPage.enterConfirmPassword('Test@123456');
    await adminPage.saveUser();
    
    // Verify success message
    const isSuccessMessageDisplayed = await adminPage.isSuccessMessageDisplayed();
    expect(isSuccessMessageDisplayed).toBeTruthy();
  });
});
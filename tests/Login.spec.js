// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const DashboardPage = require('../pageObjects/DashboardPage');
const TestHelper = require('../utils/testHelper');

const adminCredentials = TestHelper.getAdminCredentials();

test.describe('Login', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('Credenciais Inválidas', async ({}, testInfo) => {
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_password';

    await loginPage.login(invalidUsername, invalidPassword);
    const errorMessage = await loginPage.getInvalidCredentialsMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('Login com Sucesso', async ({}, testInfo) => {
    await loginPage.login(adminCredentials.username, adminCredentials.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBeTruthy();
  });

  test('Navegar para página de recuperação de senha', async () => {
    await loginPage.clickForgotPassword();
    const url = loginPage.page.url();
    expect(url).toContain('requestPasswordResetCode');
  });
});
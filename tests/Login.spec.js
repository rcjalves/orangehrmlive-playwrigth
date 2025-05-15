const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const DashboardPage = require('../pageObjects/DashboardPage');
const MyInfoPage = require('../pageObjects/MyInfoPage');
const AdminPage = require('../pageObjects/AdminPage');
const TestHelper = require('../utils/testHelper');

const adminCredentials = TestHelper.getAdminCredentials();
const firstName = 'Joao Tester';
const lastName = 'Silva';
const fullName = `${firstName} ${lastName}`;
const password = 'Test@123456';

// -------- LOGIN TESTS --------
test.describe('Login', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('Credenciais Inválidas', async () => {
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_password';

    await loginPage.login(invalidUsername, invalidPassword);
    const errorMessage = await loginPage.getInvalidCredentialsMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('Login com Sucesso', async () => {
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
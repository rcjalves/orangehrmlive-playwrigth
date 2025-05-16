const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const DashboardPage = require('../pageObjects/DashboardPage');
const MyInfoPage = require('../pageObjects/MyInfoPage');
const TestHelper = require('../utils/testHelper');

test.describe('Minha Info', () => {
  let loginPage;
  let dashboardPage;
  let myInfoPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    myInfoPage = new MyInfoPage(page);
    await loginPage.navigateToLoginPage();
    const { username, password } = TestHelper.getAdminCredentials();
    await loginPage.login(username, password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    await dashboardPage.ensureMenuIsOpen();
    await dashboardPage.navigateToMyInfo();
  });

  test('Atualizar minhas informações', async ({ page }) => {
    const firstName = 'John' + TestHelper.generateRandomString(3);
    const middleName = 'David' + TestHelper.generateRandomString(3);
    const lastName = 'Smith' + TestHelper.generateRandomString(3);

    await myInfoPage.updateFirstName(firstName);
    await myInfoPage.updateMiddleName(middleName);
    await myInfoPage.updateLastName(lastName);
    await myInfoPage.selectNationality('American');
    await myInfoPage.selectMaritalStatus('Single');
    await myInfoPage.savePersonalDetails();

    const isSuccessMessageDisplayed = await myInfoPage.isSuccessMessageDisplayed();
    expect(isSuccessMessageDisplayed).toBeTruthy();
  });
});
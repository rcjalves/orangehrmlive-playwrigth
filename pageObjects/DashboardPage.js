const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.page = page;
    this.dashboardHeader = '.oxd-topbar-header-title';
    this.userDropdown = '.oxd-userdropdown-tab';
    this.userDropdownMenu = '.oxd-dropdown-menu';
    this.logoutButton = '.oxd-userdropdown-link';
    this.sideMenuItems = '.oxd-main-menu-item';
    this.adminMenuItem = 'a[href*="admin/viewAdminModule"]';
    this.myInfoMenuItem = 'a[href*="pim/viewMyDetails"]';
    this.menuToggleButton = '.oxd-icon-button'; // Menu hambúrguer
  }

  async isDashboardLoaded() {
    await this.waitForElement(this.dashboardHeader);
    const headerText = await this.getElementText(this.dashboardHeader);
    return headerText.includes('Dashboard');
  }

  async logout() {
    await this.page.click(this.userDropdown);
    await this.waitForElement(this.userDropdownMenu);
    const logoutLinks = await this.page.locator(this.logoutButton).all();
    await logoutLinks[3].click();
  }

  async openSideMenuIfHidden(targetMenuSelector) {
    const targetLocator = this.page.locator(targetMenuSelector);
    const isVisible = await targetLocator.isVisible();

    if (!isVisible) {
      const menuToggle = this.page.locator(this.menuToggleButton).first();
      if (await menuToggle.isVisible()) {
        await menuToggle.click();
        await this.page.waitForSelector(targetMenuSelector, { state: 'visible', timeout: 5000 });
      }
    }
  }

  async safeClick(selector) {
    const locator = this.page.locator(selector);
    try {
      await locator.scrollIntoViewIfNeeded();
      await locator.click();
    } catch (e) {
      // fallback com force: true
      await locator.click({ force: true });
    }
  }

  async navigateToAdmin() {
    await this.openSideMenuIfHidden(this.adminMenuItem);
    await this.safeClick(this.adminMenuItem);
    await this.page.waitForURL('**/admin/viewSystemUsers');
  }

    async navigateToMyInfo() {
      // Verifica se botão do menu lateral (hambúrguer) está visível (mobile)
      const hamburgerVisible = await this.page.locator(this.menuToggleButton).isVisible();
      if (hamburgerVisible) {
        await this.page.click(this.menuToggleButton);
      }

      const locator = this.page.locator(this.myInfoMenuItem);
      try {
        // Espera o item do menu aparecer visivelmente
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click();
      } catch (e) {
        // Se falhar, tenta forçar o clique (útil em mobile)
        console.warn('Clique padrão falhou, tentando com force: true');
        await locator.click({ force: true });
      }

      await this.page.waitForURL('**/pim/viewPersonalDetails/empNumber/**');
    }
    async navigateToPIM() {
      const locator = this.page.locator('a[href*="pim/viewPimModule"]');
      const hamburgerVisible = await this.page.locator(this.menuToggleButton).isVisible();
      if (hamburgerVisible) {
        await this.page.click(this.menuToggleButton);
      }
      await locator.waitFor({ state: 'visible' });
      await locator.click();
      await this.page.waitForURL('**/pim/viewPimModule');
    }


}

module.exports = DashboardPage;

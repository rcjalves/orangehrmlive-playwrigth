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
    this.pimMenuItem = 'a[href*="pim/viewPimModule"]';
    this.menuToggleButton = 'button.oxd-icon-button[aria-label="Menu"]'; // Seletor mais específico
    this.menuWrapper = '.oxd-sidepanel';
    this.menuOverlay = '.oxd-sidepanel-overlay'; // Elemento de overlay do menu
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

  async clickMenuButton() {
    const menuToggle = this.page.locator(this.menuToggleButton).first();

    try {
      await menuToggle.waitFor({ state: 'visible', timeout: 10000 });
      await menuToggle.scrollIntoViewIfNeeded();

      await menuToggle.click({ timeout: 5000 });
    } catch (error) {
      console.log('Clique normal falhou, tentando fallbacks...');

      await menuToggle.evaluate(el => el.click());

      const box = await menuToggle.boundingBox();
      await this.page.mouse.click(box.x + box.width/2, box.y + box.height/2);

      await menuToggle.click({ force: true, timeout: 5000 });
    }

    await this.page.waitForTimeout(300);
  }

  async ensureMenuIsOpen() {
    const menuToggle = this.page.locator(this.menuToggleButton).first();

    if (!await menuToggle.isVisible()) {
      return; // Menu já deve estar visível em desktop
    }

    const menuState = await this.page.locator(this.menuWrapper).evaluate(el => {
      return {
        left: window.getComputedStyle(el).left,
        opacity: window.getComputedStyle(el).opacity,
        visibility: window.getComputedStyle(el).visibility
      };
    });

    const isMenuOpen = menuState.left === '0px' ||
                      (menuState.opacity === '1' && menuState.visibility === 'visible');

    if (!isMenuOpen) {
      await this.clickMenuButton();

      await Promise.race([
        this.page.waitForSelector(this.menuWrapper + ':not([aria-hidden])'),
        this.page.waitForFunction(() => {
          const menu = document.querySelector('.oxd-sidepanel');
          return window.getComputedStyle(menu).left === '0px';
        }),
        this.page.waitForSelector(this.menuOverlay)
      ]).catch(() => {
        throw new Error('Menu não abriu após clique no botão');
      });
    }
  }

  async navigateToMenuItem(menuItemSelector) {
    await this.ensureMenuIsOpen();

    const menuItem = this.page.locator(menuItemSelector);
    await menuItem.waitFor({ state: 'visible' });

    await menuItem.scrollIntoViewIfNeeded();
    await menuItem.click({ timeout: 10000 }).catch(async () => {
      await menuItem.evaluate(el => el.click());
    });
  }

  async navigateToAdmin() {
    await this.navigateToMenuItem(this.adminMenuItem);
    await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 15000 });
  }

  async navigateToMyInfo() {
    await this.navigateToMenuItem(this.myInfoMenuItem);
    await this.page.waitForURL('**/pim/viewPersonalDetails/empNumber/**', { timeout: 15000 });
  }

  async navigateToPIM() {
    try {
      await this.navigateToMenuItem(this.pimMenuItem);
      await this.page.waitForURL('**/pim/viewEmployeeList', { timeout: 15000 });
      return true;
    } catch (error) {
      console.error('Falha ao navegar para PIM:', error);
      return false;
    }
  }
}

module.exports = DashboardPage;
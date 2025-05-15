const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.dashboardHeader = '.oxd-topbar-header-title';
    this.userDropdown = '.oxd-userdropdown-tab';
    this.userDropdownMenu = '.oxd-dropdown-menu';
    this.logoutButton = '.oxd-userdropdown-link';
    this.sideMenuItems = '.oxd-main-menu-item';
    this.adminMenuItem = 'a[href*="admin/viewAdminModule"]';
    this.myInfoMenuItem = 'a[href*="pim/viewMyDetails"]';
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
    await logoutLinks[3].click(); // The fourth item is the Logout link
  }

  async navigateToAdmin() {
    await this.page.click(this.adminMenuItem);
    await this.page.waitForURL('**/admin/viewSystemUsers');
  }

  async navigateToMyInfo() {
    await this.page.click(this.myInfoMenuItem);
    await this.page.waitForURL('**/pim/viewPersonalDetails/empNumber/**');
  }
}

module.exports = DashboardPage;
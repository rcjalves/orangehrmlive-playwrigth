# Test info

- Name: User Management >> Adicionar novo usuario
- Location: C:\Users\deltapoint\Downloads\com.orangehrmlive-playwrigth\tests\Usuario.spec.js:52:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.oxd-toast') to be visible

    at AdminPage.waitForElement (C:\Users\deltapoint\Downloads\com.orangehrmlive-playwrigth\pageObjects\BasePage.js:25:21)
    at AdminPage.isSuccessMessageDisplayed (C:\Users\deltapoint\Downloads\com.orangehrmlive-playwrigth\pageObjects\AdminPage.js:77:16)
    at C:\Users\deltapoint\Downloads\com.orangehrmlive-playwrigth\tests\Usuario.spec.js:75:55
```

# Page snapshot

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "Admin" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: Elsi user
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: User Management 
      - listitem: Job 
      - listitem: Organization 
      - listitem: Qualifications 
      - listitem:
        - link "Nationalities":
          - /url: "#"
      - listitem:
        - link "Corporate Branding":
          - /url: "#"
      - listitem: Configuration 
      - button ""
- heading "Add User" [level=6]
- separator
- text: User Role* Admin  Employee Name*
- textbox "Type for hints...": Joao Tester 4831Silva
- text: Status* Enabled  Username*
- textbox: testuser_gTH4lr
- text: Better Password*
- textbox: Test@123456
- paragraph: For a strong password, please use a hard to guess combination of text with upper and lower case characters, symbols and numbers
- text: Confirm Password*
- textbox: Test@123456
- separator
- paragraph: "* Required"
- button "Cancel"
- button "Save"
- paragraph: OrangeHRM OS 5.7
- paragraph:
  - text: © 2005 - 2025
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

# Test source

```ts
   1 | class BasePage {
   2 |
   3 |   constructor(page) {
   4 |     this.page = page;
   5 |     this.baseUrl = 'https://opensource-demo.orangehrmlive.com';
   6 |   }
   7 |
   8 |   async navigate(path) {
   9 |     await this.page.goto(`${this.baseUrl}${path}`);
  10 |   }
  11 |
  12 |   async waitForPageLoad() {
  13 |     await this.page.waitForLoadState('networkidle');
  14 |   }
  15 |
  16 |   async getElementText(selector) {
  17 |     return await this.page.textContent(selector);
  18 |   }
  19 |
  20 |   async isElementVisible(selector) {
  21 |     return await this.page.isVisible(selector);
  22 |   }
  23 |
  24 |   async waitForElement(selector) {
> 25 |     await this.page.waitForSelector(selector, { state: 'visible' });
     |                     ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  26 |   }
  27 |
  28 |   async takeScreenshot(name) {
  29 |     const date = new Date();
  30 |     const timestamp = date.toISOString().replace(/[:.]/g, '-');
  31 |     await this.page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
  32 |   }
  33 | }
  34 |
  35 | module.exports = BasePage;
```
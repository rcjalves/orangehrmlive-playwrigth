# OrangeHRM Test Automation Framework

This is a comprehensive test automation framework for the OrangeHRM demo site using Playwright and the Page Object Model pattern.

## Features

- Complete Page Object Model implementation
- Test suites for login, user management, and personal information
- Reusable utility functions
- GitHub Actions workflow for CI/CD
- Detailed test reporting

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```
git clone <repository-url>
```

2. Install dependencies:
```
npm install
```

3. Install Playwright browsers:
```
npx playwright install
```

## Configuration

The framework uses a `.env` file for configuration. You can customize the following parameters:

- `ADMIN_USERNAME`: Admin username (default: Admin)
- `ADMIN_PASSWORD`: Admin password (default: admin123)
- `BASE_URL`: Application URL (default: https://opensource-demo.orangehrmlive.com)
- `HEADLESS`: Run tests in headless mode (default: true)
- `DEFAULT_TIMEOUT`: Default timeout in milliseconds (default: 30000)

## Project Structure

```
├── .github/workflows  # GitHub Actions workflow configuration
├── pageObjects        # Page Object classes
├── tests              # Test files
├── utils              # Utility functions
├── .env               # Environment variables
├── playwright.config.js  # Playwright configuration
└── package.json       # Project dependencies and scripts
```

## Running Tests

Run all tests:
```
npm test
```

Run tests with UI mode:
```
npm run test:ui
```

Run tests in debug mode:
```
npm run test:debug
```

Run specific test suites:
```
npm run test:login    # Run login tests
npm run test:users    # Run user management tests
npm run test:myinfo   # Run personal info tests
```

View test report:
```
npm run test:report
```

## Test Scenarios

1. **Login Tests**
   - Invalid login credentials
   - Successful login
   - Forgot password navigation

2. **User Management Tests**
   - Add a new user
   - Delete a user

3. **My Info Tests**
   - Update personal details

## CI/CD Integration

The framework includes a GitHub Actions workflow configuration in `.github/workflows/test.yml`. This workflow runs all tests on every push to the main branch and on pull requests.

## Report Generation

Test reports are generated after each test run. To view the report, run:
```
npm run test:report
```

## Screenshots

Screenshots are automatically captured for failed tests and stored in the `screenshots` directory.

## License

This project is open-source and available under the MIT License.
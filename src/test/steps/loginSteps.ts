import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";
import { defineConfig } from '@playwright/test';
export default defineConfig({
  reporter: 'allure-playwright',
});
setDefaultTimeout(10000);

let browser: Browser;
let page: Page;
Given('User navigates on the application', async function () {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
    
  });
  
  Given('User click on the login link', async function () {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/");
  });

Given('User is on the OrangeHRM login page', async function (){
 
  await this.page.click('a[href="/index.php/auth/login"]');
});

When('User enters valid username {string} and password {string}', async function (username: string, password: string) {
  await this.page.fill('[placeholder="Username"]', username);

  await this.page.fill('[placeholder="Password"]', password);
  
});

When('User clickS on the login button', async function () {
  await this.page.click('//button[@type="submit"]');
});

Then('User should be redirected to the dashboard', async function () {
  await this.page.waitForSelector('//span[text()="Dashboard"]', { timeout: 9000 });
  const isDashboardVisible = await this.page.isVisible('//span[text()="Dashboard"]');
  if (!isDashboardVisible) {
    throw new Error('Dashboard not visible');
  }});



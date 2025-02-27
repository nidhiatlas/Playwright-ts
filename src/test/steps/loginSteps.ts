import { Before, After, Given, When, Then, setDefaultTimeout, World } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'allure-playwright',
});

setDefaultTimeout(20000);

let browser: Browser;
let page: Page;

class MyWorld extends World {
  page!: Page;
  browser!: Browser;
}

Before(async function() {
  browser = await chromium.launch({ headless: false });
  this.page = await browser.newPage();
});

After(async function(this: MyWorld) {
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});

// SCENARIO 1: Login with valid credentials

Given('User navigates on the application', async function () {
  await this.page.goto("https://opensource-demo.orangehrmlive.com/");
  await this.page.waitForTimeout(4000); 
});

When('User enters valid username {string} and password {string}', async function (username: string, password: string) {
  await this.page.fill('[placeholder="Username"]', username);
  await this.page.fill('[placeholder="Password"]', password);
});

When('User clicks on the login button', async function () {
  await this.page.click('//button[@type="submit"]');
});

Then('User should be redirected to the dashboard', async function () {
  await this.page.waitForSelector('//span[text()="Dashboard"]', { timeout: 20000 });
  const isDashboardVisible = await this.page.isVisible('//span[text()="Dashboard"]');
  if (!isDashboardVisible) {
    throw new Error('Dashboard not visible');
  }
});

// SCENARIO 2: Adding a new employee

Given('I enter valid credentials', async function(this: MyWorld) {
  await this.page.fill('//input[@name="username"]', 'Admin');
  await this.page.fill('//input[@name="password"]', 'admin123');
  await this.page.click('//button[@type="submit"]');

  await this.page.waitForSelector('//h6[text()="Dashboard"]', { timeout: 10000 });  
  const isDashboardVisible = await this.page.isVisible('//h6[text()="Dashboard"]');
  if (!isDashboardVisible) {
    throw new Error('Dashboard not visible after login');
  }

  await this.page.waitForTimeout(7000);  
});

When('I click on PIM and then Add option', async function () {
  await this.page.click('//a[@href="/web/index.php/pim/viewPimModule"]');
  await this.page.waitForTimeout(10000);
  await this.page.click("//button[@type='button' and text()=' Add ']");
  await this.page.waitForTimeout(4000);
});

When('I enter valid details of the new employee with first name {string} and last name {string}', async function (firstName: string, lastName: string) {
  await this.page.fill('//input[@name="firstName"]', firstName);  
  await this.page.fill('//input[@name="lastName"]', lastName);   

  await this.page.click('//span[contains(@class, "oxd-switch-input")]');
  
  await this.page.fill("(//input)[8]", "test235");  
  await this.page.fill("(//input)[8]", "test235");  
  
  await this.page.fill('(//input[@type="password"])[1]', "test234");  
  await this.page.fill('(//input[@type="password"])[2]', "test234");  
  await this.page.click('//button[@type="submit"]');
});

Then('a new employee should be added with first name {string} and last name {string}', async function (firstName: string, lastName: string) {
  await this.page.waitForTimeout(10000);
  const isEmployeeAdded = await this.page.isVisible(`text=${firstName} ${lastName}`);
  if (!isEmployeeAdded) {
    throw new Error('Employee was not added successfully');
  }

  await this.page.close();
});
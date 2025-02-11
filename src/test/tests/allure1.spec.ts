import {test,expect} from "@playwright/test";
test("practice 1",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await expect(page).toHaveTitle("OrangeHRM");
})
test("practice 2",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await expect(page).toHaveTitle("OrangeHRM12");
})

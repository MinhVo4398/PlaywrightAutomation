const { test, expect } = require('@playwright/test');


test.only('Browser Context Playwright test', async ({ browser }) => {
    // chrome - plugins/ cookie
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css 
    await page.locator("#username").fill("rahulshettyacademy1")
    await page.locator("[type='password']").fill("learning")
    await page.locator("#signInBtn").click()
    //wait until this locator shown up page (in selenium -but in playwright it don't need to write)
    // wait 30s (ở file playwright config.js)
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');


});

test('Page Playwright test', async ({ page }) => {

    await page.goto("https:google.com");
    // get title = assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");



});

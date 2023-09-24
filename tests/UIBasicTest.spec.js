const { test, expect } = require('@playwright/test');


test('Browser Context Playwright test', async ({ browser }) => {


    // chrome - plugins/ cookie
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username")
    const signIn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css 
    await userName.fill("rahulshettyacademy1")
    await page.locator("[type='password']").fill("learning")
    await signIn.click()
    //wait until this locator shown up page (in selenium -but in playwright it don't need to write)
    // wait 30s (ở file playwright config.js)
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.nth(0).textContent()); //return first element in locator
    console.log(await cardTitles.first().textContent()); // return first element in locator
    // Nếu ko có 2 dòng trên cái dưới sẽ fail 
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

test('Page Playwright test', async ({ page }) => {

    await page.goto("https:google.com");
    // get title = assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");



});

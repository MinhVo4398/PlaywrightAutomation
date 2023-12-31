const { test, expect } = require('@playwright/test')

test('Popup validations', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    //  await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();

    await expect(page.locator("#displayed-text")).toBeHidden();
 //   await page.pause();
    // Dialog 
    page.on('diaglog', diaglog => diaglog.accept());
    await page.locator("#confirmbtn").click();

    // Hover
    await page.locator("#mousehover").hover();

    // Frame
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]); //13,522




})
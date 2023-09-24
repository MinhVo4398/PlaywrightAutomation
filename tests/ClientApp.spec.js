const { test, expect } = require('@playwright/test');

test.only('Browser Context Playwright test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("minh2@gmail.com");
    await page.locator("#userPassword").fill("Minh@040398");
    await page.locator("#login").click();
    //  await page.waitForLoadState('networkidle'); // C1- wait cho api load ra hết các product thì khúc dưới mới get dc text
    await page.locator(".card-body b").first().waitFor(); // C2- câu trên hơi flaky nên dùng cái này
    const titles = await page.locator(".card-body b").allTextContents()

    console.log(titles)
})
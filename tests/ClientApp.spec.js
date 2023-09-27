const { test, expect } = require('@playwright/test');

test("Client App login", async ({ page }) => {
    const email = "minh2@gmail.com";
    const productName = "Zara Coat 3";
    const products = page.locator(".card-body");
 
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Minh@040398");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count(); // this will tell the number of products in the products array
 
    for (let i = 0; i < count; ++i) {
        if ((await products.nth(i).locator("b").textContent()) === productName);
        {
            // add the product to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click(); // add to cart
    await page.locator("div li").first().waitFor(); // this will wait for the orders to load
    const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();
 
});

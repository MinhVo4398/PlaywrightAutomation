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
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder='Select Country']").fill("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor(5000); // hàm này k work
    await page.waitForTimeout(5000)
    const optionsCoount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCoount; ++i) {
        text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //await page.pause();


});

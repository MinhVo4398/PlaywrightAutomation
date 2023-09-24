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

test('UI Controls Playwright test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click();
    // assertion
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //true

    await expect(documentLink).toHaveAttribute("class", "blinkingText1");

    //   await page.pause();

});

test.only('Child windows handle', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    await page.pause();
    console.log(await page.locator("#username").textContent());




});




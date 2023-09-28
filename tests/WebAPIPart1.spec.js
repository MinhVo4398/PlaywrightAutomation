const { test, expect, request } = require('@playwright/test');

// Javascript object
const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
}

const orderPayload = {
    orders: [
        {
            country: "Cuba",
            productOrderedId: "6262e95ae26b7e1a10e89bf0"
        }
    ]
}

let token;
let orderId;

test.beforeAll(async () => {
    // Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload

        }) // 200,201
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
     token = loginResponseJson.token;
    console.log(token);

    //
   const ordeResponse = await apiContext.post(" https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers:{
                'Authorization': token,
                'Content-type': 'application/json'
            }
    }  )
    
   const orderResponseJson = await ordeResponse.json();
   console.log(orderResponseJson);
   orderId = orderResponseJson.orders[0];
  

   
});

test('Place the order ', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);

    const email ="anshika@gmail.com";
    const productName = 'zara coat 3';
    await page.goto("https://rahulshettyacademy.com/client");
    
    // Click my order link on the top (API did the order card)
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

// Verify if order created is showing in history page
// Pre-conditon: create order

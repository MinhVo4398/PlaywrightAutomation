class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload

            }) // 200,201
      //  expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }


    async createOrder(orderPayload) {
        // Placr order API
        let response = {};
        response.token = await this.getToken();

        const ordeResponse = await this.apiContext.post(" https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-type': 'application/json'
            }
        })

        const orderResponseJson = await ordeResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response; //return the object chứa token và order id ==> đem ra bên test xài
    }
}

module.exports = {APIUtils};
# Function Authorizer Example for API Gateway and Ory Kratos

[Authorization with function](https://yandex.cloud/docs/api-gateway/concepts/extensions/function-authorizer) based on the [Ory Kratos](https://www.ory.sh/kratos/) example (registration, authentication, and user management service).

## Installation

1. Deploy Ory Kratos using Cloud Apps as per [this guide](https://yandex.cloud/docs/cloud-apps/kratos#deploy-app).
2. Download the `git clone ...` project and open it in your IDE or console.
3. Run `npm install` to install the dependencies.
4. Run `npm run build` to build your project.
5. Create a cloud function, select Node.js as the runtime environment, and paste the code from `build/index.js`. When creating your function, set the `KRATOS_API_BASE_PATH=https://${kratos-api-gateway-domain}/public` environment variable. Here, `${kratos-api-gateway-domain}` is the domain name of the API gateway you created at step 1 when deploying Ory Kratos.
6. Create an API Gateway and paste the specification from [openapi-example.yaml](openapi-example.yaml), providing the ID of the authorizing function and the ID of the service account you created at the previous step, in it.

## Testing

1. Open your browser and go to the Ory Kratos test console page at `https://${kratos-api-gateway-domain}/ui/`.
2. Register a user.
3. Log in using `https://${kratos-api-gateway-domain}/ui/login`.
4. Open the developer console in your browser and copy the value of the `ory_kratos_session` cookie.
5. Run the following command:
   `curl 'https://${authorized-api-gateway-domain}/authorized/api' -H 'Cookie: ory_kratos_session=${ory-kratos-cookie}'`
   Where `${authorized-api-gateway-domain}` is the domain name of your API gateway created at step 6 of the installation, and `${ory-kratos-cookie}` is the cookie value copied at the previous step.
    If you get `Authorized!` in response, it means that your user session is active and the API was successfully called after checking the authorization cookie.

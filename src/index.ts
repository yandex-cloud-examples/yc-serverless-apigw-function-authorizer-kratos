import { Configuration, FrontendApi } from "@ory/client"
import { Authorizer } from "@yandex-cloud/function-types/dist/src/api-gateway/authorizer";
import { Handler } from "@yandex-cloud/function-types";

const kratosAPI = new FrontendApi(
    new Configuration({
        basePath: process.env.KRATOS_API_BASE_PATH,
        baseOptions: {
            withCredentials: true,
        },
    }),
)

export const handler: Handler.ApiGatewayAuthorizer = async (event) => {
    let response: Authorizer.Result = {
        isAuthorized: false,
        context: {}
    };

    try {
        const session = await kratosAPI.toSession({ cookie: event.headers?.Cookie })

        if (session?.data?.active) {
            response = {
                isAuthorized: true,
                context: {
                    session: session.data,
                },
            };
        }

        return response;
    } catch (e) {
        return response;
    }
}

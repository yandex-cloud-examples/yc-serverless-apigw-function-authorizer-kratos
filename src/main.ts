import { handler } from './index';
import Context from "@yandex-cloud/function-types/dist/src/context";
import { Authorizer } from "@yandex-cloud/function-types/dist/src/api-gateway/authorizer";

const main = async () => {
    if (process.argv.length != 3 && process.argv.length != 4) {
        console.log('Usage: node main.js <json event> [<json context>]');
        return;
    }

    const eventJson = process.argv[2];
    const contextJson = process.argv.length == 4 ? process.argv[3] : undefined

    let event: Authorizer.Event
    let context: Context
    try {
        event = JSON.parse(eventJson);
        context = contextJson ? JSON.parse(contextJson) : {}
    } catch (e) {
        console.error(`JSON parsing error: ${e}`);
        return;
    }

    try {
        console.log(await handler(event, context))
    } catch (e) {
        console.error(`Handler error: ${e}`)
    }
}

main()

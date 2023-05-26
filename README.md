# Function Authorizer Example for API Gateway and Ory Kratos

[Авторизация с помощью функции](https://cloud.yandex.ru/docs/api-gateway/concepts/extensions/function-authorizer) на
примере использования сервиса регистрации, аутентификации и управления пользователями
[Ory Kratos](https://www.ory.sh/kratos/).

## Установка

1. Разверните Ory Kratos с помощью сервиса Cloud Apps
   по [инструкции](https://cloud.yandex.ru/docs/cloud-apps/kratos#deploy-app).
2. Скачайте проект `git clone ...` и откройте его в IDE или консоли.
3. Выполните `npm install` для установки зависимостей.
4. Выполните `npm run build` для сборки проекта.
5. Создайте облачную функцию, в качестве среды выполнения выберите Node.js и вставьте код из build/index.js. При
   создании функции проставьте переменную окружения `KRATOS_API_BASE_PATH=https://${kratos-api-gateway-domain}/public`,
   где `${kratos-api-gateway-domain}` - доменное имя API-шлюза, созданного на шаге 1 при развертывании Ory Kratos.
6. Создайте API Gateway и вставьте спецификацию из [openapi-example.yaml](openapi-example.yaml),
   подставив в неё идентификатор функции-авторайзера и идентификатор сервисного аккаунта, созданных
   на предыдущем шаге.

## Тестирование

1. Откройте браузер и зайдите на страницу тестовой консоли Ory Kratos по
   адресу `https://${kratos-api-gateway-domain}/ui/`.
2. Зарегистрируйте пользователя.
3. Выполните вход `https://${kratos-api-gateway-domain}/ui/login`.
4. Откройте консоль разработчика в браузере и скопируйте значение cookies с названием `ory_kratos_session`.
5. Выполните
   команду `curl 'https://${authorized-api-gateway-domain}/authorized/api' -H 'Cookie: ory_kratos_session=${ory-kratos-cookie}'`,
   подставив в качестве `${authorized-api-gateway-domain}` доменное имя API-шлюза, созданного на 6-м шаге установки, а в
   качестве `${ory-kratos-cookie}` - значение куки, скопированное на предыдущем шаге. Если в ответе вы
   получите `Authorized!`, значит сессия пользователя активна и API был успешно вызван после проверки авторизационной
   куки. 

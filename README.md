## Mocking APIs and generating fixtures from Open API spec

https://github.com/stoplightio/prism

https://meta.stoplight.io/docs/prism/README.md

This library is used for creating mock server.


## How to use
1. Clone this repository
2. `yarn install` to add all dependencies
3. `yarn run mock_server` to run mock server it should be running for fixtures to be built
4. `yarn run build` to build json fixtures in `fixtures/` folder


Prism can use faker data to fill the fixtures with if used with `-d` parameter - dynamic data, [here is the list of fake data](https://github.com/marak/Faker.js#api-methods)
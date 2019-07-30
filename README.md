# js-test-fullstack-sandbox

This project builds on top of (and is a fork of) [js-fullstack-sandbox](https://github.com/larsthorup/js-fullstack-sandbox), a simple full stack JavaScript application using PostgreSQL, Express.js and React

This project is a working example of adding fast full integration tests to a full stack JavaScript project using Mocha, Chai, Jest and Polly. You can create your own project from scratch by following [the guide](https://www.fullstackagile.eu/2019/07/30/js-test-fullstack-guide/).

## initial setup

    # test database
    # configure a PostgreSQL instance, e.g. on elephantsql.com
    # create server/.env.test from .env-sample and set DATABASE 

    # node.js dependencies
    cd app
    npm install
    cd ../server
    npm install


## database

    # run `recreate.sql` on the test database instance

## run tests

Use two terminals:

1:

    cd server
    npm test

2:

    cd app
    npm test

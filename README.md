## Description

Fincra mini support system

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Note

- After running npm install create a .env and copy the content of .env.example to the env
- PORT=
- MONGO_URL=
- SECRET=
- EXPIREIN=
- for port, any port number can be used
- for the purpose of the assessment a test mongodb url has been created
- mongodb+srv://root:root@cluster0.xvndune.mongodb.net/fincra

## Documentation

- Project Documentation can be accessed using the state link - https://documenter.getpostman.com/view/25552330/2s93sdXr8G
- To test on endpoint on a server, make use of this baseurl - http://161.35.172.241:4000

## Assumptions Made

- The have assumed the support system would allow agents attend to a single support request as long as the request is still been processed(open)
- I also added an endpoint for customer to view a particular support request created alongside all its comments.
- I assumed the export as PDF or CSV would be handled on the frontend,so i created an enpoint returning the neccessary data need

## Stay in touch

- Author - [James Anih][uchennaanih16@gmail.com]

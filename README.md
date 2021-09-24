## HOW TO RUN THE PROJECT

- npm ci
- npm start ( the project will run on port 3000 )

## PROJECT

In this project, I used Redux as state manager + redux-thunk to manage async actions. I also used Redux Toolkit to reduce the boilerplate and to have a clean and flowless dev experience with redux.
For the style, I used the styled-components library. For the API calls Axios.
Unit tests are written using jest, react-testing-library, and react-hooks-testing-library to test hooks more easily.
For the E2E tests, I used Cypress.

Scripts that runs on pre commit:

-npm run prettify
-npm run typecheck
-npm run lint

Scripts that runs on pre push:

-npm run test

## SCRIPTS

- "start": run the project for developing purpose
- "build": build the project inside the folder ./build
- "test": run all the tests
- "test:watch": run and watch changes inside the tests
- "e2e": run all e2e tests
- "lint": run lint on all files
- "lint:fix": run lint and fix problems
- "prettify": prettify the files
- "typecheck": typecheck the files

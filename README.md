# WSO2 IS SCIM APIs

A simple application to test all the SCIM APIs in the WSO2 Identity Server. The program sequentially runs the following steps and displays all the results in command promt as JSON representation. This program uses axios to communicate with the REST APIs of the IS.

1. GET - gets all the users
2. POST - create a new user
3. GET - gets the created user from the id
4. PUT - update the created user
5. DELETE - delete the created user

## How to Run

First of all this program assumes that the WSO2 Identity Server runs on your PC on the default settings on default port `9443`.

Install Node JS latest. The Node JS version this application is tested on is 16.13.0. Just run

`npm install`

Then run

`npm start`
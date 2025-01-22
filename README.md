# nodejs-graphql-starter
This is a starter kit for building a GraphQL API with Node.js and TypeScript. It provides a foundation for building robust and scalable GraphQL applications.


## Features
* TypeScript support: Ensures type safety and reduces errors.
* Modular structure: Code is organized into separate files for schemas, resolvers, and data models.
* Authentication using passportJS to support multiple authentications including social logins
* Graphql implemented and authenticated routes
* Auto generate types and schema as much as possible
* Use of Express session and inject current user to graphql context for all resolvers to user
* Option to connect to multiple DB's including mongoDB
* Testing: Includes unit and end-to-end testing examples.***

## Getting Started

### 1. Clone the repository:
````bash
git clone https://github.com/noble-mt/nodejs-graphql-starter.git
````

### 2. Install dependencies:
````bash
cd nodejs-graphql-starter
npm install
````

### 3. Start the development server:
````bash
npm start
````

## Folder Structure
````
graphql/
  modals/
    # Place to store all the modals inclding auto generated ones
  resolvers/
    # Place to store all the resolvers
  service/
    # Place to store all the common services
  typeDefs
    # Place to store all the graphql type definitions
  schema.ts
    # File that combine all the resolvers and typeDefs to create the combined schema 
login_strategy/
    # Place to put all your passportJS login strategies
repository/
    # Place to put all the database modals
    mongoDb/
        # All the mongoDb related modals will be placed here
    ...
codegen.ts
   # Configure for the schema auto generation script
loadConfig.ts
   # Reading all the enviornmental configs and create a structured object for easy access
...
package.json
  # Project dependencies
tsconfig.json
  # TypeScript compiler configuration
index.ts
  # Starting point of application
````

## Principles 
As a newcomer to Node.js and GraphQL, I was a bit confused about how to integrate all the necessary features for a production-ready application. As a start I want to setup a project base with the following functionalities.
- [x] Authentication and authorization setup using passport.js and would need to support multiple login options.:tada:
- [x] Must have setup to run with typescript including all resolvers with minimal type definition (auto generated type definitions as much as possible).
- [x] Split up schema types and the associated resolvers into multiple files so the code will more structured as the project grows.

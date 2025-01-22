# nodejs-graphql-starter
This is a starter kit for building a GraphQL API with Node.js and TypeScript. It provides a foundation for building robust and scalable GraphQL applications.

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

## Principles 
As a newcomer to Node.js and GraphQL, I was a bit confused about how to integrate all the necessary features for a production-ready application. As a start I want to setup a project base with the following functionalities.
- [x] Authentication and authorization setup using passport.js and would need to support multiple login options.:tada:
- [x] Must have setup to run with typescript including all resolvers with minimal type definition (auto generated type definitions as much as possible).
- [x] Split up schema types and the associated resolvers into multiple files so the code will more structured as the project grows.

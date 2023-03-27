# TODO CRUD API

A simple CRUD API implemented with Node.js, Express, and MongoDB, for users to manage their to-do list items.

Additional Documentation for the API methods can be found here: https://documenter.getpostman.com/view/26553556/2s93RNzuvi

## Setup:
After cloning the project, install dependencies by running: <br />
```npm install```<br /><br />

Configure a .env file, filling in the following information:
```
DATABASE_URL=
PORT=
SECRET=
```
<br />

Then, run: ```node src/server.js```


To work in a development environment (with nodemon), run
```npm start```

## API Endpoints:
**/todo/**
- /todo
  - GET: returns all todo items stored in the database
- /todo/get-by-category/:completed/:category
  - GET: returns todo items of the specified category and completion status
  - Requires: category (string) and completed (boolean)
- /todo/get-by-date/:startDate/:endDate
  - GET: returns all todo items specified within the date range
  - Requires: startDate and endDate which are both of type Date
- /todo/:id
  - GET: returns a todo item, given it's id string
  - Requires: id string of a todo item
    <br />
  
- /todo/create
  - POST: creates a new todo item for the current user
  - Requires: a user is currently logged in, taskName field (string)
  - Optional Inputs: dueDate (Date), category (string)
    <br />
  
- /todo/update/:id
  - PATCH: allows the owner of a todo item to update it when provided its id
  - Requires: id string of a todo item, the current user is the owner of the todo item
  - Optional Inputs: completed (boolean), category (string), dueDate(Date), taskName(string)
    <br />

- /todo/delete/:id
  - DELETE: allows the owner of a todo item to delete it when provided its id
  - Requires: id string of a todo item, the current user is the owner of the todo item
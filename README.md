# GP EDU
GP Education Platform.

## Introduction
Hi friends! We're using React/Nodejs for our site. The site is hosted using
Heroku, and automatically deploys when we push to master. We use bootstrap for
styling. Check out the live website [here](https://gp-edu.herokuapp.com)!

Here's a layout/map of what the directory structure looks like:

```bash
/nswn
  README.md           # This file
  package.json        # Backend dependencies / scripts
  package-lock.json
  index.js            # Entry point for express sevrer
  # Frontend react files
  /client
    package.json      # Frontend dependencies / scripts
    package-lock.json
    /public           # Publicly hosted site data
    /src              # React files / components
      /assets         # Static images, etc.
      /auth           # front end user authentication
      /components     # Smaller React components
      /config
      /pages          # React components for whole pages
      /utils          # Helper javascript functions
      App.jsx         # Main React component with routes + default components
      App.css         # Put global css here
      index.js        # Entry point for React into DOM
      firebase.jsx    # db config stuff
  # Backend files, following an MVC model
  /server
    /api              # api endpoint definitions
      /routes
      /middleware
    /config
    /loaders          # server initialization
    /models           # database access
    /services         # business logic
```

## Web stack

Here are the internals of our site + the technologies that we're using! I'll
also point out a few unconventional design choices that I've chosen to make. 

Generally, we're using **React** for our frontend, **node.js** and **express** for our backend, **Firebase** for authentication, **PostgreSQL** for our database (hosted on AWS RDS), and **Firebase Storage** as a storage provider (whew, that's a mouthful). If you have any questions, just ask.

A few caveats:
- We're hosting our frontend and backend *on the same server*. This is unconventional, but it roughly halves our server hosting costs. This is organized in the `/index.js` file, which serves both static frontend routes AND backend api routes. For front end development, when you add new routes, you will also need to add those routes in this file. 
- We're using Firebase's authentication methods to handle logins and user management.
- When running the frontend locally, it is configured to use the production server to service login / api requests. This is bad practice, but since we don't have a development server, it's necessary to simplify frontend development. IF you are doing full stack development, you can update the `prefix` variable in `/client/src/utils/api.js` to `""`. Then, the frontend will proxy api requests to the local backend server. 

## Getting Started

The `client` folder hosts the react front end. The `server` folder hosts the backend server using `express.js`. That means you only need to worry about the `client` folder. Here's how it works (from the terminal):

1. Before anything else, you'll need to install both `nodejs` and `npm`.

2. Install packages / dependencies in the client folder. You'll need to run `npm install` from the client folder.

3. Then, to run the frontend server, run `npm run frontend` from the root directory. A browser window will (eventually) open up at `http://localhost:3000`. Alternatively, you can run `npm run start` from the client directory for the same results.

**Note:** even when you run the frontend locally, **you will by be using the production backend/database**. This means **be careful if you make changes to the database**. If we were following best practices, then we would have a separate dev environment and production environment. However, that adds a lot more maintenance overhead. So for now, it's on the backlog. 

- Also, if you are interested in doing backend, you'll need to run `npm  install` from the root directory. Then, `npm run backend` will launch the backend server.

## Frontend Organization

Here's some more details on what's going on in the frontend. 

```
/client/src
    /assets         # Static images, etc. Note the occasional 'index.js' files
                    # that are used to optimize imports

    /auth           # front end user authentication
        Auth.jsx          # Sets user state 
        PrivateRoute.jsx  # Validate that a user is logged and passes userData
                          # to child components

    /components     # Modular React Components 

    /config
    /pages          # React templates/components for whole page designs. 

    /utils          # Helper javascript functions. I
        api.js      # js file with functions to make backend API calls
                    
    App.jsx         # Main React component with routes + default components
    App.css         # Put global css here

    index.js        # Entry point for React into DOM
    firebase.jsx    # firebase configuration used for authentication 
```

### Extra Notes:
### `currentUser`
You'll notice a lot of the pages have a `currentUser` variable. This, as you'd expect, contains data about the user who is currently logged in (firstname, lastname, email, etc). When using it, though, note that the variable is populated asynchronously. So what will happen is that when the page initially loads, `currentUser` will have a value of `null`. Wait a bit, and it'll get the appropriate user data. 

How can you deal with this? When you're using `currentUser` data, be sure to check that the value is not null before you use it. For example, here is a safe line of code:
```js
const displayName = currentUser ? currentUser.firstname : "Loading"
```
If `currentUser` is `null` (aka it's false), then we'll use `currentUser.firstname`. Otherwise, we use `Loading`. React will update itself automatically. 


### `api.js`
In this file, we export an object / dictionary with all of our backend api requests. That's fairly straightforward. What's important to notice, though, is the `Authorization` header that we set in every call (except to create an account).

The backend system is setup to only respond to requests that have this authorization header. As such, if you create new backend API requests, make sure you set the header appropriately, and make sure that the actual value has resolved before you send the request. 

### Routing
Routing in React is **very** different from routing in classic html/css. Here's a minimal explanation. 

Look at `App.jsx`. You see these `<Route ... />` and `<PrivateRoute ... />` components. `Route`s can be accessed without logging in, and `PrivateRoute`s need the user to be logged in to view that page. Each has an `exact path` and `component` value. When the user navigates to the `exact path` url, React will load the corresponding `component`. 

To add a new route, there's a couple steps. 
1. just add an extra line to `App.jsx`. (If you'd like to add variables to these routes, I took a lot of this project from [here](https://github.com/YiyueMaggieMao/tag.it/tree/master/client/src). You can look at how they do it.
2. Since we use server side rendering, you'll need to add the route to the backend express file. It's really simple - take a look at `/index.js` in the root directory. Copy the code you see there. 
   
**IF YOU MAKE CHANGES TO ROUTING, MAKE SURE IT WORKS WITH SERVER SIDE RENDERING**. If you're unsure of what that implies / how that works, just ask me (Andrew) to test it out for you before you merge your code. Essentially, you'll need to do `npm run build` to build the production React files, and then `npm start` from the root directory. 


## Available Scripts

From the root directory, you can run:

### `npm run frontend`
Runs the front-end service on port 3000 (with hot-reloading).

### `npm run backend`
Runs the backend service on port 4000 (with hot-reloading).

### `npm run build` 
Initializes the build for production - in particular, it compiles the front-end  so that the backend serves static html instead of js. 

### `npm start`
Runs the backend server (without hot-reloading). Intended use is for production environments.
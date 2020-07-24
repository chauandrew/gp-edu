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

Generally, we're using **React** for our frontend, **node.js** and **express** for our backend, **Firestore** for our database, and **Firebase Storage** as a storage provider. 

A few caveats:
- We're hosting our frontend and backend *on the same server*. This is unconventional, but it roughly halves our server hosting costs. This is organized in the `/index.js` file, which serves both static frontend routes AND backend api routes. For front end development, when you add new routes, you will also need to add those routes in this file. 
- We're using Firebase's authentication methods to handle logins and user management.
- When running the frontend locally, it is configured to use the production server to service login / api requests. This is bad practice, but since we don't have a development server, it's necessary to simplify frontend development. IF you are doing full stack development, you can update the `prefix` variable in `/client/src/utils/api.js` to `""`. Then, the frontend will proxy api requests to the local backend server. 

## Getting Started

The `client` folder hosts the react front end. The `server` folder hosts the backend server using `express.js`. You'll need to install dependencies for both in order to run locally:

1. Before anything else, you'll need to install both `nodejs` and `npm`. 

2. Then install packages / dependencies in the root and client folders. You'll 
   need to run `npm install` from both the root folder and the client folder.

3. Then, to run the frontend server, run `npm run frontend` from the root directory. A browser window should open automatically at `http://localhost:3000`. It may take a while to start up, especially your first time running.

4. To run the backend, you'll need to run `npm run build` from the `client` directory (once), and then you can use `npm run backend` from the root directory. Then, navigate to `http://localhost:4000` in a browser or use postman. 


## Available Scripts

From the root directory, you can run:

### `npm run frontend`
Runs the front-end service alone on port 3000 (with hot-reloading).

### `npm run backend`
Runs the backend service alone on port 4000 (with hot-reloading).

### `npm run build` 
Initializes the build for production - in particular, it compiles the front-end  so that the backend serves static html instead of js. 

### `npm start`
Runs the backend server alone. Intended use is for production environments.

### `npm run all` 
Runs both the front-end and back-end servers locally on ports 3000 and 4000 respectively. This is meant to be used for development, so files will hot-reload as you make adjustments to them. However, I would recommend using two terminal instances over using this command b/c when you kill the server (eg ctrl+c), the backend will still be running in the background. You will have to kill it manually (eg `pkill node`).

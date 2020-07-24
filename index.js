// Environment setup
const express = require('express');
const port = process.env.PORT || 4000;

const app = express();
// parse application/json and application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 4000);

const routes = require('./server/api/index');

app.use("/", routes);

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))

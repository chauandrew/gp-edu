// Environment setup
const express = require('express');
const port = process.env.PORT || 4000;

const app = express();
app.set('port', process.env.PORT || 4000);

const routes = require('./api/index');

app.use(routes);

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))

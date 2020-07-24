// Environment setup
const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;

const app = express();
// 
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
// parse application/json and application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 4000);

// Static React Routing
const reactBuildPath = path.join(__dirname + '/client/build/index.html')
app.use(express.static(path.join(__dirname, '/client/build')))
app.get('/', (_, res) => { res.sendFile(reactBuildPath); })
app.get('/browse', (_, res) => { res.sendFile(reactBuildPath); })
app.get('/courses', (_, res) => { res.sendFile(reactBuildPath); })
app.get('/profile', (_, res) => { res.sendFile(reactBuildPath); })
app.get('/404', (_, res) => { res.sendFile(reactBuildPath); })

// API calls organized in server/api/index
const routes = require('./server/api/index');
app.use("/", routes);

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))

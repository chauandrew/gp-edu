const express = require('express');
const path = require('path');

const app = express.Router();

// Point get requests to static react files
app.use(express.static(path.join(__dirname, '../client/build')));
const reactBuildPath = path.join(__dirname + '/../client/build/index.html')
app.get('/', (_, res) => { res.sendFile(reactBuildPath); });
app.get('/browse', (_, res) => { res.sendFile(reactBuildPath); });
app.get('/courses', (_, res) => { res.sendFile(reactBuildPath); });
app.get('/profile', (_, res) => { res.sendFile(reactBuildPath); });
app.get('/404', (_, res) => { res.sendFile(reactBuildPath); });

app.use('/api/courses', require('./routes/courses'));

module.exports = app;
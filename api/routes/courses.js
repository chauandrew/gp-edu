const path = require('path');
const app = require('express').Router();


// const firebase = require('../../models/init');

app.post('/all', (req, res) => {
    res.send('ok');
});

module.exports = app;
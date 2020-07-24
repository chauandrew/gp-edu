// Setup Firebase
var admin = require("firebase-admin");
var config = require("../config/firebase.json");

config['credential'] = admin.credential.applicationDefault();
admin.initializeApp(config);

module.exports = admin;
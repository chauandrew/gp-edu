// Setup Firebase
var admin = require("firebase-admin");
var config = require("../config/db.json");

config['credential'] = admin.credential.applicationDefault();
admin.initializeApp(config);

// const storage = admin.storage();
// const bucket = storage.bucket('nswn-eb5e5.appspot.com');
// const wide = bucket.file('placeholders/wide.jpg');
// config = {
//     action: 'read',
//     expires: '03-17-2025'
// }
// wide.getSignedUrl(config, function(err, url) {
//     console.log(url);
// });

// const db = admin.firestore();

// db.collection('stories').get().then(
//     response => response.forEach(doc => console.log(doc.data())));

module.exports = admin;
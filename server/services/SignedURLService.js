const admin = require('../loaders/firebaseAdmin');
const config = require('../config/firebase.json');
const bucket = admin.storage().bucket(config['storageBucket'])

    // Return a signed url for a given file, expiring in a week
const getSignedUrl = (path) => {
    let config = { action: 'read', expires: '03-09-2491' }
    return bucket.file(path).getSignedUrl(config)
}

module.exports = {getSignedUrl: getSignedUrl};
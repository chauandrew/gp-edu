const admin = require('../loaders/firebase');
const config = require('../config/db.json');

class SignedUrlService {
    constructor() {
        this._bucket = admin.storage().bucket(config['storageBucket']);
    }

    // Return a signed url for a given file, expiring in a week
    async getSignedUrl(path) {
        let config = { action: 'read', expires: '03-09-2491' }
        console.log(path)
        return this._bucket.file(path).getSignedUrl(config)
    }
}

module.exports = {SignedUrlService: SignedUrlService};
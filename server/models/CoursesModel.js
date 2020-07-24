const admin = require('../loaders/firebase');

class CoursesModel {
    constructor() {
        this._db = admin.firestore();
    }
}

module.exports = {CoursesModel:CoursesModel};
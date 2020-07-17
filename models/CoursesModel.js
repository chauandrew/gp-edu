const admin = require('./init');

class CoursesModel {
    constructor() {
        this._db = admin.firestore();
    }
}

module.exports = {CoursesModel:CoursesModel};
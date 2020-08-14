const admin = require('../loaders/firebaseAdmin');
var courses = admin.firestore().collection('courses');

const getAllSubjects = async () => {
    snapshot = await courses.get();
    subjects = snapshot.docs.map(doc => doc.data())
    return subjects;
}

module.exports = {getAllSubjects: getAllSubjects};
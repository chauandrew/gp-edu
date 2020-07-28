var admin = require('../loaders/firebaseAdmin');
var users = admin.firestore().collection('users');

const getUserByUid = async (uid) => {
    return users.doc(uid).get()
}

const createUser = async (user) => {
    if ("firstName" in user && "lastName" in user && "uid" in user &&
        "email" in user && "password" in user && "birthday" in user &&
        "role" in user) {
        if (["STUDENT", "MENTOR", "OTHER"].includes(user['role'].toUpperCase())) {
            data = {
                firstName: user.firstName,
                lastName: user.lastName,
                birthday: user.birthday,
                email: user.email,
                role: user.role.toUpperCase(),
                grade: user.grade
            }
            return users.doc(user.uid).set(data)
        }
    }
    return null
}

module.exports = {
    getUserByUid: getUserByUid,
    createUser: createUser
}
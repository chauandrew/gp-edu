var admin = require('../loaders/firebaseAdmin');
var UserModel = require('../models/UserModel')

const createUser = async (userData) => {
    if ("firstName" in userData && "lastName" in userData && "email" in userData &&
        "password" in userData && "birthday" in userData) {
        const user = await admin.auth().createUser(userData);
        userData['uid'] = user.uid
        UserModel.createUser(userData);
        return user;
    } else {
        console.log("Must supply email, password, birthday, firstName, lastName fields to create a user!");
        console.log(userData)
        return null;
    }
}

module.exports = { createUser: createUser }
var admin = require('../loaders/firebaseAdmin');
var UserModel = require('../models/UserModel')

// Create user in firebase client + in postgres db
const createUser = async (userData) => {
    if ("firstName" in userData && "lastName" in userData && 
        "email" in userData && "password" in userData &&
        "birthday" in userData && "gradeTypeId" in userData) {
        const user = await admin.auth().createUser(userData); //create user in firebase
        userData['uid'] = user.uid
        userData['password'] = null
        UserModel.createUser(userData); // create user in postgres
        return user;
    } else {
        console.log("Must supply email, password, birthday, firstName, lastName, role, and grade fields to create a user!");
        return null;
    }
}

module.exports = { createUser: createUser }
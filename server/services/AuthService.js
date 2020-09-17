var admin = require('../loaders/firebaseAdmin');
var UserModel = require('../models/UserModel')

// Create user in firebase client + in postgres db
const createUser = async (userData) => {
    if ("firstName" in userData && "lastName" in userData && 
        "email" in userData && "password" in userData &&
        "gradYear" in userData) {
        const user = await admin.auth().createUser(userData); //create user in firebase
        userData['uid'] = user.uid
        userData['password'] = null
        await UserModel.createUser(userData); // create user in postgres
        return user;
    } else {
        console.log("Must supply email, password, firstName, lastName, and gradYear fields to create a user!");
        return null;
    }
}

const isAdmin = async (uid) => {
    rows = await UserModel.isAdmin(uid)
    return (rows.length > 0 && rows[0].is_admin)
}

module.exports = { 
    createUser: createUser,
    isAdmin: isAdmin
}
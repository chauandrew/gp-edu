const pgclient = require('../loaders/postgres');

const getUserByUid = async (uid) => {
    let err, result = await pgclient.query("SELECT * FROM users WHERE uid=$1", [uid])
    if (err) {
        throw new Error(err)
    }
    if (result.rowCount == 1) {
        return result.rows[0]
    } else if (result.rowCount == 0) {
        throw new Error(`Could not find user with uid ${uid}`)
    } else {
        throw new Error(`uid ${uid} matched more than one user`)
    }
}

const createUser = async (user) => {
    if ("firstName" in user && "lastName" in user && "uid" in user &&
        "email" in user && "birthday" && "gradeTypeId" in user) {
        let query = 'INSERT INTO users(id, uid, firstname, lastname, email, birthday, created_date, grade_type_id, is_admin)' + 
                    'VALUES (default, $1, $2, $3, $4, $5, NOW(), $6, false)'
        let values = [user.uid, user.firstName, user.lastName, user.email, user.birthday, user.gradeTypeId]
        return pgclient.query(query, values, (err, response) => {
            if (err) {
                throw new Error(`Error: Could not create user ${user}: ${err}`)
            } else {
                return response
            }
        })
    }
    throw new Error("Need firstname, lastname, uid, email, birthday, and gradeTypeId to create a user in the db") // bad request
}

/**
 * Is the user with the given uid an admin?
 * @param {String} uid 
 */
const isAdmin = async (uid) => {
    let err, res = await pgclient.query("SELECT * FROM users u WHERE uid=$1", [uid])
    if (!err) {
        return res.rows
    } else {
        throw new Error(err)
    }
}

module.exports = {
    getUserByUid: getUserByUid,
    createUser: createUser,
    isAdmin: isAdmin
}
const pgclient = require('../loaders/postgres')

/**
 * Get a user progress status type by id
 * @param {Integer} statusId 
 */
const getUserProgressStatus = async (statusId) => {
    if (!parseInt(statusId)) {
        throw new Error(`userProgressStatusId must be an integer: received ${statusId}`)
    }
    query = "SELECT * FROM user_progress_status where id = $1"
    let err, response = await pgclient.query(query, [statusId])
    if (err) {
        throw new Error(err)
    } 
    if (response.rowCount != 0){
        return response.rows[0]
    } else {
        return null
    }
}

module.exports = {
    getUserProgressStatus: getUserProgressStatus
}
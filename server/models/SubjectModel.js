const pgclient = require('../loaders/postgres')

/**
 * Return every subject
 */
const getAllSubjects = async () => {
    let query = "SELECT * FROM subjects"
    let err, res = await pgclient.query(query)
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}


/**
 * Get subject by id  or by name
 * @param {*} searchField 
 */
const getSubject = async (searchField) => {
    let query = ""
    if (Number.isInteger(searchField)) {
        searchField = parseInt(searchField)
        query = 'SELECT * FROM subjects WHERE id = $1'
    } else if (typeof(searchField) == "string") {
        query = 'SELECT * FROM subjects WHERE subject_name = $1'
    }
    let err, res = await pgclient.query(query, [searchField])
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}

module.exports = {
    getAllSubjects: getAllSubjects,
    getSubject: getSubject
}
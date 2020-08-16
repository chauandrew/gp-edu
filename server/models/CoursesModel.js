const pgclient = require('../loaders/postgres')
var SignedURLService = require('../services/SignedURLService')

const getAllSubjects = async () => {
    let query = "SELECT * FROM subjects"
    let err, res = await pgclient.query(query)
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}

module.exports = {getAllSubjects: getAllSubjects};
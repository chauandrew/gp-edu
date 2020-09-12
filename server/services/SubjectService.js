const SubjectModel = require('../models/SubjectModel')

/**
 * return a list of all subjects
 */
const getAllSubjects = async () => {
    return SubjectModel.getAllSubjects()
}

/**
 * Get subject by id  or by name
 * @param {*} searchField 
 */
const getSubject = async (searchField) => {
    return SubjectModel.getSubject(searchField)
}

module.exports = {
    getAllSubjects: getAllSubjects,
    getSubject: getSubject
}
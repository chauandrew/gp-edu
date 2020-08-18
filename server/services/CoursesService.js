const CoursesModel = require('../models/CoursesModel')
const UserModel = require('../models/UserModel')
const { getCourse } = require('../models/CoursesModel')

/**
 * return a list of all subjects
 */
const getAllSubjects = async () => {
    return CoursesModel.getAllSubjects()
}

/**
 * Get all courses in a subject by subjectId or by subject_name
 * @param {String} field 
 */
const getCoursesBySubject = async (field) => {
    // if searchField is numeric (isNan => false), search by it's numeric value
    let searchField = isNaN(field) ? field.toLowerCase() : parseInt(field)
    return CoursesModel.getCoursesBySubject(searchField)
}

/**
 * Get the courses a user is enrolled in
 * @param {String} uid 
 */
const getEnrolledCourses = async (uid) => {
    return CoursesModel.getEnrolledCourses(uid)
}

/**
 * Enroll in a course by marking the first chapter as 'in progress'
 * @param {String} uid 
 * @param {integer} courseId 
 */
const enrollInCourse = async (uid, courseId) => {
    // make sure user is not already enrolled in the course
    let userId = null
    let enrolledCourses = await CoursesModel.getEnrolledCourses(uid);
    for (let i in enrolledCourses) {
        userId = enrolledCourses[i].user_id
        if (enrolledCourses[i].course_id == courseId) {
            return null
        }
    }
    if (userId == null) {
        let user = await UserModel.getUserByUid(uid)
        userId = user.id
    }
    console.log(userId)
    return CoursesModel.getFirstChapter(courseId).then(
        (firstChapter) => {
            return CoursesModel.enrollInCourse(userId, courseId, firstChapter.id)
        }
    )
}

module.exports = {
    getAllSubjects: getAllSubjects,
    getEnrolledCourses: getEnrolledCourses,
    enrollInCourse: enrollInCourse,
    getCoursesBySubject: getCoursesBySubject
}
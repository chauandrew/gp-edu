const CoursesModel = require('../models/CoursesModel')
const UserModel = require('../models/UserModel')

/**
 * return a list of all subjects
 */
const getAllSubjects = async () => {
    return CoursesModel.getAllSubjects()
}

/**
 * Get the courses a user is enrolled in
 * @param {string} uid 
 */
const getEnrolledCourses = async (uid) => {
    return CoursesModel.getEnrolledCourses(uid)
}

/**
 * Enroll in a course by marking the first chapter as 'in progress'
 * @param {string} uid 
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
    enrollInCourse: enrollInCourse
}
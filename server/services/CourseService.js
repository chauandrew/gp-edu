const SubjectModel = require('../models/SubjectModel')
const CourseModel = require('../models/CourseModel')
const UserModel = require('../models/UserModel')

// TODO: Function to change sequence of course / chapter / steps


/**
 * Return a list of all courses, grouped by subject
 */
const getAllSubjectsAndCourses = async () => {
    let rows = await CourseModel.getAllSubjectsAndCourses();
    let response = {}
    for (let i in rows) {
        subject = rows[i]['subject_name']
        if (subject in response) {
            response[subject].push(rows[i])
        } else {
            response[subject] = [rows[i]]
        }
    }
    return response
}

/**
 * Return course details given a courseId or courseName
 * @param {*} courseId 
 */
const getCourse = async (courseId) => {
    if (parseInt(courseId)) {
        return CourseModel.getCourse(parseInt(courseId))
    } else if (courseId) {
        return CourseModel.getCourse(courseId)
    } else {
        throw new Error ('courseId cannot be null or blank')
    }
}


/**
 * Get all courses in a subject by subjectId or by subject_name
 * @param {String} field 
 */
const getCoursesBySubject = async (field) => {
    // if searchField is numeric (isNan => false), search by it's numeric value
    let searchField = isNaN(field) ? field.toLowerCase() : parseInt(field)
    return CourseModel.getCoursesBySubject(searchField)
}

/**
 * Get the courses a user is enrolled in
 * @param {String} uid 
 */
const getEnrolledCourses = async (uid) => {
    return CourseModel.getEnrolledCourses(uid)
}

/**
 * Enroll in a course by marking the first chapter as 'in progress'
 * @param {String} uid 
 * @param {integer} courseId 
 */
const enrollInCourse = async (uid, courseId) => {
    // make sure user is not already enrolled in the course
    let userId = null
    let enrolledCourses = await CourseModel.getEnrolledCourses(uid);
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
    return CourseModel.getFirstChapter(courseId).then(
        (firstChapter) => {
            return CourseModel.enrollInCourse(userId, courseId, firstChapter.id)
        }
    )
}

/**
 * Create a new course
 * @param {Integer} subjectId 
 * @param {String} courseName 
 * @param {Integer} sequence 
 */
const createCourse = async (subjectId, courseName, sequence = null) => {
    // check that subjectId is a number 
    if (Number.isInteger(subjectId) == NaN) {
        throw new Error("'subjectId' must be an integer")
    } else if (sequence != null && parseInt(sequence) == NaN) {
        throw new Error("'sequence' must be an integer")
    }
    
    // Trim leading/trailing whitespace + use integer value of subjectId
    courseName = courseName.trim()
    subjectId = parseInt(subjectId)

    // make sure subject is valid and course is not already created
    let [subject, courses] = await Promise.all(
        [SubjectModel.getSubject(subjectId), CourseModel.getCoursesBySubject(subjectId)])
    if (subject.length == 0) {
        throw new Error(`Could not find subject with id ${subjectId}`)
    }
    for (let i in courses) {
        if (courses[i].course_name == courseName) {
            throw new Error(`Course name ${courseName} already exists!`)
        }
    }

    return CourseModel.createCourse(parseInt(subjectId), courseName, sequence);
}


/**
 * get standalone lessons + first lesson of each chapter
 * @param {Integer} courseId 
 */
const getCourseOverview = async(courseId) => {
    if (!parseInt(courseId)) {
        throw new Error(`courseId must be an integer: received ${courseId}`)
    }
    return CourseModel.getCourseOverview(courseId)
}


module.exports = {
    getCourse: getCourse,
    getAllSubjectsAndCourses: getAllSubjectsAndCourses,
    getEnrolledCourses: getEnrolledCourses,
    enrollInCourse: enrollInCourse,
    getCoursesBySubject: getCoursesBySubject,
    createCourse: createCourse,
    getCourseOverview: getCourseOverview,
}
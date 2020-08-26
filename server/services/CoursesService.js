const CoursesModel = require('../models/CoursesModel')
const UserModel = require('../models/UserModel')

/**
 * return a list of all subjects
 */
const getAllSubjects = async () => {
    return CoursesModel.getAllSubjects()
}

/**
 * Return a list of all courses, grouped by subject
 */
const getAllSubjectsAndCourses = async () => {
    let rows = await CoursesModel.getAllSubjectsAndCourses();
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
    return CoursesModel.getFirstChapter(courseId).then(
        (firstChapter) => {
            return CoursesModel.enrollInCourse(userId, courseId, firstChapter.id)
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
    // use lowercase course name w/ ' ' instead of '_'
    courseName = courseName.toLowerCase().split('_').join(' ')
    subjectId = parseInt(subjectId)

    // make sure subject is valid and course is not already created
    let [subject, courses] = await Promise.all(
        [CoursesModel.getSubject(subjectId), CoursesModel.getCoursesBySubject(subjectId)])
    if (subject.length == 0) {
        throw new Error(`Could not find subject with id ${subjectId}`)
    }
    for (let i in courses) {
        if (courses[i].course_name == courseName) {
            throw new Error(`Course name ${courseName} already exists!`)
        }
    }

    return CoursesModel.createCourse(parseInt(subjectId), courseName, sequence);
}

// TODO: Function to change sequence of course / chapter / steps
const createChapter = async(courseId, chapterName, sequence=null) => {
    // check that courseId is a number 
    if (Number.isInteger(courseId) == NaN) {
        throw new Error("'courseId' must be an integer")
    } else if (sequence != null && parseInt(sequence) == NaN) {
        throw new Error("'sequence' must be an integer")
    }

    courseId = parseInt(courseId)

    // validate courseId exists and chapter isn't a duplicate
    let [course, chapter] = await Promise.all(
        [CoursesModel.getCourse(courseId), CoursesModel.getChapter(chapterName)])
    if (course.length == 0) {
        throw new Error(`Could not find course with courseId ${courseId}`)
    } else if (chapter.length != 0) {
        throw new Error(`Chapter with name ${chapterName} already exists!`)
    }

    return CoursesModel.createChapter(course[0].subject_id, courseId, chapterName, sequence)
}




module.exports = {
    getAllSubjects: getAllSubjects,
    getAllSubjectsAndCourses: getAllSubjectsAndCourses,
    getEnrolledCourses: getEnrolledCourses,
    enrollInCourse: enrollInCourse,
    getCoursesBySubject: getCoursesBySubject,
    createCourse: createCourse,
    createChapter: createChapter
}
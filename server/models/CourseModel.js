const pgclient = require('../loaders/postgres')


/**
 * Return subject table joined w/ course table
 */
const getAllSubjectsAndCourses = async () => {
    let query = 
        `SELECT s.subject_name, c.id as course_id, s.id as subject_id,
                c.course_name as course_name, c.sequence as course_sequence
         FROM subjects s JOIN courses c ON c.subject_id = s.id
         ORDER BY s.id`
    let err, res = await pgclient.query(query)
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}


/**
 * Return all courses a user is enrolled in
 * @param {Integer} userId 
 */
const getEnrolledCourses = async (userId) => {
    let query = 
    `SELECT up.*, c.course_name
    FROM user_progress up
    JOIN courses c ON up.course_id = c.id
    JOIN users u on up.user_id = u.id
    WHERE u.uid = $1`
    let err, res = await pgclient.query(query, [userId])
    if (!err) {
        return res.rows
    } else {
        throw new Error(err)
    }
}

/**
 * Enroll in a course by adding a record to the user_progress table pointing
 * to the first chapter
 * @param {Integer} userId 
 * @param {Integer} courseId 
 * @param {Integer} chapterId 
 */
const enrollInCourse = async (userId, courseId, chapterId) => {
    let query = `INSERT INTO user_progress 
        (id, user_id, course_id, current_chapter_id)
        values (default, $1, $2, $3)`
    values = [userId, courseId, chapterId]
    let err, res = await pgclient.query(query, values)
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}

/**
 * get a course by the courseId(Integer) or courseName(String)
 * @param {} field 
 */
const getCourse = async (field) => {
    let query = ""
    if (Number.isInteger(field)) {
        query = `SELECT * FROM courses WHERE id = $1`
    } else if (typeof(field) == "string") {
        query = `SELECT * FROM courses WHERE course_name = $1`
    } else {
        throw new Error("Field must be a course id or course_name")
    }
    let err, res = await pgclient.query(query, [field])
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}

/**
 * Get all courses related to a subject, grouped by subjectId (Integer) or 
 * subjectName (String)
 * @param {} searchField 
 */
const getCoursesBySubject = async (searchField) => {
    let query = ""
    if (Number.isInteger(searchField)) {
        query = `SELECT c.* FROM courses c WHERE subject_id = $1 ORDER BY sequence`
    } else if (typeof(searchField) == "string") {
        query =`SELECT c.* FROM courses c 
                JOIN subjects s ON c.subject_id = s.id 
                WHERE s.subject_name = $1
                ORDER BY sequence`
    } else {
        throw new Error("searchField must be an Integer subjectId or a String subjectName")
    }
    let err, res = await pgclient.query(query, [searchField])
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}

/**
 * Create a new course in the given subject
 * @param {integer} subjectId 
 * @param {name of new course} courseName 
 * @param {integer (optional)} sequence 
 */
const createCourse = async (subjectId, courseName, sequence=null) => {
    let query = "INSERT INTO courses values (default, $1, $2, $3)"
    let values = [courseName, subjectId, sequence]
    let err, response = await pgclient.query(query, values)
    if (err) {
        throw new Error(err)
    }
    return response.rows
}


/**
 * get standalone lessons + first lesson of each chapter
 * @param {Integer} courseId 
 */
const getCourseOverview = async (courseId) => {
    if (!parseInt(courseId)) {
        throw new Error(`courseId must be an integer: received ${courseId}`)
    }
    courseId = parseInt(courseId)
    let query = `
        select c.id as course_id, 
            l.chapter_id as chapter_id, 
            l.id as lesson_id,
            coalesce(ch.chapter_name, l.lesson_name) as lesson_name,
            coalesce(ch.description, l.description) as description, 
            l.content_url 
        from courses c
        left join lessons l on l.course_id = c.id
        left join chapters ch on ch.id = l.chapter_id 
        where c.id = $1
            and (l.chapter_id isnull 
            or l.id in (
                select min(id) from lessons l_inner 
                where l_inner.chapter_id notnull
                group by l_inner.chapter_id 
        ))`
    let err, res = await pgclient.query(query, [courseId])
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}

module.exports = {
    getAllSubjectsAndCourses: getAllSubjectsAndCourses,
    getEnrolledCourses: getEnrolledCourses,
    enrollInCourse: enrollInCourse,
    getCourse: getCourse,
    getCoursesBySubject: getCoursesBySubject,
    createCourse: createCourse,
    getCourseOverview: getCourseOverview
}
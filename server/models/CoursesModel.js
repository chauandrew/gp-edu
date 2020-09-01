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
 * Get the first chapter of a particular course
 * @param {Integer} courseId 
 */
const getFirstChapter = async (courseId) => {
    let query = 
    `SELECT ch.* FROM courses c
        JOIN chapters ch ON ch.course_id = c.id
        WHERE c.id = $1
        ORDER BY chapter_num ASC LIMIT 1`
    let err, res = await pgclient.query(query, [courseId])
    if (!err && res.rowCount != 0) {
        return res.rows[0]
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

/**
 * Get chapter by id or by name
 * @param {*} searchField 
 */
const getChapter = async (searchField) => {
    let query = ""
    if (Number.isInteger(searchField)) {
        searchField = parseInt(searchField)
        query = 'SELECT * FROM chapters WHERE id = $1'
    } else if (typeof(searchField) == "string") {
        query = 'SELECT * FROM chapters WHERE chapter_name = $1'
    }
    let err, res = await pgclient.query(query, [searchField])
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}


/**
 * Get the next chapter OR null if given the last chapter
 * @param {Integer} chapterId 
 */
const getNextChapter = async (chapterId) => {
    let query = `SELECT * FROM chapters WHERE prev_chapter_id = $1`
    let err, res = pgclient.query(query, [chapterId])
    if (!err) {
        if (res.rowCount == 0) {
            return null
        } else {
            return res.rows
        }
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
        query = `SELECT * FROM courses WHERE subject_id = $1 ORDER BY sequence`
    } else if (typeof(searchField) == "string") {
        query =`SELECT * FROM courses c 
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
 * Create a new chapter with the appropriate parameters, sequence defaults to
 * null
 * @param {Integer} subjectId 
 * @param {Integer} courseId 
 * @param {String} chapterName 
 * @param {Integer} sequence 
 */
const createChapter = async (subjectId, courseId, chapterName, sequence=null) => {
    let query = "INSERT INTO chapters values (default, $1, $2, $3, $4)"
    let values = [chapterName, subjectId, courseId, sequence]
    let err, response = await pgclient.query(query, values)
    if (err) {
        throw new Error(err)
    }
    return response.rows
}

/**
 * 
 * @param {Integer} chapterId 
 * @param {Integer} lessonNum 
 * @param {String} contentUrl 
 * @param {String} description 
 */
const createLesson = async (chapterId, lessonNum, contentUrl, description) => {
    let query = "INSERT INTO lessons values (default, $1, $2, $3, $4)"
    let values = [chapterId, lessonNum, contentUrl, description]
    let err, response = await pgclient.query(query, values)
    if (err) {
        throw new Error(err)
    }
    return response.rows
}

/**
 * return list of all chapters with a given courseId
 * @param {Integer} courseId 
 */
const getChaptersByCourseId = async (courseId) => {
    if (!parseInt(courseId)) {
        throw new Error(`courseId must be an integer: received ${courseId}`)
    }
    let query = "SELECT * FROM chapters WHERE course_id = $1"
    let err, res = await pgclient.query(query, [courseId])
    if (!err) {
        return res.rows
    } else {
        throw new Error(err);
    }
}

module.exports = {
    getAllSubjects: getAllSubjects,
    getAllSubjectsAndCourses: getAllSubjectsAndCourses,
    getEnrolledCourses: getEnrolledCourses,
    getFirstChapter: getFirstChapter,
    enrollInCourse: enrollInCourse,
    getCourse: getCourse,
    getSubject: getSubject,
    getChapter: getChapter,
    getNextChapter: getNextChapter,
    getCoursesBySubject: getCoursesBySubject,
    createCourse: createCourse,
    createChapter: createChapter,
    createLesson: createLesson,
    getChaptersByCourseId: getChaptersByCourseId
}
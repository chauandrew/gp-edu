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
         FROM subjects s LEFT JOIN courses c ON c.subject_id = s.id
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
 * Create a new chapter with the appropriate parameters, sequence defaults to
 * null
 * @param {Integer} subjectId 
 * @param {Integer} courseId 
 * @param {String} chapterName 
 * @param {Integer} sequence 
 */
const createChapter = async (subjectId, courseId, chapterName, sequence=null, description) => {
    let query = "INSERT INTO chapters (id, chapter_name, subject_id, course_id, chapter_num, description) " +
                "values (default, $1, $2, $3, $4, $5)"
    let values = [chapterName, subjectId, courseId, sequence, description]
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
const createLesson = async (chapterId, courseId, lessonName, lessonNum, contentUrl, description) => {
    let query = "INSERT INTO lessons (id, chapter_id, course_id, lesson_name, lesson_num, content_url, description)" + 
                "values (default, $1, $2, $3, $4, $5, $6)"
    let values = [chapterId, courseId, lessonName, lessonNum, contentUrl, description]
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
            and l.chapter_id isnull 
            or l.id in (
                select min(id) from lessons l_inner 
                where l_inner.chapter_id notnull
                group by l_inner.chapter_id 
        )`
    let err, res = await pgclient.query(query, [courseId])
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}

/**
 * Get a all lessons in a chapter by lessonId, in order
 * @param {Integer} lessonId 
 */
const getRelatedLessons = async (lessonId) => {
    if (!parseInt(lessonId)) {
        throw new Error(`lessonId must be an integer: received ${lessonId}`)
    }
    lessonId = parseInt(lessonId)
    let query = 
    `select distinct 
    	coalesce(l2.id, l.id) as lesson_id,
    	coalesce(l2.chapter_id, l.chapter_id) as chapter_id,
    	coalesce(l2.lesson_name, l.lesson_name) as lesson_name,
    	l2.lesson_num,
    	coalesce(l2.content_url, l.content_url) as content_url,
    	coalesce(l2.description, l.description) as description,
    	coalesce(l2.course_id, l.course_id) as course_id
    from lessons l
    left join lessons l2 on l.chapter_id = l2.chapter_id 
    where l.id = $1
    order by l2.lesson_num`
    let err, res = await pgclient.query(query, [lessonId])
    if (!err) {
        return res.rows
    } else {
        throw new Error (err)
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
    getChaptersByCourseId: getChaptersByCourseId,
    getCourseOverview: getCourseOverview,
    getRelatedLessons: getRelatedLessons
}
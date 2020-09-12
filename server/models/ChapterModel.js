const pgclient = require('../loaders/postgres')

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
    getFirstChapter: getFirstChapter,
    getChapter: getChapter,
    getNextChapter: getNextChapter,
    createChapter: createChapter,
    getChaptersByCourseId: getChaptersByCourseId
}
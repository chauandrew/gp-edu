const pgclient = require('../loaders/postgres')

/**
 * Get a lesson by its id
 * @param {Integer} lessonId 
 */
const getLessonById = async(lessonId) => {
    if (!parseInt(lessonId)) {
        throw new Error(`lessonId must be an integer: received ${lessonId}`)
    }
    let query = "SELECT * FROM lessons WHERE id = $1"
    let err, response = await pgclient.query(query, [lessonId])
    if (err) {
        throw new Error(err)
    } else if (response.rowCount != 0) {
        return response.rows[0]
    } else {
        return null
    }
}

/**
 * Create a lesson with the appropriate information
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


/**
 * Return all of a user's lesson progress
 * @param {Integer} userId a user's postgres serial id (int)
 */
const getLessonProgress = async (userId) => {
    if (!parseInt(userId)) {
        throw new Error(`userId must be an integer: received ${userId}`)
    }
    let query = 
    `SELECT up.*, c.course_name, ch.chapter_name, l.lesson_name, ups.name, ups.nicename 
        FROM user_progress up
        JOIN courses c ON up.course_id = c.id
        left JOIN chapters ch on up.chapter_id = ch.id
        JOIN lessons l on up.lesson_id = l.id
        join user_progress_status ups on up.user_progress_status_type = ups.id 
        WHERE up.user_id = $1`
    let err, res = await pgclient.query(query, [parseInt(userId)])
    if (!err) {
        return res.rows
    } else {
        throw new Error(err)
    }
}

/**
 * Insert or update a record to track a user's progress
 * @param {Integer} userId
 * @param {Integer} courseId
 * @param {Integer} chapterId
 * @param {Integer} lessonId 
 * @param {Integer} statusId the user_progress_status id to insert or update
 */
const upsertUserProgress = async (userId, courseId, chapterId, lessonId, statusId) => {
    let query = `INSERT INTO user_progress 
        (id, user_id, course_id, chapter_id, lesson_id, user_progress_status_type, last_modified)
        values (default, $1, $2, $3, $4, $5, NOW()) 
        ON CONFLICT (user_id, lesson_id) DO UPDATE SET 
            user_progress_status_type = $5,
            last_modified = NOW()`
    values = [userId, courseId, chapterId, lessonId, statusId]
    let err, res = await pgclient.query(query, values)
    if (!err) {
        return res.rows 
    } else {
        throw new Error(err)
    }
}

module.exports = {
    getLessonById: getLessonById,
    createLesson: createLesson,
    getRelatedLessons: getRelatedLessons,
    getLessonProgress: getLessonProgress,
    upsertUserProgress: upsertUserProgress
}
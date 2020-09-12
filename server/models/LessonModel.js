const pgclient = require('../loaders/postgres')

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

module.exports = {
    createLesson: createLesson,
    getRelatedLessons: getRelatedLessons
}
const pgclient = require('../loaders/postgres')

/**
 * Get a comment by its id
 * @param {Integer} commentId 
 */
const getComment = async (commentId) => {
    let query = 'SELECT * FROM comments where id = $1'
    let err, response =await pgclient.query(query, [commentId])
    if (err) {
        throw new Error(err)
    }
    if (response.rowCount != 0) {
        return response.rows[0]
    } else {
        return null
    }
}

/**
 * Add a comment by userId and lessonId
 * @param {Integer} userId Integer user id
 * @param {Integer} lessonId 
 * @param {String} body comment text, up to 255 chars
 */
const addComment = async (userId, lessonId, body) => {
    let query = 
        `INSERT INTO comments 
        (id, user_id, lesson_id, body, created_at, last_modified)
        VALUES (default, $1, $2, $3, NOW(), NOW())`
    let values = [userId, lessonId, body]
    let err, response = await pgclient.query(query, values)
    if (err) {
        throw new Error(err)
    }
    return response.rows
}

/**
 * Update the text of a comment
 * @param {Integer} commentId 
 * @param {String} body 
 */
const updateComment = async (commentId, body) => {
    let query = 'UPDATE comments SET body=$2, last_modified=NOW() WHERE id = $1'
    let values = [commentId, body]
    let err, response = await pgclient.query(query, values)
    if (err) {
        throw new Error(err)
    }
    return response.rows
}

/**
 * Delete a comment
 * @param {Integer} commentId 
 */
const deleteComment = async(commentId) => {
    if (!parseInt(commentId)) {
        throw new Error(`commentId must be an integer. Received: ${commentId}`)
    }
    commentId = parseInt(commentId)
    let query = 'DELETE FROM comments WHERE id = $1'
    let err, response = await pgclient.query(query, [commentId])
    if (err) {
        throw new Error(err)
    }
    return response.rows
}

/**
 * Get all comments on a particular lesson
 * @param {Integer} lessonId 
 */
const getCommentsByLessonId = async(lessonId) => {
    if (!parseInt(lessonId)) {
        throw new Error(`lessonId must be an integer. Received: ${lessonId}`)
    }
    lessonId = parseInt(lessonId)
    let query = 
    `SELECT c.id, c.user_id, c.lesson_id, c.body, c.created_at, 
        c.last_modified, u.firstname, u.lastname, u.is_admin
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.lesson_id = $1 ORDER BY c.created_at DESC`
    let err, response = await pgclient.query(query, [lessonId])
    if (err) {
        throw new Error(err)
    }
    return response.rows
}



module.exports = {
    getComment: getComment,
    getCommentsByLessonId, getCommentsByLessonId,
    addComment: addComment,
    updateComment: updateComment,
    deleteComment: deleteComment
}
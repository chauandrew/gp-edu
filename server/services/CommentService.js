const CommentModel = require('../models/CommentModel')
const UserModel = require('../models/UserModel')
const LessonModel = require('../models/LessonModel')



/**
 * Add a comment to a lesson
 * @param {String} uid 
 * @param {Integer} lessonId 
 * @param {String} body 
 */
const addComment = async (uid, lessonId, body) => {
    if (!parseInt(lessonId)) {
        throw new Error(`'lessonId' must be an integer. Received: ${lessonId}`)
    } else if (!body) {
        throw new Error(`body cannot be empty or blank. Received: ${body}`)
    } else if (body.length > 255) {
        throw new Error(`body length must be less than 255. Received length ${body.length}`)
    }

    let [user, lesson] = await Promise.all([
        UserModel.getUserByUid(uid), 
        LessonModel.getLessonById(parseInt(lessonId))])

    if (!user) {
        throw new Error(`Could not find user with uid: '${uid}'`)
    } else if (!lesson) {
        throw new Error(`Could not find lesson with lessonId: ${lessonId}`)
    }

    return CommentModel.addComment(user.id, lessonId, body)
}

/**
 * If a user wrote this comment (or if admin), delete the comment
 * @param {Integer} commentId 
 * @param {String} uid 
 */
const deleteComment = async (commentId, uid) => {
    if (!parseInt(commentId)) {
        throw new Error(`'commentId' must be an integer. Received: ${commentId}`)
    } else if (!uid) {
        throw new Error(`uid cannot be null`)
    }
    let [user, comment, isAdmin] = await Promise.all([
        UserModel.getUserByUid(uid), CommentModel.getComment(commentId), 
        UserModel.isAdmin(uid) ])

    if (isAdmin) {
        return CommentModel.deleteComment(parseInt(commentId))
    } else {
        if (comment && user && comment.user_id == user.id) {
            return CommentModel.deleteComment(parseInt(commentId))
        } else if (!comment) {
            throw new Error(`Could not find comment with id: ${commentId}`)
        } else if (!user) {
            throw new Error(`Could not find user with uid: ${uid}`)
        } else {
            throw new Error('You are not authorized to delete this comment.')
        }
    }
}

/**
 * Update a comment 
 * @param {Integer} commentId 
 * @param {String} body 
 * @param {String} uid 
 */
const updateComment = async (commentId, body, uid) => {
    if (!parseInt(commentId)) {
        throw new Error(`'commentId' must be an integer. Received: ${commentId}`)
    } else if (!uid) {
        throw new Error(`uid cannot be null`)
    } else if (!body) {
        throw new Error('body cannot be null')
    }
    let [user, comment, isAdmin] = await Promise.all([
        UserModel.getUserByUid(uid), CommentModel.getComment(commentId), 
        UserModel.isAdmin(uid) ])

    if (isAdmin) {
        return CommentModel.updateComment(parseInt(commentId), body)
    } else {
        if (comment && user && comment.user_id == user.id) {
            return CommentModel.updateComment(parseInt(commentId), body)
        } else if (!comment) {
            throw new Error(`Could not find comment with id: ${commentId}`)
        } else if (!user) {
            throw new Error(`Could not find user with uid: ${uid}`)
        } else {
            throw new Error('You are not authorized to update this comment.')
        }
    }
}


/**
 * Get all comments with the given lessonId
 * @param {Integer} lessonId 
 */
const getCommentsByLessonId = async (lessonId) => {
    if (!parseInt(lessonId)) {
        throw new Error(`'lessonId' must be an integer. Received: ${lessonId}`)
    }
    return CommentModel.getCommentsByLessonId(parseInt(lessonId))
}

module.exports = {
    addComment: addComment,
    deleteComment: deleteComment,
    updateComment: updateComment,
    getCommentsByLessonId: getCommentsByLessonId
}
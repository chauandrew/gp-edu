const express = require('express')
const router = express.Router();
const { checkIfAuthenticated } = require('../middleware/AuthMiddleware');
const CommentService = require('../../services/CommentService')

/*
All routes have the prefix: `/api/v1/comment`
*/

/**
 * Add a comment to a particular lesson
 */
router.post('/create', checkIfAuthenticated, (req, res) => {
    if (!("lessonId" in req.body) || !("body" in req.body)) {
        res.status(400)
        res.send("Must specify lessonId and body")
    }
    CommentService.addComment(req.uid, req.body.lessonId, req.body.body)
        .then(comment => res.json(comment))
        .catch(err => {
            res.status(400)
            res.send(String(err))
        })
})

router.post('/remove', checkIfAuthenticated, (req, res) => {
    if (!("commentId" in req.body)) {
        res.status(400)
        res.send("Must specify commentId")
    }
    CommentService.deleteComment(req.body.commentId, req.uid)
        .then(comment => res.json(comment))
        .catch(err => {
            res.status(400)
            res.send(String(err))
        })
})

router.post('/update', checkIfAuthenticated, (req, res) => {
    if (!("commentId" in req.body) || !("body" in req.body)) {
        res.status(400)
        res.send("Must specify `commentId` and `body`")
    }
    CommentService.updateComment(req.body.commentId, req.body.body, req.uid)
        .then(comment => res.json(comment))
        .catch(err => {
            res.status(400)
            res.send(String(err))
        })
})

router.get('/lesson/:lessonId', (req, res) => {
    CommentService.getCommentsByLessonId(req.params.lessonId)
        .then(comments => res.json(comments)) 
        .catch(err => {
            res.status(400)
            res.send(String(err))
        })
})

module.exports = router
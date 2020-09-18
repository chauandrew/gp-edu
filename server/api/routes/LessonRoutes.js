const express = require('express')
const router = express.Router();
const { checkIfAuthenticated, checkIfAdmin } = require('../middleware/AuthMiddleware');
const LessonService = require('../../services/LessonService')

/*
All routes have the prefix: `/api/v1/lesson`
*/

/**
 * Arguments:
 * courseId: Integer id of course
 * chapterName: name of new chapter to create
 * sequence: (optional) the sequence number to use
 * 
 * Response:
 * Handle to the new chapter
 */
router.post('/create', checkIfAdmin, (req, res) => {
    if (!("chapterId" in req.body) || !("courseId" in req.body) || 
        !("contentUrl" in req.body) || !("description" in req.body)) {
        res.status(400)
        res.send("chapterId, courseId, contentUrl, and description must be specified!")
    }
    LessonService.createLesson(req.body.chapterId, req.body.courseId, 
        req.body.lessonName, req.body.lessonNum, req.body.contentUrl, 
        req.body.description)
        .then(chapter => res.json(chapter))
        .catch(err => {
            res.status(400)
            res.send(`${err}`)
        })
})

/**
 * Get lessons related to a given lessonId
 */
router.get('/:lessonId/related', (req, res) => {
    LessonService.getRelatedLessons(req.params.lessonId)
        .then(lessons => res.json(lessons))
        .catch(err => {
            res.status(400)
            res.send(err)
        })
})

/**
 * Get a users progress in various lessons
 */
router.get('/progress', checkIfAuthenticated, (req, res) => {
    LessonService.getLessonProgress(req.uid)
        .then(lessons => res.json(lessons))
        .catch(err => {
            res.status(400)
            res.send(err)
        })
})

router.post('/progress/upsert', checkIfAuthenticated, (req, res) => {
    if (!("lessonId" in req.body)) {
        res.status(400)
        res.send("Must specify lessonId in body")
    } else if (!("statusId" in req.body)) {
        res.status(400)
        res.send("Must specify statusId in body to specify userProgressStatus")
    }
    LessonService.upsertUserProgress(req.uid, req.body.lessonId, req.body.statusId)
        .then(lesson => res.json(lesson))
        .catch(err => {
            res.status(400)
            res.send(err)
        })
})

module.exports = router;
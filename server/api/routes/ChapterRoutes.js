const express = require('express')
const router = express.Router()
const { checkIfAuthenticated, checkIfAdmin } = require('../middleware/AuthMiddleware')
const ChapterService = require('../../services/ChapterService')

/*
All routes have the prefix: `/api/v1/chapter` *
*/

/**
 * Get chapters by courseId
 */
router.get('/course/:courseId', (req, res) => {
    ChapterService.getChaptersByCourseId(req.params.courseId)
        .then(rows => res.json(rows))
        .catch(err => {
            res.status(400)
            res.send(err)
        })
})

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
    if (!("courseId" in req.body) || !("chapterName" in req.body)) {
        res.status(400)
        res.send("courseId and chapterName must be specified!")
    }
    ChapterService.createChapter(req.body.courseId, req.body.chapterName, 
        req.body.sequence, req.body.description)
        .then(chapter => res.json(chapter))
        .catch(err => {
            res.status(400)
            res.send(`${err}`)
        })
})



module.exports = router;
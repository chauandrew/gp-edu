const express = require('express')
const router = express.Router();
const { checkIfAuthenticated, checkIfAdmin } = require('../middleware/AuthMiddleware');
const CourseService = require('../../services/CourseService');
const ChapterService = require('../../services/ChapterService')

/*
All routes have the prefix: `/api/v1/course` *
*/

/**
 * Get all courses joined with subjects
 */
router.get('/', (_, res) => {
    try {
        CourseService.getAllSubjectsAndCourses().then((subjects) => {
            res.json(subjects)
        })
    } catch (err) {
        res.status(400);
        res.send(err)
    }
})

/* Get course by courseId */
router.get('/:courseId', (req, res) => {
    try {
        CourseService.getCourse(req.params.courseId).then(course => {res.json(course)})
    } catch (err) {
        res.status(400)
        res.send(err)
    }
})

/* Get lessons/chapter overview by courseId */
router.get('/:courseId/overview', (req, res) => {
    CourseService.getCourseOverview(req.params.courseId)
        .then(lessons => res.json(lessons))
        .catch(err => {
            res.status(400)
            res.send(err)
        })
})

/**
 * Arguments
 * subjectField: subjectId OR subjectName
 * 
 * Response:
 * List of courses related to that subject
 */
router.get('/subject/:subjectField', (req, res) => {
    try {
        CourseService.getCoursesBySubject(req.params.subjectField)
            .then( courses => res.json(courses) )
    } catch (err) {
        res.status(400)
        res.send(err)
    }
})

/**
 * Arguments:
 * subjectId: Integer id of subject
 * courseName: name of new course to create
 * sequence: (optional) the sequence number to use
 * 
 * Response:
 * Handle to the new course
 */
router.post('/create', checkIfAdmin, (req, res) => {
    if (!("subjectId" in req.body) || !("courseName" in req.body)) {
        res.status(400)
        res.send("subjectId and courseName must be specified!")
    }
    CourseService.createCourse(req.body.subjectId, req.body.courseName, 
        req.body.sequence)
        .then(course => res.json(course))
        .catch(err => {
            res.status(400)
            res.send(`${err}`)
        })
})


module.exports = router;
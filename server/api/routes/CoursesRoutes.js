const express = require('express')
const router = express.Router();
const { checkIfAuthenticated, checkIfAdmin } = require('../middleware/AuthMiddleware');
const CoursesService = require('../../services/CoursesService');

/*
All routes have the prefix: `/api/v1/courses` *
*/

/**
 * Get all subjects, does NOT require auth
 */
router.get('/all', (_, res) => {
    try {
        CoursesService.getAllSubjectsAndCourses().then((subjects) => {
            res.json(subjects)
        })
    } catch (err) {
        res.status(400);
        res.send(err)
    }
})

/**
 * Get a course by its id
 */
router.get('/:courseId', (req, res) => {
    try {
        CoursesService.getCourse(req.params.courseId).then(course => {res.json(course)})
    } catch (err) {
        res.status(400)
        res.send(err)
    }
})

router.get('/:courseId/chapters', (req, res) => {
    CoursesService.getChatpersByCourseId(req.params.courseId)
        .then(rows => res.json(rows))
        .catch(err => {
            res.status(400)
            res.send(err)
        })
})

router.get('/:courseId/overview', (req, res) => {
    CoursesService.getCourseOverview(req.params.courseId)
        .then(lessons => res.json(lessons))
        .catch(err => {
            res.status(400)
            res.send(err)
        })
})
    
/**
 * Return a list of the courses a user is enrolled in
 */
router.get('/enrolled', checkIfAuthenticated, (req, res) => {
    try {
        CoursesService.getEnrolledCourses(req.authId).then(
            (courses) => { res.json(courses) 
        })
    } catch (err) {
        res.status(400);
        res.send(err)
    }
})

/**
 * Arguments
 * courseId: course to enroll in
 * 
 * Response:
 * Course we just enrolled in OR null if already enrolled
 */
router.post('/enroll', checkIfAuthenticated, (req, res) => {
    if (!("courseId" in req.body)) {
        res.status(400)
        res.send("courseId must be specified!")
    }
    try {
        CoursesService.enrollInCourse(req.authId, req.body.courseId).then(
            (courses) => { res.json(courses) })
    } catch (err) {
        res.status(400);
        res.send(err)
    }
})

/**
 * Arguments
 * subjectField: subjectId OR subjectName
 * 
 * Response:
 * List of courses related to that subject
 */
router.get('/subjects/:subjectField', (req, res) => {
    try {
        CoursesService.getCoursesBySubject(req.params.subjectField)
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
router.post('/create/course', checkIfAdmin, (req, res) => {
    if (!("subjectId" in req.body) || !("courseName" in req.body)) {
        res.status(400)
        res.send("subjectId and courseName must be specified!")
    }
    CoursesService.createCourse(req.body.subjectId, req.body.courseName, 
        req.body.sequence)
        .then(course => res.json(course))
        .catch(err => {
            res.status(400)
            res.send(`${err}`)
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
router.post('/create/chapter', checkIfAdmin, (req, res) => {
    if (!("courseId" in req.body) || !("chapterName" in req.body)) {
        res.status(400)
        res.send("courseId and chapterName must be specified!")
    }
    CoursesService.createChapter(req.body.courseId, req.body.chapterName, 
        req.body.sequence)
        .then(chapter => res.json(chapter))
        .catch(err => {
            res.status(400)
            res.send(`${err}`)
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
router.post('/create/lesson', checkIfAdmin, (req, res) => {
    if (!("chapterId" in req.body) || !("contentUrl" in req.body) ||
        !("description" in req.body)) {
        res.status(400)
        res.send("chapterId, contentUrl, and description must be specified!")
    }
    CoursesService.createLesson(req.body.chapterId, req.body.lessonNum, 
        req.body.contentUrl, req.body.description)
        .then(chapter => res.json(chapter))
        .catch(err => {
            res.status(400)
            res.send(`${err}`)
        })
})


module.exports = router;
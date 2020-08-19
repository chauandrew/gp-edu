const express = require('express')
const router = express.Router();
const { checkIfAuthenticated } = require('../middleware/AuthMiddleware');
const CoursesService = require('../../services/CoursesService');

/*
All routes have the prefix: `/api/v1/courses` *
*/

/**
 * Get all subjects, does NOT require auth
 */
router.get('/all', (req, res) => {
    try {
        CoursesService.getAllSubjects().then((subjects) => {
            res.json(subjects)
        })
    } catch (err) {
        res.status(400);
        res.send(err)
    }
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

module.exports = router;
const express = require('express')
const router = express.Router();
const { checkIfAuthenticated, checkIfAdmin } = require('../middleware/AuthMiddleware')
const SubjectService = require('../../services/SubjectService')

/*
All routes have the prefix: `/api/v1/subject` *
*/

/**
 * Get all subjects, does NOT require auth
 */
router.get('/', (_, res) => {
    try {
        SubjectService.getAllSubjects().then((subjects) => {
            res.json(subjects)
        })
    } catch (err) {
        res.status(400);
        res.send(err)
    }
})

router.get('/:subjectField', (req, res) => {
    SubjectService.getSubject(req.params.subjectField)
        .then((subject) => { res.json(subject) })
        .catch((err)  => {
            res.status(400)
            console.log(err)
            res.send(err)
        })
})

module.exports = router;


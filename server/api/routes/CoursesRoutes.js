const express = require('express')
const router = express.Router();
const { checkIfAuthenticated } = require('../middleware/AuthMiddleware');
const CoursesModel = require('../../models/CoursesModel');

router.get('/all', checkIfAuthenticated, (req, res) => {
    try {
        CoursesModel.getAllSubjects().then((subjects) => {
            res.json(subjects)
        })
    } catch (err) {
        res.status(400);
        res.send(err)
    }
})

module.exports = router;
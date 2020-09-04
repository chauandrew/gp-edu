const express = require('express')
const router = express.Router();
const { checkIfAdmin } = require('../middleware/AuthMiddleware')
const CoursesService = require('../../services/CoursesService')

router.post('/add-course', checkIfAdmin, (req, res) => {

})

module.exports = router;
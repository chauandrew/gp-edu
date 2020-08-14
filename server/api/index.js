const express = require('express');
const router = express.Router();
const courseRoutes = require('./routes/CoursesRoutes')
const authRoutes = require('./routes/AuthRoutes')
const userRoutes = require('./routes/UserRoutes')

// Backend routes
router.use('/auth', authRoutes)
router.use('/api/v1/courses', courseRoutes)
router.use('/api/v1/user', userRoutes)

module.exports = router
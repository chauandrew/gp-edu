const express = require('express');
const router = express.Router();
const courseRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// Backend routes
router.use('/auth', authRoutes)
router.use('/api/v1/courses', courseRoutes)
router.use('/api/v1/user', userRoutes)

module.exports = router
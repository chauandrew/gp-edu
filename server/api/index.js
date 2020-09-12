const express = require('express');
const router = express.Router();
const subjectRoutes = require('./routes/SubjectRoutes')
const courseRoutes = require('./routes/CourseRoutes')
const chapterRoutes = require('./routes/ChapterRoutes')
const lessonRoutes = require('./routes/LessonRoutes')
const authRoutes = require('./routes/AuthRoutes')
const userRoutes = require('./routes/UserRoutes')

// Backend routes
router.use('/auth', authRoutes)
router.use('/api/v1/subject', subjectRoutes)
router.use('/api/v1/course', courseRoutes)
router.use('/api/v1/chapter', chapterRoutes)
router.use('/api/v1/lesson', lessonRoutes)
router.use('/api/v1/user', userRoutes)

module.exports = router
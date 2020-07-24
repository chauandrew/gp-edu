const express = require('express');
const router = express.Router();
const path = require('path');
const { checkIfAuthenticated } = require('./middleware/auth');
const courseRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')


// Point get requests to static react files
const reactBuildPath = path.join(__dirname + '/../client/build/index.html')
router.use(express.static(path.join(__dirname, '../client/build')))
    
// Frontend react routing
router.get('/', (_, res) => { res.sendFile(reactBuildPath); })
router.get('/browse', (_, res) => { res.sendFile(reactBuildPath); })
router.get('/courses', (_, res) => { res.sendFile(reactBuildPath); })
router.get('/profile', checkIfAuthenticated, (_, res) => { res.sendFile(reactBuildPath); })
router.get('/404', (_, res) => { res.sendFile(reactBuildPath); })

// Backend routes
router.use('/auth', authRoutes)
router.use('/api/v1/courses', courseRoutes)
router.use('/api/v1/user', userRoutes)

module.exports = router
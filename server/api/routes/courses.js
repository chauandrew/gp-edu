const express = require('express')
const router = express.Router();
const { checkIfAuthenticated } = require('../middleware/auth');

router.post('/all', checkIfAuthenticated, (req, res) => {
    res.send('Authenticated');
    })

module.exports = router;
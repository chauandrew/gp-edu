const express = require('express')
const router = express.Router();
const AuthService = require('../../services/AuthService');

router.post('/signup', (req, res) => {
    user = AuthService.createUser(req.body);
    res.json(user);
})

module.exports = router;
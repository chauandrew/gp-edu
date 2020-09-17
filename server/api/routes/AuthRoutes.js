const express = require('express')
const router = express.Router();
const AuthService = require('../../services/AuthService');

router.post('/signup', (req, res) => {
    AuthService.createUser(req.body)
        .then(user => res.json(user))
        .catch(err => {
            res.status(400)
            res.send(err)
        })
})

module.exports = router;
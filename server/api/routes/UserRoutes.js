const express = require('express')
const router = express.Router();
const { checkIfAuthenticated } = require('../middleware/AuthMiddleware');
const UserModel = require('../../models/UserModel');

/*
All routes have the prefix: `/api/v1/user` *
*/

router.get('/', checkIfAuthenticated, (req, res) => {
    try {
        UserModel.getUserByUid(req.uid).then((user) => {
            res.json(user)
        });
    } catch(err) {
        res.status(400);
        res.send(err)
    }
})

module.exports = router;
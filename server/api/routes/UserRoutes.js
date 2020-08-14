const express = require('express')
const router = express.Router();
const { checkIfAuthenticated } = require('../middleware/AuthMiddleware');
const UserModel = require('../../models/UserModel');

router.get('/', checkIfAuthenticated, (req, res) => {
        try {
            UserModel.getUserByUid(req.query.uid).then((user) => {
                res.json(user.data())
            });
        } catch(err) {
            res.status(400);
            res.send(err)
        }
    }) 

module.exports = router;
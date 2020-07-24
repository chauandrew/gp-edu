const express = require('express')
const router = express.Router();
const UserModel = require('../../models/UserModel');

router.get('/', (req, res) => {
        try {
            console.log(req.query)
            UserModel.getUserByUid(req.query.uid).then((user) => {
                res.json(user.data())
            });
        } catch(err) {
            res.status(400);
            res.send(err)
        }
    }) 

module.exports = router;
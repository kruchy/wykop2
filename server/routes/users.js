const express = require('express');
const router = express.Router();
const models = require('../models/models');

router.get('/', function (req, res, next) {
    models.User.find({}, function (err, users) {
        if (err) {
            res.status(500).json({error: "Problem getting users from server", reason: err});
        }
        else
        {
            res.status(200).json(users);
        }

    })
});

module.exports = router;

const express = require('express');
const router = express.Router();
const models = require('../models/models');

/* GET home page. */
router.get('/', function (req, res, next) {
    const str = {id: 100, nick: "test"};
    const userName = req.body.username;
    const userEmail = req.body.useremail;

    const users = models.User;

    const user = new User(
        {
            nick: userName,
            email: userEmail
        }
    );
    user.save(function (error) {
        if(error)
            res.status(500).json({
                error : "There was a problem adding the information to the database."
            });

    });

    // Submit to the DB
    collection.insert({
        "username": userName,
        "email": userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
        }
        else {
            // And forward to success page
            res.status(200)
                .json(str);
        }
    });

});

module.exports = router;

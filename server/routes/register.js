var express = require('express');
var router = express.Router();
var models = require('../models/models');

/* GET home page. */
router.get('/', function (req, res, next) {
    var str = {id: 100, nick: "test"};
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var users = models.User;

    var user = new User(
        {
            nick:userName,
            email:userEmail
        }
    );
    user.save(function (error) {
        if(error)
            res.status(500).end("There was a problem adding the information to the database.");

    })

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
            res.setHeader('Content-Type', 'application/json')
                .json(str);
        }
    });

});

module.exports = router;

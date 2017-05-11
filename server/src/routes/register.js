const express = require('express');
const router = express.Router();
var User = require("../models/models.js").User;

/* GET home page. */
router.post('/', function (req, res, next) {
    const userName = req.body.username;
    const userEmail = req.body.email;
    const userPasword = req.body.password;

    const user = new User(
        {
            username: userName,
            email: userEmail,
            password: userPasword,
            admin: false

        }
    );
    user.save(function (error) {
        if (error) {
            res.status(500).json({
                error: "There was a problem adding the information to the database.", reason: error
            });
        } else {
            res.status(200).json(user);
        }
    });


});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require("../models/models.js").User;

/* GET home page. */
router.post('/', function (req, res) {
    const userName = req.body.username;
    const userEmail = req.body.email;
    const userPasword = req.body.password;
    if (!userName || !userEmail || !userPasword) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user data.'
        })
    }
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
                success: false,
                error: "Problem adding the information to the database.",
                reason: error
            });
        } else {
            res.status(200).json({
                success: true,
                user: user
            });
        }
    });


});

module.exports = router;

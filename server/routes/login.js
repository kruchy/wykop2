const express = require('express');
const router = express.Router();
const User = require('../models/models').User;
const jwt = require('jsonwebtoken');
const config = require('../config');
const bodyParser = require('body-parser');

var basicAuth = require('express-basic-auth');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

function authenticate(username, password, callback) {
    if (!username || !password) {
        callback(null, false);
    }
    User.findOne({
        username: username
    }, function (err, user) {
        if (!err && user) {
            callback(null, user.authenticate(password));
        }
        else {
            console.log(username);
            try {
                callback(null, false);
            } catch (err) {
            }
        }
    });
}


router.post('/', basicAuth({authorizer: authenticate, authorizeAsync: true}), function (req, res) {

    console.log('logged');
    User.findOne({
        name: req.body.username
    }, function (err, user) {
        if (err) {
            res.json({
                success: false,
                error: "Error getting user from server", reason: error
            });
        }
        try {
            const token = jwt.sign(user, config.secret);
            res.status(200).json({
                success: true,
                token: token
            })
        } catch (error) {
            res.json({
                success: false,
                error: "Error during authentication", reason: error
            });
        }

    });
});

module.exports = router;

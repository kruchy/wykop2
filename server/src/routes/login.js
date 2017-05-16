const express = require('express');
const router = express.Router();
const User = require('../models/models').User;
const jwt = require('jsonwebtoken');
const config = require('../../config');
const bodyParser = require('body-parser');

const basicAuth = require('express-basic-auth');


function authenticate(username, password, callback) {
    if (!username || !password) {
        callback(null, false);
    }
    User.findUser(username, function (err, user) {
        if (!err && user) {
            callback(null, user.authenticate(password));
        }
        else {
            try {
                callback(null, false);
            } catch (err) {
            }
        }
    });
}


function createToken(user) {
    return jwt.sign(user, config.secret, {expiresIn: 60 * 60 * 24});
}
router.post('/', basicAuth({authorizer: authenticate, authorizeAsync: true}), function (req, res) {

    User.findUser(req.auth.user, function (err, user) {
            if (err) {
                res.status(500).json({
                    success: false,
                    error: "Error getting user from server", reason: err
                });
            }
            else {
                try {
                    const token = createToken(user);
                    res.status(200).json({
                        success: true,
                        token: token,
                        user: user
                    })
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        error: "Error creating token", reason: error
                    });
                }
            }

        }
    );
})
;

module.exports = router;
module.exports.createToken = createToken;
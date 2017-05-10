const express = require('express');
const models = require('../models/models');
const config = require("../config.js");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/models').User;

function errorResponse(res, code, error, reason) {

    reason = reason || null;
    return res.status(code).json(
        {
            success: false,
            error: error,
            reason: reason
        });
}
function successResponse(res, message) {
    return res.status(200).json(
        {
            success: true,
            message: message
        }
    )
}
function setAdminOnUser(req, res, enabled) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded, admin) {
            if (err) {
                errorResponse(res);
            } else {
                if (decoded._doc.admin) {
                    const username = req.body.username;
                    User.findOneAndUpdate({username: username}, {$set: {admin: enabled}}, {new: true}, function (err, user) {
                        if (err) {
                            errorResponse(res, 500, 'Could not find user in database', err);
                        }
                        else {
                            successResponse(res, {username: user.username, admin: user.admin});
                        }
                    });
                }
                else {
                    errorResponse(res, 403, 'Forbidden');
                }
            }
        });
    } else {
        errorResponse(res, 403, 'No token provided');
    }
}
router.post("/", function (req, res) {
    setAdminOnUser(req, res, true);
});
router.delete("/", function (req, res) {
    setAdminOnUser(req, res, false);
});


module.exports = router;

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
console.log(        {
        success: true,
        message: message
    }
);
    return res.status(200).json(
        {
            success: true,
            message: message
        }
    )
}
router.post("/", function (req, res) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return errorResponse(res);
            } else {
                if (decoded._doc.admin) {
                    const user = req.body.user;
                    User.findUser(user, function (err, user) {
                        if (err) {
                            return errorResponse(res, 401, 'Could not find user in database', err);
                        }
                        else {
                            user.update({$set: {admin: true}}, function (err, raw) {
                                if (err) {
                                    return errorResponse(res, 500, 'Could not update user', err);
                                }
                                else {
                                    return successResponse(res, raw);
                                }
                            })
                        }
                    })
                }
                else {
                    return errorResponse(res, 403, 'Forbidden');

                }
            }
        });
    } else {
        return errorResponse(res, 403, 'No token provided');
    }

});
module.exports = router;

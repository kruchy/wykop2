const express = require('express');
const models = require('../models/models');
const config = require("../config.js");
const router = express.Router();
const jwt = require('jsonwebtoken');


router.put("/", function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        console.log('after token');
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log('err' + err);
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
            } else {
                const user = req.body.user;
                User.findUser(user, function (err, user) {
                    if (err) {
                        return res.status(401).json({
                            success: false,
                            error: 'Could not find user in database',
                            reason: err
                        });
                    }
                    else {
                        user.update({$set: {admin: true}}, function (err, raw) {
                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    error: 'Could not update user',
                                    reason: err
                                })
                            }
                            else {
                                return res.status(200).json(
                                    {
                                        success: true,
                                        message: raw + ' Updated'
                                    }
                                )
                            }
                        })
                    }
                })
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });

    }

});
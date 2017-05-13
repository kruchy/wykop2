const express = require('express');
const router = express.Router();
const User = require('../models/models').User;
const Post = require('../models/models').Post;

router.get('/', function (req, res, next) {
    User.getUsers(function (err, users) {
        if (err) {
            res.status(500).json({success: false, error: "Problem getting users from server", reason: err});
        }
        else {
            res.status(200).json({success: true, users: users});
        }

    });

});

router.get('/:username', function (req, res, next) {
    if (!req.params.username) {
        next();
    }
    User.findUser(req.params.username, function (err, user) {
        if (err) {
            res.status(500).json({success: false, error: "Problem getting user from server", reason: err});
        }
        else {
            Post.find({author: user}).populate('author').exec(function (err, posts) {
                if (err) {
                    res.status(200).json({success: true, user: user, err: err});
                }
                else {
                    res.status(200).json({success: true, user: user, posts: posts});
                }

            });

        }
    });

});


module.exports = router;

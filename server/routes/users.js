const express = require('express');
const router = express.Router();
const User = require('../models/models').User;
const Post = require('../models/models').Post;

router.get('/', async function (req, res, next) {
    const users = await User.getUsers().catch(function (err) {
        if (err) {
            res.status(500).json({success: false, error: "Problem getting users from server", reason: err});
        }
    });
    if (users) res.status(200).json({success: true, users: users});

});

router.get('/:username', async function (req, res, next) {
    if (!req.params.username) {
        next();
    }
    const user = await User.findUser(req.params.username).catch(function (err) {
        if (err) {
            res.status(500).json({success: false, error: "Problem getting user from server", reason: err});
        }
    });
    if (user) {
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


module.exports = router;

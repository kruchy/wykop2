const express = require('express');
const models = require('../models/models');
const config = require("../config.js");
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get("/:id", function (req, res) {
    console.log(req.params.id);
    const query = models.Post.find({}, function (err, post) {
        if (err) {
            res.status(500)
                .json({error: "Problem retrieving post from server", reason: err});
        }
        else {
            res.status(200)
                .json(found);
        }
    });
});

router.get("/", function (req, res) {
    models.Post.find({}).populate('author').exec(function (err, posts) {
        if (err) {
            res.status(500)
                .json({success: false, error: "Problem retrieving post from server", reason: err});
        }
        else {
            res.status(200)
                .json({success: true, posts: posts});
        }
    });
});


router.post("/", function (req, res) {
    const author = req.body.author;
    const content = req.body.content;
    const post = new models.Post(
        {
            author: author._id,
            content: content
        }
    );
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
                post.save(function (err) {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            error: 'Could not save post',
                            reason: err
                        });

                    }
                    else {
                        res.status(200).json({
                            success: true,
                            post: post,
                            author: author,
                        });
                    }
                });
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });

    }
});

module.exports = router;

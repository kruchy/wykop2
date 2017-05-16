const express = require('express');
const models = require('../models/models');
const config = require("../../config.js");
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get("/", function (req, res) {
    let id = req.query.id;
    if (id) {
        console.log(id);
        models.Post.findOne({_id: id}).populate('author').exec(function (err, post) {
            if (err) {
                res.status(500)
                    .json({success: false, error: "Problem retrieving post from server", reason: err});
            }
            else {
                console.log(post);
                res.status(200)
                    .json({
                        success: true,
                        post: post
                    });
            }
        });
    }
    else {
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
    }
});


router.delete("/", function (req, res) {
    const id = req.body.id;
    if (!id) {
        return res.status(500).json(
            {
                success: false,
                message: 'Invalid post id.'
            });
    }
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (!decoded._doc.admin) {
                return res.status(403).json(
                    {
                        success: false,
                        message: 'Forbidden.'
                    });
            }
            if (err) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
            } else {
                models.Post.findOneAndRemove({id: req.body.id}, function (err) {
                    if (err) {
                        res.status(500)
                            .json({success: false, error: "Problem deleting post from server", reason: err});
                    }
                    else {
                        res.status(200)
                            .json({
                                success: true,
                                message: 'Deleted post'
                            });
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


router.post("/", function (req, res) {
    const content = req.body.content;
    if (!content) {
        return res.status(400).json({
            success: false,
            message: 'Invalid content provided.'
        })
    }
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
            } else {
                const post = new models.Post(
                    {
                        author: decoded._doc._id,
                        content: content
                    }
                );
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
                            author: decoded._doc,
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

const express = require('express');
const models = require('../models/models');
const config = require("../../config.js");
const router = express.Router();
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');


router.delete("/", function (req, res) {
    const commentId = req.body.commentId;
    if (!commentId) {
        return res.status(500).json(
            {
                success: false,
                message: 'Invalid comment id.'
            });
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
                models.Comment.findOne({_id: commentId}).populate('author').populate('posts').exec(function (err, comment) {
                    if (err || !comment) {
                        res.status(500)
                            .json({success: false, error: "Problem retrieving comment from server", reason: err});
                    }
                    if (decoded._doc.username !== comment.author.username) {
                        res.status(403).json(
                            {
                                success: false,
                                message: 'Forbidden.'
                            });
                    }
                    else {
                        models.Post.update({replies: {_id: comment._id}}, {$pull: {comments: {_id: commentId}}}, {
                                "new": true,
                            },
                            function (err, updatedPost) {
                                comment.remove(function (err) {
                                    if (err) {
                                        res.status(500)
                                            .json({
                                                success: false,
                                                message: 'Problem removing comment.',
                                                reason: err
                                            });
                                    } else {
                                        res.status(200)
                                            .json({
                                                success: true,
                                                message: 'Deleted comment.'
                                            })
                                    }
                                })

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
    const content = sanitizeHtml(req.body.content);
    const commentId = req.body.commentId;
    if (!content || !postId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid parameters provided.'
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
                    const comment = new models.Comment(
                        {
                            content: content,
                            author: decoded._doc,
                            parent: commentId
                        }
                    );

                    comment.save(function (err) {
                        if (err) {
                            res.status(500).json(
                                {
                                    success: false,
                                    message: 'Failed to save comment.',
                                    reason: err
                                }
                            )
                        }
                        else {
                            models.Comment.update({_id: commentId}, {$push: {replies: comment._id}}, {}, function (err) {
                                if (err) {
                                    res.status(500).json(
                                        {
                                            success: false,
                                            message: 'Failed to update comment with reply.',
                                            reason: err
                                        }
                                    )
                                }
                                else {
                                    res.status(200).json({
                                        success: true,
                                        comment: comment
                                    })
                                }
                            });
                        }
                    })
                }
            }
        )

    }
    else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });

    }
});

module.exports = router;

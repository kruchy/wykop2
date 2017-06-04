const express = require('express');
const models = require('../models/models');
const config = require("../../config.js");
const router = express.Router();
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');


router.delete("/", function (req, res) {
    const replyId = req.body.commentId;
    if (!replyId) {
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
                models.Comment.findOne({_id: replyId}).deepPopulate('author').exec(function (err, reply) {
                    if (err || !reply) {
                        return res.status(500)
                            .json({success: false, error: "Problem retrieving reply from server", reason: err});
                    }
                    if (decoded._doc.username !== reply.author.username) {
                        return res.status(403).json(
                            {
                                success: false,
                                message: 'Forbidden.'
                            });
                    }
                    else {
                        models.Comment.update({replies: {_id: reply._id}}, {$pull: {replies: {_id: replyId}}}, {"new": true,},
                            function (err, updatedComment) {
                                reply.remove(function (err) {
                                    if (err) {
                                        res.status(500)
                                            .json({
                                                success: false,
                                                message: 'Problem removing reply.',
                                                reason: err
                                            });
                                    } else {
                                        res.status(200)
                                            .json({
                                                success: true,
                                                message: 'Deleted reply.'
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
    if (!content || !content) {
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
                            models.Comment.findOneAndUpdate({_id: commentId}, {$push: {replies: comment._id}}, {new: true}, function (err, comment) {
                                if (err) {
                                    return res.status(500).json(
                                        {
                                            success: false,
                                            message: 'Failed to update comment with reply.',
                                            reason: err
                                        }
                                    )
                                }
                                else {
                                    models.Comment.populate(comment, [
                                            {
                                                path: 'author'
                                            },
                                            {
                                                path: 'replies',
                                                populate: {
                                                    path: 'author'
                                                }
                                            }]
                                        , function (err, comment) {
                                            if (err) {
                                                res.status(500).json(
                                                    {
                                                        success: false,
                                                        message: 'Failed to update comment with reply.',
                                                        reason: err
                                                    }
                                                )
                                            } else {
                                                res.status(200).json({
                                                    success: true,
                                                    comment: comment
                                                })
                                            }
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

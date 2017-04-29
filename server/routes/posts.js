const express = require('express');
const models = require('../models/models');
const config = require("../config.js");
const router = express.Router();


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


router.post("/createPost", function (req, res) {
    const author = req.body.author;
    const content = req.body.content;
    const post = new models.Post(
        {
            author: author,
            content: content
        }
    );
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });

    }

    if (savePost(post)) {
        res.status(200).json(post);
    }
    else {
        res.status(500).json({success: true, error: "Problem saving post"});
    }
})
;

function savePost(post) {
    post.save(function (error) {
        if (error)
            return null;
        return post;
    })
}

module.exports = router;
module.exports.savePost = savePost;

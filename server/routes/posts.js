const express = require('express');
const models = require('../models/models');
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
    models.Post.find({},
        function (err, posts) {
            if (err) {
                res.status(500)
                    .json({error: "Problem retrieving post from server", reason: err});
            }
            else {
                res.status(200)
                    .json(posts);
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

    if (savePost(post)) {
        res.status(200).json(post);
    }
    else {
        res.status(500).json({error: "Problem saving post"});
    }
});

function savePost(post) {
    post.save(function (error) {
        if (error)
            return null;
        return post;
    })
}

module.exports = router;
module.exports.savePost = savePost;

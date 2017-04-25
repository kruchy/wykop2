var express = require('express');
var models = require('../models/models');
var router = express.Router();




router.get("/:id", function (req, res) {
    console.log(req.params.id);
    var query = models.Post.find({});
    var found = findPost(query);
    if (!found) {
        res.status(500)
            .json({error: "Problem retrieving post from server"});
    }
    else {
        res.status(200)
            .json(found);
    }

});

router.get("/", function (req, res) {
    var query = models.Post.find({});
    var found = findPost(query);
    if (!found) {
        res.status(500)
            .json({error: "Problem retrieving post from server"});
    }
    else {
        res.status(200)
            .json(found);
    }

});

function findPost(query) {
    query.exec(function (err, post) {
        if (err) {
            return null;
        }
        else {
            return post;
        }
    })

}

router.post("/createPost", function (req, res) {
    var author = req.body.author;
    var content = req.body.content;
    var post = new models.Post(
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
module.exports.findPost = findPost;
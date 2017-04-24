var express = require('express');
var models = require('../models/models');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});


router.get("/:id", function (req, res) {
    console.log(req.params.id);
    var post = new models.Post(
        {
            author: "AAA",
            content: "CONTENT"
        }
    );

    post.save(function (error) {
        console.log("Post saved");
        if (error) {
            console.log("Error occured");
        }
    });
    var query = models.Post.find({});
    query.select("content");
    query.exec(function (err, post) {
        if (err) return handleError(err);
        res.end(JSON.stringify(post));

    })
});

router.post("/createPost",function (req, res) {
    var author  = req.body.author;
    var content  = req.body.content;
    var post = new models.Post(
        {
            author: author,
            content: content
        }
    );

    post.save(function (error) {
        console.log("Post saved");
        if (error) {
            console.log("Error occured");
        }
    });
});


module.exports = router;
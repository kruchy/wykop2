var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});


router.get("/:id",function (req, res) {
    console.log(req.params.id);
    res.end(req.params.id);
});

module.exports = router;
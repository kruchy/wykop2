var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

function handleLogin (req, res) {
    res.status(200).send('Sie loguj');
}

/* GET users listing. */
router.get('/', handleLogin);

router.post('/', urlencodedParser, function (req, res) {
    response = {
        log: req.body.login,
        pass: req.body.password
    };

    console.log(response);
    res.status(200).send('Sie loguj');
});

module.exports = router;

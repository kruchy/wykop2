const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

function handleLogin (req, res) {
    res.status(200).json('Sie loguj');
}

/* GET users listing. */
router.get('/', handleLogin);

router.post('/',function (req, res) {
    response = {
        log: req.body.login,
        pass: req.body.password
    };

    console.log(response);
    res.status(200).json('Sie loguj');
});

module.exports = router;

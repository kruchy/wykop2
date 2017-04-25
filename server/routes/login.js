const express = require('express');
const router = express.Router();
const User = require('../models/models').User;
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

function handleLogin(req, res) {
    res.status(200).json('Sie loguj');
}

/* GET users listing. */
router.get('/', handleLogin);

router.post('/', function (req, res) {
    User.find({
        name: req.body.login
    }, function (err, user) {
        try {
            const token = createToken(err, user);
            res.status(200).json({
                token: token
            })
        } catch (error) {
            res.json({
                error: "Error during authentication", reason: error
            });
        }

    });
});
function createToken(err, user)
{
    if (err) throw err;
    if (!user)
        throw new Error('User does not exist');
    else if (user) {
        if (user.password !== req.body.password)
            throw new Error("Authentication failed. Wrong password");
        else {
            return jwt.sign(user, app.get('superSecret'), {
                expiresInMinutes: 1440 // expires in 24 hours
            });
        }
    }

}
module.exports = router;
